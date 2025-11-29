import { useQuery, useMutation } from "@tanstack/react-query";
import { Link } from "wouter";
import { type Order } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ClipboardList, User, Phone, Pill, Clock, Package, Search, Download, Edit2, Trash2, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useState, useMemo } from "react";

interface OrdersResponse {
  orders: Order[];
  total: number;
}

function OrderCard({ 
  order, 
  onEdit, 
  onDelete, 
  onStatusChange 
}: { 
  order: Order; 
  onEdit: (order: Order) => void;
  onDelete: (order: Order) => void;
  onStatusChange: (id: string, status: string) => void;
}) {
  const statusColors: Record<string, string> = {
    pending: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    processing: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    completed: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    cancelled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  };

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(d);
  };

  return (
    <Card className="hover-elevate border border-card-border" data-testid={`card-order-${order.id}`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Order ID</p>
              <p className="font-medium text-sm" data-testid={`text-order-id-${order.id}`}>
                #{order.id.slice(0, 8)}
              </p>
            </div>
          </div>
          <Select 
            value={order.status} 
            onValueChange={(value) => onStatusChange(order.id, value)}
          >
            <SelectTrigger className="w-auto h-auto p-0 border-0 bg-transparent" data-testid={`select-status-${order.id}`}>
              <Badge className={`${statusColors[order.status] || statusColors.pending} capitalize cursor-pointer`}>
                {order.status}
              </Badge>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <User className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Customer</p>
              <p className="font-medium" data-testid={`text-customer-${order.id}`}>{order.customerName}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Phone</p>
              <p className="font-medium" data-testid={`text-phone-${order.id}`}>{order.phone}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Pill className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground">Medicine</p>
              <p className="font-medium break-words" data-testid={`text-medicine-${order.id}`}>{order.medicine}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 pt-2 border-t border-border">
            <Clock className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Ordered</p>
              <p className="text-sm" data-testid={`text-date-${order.id}`}>{formatDate(order.createdAt)}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-4 pt-4 border-t border-border">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 gap-1" 
            onClick={() => onEdit(order)}
            data-testid={`button-edit-${order.id}`}
          >
            <Edit2 className="h-3.5 w-3.5" />
            Edit
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 gap-1 text-destructive hover:text-destructive" 
            onClick={() => onDelete(order)}
            data-testid={`button-delete-${order.id}`}
          >
            <Trash2 className="h-3.5 w-3.5" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function OrdersSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <div>
                  <Skeleton className="h-3 w-16 mb-1" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((j) => (
                <div key={j} className="flex items-start gap-3">
                  <Skeleton className="h-4 w-4 rounded" />
                  <div className="flex-1">
                    <Skeleton className="h-3 w-16 mb-1" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function EmptyState({ search }: { search: string }) {
  return (
    <Card className="max-w-md mx-auto" data-testid="card-empty-state">
      <CardContent className="py-16 px-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mx-auto mb-6">
          <ClipboardList className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2">
          {search ? "No Orders Found" : "No Orders Yet"}
        </h3>
        <p className="text-muted-foreground mb-8">
          {search 
            ? `No orders match "${search}". Try a different search term.`
            : "You haven't placed any orders yet. Start by submitting your first medicine order."
          }
        </p>
        {!search && (
          <Link href="/order">
            <Button data-testid="button-empty-place-order">Place Your First Order</Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
}

function EditOrderDialog({ 
  order, 
  open, 
  onOpenChange, 
  onSave 
}: { 
  order: Order | null; 
  open: boolean; 
  onOpenChange: (open: boolean) => void;
  onSave: (id: string, data: { customerName: string; phone: string; medicine: string }) => void;
}) {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [medicine, setMedicine] = useState("");

  useMemo(() => {
    if (order) {
      setCustomerName(order.customerName);
      setPhone(order.phone);
      setMedicine(order.medicine);
    }
  }, [order]);

  const handleSave = () => {
    if (order) {
      onSave(order.id, { customerName, phone, medicine });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent data-testid="dialog-edit-order">
        <DialogHeader>
          <DialogTitle>Edit Order</DialogTitle>
          <DialogDescription>
            Make changes to the order details below.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Customer Name</Label>
            <Input
              id="edit-name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              data-testid="input-edit-customer-name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-phone">Phone Number</Label>
            <Input
              id="edit-phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              data-testid="input-edit-phone"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-medicine">Medicine Details</Label>
            <Textarea
              id="edit-medicine"
              value={medicine}
              onChange={(e) => setMedicine(e.target.value)}
              className="min-h-24 resize-none"
              data-testid="input-edit-medicine"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} data-testid="button-edit-cancel">
            Cancel
          </Button>
          <Button onClick={handleSave} data-testid="button-edit-save">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function OrdersPage() {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [editOrder, setEditOrder] = useState<Order | null>(null);
  const [deleteOrder, setDeleteOrder] = useState<Order | null>(null);
  const limit = 9;

  // Debounce search
  useMemo(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading, error } = useQuery<OrdersResponse>({
    queryKey: ["/api/orders", { search: debouncedSearch, page, limit }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (debouncedSearch) params.set("search", debouncedSearch);
      params.set("page", String(page));
      params.set("limit", String(limit));
      const res = await fetch(`/api/orders?${params}`);
      if (!res.ok) throw new Error("Failed to fetch orders");
      return res.json();
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Order> }) => {
      const response = await apiRequest("PATCH", `/api/orders/${id}`, updates);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/orders"] });
      toast({ title: "Order updated successfully" });
      setEditOrder(null);
    },
    onError: () => {
      toast({ title: "Failed to update order", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/orders/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/orders"] });
      toast({ title: "Order deleted successfully" });
      setDeleteOrder(null);
    },
    onError: () => {
      toast({ title: "Failed to delete order", variant: "destructive" });
    },
  });

  const handleStatusChange = (id: string, status: string) => {
    updateMutation.mutate({ id, updates: { status } });
  };

  const handleEditSave = (id: string, data: { customerName: string; phone: string; medicine: string }) => {
    updateMutation.mutate({ id, updates: data });
  };

  const handleDeleteConfirm = () => {
    if (deleteOrder) {
      deleteMutation.mutate(deleteOrder.id);
    }
  };

  const exportToCSV = () => {
    if (!data?.orders.length) return;
    
    const headers = ["Order ID", "Customer Name", "Phone", "Medicine", "Status", "Created At"];
    const rows = data.orders.map(order => [
      order.id,
      order.customerName,
      order.phone,
      `"${order.medicine.replace(/"/g, '""')}"`,
      order.status,
      new Date(order.createdAt).toLocaleString(),
    ]);
    
    const csv = [headers.join(","), ...rows.map(row => row.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `orders-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({ title: "Orders exported to CSV" });
  };

  const totalPages = data ? Math.ceil(data.total / limit) : 0;

  return (
    <div className="min-h-[calc(100vh-4rem)] py-12 px-6 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2 mb-4" data-testid="link-back-home">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold mb-2">Order History</h1>
              <p className="text-muted-foreground">
                View and manage all your submitted medicine orders.
              </p>
            </div>
            {data && data.total > 0 && (
              <Badge variant="secondary" className="self-start text-base px-4 py-1.5" data-testid="badge-order-count">
                {data.total} {data.total === 1 ? "Order" : "Orders"}
              </Badge>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, phone, or medicine..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
              data-testid="input-search"
            />
          </div>
          <Button 
            variant="outline" 
            onClick={exportToCSV} 
            disabled={!data?.orders.length}
            className="gap-2"
            data-testid="button-export-csv"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>

        {isLoading ? (
          <OrdersSkeleton />
        ) : error ? (
          <Card className="max-w-md mx-auto">
            <CardContent className="py-12 px-8 text-center">
              <p className="text-destructive mb-4">Failed to load orders. Please try again.</p>
              <Button variant="outline" onClick={() => window.location.reload()} data-testid="button-retry">
                Retry
              </Button>
            </CardContent>
          </Card>
        ) : data && data.orders.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="grid-orders">
              {data.orders.map((order) => (
                <OrderCard 
                  key={order.id} 
                  order={order} 
                  onEdit={setEditOrder}
                  onDelete={setDeleteOrder}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  data-testid="button-prev-page"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground" data-testid="text-pagination">
                  Page {page} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  data-testid="button-next-page"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <EmptyState search={debouncedSearch} />
        )}

        <EditOrderDialog
          order={editOrder}
          open={!!editOrder}
          onOpenChange={(open) => !open && setEditOrder(null)}
          onSave={handleEditSave}
        />

        <AlertDialog open={!!deleteOrder} onOpenChange={(open) => !open && setDeleteOrder(null)}>
          <AlertDialogContent data-testid="dialog-delete-order">
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Order</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this order? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel data-testid="button-delete-cancel">Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleDeleteConfirm}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                data-testid="button-delete-confirm"
              >
                {deleteMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Delete"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
