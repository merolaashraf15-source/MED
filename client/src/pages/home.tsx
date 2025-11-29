import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Truck, ShieldCheck, ArrowRight, Clock } from "lucide-react";

const features = [
  {
    icon: ShoppingCart,
    title: "Easy Ordering",
    description: "Simple and intuitive order form. Submit your medicine request in seconds with our streamlined process.",
  },
  {
    icon: Truck,
    title: "Quick Delivery",
    description: "Fast and reliable delivery service. Get your medicines delivered right to your doorstep.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Pharmacy",
    description: "All medicines are verified and sourced from licensed pharmacies. Your health is our priority.",
  },
];

const trustIndicators = [
  { icon: Clock, text: "Fast Delivery" },
  { icon: ShieldCheck, text: "Verified Medicines" },
  { icon: ShoppingCart, text: "Secure Orders" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <section className="relative flex-1 flex items-center py-12 md:py-20 lg:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10" />
        <div className="mx-auto max-w-6xl px-6 md:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="flex flex-col gap-6">
              <div className="inline-flex">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                  <ShieldCheck className="h-4 w-4" />
                  Trusted by thousands
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight">
                Order Your Medicines{" "}
                <span className="text-primary">Online</span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-lg">
                A simple and secure way to order medicines from the comfort of your home. 
                Fast delivery, verified products, and excellent customer service.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link href="/order">
                  <Button size="lg" className="w-full sm:w-auto gap-2" data-testid="button-order-now">
                    Order Medicine Now
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/orders">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto" data-testid="button-view-orders">
                    View Order History
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-4 text-sm text-muted-foreground">
                {trustIndicators.map((indicator, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <indicator.icon className="h-4 w-4 text-primary" />
                    <span>{indicator.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:flex justify-center">
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-primary/20 to-accent/20 blur-2xl" />
                <div className="relative flex h-80 w-80 items-center justify-center rounded-3xl bg-gradient-to-br from-primary/10 to-accent/10 border border-border">
                  <div className="flex flex-col items-center gap-4 text-center p-8">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary">
                      <ShoppingCart className="h-10 w-10 text-primary-foreground" />
                    </div>
                    <p className="text-lg font-medium">Simple Ordering</p>
                    <p className="text-sm text-muted-foreground">Fill out the form, submit, and we'll handle the rest</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted/30">
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Why Choose MedOrder?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We make ordering medicines simple, fast, and reliable. Here's what sets us apart.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover-elevate border border-card-border" data-testid={`card-feature-${index}`}>
                <CardContent className="p-6 md:p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-6">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          <Card className="bg-primary text-primary-foreground border-primary-border overflow-visible">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">Ready to Order?</h2>
              <p className="mb-8 opacity-90 max-w-xl mx-auto">
                Start your order now and experience the convenience of online medicine ordering.
              </p>
              <Link href="/order">
                <Button size="lg" variant="secondary" className="gap-2" data-testid="button-cta-order">
                  Place Your Order
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>MedOrder - Your trusted online pharmacy</p>
            <p>Secure ordering for your convenience</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
