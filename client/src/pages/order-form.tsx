import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { insertOrderSchema, type InsertOrder } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { User, Phone, Pill, CheckCircle2, Loader2, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

export default function OrderFormPage() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [showSuccess, setShowSuccess] = useState(false);

  const form = useForm<InsertOrder>({
    resolver: zodResolver(insertOrderSchema),
    defaultValues: {
      customerName: "",
      phone: "",
      medicine: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertOrder) => {
      const response = await apiRequest("POST", "/api/orders", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/orders"] });
      setShowSuccess(true);
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit order. Please try again.",
        variant: "destructive",
      });
    },
  });

  function onSubmit(data: InsertOrder) {
    mutation.mutate(data);
  }

  if (showSuccess) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-6">
        <Card className="w-full max-w-md text-center" data-testid="card-success">
          <CardContent className="pt-12 pb-8 px-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto mb-6">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold mb-3">Order Submitted!</h2>
            <p className="text-muted-foreground mb-8">
              Your medicine order has been received. We'll process it shortly and contact you for confirmation.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={() => setShowSuccess(false)} data-testid="button-new-order">
                Place Another Order
              </Button>
              <Link href="/orders">
                <Button variant="outline" className="w-full" data-testid="button-view-orders-success">
                  View All Orders
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] py-12 px-6 md:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2 mb-4" data-testid="link-back-home">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl md:text-4xl font-semibold mb-2">Order Medicine</h1>
          <p className="text-muted-foreground">
            Fill out the form below to submit your medicine order. We'll contact you to confirm.
          </p>
        </div>

        <Card data-testid="card-order-form">
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
            <CardDescription>
              Please provide your contact information and the medicines you need.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="customerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        Customer Name <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your full name"
                          {...field}
                          data-testid="input-customer-name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        Phone Number <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your phone number"
                          type="tel"
                          {...field}
                          data-testid="input-phone"
                        />
                      </FormControl>
                      <FormDescription>
                        We'll use this number to confirm your order.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="medicine"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Pill className="h-4 w-4 text-muted-foreground" />
                        Medicine Details <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="List the medicines you need (name, dosage, quantity)"
                          className="min-h-32 resize-none"
                          {...field}
                          data-testid="input-medicine"
                        />
                      </FormControl>
                      <FormDescription>
                        Include medicine names, dosages, and quantities needed.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full sm:w-auto"
                    disabled={mutation.isPending}
                    data-testid="button-submit-order"
                  >
                    {mutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Order"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
