
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, PartyPopper } from 'lucide-react';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";


export default function CheckoutSuccessPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container py-16 flex items-center justify-center">
        <Card className="w-full max-w-lg text-center shadow-xl">
          <CardHeader>
            <div className="mx-auto bg-green-100 p-4 rounded-full w-fit dark:bg-green-900/50">
              <PartyPopper className="h-12 w-12 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-3xl mt-4">Payment Successful!</CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              Thank you for subscribing to Healthsyntra!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-secondary/50 rounded-md text-left text-sm">
                <p className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Your payment has been processed and your new plan is being activated.</span>
                </p>
                <p className="mt-3 text-muted-foreground">
                    You can now access all the features of your new plan. It might take a moment for all changes to apply.
                </p>
            </div>
            <div className="p-4 bg-blue-100/60 dark:bg-blue-900/30 rounded-md text-left text-sm border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-blue-800 dark:text-blue-300">Developer Note:</h4>
                <p className="mt-1 text-blue-700 dark:text-blue-400">
                    In a production application, this is where a Stripe Webhook would confirm the payment asynchronously and update the user's subscription in the database. Since webhook implementation is beyond the scope of this prototype, we've simulated the successful state.
                </p>
            </div>
            <Button asChild size="lg" className="w-full">
              <Link href="/dashboard">Go to Your Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
