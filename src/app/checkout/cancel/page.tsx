
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { XCircle, ShoppingCart } from 'lucide-react';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";


export default function CheckoutCancelPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container py-16 flex items-center justify-center">
        <Card className="w-full max-w-lg text-center shadow-xl">
          <CardHeader>
            <div className="mx-auto bg-red-100 p-4 rounded-full w-fit dark:bg-red-900/50">
              <XCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
            </div>
            <CardTitle className="text-3xl mt-4">Payment Canceled</CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              Your checkout process was canceled.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              It looks like you didn't complete the payment process. Your subscription has not been changed. You can return to the pricing page to try again whenever you're ready.
            </p>
            <div className="flex gap-4 justify-center">
                <Button asChild size="lg" className="flex-1">
                  <Link href="/pricing">View Pricing Plans</Link>
                </Button>
                 <Button asChild size="lg" variant="outline" className="flex-1">
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
