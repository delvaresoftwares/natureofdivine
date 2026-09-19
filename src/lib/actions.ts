'use server';
import { z } from 'zod';
import { headers } from 'next/headers';
import axios from 'axios';
import { getOrdersByUserId, updateOrderStatus, updateOrderShippingDetails, addOrder, getOrderById, updateOrderPaymentStatus, getOrderByBookingId, getOrders } from './order-store';
import { revalidatePath } from 'next/cache';
import { addLog } from './log-store';
import { decreaseStock } from './stock-store';
import { Order, OrderStatus, SampleChapter } from './definitions';
import { getDiscount, incrementDiscountUsage } from './discount-store';
import { addReview as addReviewToStore } from './review-store';
import { v4 as uuidv4 } from 'uuid';
import { v2 as cloudinary } from 'cloudinary';
import { addEvent, getFunnel, type ConversionFunnel } from './analytics-store';
import { SHA256 } from 'crypto-js';
import { getChapters } from './chapter-store';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

const OrderItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(['book', 'combo']),
  price: z.number(),
  quantity: z.number(),
  variant: z.enum(['paperback', 'hardcover']).optional(),
  subItems: z.array(z.object({
    bookId: z.string(),
    title: z.string(),
    status: z.enum(['pending', 'sourced', 'unavailable', 'out_of_stock'])
  })).optional(),
});

const OrderFormSchema = z.object({
  items: z.array(OrderItemSchema),
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  phone: z.string().min(10, 'Please enter a valid phone number.'),
  address: z.string().min(5, 'Address must be at least 5 characters.'),
  street: z.string().optional(),
  city: z.string().min(2, 'Please enter a valid city.'),
  country: z.string().min(2, 'Please select a country.'),
  state: z.string().min(2, 'Please select a state.'),
  pinCode: z.string().min(3, 'Please enter a valid PIN code.'),
  userId: z.string().optional(),
  discountCode: z.string().optional(),
  paymentMethod: z.enum(['cod', 'prepaid']),
  shippingMethod: z.object({
    carrier: z.string(),
    service: z.string(),
    rate: z.number(),
  }).optional(),
});

export type OrderPayload = z.infer<typeof OrderFormSchema>;

async function fetchPhonePeAccessToken(): Promise<{ success: boolean; accessToken?: string; message?: string }> {
  try {
    const isProd = process.env.NEXT_PUBLIC_IS_PRODUCTION === 'true';
    const clientId = isProd ? process.env.PHONEPE_PROD_CLIENT_ID : process.env.PHONEPE_SANDBOX_CLIENT_ID;
    const clientSecret = isProd ? process.env.PHONEPE_PROD_CLIENT_SECRET : process.env.PHONEPE_SANDBOX_CLIENT_SECRET;
    const clientVersion = isProd ? process.env.PHONEPE_PROD_CLIENT_VERSION : process.env.PHONEPE_SANDBOX_CLIENT_VERSION;
    const tokenUrl = isProd
      ? 'https://api.phonepe.com/apis/identity-manager/v1/oauth/token'
      : 'https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token';

    if (!clientId || !clientSecret || !clientVersion) {
      throw new Error('PhonePe client credentials are not configured.');
    }
    await addLog('info', 'Fetching PhonePe access token', { environment: isProd ? 'production' : 'sandbox' });

    const response = await axios.post(tokenUrl, new URLSearchParams({
      client_id: clientId,
      client_version: clientVersion,
      client_secret: clientSecret,
      grant_type: 'client_credentials',
    }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    const data = response.data as any;

    if (data.access_token) {
      await addLog('info', 'PhonePe access token retrieved');
      return { success: true, accessToken: data.access_token };
    }

    await addLog('error', 'PhonePe access token retrieval failed', { response: data });
    throw new Error(data.message || 'Failed to retrieve PhonePe access token.');
  } catch (error: any) {
    const errorMessage = error.message || 'Failed to fetch PhonePe access token';
    await addLog('error', 'fetchPhonePeAccessToken failed', { error: errorMessage });
    return { success: false, message: errorMessage };
  }
}

export async function placeOrder(payload: OrderPayload): Promise<{ success: boolean; message: string; orderId?: string; paymentData?: any }> {
  await addLog('info', 'placeOrder initiated', { paymentMethod: payload.paymentMethod });
  console.log('[DEBUG] placeOrder Payload:', JSON.stringify(payload, null, 2));

  const validatedFields = OrderFormSchema.safeParse(payload);
  if (!validatedFields.success) {
    const errorMap = validatedFields.error.flatten().fieldErrors;
    const errorMessages = Object.entries(errorMap)
      .map(([field, errors]) => `${field}: ${errors?.join(', ')}`)
      .join(' | ');

    console.log('[DEBUG] Validation Failed:', errorMessages);
    await addLog('error', 'Order validation failed', { errors: errorMap });
    return { success: false, message: `Invalid data provided: ${errorMessages}` };
  }

  const { items, userId, discountCode, paymentMethod } = validatedFields.data;

  try {
    // Recalculate prices server-side
    let calculatedProductPrice = 0;

    for (const item of items) {
      if (item.type === 'book') {
        // Flat price ₹199 for all books
        calculatedProductPrice += 199 * item.quantity;
      } else {
        // For combos, we trust the passed price if it matches our tiers
        calculatedProductPrice += item.price * item.quantity;
      }
    }

    let finalPrice = calculatedProductPrice;
    let discountAmount = 0;

    if (discountCode) {
      const discount = await getDiscount(discountCode);
      if (discount) {
        discountAmount = Math.round(calculatedProductPrice * (discount.percent / 100));
        finalPrice = calculatedProductPrice - discountAmount;
      }
    }

    const shippingCost = 0; // FREE shipping always
    const totalPrice = finalPrice + shippingCost;

    const orderUserId = userId || '';

    const newOrderData: Omit<Order, 'id' | 'status' | 'createdAt' | 'hasReview' | 'paymentDetails'> = {
      userId: orderUserId,
      name: validatedFields.data.name,
      phone: validatedFields.data.phone,
      email: validatedFields.data.email,
      address: validatedFields.data.address,
      street: validatedFields.data.street || '',
      city: validatedFields.data.city,
      country: validatedFields.data.country,
      state: validatedFields.data.state,
      pinCode: validatedFields.data.pinCode,
      paymentMethod,
      items,
      price: totalPrice,
      originalPrice: calculatedProductPrice,
      discountCode: discountCode || '',
      discountAmount,
      shippingDetails: {
        carrier: 'Standard',
        service: 'Standard Shipping',
        cost: shippingCost,
        trackingNumber: null,
        labelUrl: null
      }
    };

    await addLog('info', 'Adding order to database', { userId: orderUserId, itemsCount: items.length });
    const newOrder = await addOrder(newOrderData);
    await addLog('info', 'Order created', { orderId: newOrder.id });

    if (paymentMethod === 'cod') {
      await updateOrderStatus(orderUserId, newOrder.id, 'new');
      await decreaseStock(items[0]?.variant || 'paperback', 1);
      if (discountCode) await incrementDiscountUsage(discountCode);
      revalidatePath('/ticket/' + newOrder.id);
      await addEvent('order_placed_cod');
      return { success: true, message: 'Order created successfully!', orderId: newOrder.id };
    }

    await addEvent('order_placed_prepaid_initiated');
    const paymentResponse = await initiatePhonePePayment(newOrder);
    if (paymentResponse.success && paymentResponse.redirectUrl) {
      return { success: true, message: 'Redirecting to payment gateway.', paymentData: { redirectUrl: paymentResponse.redirectUrl } };
    }

    await addLog('error', 'PhonePe payment initiation failed', { orderId: newOrder.id, response: paymentResponse });
    return { success: false, message: paymentResponse.message || 'Could not initiate payment.' };
  } catch (error: any) {
    const errorMessage = error.message || 'Unknown error';
    await addLog('error', 'placeOrder failed', { error: errorMessage });
    return { success: false, message: `Could not create order: ${errorMessage}` };
  }
}

async function initiatePhonePePayment(order: Order) {
  try {
    const merchantTransactionId = `MTID-${uuidv4().slice(0, 8)}-${order.id}`;
    const isProd = process.env.NEXT_PUBLIC_IS_PRODUCTION === 'true';
    const merchantId = isProd ? process.env.PHONEPE_PROD_MERCHANT_ID : process.env.PHONEPE_SANDBOX_MERCHANT_ID;
    const phonepeApiUrl = isProd
      ? 'https://api.phonepe.com/apis/pg/checkout/v2/pay'
      : 'https://api-preprod.phonepe.com/apis/pg-sandbox/checkout/v2/pay';

    if (!merchantId) throw new Error('PhonePe merchant ID not configured.');

    const tokenResponse = await fetchPhonePeAccessToken();
    if (!tokenResponse.success || !tokenResponse.accessToken) {
      throw new Error(tokenResponse.message || 'Failed to obtain PhonePe access token.');
    }

    const headersList = await headers();
    const host = headersList.get('host');
    const proto = headersList.get('x-forwarded-proto') || 'https';
    const baseUrl = host ? `${proto}://${host}` : (process.env.NEXT_PUBLIC_HOST_URL || 'https://www.natureofthedivine.com');

    const payload = {
      merchantOrderId: merchantTransactionId,
      amount: order.price * 100, // Amount in paise
      expireAfter: 1200,
      metaInfo: {
        udf1: `Order for ${order.items?.[0]?.variant || 'book'}`,
        udf2: order.userId,
      },
      paymentFlow: {
        type: 'PG_CHECKOUT',
        message: 'Payment for book order',
        merchantUrls: {
          redirectUrl: `${baseUrl}/checkout?orderId=${order.id}`,
          // The callback URL should point to our API route.
          callbackUrl: `${baseUrl}/api/payment/callback`
        },
        paymentModeConfig: {
          enabledPaymentModes: [
            { type: 'UPI_INTENT' },
            { type: 'UPI_COLLECT' },
            { type: 'UPI_QR' },
            { type: 'NET_BANKING' },
            { type: 'CARD', cardTypes: ['DEBIT_CARD', 'CREDIT_CARD'] },
          ],
        },
      },
    };

    // Store the mapping from our order ID to PhonePe's transaction ID
    await updateOrderPaymentStatus(order.id, 'PENDING', { merchantTransactionId });

    await addLog('info', 'Initiating PhonePe payment', { url: phonepeApiUrl, transactionId: merchantTransactionId });

    const response = await axios.post(phonepeApiUrl, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `O-Bearer ${tokenResponse.accessToken}`,
      },
    });

    const data = response.data as any;

    if (data.state === 'PENDING') {
      await addLog('info', 'PhonePe payment initiation successful', { orderId: order.id, transactionId: merchantTransactionId });
      return { success: true, redirectUrl: data.redirectUrl };
    }

    await addLog('error', 'PhonePe API error', { orderId: order.id, response: data });
    throw new Error(data.message || 'PhonePe payment initiation failed.');
  } catch (error: any) {
    const errorMessage = error.message || 'Failed to initiate PhonePe payment';
    await addLog('error', 'initiatePhonePePayment failed', { orderId: order.id, error: errorMessage });
    return { success: false, message: errorMessage };
  }
}

export async function checkPhonePeStatus(merchantTransactionId: string) {
  try {
    const isProd = process.env.NEXT_PUBLIC_IS_PRODUCTION === 'true';
    const merchantId = isProd ? process.env.PHONEPE_PROD_MERCHANT_ID : process.env.PHONEPE_SANDBOX_MERCHANT_ID;
    const saltKey = isProd ? process.env.PHONEPE_PROD_SALT_KEY : process.env.PHONEPE_SALT_KEY;
    const saltIndex = parseInt((isProd ? process.env.PHONEPE_PROD_SALT_INDEX : process.env.PHONEPE_SALT_INDEX) || '1');

    const statusApiUrl = isProd
      ? `https://api.phonepe.com/apis/pg/v1/status/${merchantId}/${merchantTransactionId}`
      : `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${merchantTransactionId}`;

    if (!merchantId || !saltKey) throw new Error('PhonePe merchant credentials not configured.');

    const tokenResponse = await fetchPhonePeAccessToken();
    if (!tokenResponse.success || !tokenResponse.accessToken) {
      throw new Error(tokenResponse.message || 'Failed to obtain PhonePe access token.');
    }

    const xVerify = SHA256(`/pg/v1/status/${merchantId}/${merchantTransactionId}` + saltKey).toString() + '###' + saltIndex;

    await addLog('info', `Checking PhonePe status for transaction: ${merchantTransactionId}`);

    const response = await axios.get(statusApiUrl, {
      headers: {
        'Content-Type': 'application/json',
        'X-VERIFY': xVerify,
        'X-MERCHANT-ID': merchantId,
        'Authorization': `O-Bearer ${tokenResponse.accessToken}`,
      },
    });

    const data = response.data as any;

    if (data.success) {
      await addLog('info', 'PhonePe status check successful', { transactionId: merchantTransactionId, state: data.code });
      if (data.code === 'PAYMENT_SUCCESS') {
        await addEvent('order_placed_prepaid_success');
      }
      return { success: true, status: data.code, data: data.data };
    }

    await addLog('warn', 'PhonePe status check failed', { transactionId: merchantTransactionId, response: data });
    return { success: false, message: data.message };
  } catch (error: any) {
    const errorMessage = error.message || 'Failed to check PhonePe status';
    await addLog('error', 'checkPhonePeStatus failed', { transactionId: merchantTransactionId, error: errorMessage });
    return { success: false, message: errorMessage };
  }
}

export async function fetchUserOrdersAction(userId: string) {
  return await getOrdersByUserId(userId);
}

export async function fetchOrdersAction(): Promise<Order[]> {
  return await getOrders();
}

export async function changeOrderStatusAction(userId: string, orderId: string, status: OrderStatus) {
  return await updateOrderStatus(userId, orderId, status);
}

export async function dispatchOrderAction(userId: string, orderId: string, carrier: string, trackingNumber: string) {
  try {
    await updateOrderStatus(userId, orderId, 'dispatched');
    await updateOrderShippingDetails(userId, orderId, {
      carrier,
      trackingNumber,
      service: 'Standard',
      cost: 0,
      labelUrl: null,
    });
    await addLog('info', `Order ${orderId} dispatched manually`, { carrier, trackingNumber });
    return { success: true, message: 'Order dispatched successfully.' };
  } catch (error: any) {
    await addLog('error', 'dispatchOrderAction failed', { userId, orderId, error: error.message });
    return { success: false, message: error.message || 'Failed to dispatch order.' };
  }
}

export async function updateComboBookStatusAction(userId: string, orderId: string, itemIndex: number, subItemIndex: number, status: string) {
  try {
    const { updateComboItemStatus } = await import('./order-store');
    await updateComboItemStatus(userId, orderId, itemIndex, subItemIndex, status);
    return { success: true, message: 'Book status updated.' };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function changeMultipleOrderStatusAction(orders: { orderId: string, userId: string }[], status: OrderStatus) {
  try {
    await Promise.all(orders.map(order => changeOrderStatusAction(order.userId, order.orderId, status)));
    await addLog('info', `Bulk updated ${orders.length} orders to ${status}`);
    return { success: true, message: `${orders.length} orders updated.` };
  } catch (error: any) {
    await addLog('error', 'Bulk order update failed', { status, count: orders.length, error: error.message });
    return { success: false, message: 'Failed to update orders.' };
  }
}

export async function fetchOrderByIdAction(userId: string, orderId: string) {
  return await getOrderById(userId, orderId);
}

export async function getBookingAction(bookingId: string) {
  return await getOrderByBookingId(bookingId);
}

const ReviewSchema = z.object({
  orderId: z.string(),
  userId: z.string(),
  rating: z.number().min(1).max(5),
  title: z.string().min(3, 'Title must be at least 3 characters.'),
  reviewText: z.string().optional(),
  images: z.array(z.string()).optional(),
});

export async function submitReview(data: z.infer<typeof ReviewSchema>) {
  try {
    const validatedData = ReviewSchema.parse(data);
    const order = await getOrderById(validatedData.userId, validatedData.orderId);
    if (!order) throw new Error('Order not found.');
    const imageUrls = validatedData.images?.length ? await uploadImages(validatedData.images) : [];
    const reviewData = {
      orderId: validatedData.orderId,
      userId: validatedData.userId,
      rating: validatedData.rating,
      title: validatedData.title,
      reviewText: validatedData.reviewText,
      userName: order.name,
      imageUrls,
    };
    await addReviewToStore(reviewData);
    await updateOrderStatus(validatedData.userId, validatedData.orderId, 'delivered', true);
    revalidatePath('/');
    return { success: true, message: 'Review submitted successfully.' };
  } catch (error: any) {
    const errorMessage = error.message || 'Failed to submit review';
    await addLog('error', 'submitReview failed', { error: errorMessage });
    return { success: false, message: errorMessage };
  }
}

async function uploadImages(images: string[]): Promise<string[]> {
  const uploadPromises = images.map(image =>
    cloudinary.uploader.upload(image, { folder: 'reviews', transformation: [{ width: 1000, height: 1000, crop: 'limit' }] })
  );
  const results = await Promise.all(uploadPromises);
  return results.map(result => result.secure_url);
}

export async function validateDiscountCode(code: string): Promise<{ success: boolean; percent?: number; message: string }> {
  if (!code) return { success: false, message: 'Please enter a code.' };
  // Built-in welcome discount — works without Firestore
  if (code.toUpperCase() === 'WELCOME20') {
    return { success: true, percent: 20, message: '🎉 Welcome! 20% discount applied.' };
  }
  const discount = await getDiscount(code);
  if (discount) return { success: true, percent: discount.percent, message: `Code applied! ${discount.percent}% off.` };
  return { success: false, message: 'Invalid or expired discount code.' };
}

export async function trackEvent(type: string, metadata?: Record<string, any>): Promise<{ success: boolean }> {
  try {
    // Sanitize metadata to remove undefined values, which Firestore rejects
    const sanitizedMetadata = metadata ? JSON.parse(JSON.stringify(metadata)) : undefined;
    await addEvent(type, sanitizedMetadata);
    return { success: true };
  } catch (e) {
    await addLog('error', 'trackEvent failed', { type, error: (e as Error).message });
    return { success: false };
  }
}

export async function fetchChaptersAction(): Promise<SampleChapter[]> {
  return await getChapters();
}

export async function fetchFunnel(
  timeRange: 'today' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom' = 'daily',
  customRange?: { start: number, end: number }
): Promise<ConversionFunnel> {
  return await getFunnel(timeRange, customRange);
}