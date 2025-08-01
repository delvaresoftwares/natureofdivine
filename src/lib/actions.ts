
'use server';

import { z } from 'zod';
import { getOrders, getOrdersByUserId, updateOrderStatus, addOrder, getOrderById, updateOrderPaymentStatus } from './order-store';
import { revalidatePath } from 'next/cache';
import { addLog } from './log-store';
import { decreaseStock } from './stock-store';
import { fetchLocationAndPrice } from './fetch-location-price';
import { BookVariant, OrderStatus, Review, Order } from './definitions';
import { getDiscount, incrementDiscountUsage, addDiscount } from './discount-store';
import { addReview as addReviewToStore, getReviews as getReviewsFromStore } from './review-store';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

const OrderFormSchema = z.object({
  variant: z.enum(['paperback', 'hardcover']),
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  phone: z.string().min(10, 'Please enter a valid phone number.'),
  address: z.string().min(5, 'Address must be at least 5 characters.'),
  street: z.string().optional(),
  city: z.string().min(2, 'Please enter a valid city.'),
  country: z.string().min(2, 'Please select a country.'),
  state: z.string().min(2, 'Please select a state.'),
  pinCode: z.string().min(3, 'Please enter a valid PIN code.'),
  userId: z.string().min(1, "User ID is required."),
  discountCode: z.string().optional(),
  paymentMethod: z.enum(['cod', 'prepaid']),
});

export type OrderPayload = z.infer<typeof OrderFormSchema>;

export async function placeOrder(payload: OrderPayload): Promise<{ success: boolean; message: string; orderId?: string; paymentData?: any }> {
  await addLog('info', 'placeOrder action initiated.', { paymentMethod: payload.paymentMethod });

  const validatedFields = OrderFormSchema.safeParse(payload);

  if (!validatedFields.success) {
    const errorDetails = validatedFields.error.flatten();
    await addLog('error', 'Order validation failed.', errorDetails);
    return {
      success: false,
      message: 'Invalid data provided. Please check the form.',
    };
  }
  
  const { variant, userId, discountCode, paymentMethod } = validatedFields.data;

  try {
    const prices = await fetchLocationAndPrice();
    const originalPrice = prices[variant as Exclude<BookVariant, 'ebook'>];
    
    let finalPrice = originalPrice;
    let discountAmount = 0;
    
    if (discountCode) {
        const discount = await getDiscount(discountCode);
        if (discount) {
            discountAmount = Math.round(originalPrice * (discount.percent / 100));
            finalPrice = originalPrice - discountAmount;
        }
    }
    
    const newOrderData: Omit<Order, 'id' | 'status' | 'createdAt' | 'hasReview'> = {
      userId: validatedFields.data.userId,
      name: validatedFields.data.name,
      phone: validatedFields.data.phone,
      email: validatedFields.data.email,
      address: validatedFields.data.address,
      street: validatedFields.data.street || '',
      city: validatedFields.data.city,
      country: validatedFields.data.country,
      state: validatedFields.data.state,
      pinCode: validatedFields.data.pinCode,
      paymentMethod: validatedFields.data.paymentMethod,
      variant: validatedFields.data.variant,
      price: finalPrice,
      originalPrice,
      discountCode: validatedFields.data.discountCode || '',
      discountAmount,
    };
    
    await addLog('info', 'Attempting to add order to database with clean data...', { userId, variant });
    const newOrder = await addOrder(newOrderData);
    await addLog('info', 'Order successfully created in database.', { orderId: newOrder.id });
    
    if (paymentMethod === 'cod') {
        await decreaseStock(variant, 1);
        if (discountCode) {
            await incrementDiscountUsage(discountCode);
        }

        revalidatePath('/admin');
        revalidatePath('/orders');

        return {
          success: true,
          message: 'Order created successfully!',
          orderId: newOrder.id,
        };
    } else { // prepaid
        const paymentResponse = await initiatePhonePePayment(newOrder);
        if (paymentResponse.success && paymentResponse.redirectUrl) {
            return {
                success: true,
                message: 'Redirecting to payment gateway.',
                paymentData: { redirectUrl: paymentResponse.redirectUrl },
            };
        } else {
             await addLog('error', 'PhonePe payment initiation failed.', { orderId: newOrder.id, response: paymentResponse });
             // In a real app, you might want to cancel the order here or mark it as 'payment_failed'
             return { success: false, message: paymentResponse.message || 'Could not initiate payment.' };
        }
    }

  } catch (error: any) {
    const errorMessage = error.message || 'An unknown error occurred.';
    await addLog('error', 'placeOrder action failed catastrophically.', {
        message: errorMessage,
        stack: error.stack,
        payload: payload,
    });
    console.error('CRITICAL placeOrder Error:', error);
    return {
      success: false,
      message: `Could not create a new order in the database. Reason: ${errorMessage}`,
    };
  }
}

async function initiatePhonePePayment(order: Order) {
    const isProd = process.env.NEXT_PUBLIC_IS_PRODUCTION === 'true';
    const host = process.env.NEXT_PUBLIC_HOST_URL;
    const merchantId = process.env.PHONEPE_MERCHANT_ID;
    const saltKey = process.env.PHONEPE_SALT_KEY;
    const saltIndex = process.env.PHONEPE_SALT_INDEX;

    if (!merchantId || !saltKey || !saltIndex || !host) {
        throw new Error('PhonePe environment variables are not configured.');
    }
    
    const amount = order.price * 100; // Amount in paise
    const merchantTransactionId = `MUID-${order.id}-${Date.now()}`;
    const merchantUserId = order.userId ? `CUID-${order.userId.substring(0, 25)}` : `CUID-GUEST-${Date.now()}`;

    const payload = {
        merchantId,
        merchantTransactionId,
        merchantUserId,
        amount: amount,
        redirectUrl: `${host}/api/payment/callback`,
        redirectMode: 'POST',
        callbackUrl: `${host}/api/payment/callback`,
        mobileNumber: order.phone,
        paymentInstrument: {
            type: 'PAY_PAGE',
        },
    };

    await addLog('info', 'Initiating PhonePe payment with payload', { payload });
    
    const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64');
    const apiEndpoint = '/pg/v1/pay';
    const checksumString = base64Payload + apiEndpoint + saltKey;
    const sha256 = crypto.createHash('sha256').update(checksumString).digest('hex');
    const xVerify = `${sha256}###${saltIndex}`;

    const apiUrl = isProd 
      ? 'https://api.phonepe.com/apis/hermes' 
      : 'https://api-preprod.phonepe.com/apis/pg-sandbox';
      
    try {
        const response = await fetch(`${apiUrl}${apiEndpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-VERIFY': xVerify,
            },
            body: JSON.stringify({ request: base64Payload }),
        });
        
        const data = await response.json();
        
        await addLog('info', 'PhonePe API response received', { data });

        if (data.success && data.data.instrumentResponse.redirectInfo.url) {
            return {
                success: true,
                redirectUrl: data.data.instrumentResponse.redirectInfo.url
            };
        } else {
             return {
                success: false,
                message: data.message || "Failed to get redirect URL from PhonePe.",
             };
        }
    } catch(error: any) {
        await addLog('error', 'PhonePe API call failed', { error: { message: error.message, stack: error.stack } });
        return { success: false, message: error.message };
    }
}

export async function checkPhonePeStatus(merchantTransactionId: string) {
    const isProd = process.env.NEXT_PUBLIC_IS_PRODUCTION === 'true';
    const merchantId = process.env.PHONEPE_MERCHANT_ID;
    const saltKey = process.env.PHONEPE_SALT_KEY;
    const saltIndex = process.env.PHONEPE_SALT_INDEX;

    if (!merchantId || !saltKey || !saltIndex) {
        throw new Error('PhonePe environment variables are not configured.');
    }
    
    const apiEndpoint = `/pg/v1/status/${merchantId}/${merchantTransactionId}`;
    const checksumString = apiEndpoint + saltKey;
    const sha256 = crypto.createHash('sha256').update(checksumString).digest('hex');
    const xVerify = `${sha256}###${saltIndex}`;

    const apiUrl = isProd
      ? 'https://api.phonepe.com/apis/hermes'
      : 'https://api-preprod.phonepe.com/apis/pg-sandbox';
      
    try {
        const response = await fetch(`${apiUrl}${apiEndpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-MERCHANT-ID': merchantId,
                'X-VERIFY': xVerify,
            },
        });

        const data = await response.json();
        return data; // Return the full status response
    } catch (error: any) {
        await addLog('error', 'checkPhonePeStatus failed', { error, merchantTransactionId });
        return { success: false, message: error.message };
    }
}


export async function processPrepaidOrder(): Promise<{ success: boolean }> {
    await addLog('info', 'Simulating successful prepaid payment.');
    return { success: true };
}

export async function fetchOrdersAction() {
    return await getOrders();
}

export async function fetchUserOrdersAction(userId: string) {
    return await getOrdersByUserId(userId);
}

export async function changeOrderStatusAction(userId: string, orderId: string, status: OrderStatus) {
    return await updateOrderStatus(userId, orderId, status);
}

const ReviewSchema = z.object({
  orderId: z.string(),
  userId: z.string(),
  rating: z.number().min(1).max(5),
  reviewText: z.string().optional(),
});

export async function submitReview(data: z.infer<typeof ReviewSchema>) {
  try {
    const validatedData = ReviewSchema.parse(data);
    
    const order = await getOrderById(validatedData.userId, validatedData.orderId);
    if (!order) {
        throw new Error("Order not found.");
    }
    
    const reviewData = {
      ...validatedData,
      userName: order.name, 
    };

    await addReviewToStore(reviewData);
    await updateOrderStatus(validatedData.userId, validatedData.orderId, 'delivered', true);
    
    revalidatePath('/');
    revalidatePath('/orders');

    return { success: true, message: "Review submitted successfully." };
  } catch (error: any) {
    await addLog('error', 'submitReview failed', { data, error });
    console.error("Error submitting review:", error);
    return { success: false, message: error.message || "Failed to submit review." };
  }
}

export async function fetchReviews(): Promise<Review[]> {
    return await getReviewsFromStore();
}

export async function validateDiscountCode(code: string): Promise<{ success: boolean; percent?: number; message: string }> {
    if (!code) {
        return { success: false, message: "Please enter a code." };
    }
    const discount = await getDiscount(code);
    if (discount) {
        return { success: true, percent: discount.percent, message: `Code applied! You get ${discount.percent}% off.` };
    }
    return { success: false, message: "Invalid or expired discount code." };
}

export async function createDiscount(code: string, percent: number): Promise<{success: boolean, message: string}> {
    const result = await addDiscount(code, percent);
    if(result.success) {
        revalidatePath('/admin');
    }
    return result;
}
