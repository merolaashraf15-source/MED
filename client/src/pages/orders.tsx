import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { type Order } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, ClipboardList, User, Phone, Pill, Clock, Package } from "lucide-react";

function OrderCard({ order }: { order: Order }) {
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
          <Badge className={`${statusColors[order.status] || statusColors.pending} capitalize`} data-testid={`badge-status-${order.id}`}>
            {order.status}
          </Badge>
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

function EmptyState() {
  return (
    <Card className="max-w-md mx-auto" data-testid="card-empty-state">
      <CardContent className="py-16 px-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mx-auto mb-6">
          <ClipboardList className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No Orders Yet</h3>
        <p className="text-muted-foreground mb-8">
          You haven't placed any orders yet. Start by submitting your first medicine order.
        </p>
        <Link href="/order">
          <Button data-testid="button-empty-place-order">Place Your First Order</Button>
        </Link>
      </CardContent>
    </Card>
  );
}

export default function OrdersPage() {
  const { data: orders, isLoading, error } = useQuery<Order[]>({
    queryKey: ["/api/orders"],
  });

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
                View and track all your submitted medicine orders.
              </p>
            </div>
            {orders && orders.length > 0 && (
              <Badge variant="secondary" className="self-start text-base px-4 py-1.5" data-testid="badge-order-count">
                {orders.length} {orders.length === 1 ? "Order" : "Orders"}
              </Badge>
            )}
          </div>
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
        ) : orders && orders.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="grid-orders">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}
