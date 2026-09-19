'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  fetchOrdersAction,
  changeOrderStatusAction,
  changeMultipleOrderStatusAction,
  dispatchOrderAction,
  updateComboBookStatusAction,
} from '@/lib/actions';
import type { Order, OrderStatus } from '@/lib/definitions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Download,
  Edit,
  Loader2,
  Package,
  RefreshCw,
  Send,
  ShieldCheck,
  Trash2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const statusColors: Record<OrderStatus, string> = {
  new: 'bg-blue-500',
  pending: 'bg-gray-500',
  dispatched: 'bg-yellow-500',
  delivered: 'bg-green-500',
  cancelled: 'bg-red-500',
  breached: 'bg-orange-500',
  refunded: 'bg-purple-500',
};

const STATUS_ORDER: OrderStatus[] = ['new', 'pending', 'dispatched', 'delivered', 'cancelled', 'breached', 'refunded'];

function ComboDetailsDialog({ order, onClose }: { order: Order; onClose: () => void }) {
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const handleBookStatusChange = async (itemIndex: number, subItemIndex: number, newStatus: string) => {
    setIsUpdating(`${itemIndex}-${subItemIndex}`);
    try {
      const res = await updateComboBookStatusAction(order.userId, order.id, itemIndex, subItemIndex, newStatus);
      if (res.success) {
        toast({ title: 'Status Updated', description: `Book status changed to ${newStatus}` });
        onClose();
      } else {
        toast({ variant: 'destructive', title: 'Error', description: res.message });
      }
    } catch (e: any) {
      toast({ variant: 'destructive', title: 'Error', description: e.message });
    } finally {
      setIsUpdating(null);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" /> Combo Fulfillment Tracking
          </DialogTitle>
          <DialogDescription>
            Manage sourcing status for individual books in this combo order (#{order.id.slice(-6)})
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
          {order.items.filter((i) => i.type === 'combo').map((item, itemIdx) => (
            <div key={itemIdx} className="space-y-4">
              <h3 className="font-bold text-lg border-b pb-2">{item.name}</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Book Title</TableHead>
                    <TableHead>Book ID</TableHead>
                    <TableHead>Sourcing Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {item.subItems?.map((book, bookIdx) => (
                    <TableRow key={bookIdx}>
                      <TableCell className="font-medium">{book.title}</TableCell>
                      <TableCell className="text-xs font-mono">{book.bookId}</TableCell>
                      <TableCell>
                        <Badge className={cn(
                          'capitalize',
                          book.status === 'sourced' ? 'bg-emerald-500' :
                          book.status === 'out_of_stock' ? 'bg-rose-500' :
                          book.status === 'unavailable' ? 'bg-amber-500' : 'bg-slate-400',
                        )}>
                          {book.status.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Select
                          defaultValue={book.status}
                          onValueChange={(v) => handleBookStatusChange(itemIdx, bookIdx, v)}
                          disabled={isUpdating === `${itemIdx}-${bookIdx}`}
                        >
                          <SelectTrigger className="w-[130px] h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="sourced">Sourced</SelectItem>
                            <SelectItem value="unavailable">Unavailable</SelectItem>
                            <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function OrderTable({
  orders,
  onStatusChange,
  selectedOrders,
  onSelectionChange,
}: {
  orders: Order[];
  onStatusChange: (userId: string, orderId: string, newStatus: OrderStatus) => void;
  selectedOrders: string[];
  onSelectionChange: (orderId: string, checked: boolean) => void;
}) {
  const [selectedComboOrder, setSelectedComboOrder] = useState<Order | null>(null);

  const handleSelectAll = (checked: boolean) => {
    orders.forEach((order) => onSelectionChange(order.id, checked));
  };

  if (orders.length === 0) {
    return <p className="text-center py-8 text-muted-foreground">No orders in this category.</p>;
  }

  const allSelected = orders.length > 0 && orders.every((order) => selectedOrders.includes(order.id));

  return (
    <div className="overflow-x-auto">
      {selectedComboOrder && (
        <ComboDetailsDialog order={selectedComboOrder} onClose={() => setSelectedComboOrder(null)} />
      )}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                onCheckedChange={handleSelectAll}
                checked={allSelected}
                aria-label="Select all rows"
              />
            </TableHead>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Items & Price</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} data-state={selectedOrders.includes(order.id) ? 'selected' : ''}>
              <TableCell>
                <Checkbox
                  onCheckedChange={(checked) => onSelectionChange(order.id, !!checked)}
                  checked={selectedOrders.includes(order.id)}
                  aria-label={`Select order ${order.id}`}
                />
              </TableCell>
              <TableCell className="font-mono text-xs">{order.id.slice(-8)}</TableCell>
              <TableCell>
                <div className="font-medium">{order.name}</div>
                <div className="text-[10px] text-muted-foreground">{order.email}</div>
                {order.phone && <div className="text-[10px] text-muted-foreground">{order.phone}</div>}
              </TableCell>
              <TableCell className="text-[10px] max-w-[220px]">
                {order.address
                  ? `${order.address}, ${order.street}, ${order.city}, ${order.state}, ${order.country} - ${order.pinCode}`
                  : 'N/A'}
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  {order.items?.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Badge variant="outline" className="text-[9px] uppercase h-4 px-1">
                        {item.type}
                      </Badge>
                      <span className="text-[11px] font-medium line-clamp-1">{item.name}</span>
                      {item.type === 'combo' && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 text-primary"
                          onClick={() => setSelectedComboOrder(order)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                <div className="font-bold text-sm mt-1">₹{order.price}</div>
                {order.discountCode && (
                  <div className="text-[9px] text-emerald-600 font-bold">
                    -{order.discountAmount} ({order.discountCode})
                  </div>
                )}
              </TableCell>
              <TableCell className="text-[10px]">{new Date(order.createdAt).toLocaleDateString()}</TableCell>
              <TableCell className="uppercase font-mono text-[10px]">{order.paymentMethod}</TableCell>
              <TableCell className="text-center">
                <Badge variant="outline" className={cn('capitalize text-white text-[10px]', statusColors[order.status])}>
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Select
                  defaultValue={order.status}
                  onValueChange={(value) => onStatusChange(order.userId, order.id, value as OrderStatus)}
                >
                  <SelectTrigger className="w-[120px] ml-auto h-8 text-[10px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="dispatched">Dispatched</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="breached">Breached</SelectItem>
                    <SelectItem value="refunded">Refunded</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function DispatchDialog({
  isOpen,
  onOpenChange,
  onSubmit,
  isSubmitting,
}: {
  isOpen: boolean;
  onOpenChange: (o: boolean) => void;
  onSubmit: (carrier: string, tracking: string) => void;
  isSubmitting: boolean;
}) {
  const [carrier, setCarrier] = useState('');
  const [tracking, setTracking] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(carrier, tracking);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dispatch Order</DialogTitle>
          <DialogDescription>Enter the carrier and tracking details for this order.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="carrier">Carrier Name</Label>
            <Input id="carrier" value={carrier} onChange={(e) => setCarrier(e.target.value)} placeholder="e.g. BlueDart, Delhivery" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tracking">Tracking Number</Label>
            <Input id="tracking" value={tracking} onChange={(e) => setTracking(e.target.value)} placeholder="Tracking ID" required />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Dispatch Order
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function BulkActions({ selectedCount, onAction }: { selectedCount: number; onAction: (status: OrderStatus) => void }) {
  if (selectedCount === 0) return null;

  return (
    <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg border my-4">
      <p className="text-sm font-medium">
        {selectedCount} order{selectedCount > 1 ? 's' : ''} selected
      </p>
      <div className="flex items-center gap-2">
        <Button size="sm" onClick={() => onAction('dispatched')}>
          <Send className="mr-2 h-4 w-4" />
          Mark as Dispatched
        </Button>
        <Button size="sm" variant="destructive" onClick={() => onAction('cancelled')}>
          <Trash2 className="mr-2 h-4 w-4" />
          Cancel Selected
        </Button>
      </div>
    </div>
  );
}

export function OrdersManager() {
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<OrderStatus>('new');
  const [search, setSearch] = useState('');
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [isBulkUpdating, setIsBulkUpdating] = useState(false);
  const [dispatchDialogOpen, setDispatchDialogOpen] = useState(false);
  const [dispatchingOrder, setDispatchingOrder] = useState<{ id: string; userId: string } | null>(null);
  const [isDispatching, setIsDispatching] = useState(false);

  const loadOrders = useCallback(async () => {
    setLoading(true);
    try {
      const fetchedOrders = await fetchOrdersAction();
      setOrders(fetchedOrders);
      setSelectedOrders([]);
    } catch (e: any) {
      let description = 'Failed to load orders. Please try again later.';
      if (e.message && e.message.includes('indexes?create_composite')) {
        const urlMatch = e.message.match(/(https?:\/\/[^\s]+)/);
        if (urlMatch) {
          const firebaseUrl = urlMatch[0].replace(/\\"/g, '');
          description = `A database index is required to fetch all orders. Please click the link to create it in the Firebase Console, then refresh this page: ${firebaseUrl}`;
        }
      }
      toast({ variant: 'destructive', title: 'Error', description, duration: 30000 });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const handleStatusChange = async (userId: string, orderId: string, newStatus: OrderStatus) => {
    if (newStatus === 'dispatched') {
      setDispatchingOrder({ id: orderId, userId });
      setDispatchDialogOpen(true);
      return;
    }

    try {
      await changeOrderStatusAction(userId, orderId, newStatus);
      toast({ title: 'Success', description: 'Order status updated successfully.' });
      loadOrders();
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Error', description: error.message || 'Failed to update order status.' });
    }
  };

  const handleDispatchSubmit = async (carrier: string, tracking: string) => {
    if (!dispatchingOrder) return;
    setIsDispatching(true);
    try {
      const result = await dispatchOrderAction(dispatchingOrder.userId, dispatchingOrder.id, carrier, tracking);
      if (result.success) {
        toast({ title: 'Success', description: result.message });
        setDispatchDialogOpen(false);
        loadOrders();
      } else {
        throw new Error(result.message);
      }
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    } finally {
      setIsDispatching(false);
    }
  };

  const handleSelectionChange = (orderId: string, checked: boolean) => {
    setSelectedOrders((prev) => (checked ? [...prev, orderId] : prev.filter((id) => id !== orderId)));
  };

  const handleBulkStatusChange = async (status: OrderStatus) => {
    setIsBulkUpdating(true);
    try {
      const ordersToUpdate = selectedOrders
        .map((id) => orders.find((o) => o.id === id))
        .filter((o): o is Order => Boolean(o))
        .map((o) => ({ orderId: o.id, userId: o.userId }));

      if (ordersToUpdate.length > 0) {
        const result = await changeMultipleOrderStatusAction(ordersToUpdate, status);
        if (result.success) {
          toast({ title: 'Success', description: result.message });
        } else {
          throw new Error(result.message);
        }
      }
      loadOrders();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Bulk Update Failed',
        description: error.message || 'Could not update all selected orders.',
      });
    } finally {
      setIsBulkUpdating(false);
    }
  };

  const handleExportOrders = () => {
    if (orders.length === 0) {
      toast({ title: 'No orders', description: 'There are no orders to export.' });
      return;
    }

    const headers = ['Order ID', 'Date', 'Status', 'Name', 'Email', 'Phone', 'Address', 'City', 'State', 'Country', 'Pincode', 'Items', 'Price', 'Payment Method', 'Discount Code'];

    const rows = orders.map((order) => [
      order.id,
      new Date(order.createdAt).toISOString().split('T')[0],
      order.status,
      `"${order.name}"`,
      order.email,
      order.phone,
      `"${(order.address || '').replace(/"/g, '""')}"`,
      order.city,
      order.state,
      order.country,
      order.pinCode,
      `"${order.items?.map((i) => `${i.name} x${i.quantity}`).join('; ') || ''}"`,
      order.price,
      order.paymentMethod,
      order.discountCode || '',
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `orders_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredOrders = () => {
    const byStatus = orders.filter((o) => o.status === category);
    if (!search.trim()) return byStatus;
    const q = search.trim().toLowerCase();
    return byStatus.filter((o) =>
      [o.id, o.name, o.email, o.phone, o.city, o.state, o.country, o.discountCode]
        .some((field) => (field || '').toLowerCase().includes(q)),
    );
  };

  const categorizedCounts = STATUS_ORDER.map((s) => orders.filter((o) => o.status === s).length);

  return (
    <div className="space-y-6">
      <DispatchDialog
        isOpen={dispatchDialogOpen}
        onOpenChange={setDispatchDialogOpen}
        onSubmit={handleDispatchSubmit}
        isSubmitting={isDispatching}
      />

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
              <CardTitle className="text-3xl font-headline flex items-center gap-2">
                <ShieldCheck /> Order Management
              </CardTitle>
              <CardDescription>View and manage all incoming orders.</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleExportOrders} variant="outline">
                <Download className="mr-2 h-4 w-4" /> Export CSV
              </Button>
              <Button onClick={loadOrders} variant="outline" size="icon" disabled={loading}>
                <RefreshCw className={cn('h-4 w-4', loading && 'animate-spin')} />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 max-w-sm">
            <Input
              placeholder="Search by name, email, phone, order ID, city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-3 md:grid-cols-7 gap-2 mb-2">
            {STATUS_ORDER.map((status, idx) => (
              <Button
                key={status}
                variant={category === status ? 'default' : 'outline'}
                size="sm"
                onClick={() => {
                  setCategory(status);
                  setSelectedOrders([]);
                }}
                className={cn('uppercase text-[10px] justify-center', category === status && statusColors[status])}
              >
                {status} ({categorizedCounts[idx]})
              </Button>
            ))}
          </div>

          <BulkActions selectedCount={selectedOrders.length} onAction={handleBulkStatusChange} />

          {loading ? (
            <div className="flex justify-center items-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="ml-2">{isBulkUpdating ? 'Applying bulk actions...' : 'Loading orders...'}</p>
            </div>
          ) : (
            <OrderTable
              orders={filteredOrders()}
              onStatusChange={handleStatusChange}
              selectedOrders={selectedOrders}
              onSelectionChange={handleSelectionChange}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}