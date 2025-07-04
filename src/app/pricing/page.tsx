
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Check, Star, Zap, UserCheck, Loader2 } from 'lucide-react';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { getStripe } from '@/lib/stripe';


const plans = {
  standard: { name: 'Standard', price: 9.99, id: 'standard' },
  premium: { name: 'Premium', price: 19.99, id: 'premium' },
};

const tierFeatures = {
  free: [
    "1 AI Symptom Analysis per month",
    "View immediate results",
    "Community support",
  ],
  standard: [
    "15 AI Symptom Analyses per month",
    "Save and track your health history",
    "Schedule follow-up appointments",
    "Generate AI Health Summaries",
    "Email support",
  ],
  premium: [
    "Unlimited AI Symptom Analyses",
    "All Standard plan features",
    "Priority AI processing queue",
    "Advanced health trend insights (coming soon)",
    "Priority chat & email support",
  ],
};


export default function PricingPage() {
  const { isAuthenticated, currentUser, userProfile } = useAuth();
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  
  const handleSelectPlan = async (plan: { id: string; name: string; price: number }) => {
    if (!isAuthenticated || !currentUser) {
      toast({
        variant: "destructive",
        title: "Please Sign In",
        description: "You need to be logged in to select a plan.",
      });
      return;
    }
    
    setIsUpdating(plan.id);

    try {
      const response = await fetch('/api/stripe/checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan, userEmail: currentUser.email }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to create checkout session.');
      }

      const { sessionId } = responseData;
      const stripe = await getStripe();

      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          throw new Error(error.message);
        }
      } else {
        throw new Error('Stripe.js has not loaded yet.');
      }
      
    } catch (error) {
       console.error("Stripe checkout error:", error);
       toast({
        variant: 'destructive',
        title: "Checkout Failed",
        description: error instanceof Error ? error.message : "Could not initiate the checkout process. Please try again.",
      });
    } finally {
      setIsUpdating(null);
    }
  }

  const getButtonContent = (planId: 'free' | 'standard' | 'premium') => {
    const isCurrentPlan = userProfile?.subscriptionPlan === planId;
    const isLoading = isUpdating === planId;

    if (!isAuthenticated) {
      if (planId === 'free') {
        return <Link href="/register">Get Started</Link>;
      }
      // For guests, we prompt them to sign up, which will be handled by the click handler.
      // Or we could redirect them to login/register first. For now, the handler does it.
      return 'Choose Plan';
    }

    if (isLoading) {
      return (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Redirecting...
        </>
      );
    }

    if (isCurrentPlan) {
      return 'Current Plan';
    }
    
    if (planId === 'free') {
       if (userProfile?.subscriptionPlan !== 'free') {
         // In a real app, this would trigger a downgrade flow.
         return "Downgrade";
       }
       return <Link href="/dashboard">Go to Dashboard</Link>;
    }
    
    return 'Upgrade Now';
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Find the Perfect Plan for Your Health Journey
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-12">
                Whether you're just starting or want to dive deep into your health insights, we have a plan that fits your needs.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {/* Free Tier */}
              <Card className="flex flex-col shadow-md">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-2xl font-bold">Free</CardTitle>
                    <UserCheck className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <CardDescription>For casual users getting started with health tracking.</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                  <div className="text-4xl font-extrabold mb-4">
                    $0<span className="text-xl font-medium text-muted-foreground">/month</span>
                  </div>
                  <ul className="space-y-3">
                    {tierFeatures.free.map(feature => (
                      <li key={feature} className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                   <Button asChild={isAuthenticated && userProfile?.subscriptionPlan !== 'free'} size="lg" className="w-full" variant="outline" disabled={!isAuthenticated || userProfile?.subscriptionPlan === 'free'}>
                      {getButtonContent('free')}
                  </Button>
                </CardFooter>
              </Card>

              {/* Standard Tier */}
              <Card className="flex flex-col shadow-lg border-2 border-primary relative ring-4 ring-primary/20">
                 <div className="absolute top-0 -translate-y-1/2 w-full flex justify-center">
                    <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                </div>
                <CardHeader className="pb-4">
                   <div className="flex justify-between items-center">
                    <CardTitle className="text-2xl font-bold">Standard</CardTitle>
                    <Zap className="h-8 w-8 text-primary" />
                  </div>
                  <CardDescription>For proactive individuals who want to track their health.</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                  <div className="text-4xl font-extrabold mb-4">
                    ${plans.standard.price}<span className="text-xl font-medium text-muted-foreground">/month</span>
                  </div>
                   <ul className="space-y-3">
                    {tierFeatures.standard.map(feature => (
                      <li key={feature} className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                   <Button size="lg" className="w-full" onClick={() => handleSelectPlan(plans.standard)} disabled={isUpdating !== null || userProfile?.subscriptionPlan === 'standard'}>
                     {getButtonContent('standard')}
                   </Button>
                </CardFooter>
              </Card>

              {/* Premium Tier */}
              <Card className="flex flex-col shadow-md">
                <CardHeader className="pb-4">
                   <div className="flex justify-between items-center">
                    <CardTitle className="text-2xl font-bold">Premium</CardTitle>
                    <Star className="h-8 w-8 text-yellow-500" />
                  </div>
                  <CardDescription>For users who want unlimited access and priority support.</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                  <div className="text-4xl font-extrabold mb-4">
                    ${plans.premium.price}<span className="text-xl font-medium text-muted-foreground">/month</span>
                  </div>
                   <ul className="space-y-3">
                    {tierFeatures.premium.map(feature => (
                      <li key={feature} className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                   <Button size="lg" className="w-full" variant="outline" onClick={() => handleSelectPlan(plans.premium)} disabled={isUpdating !== null || userProfile?.subscriptionPlan === 'premium'}>
                      {getButtonContent('premium')}
                   </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="text-center mt-16">
                 <p className="text-sm text-muted-foreground">
                    All plans are billed monthly. You can cancel anytime.
                </p>
                 {!isAuthenticated && 
                    <p className="text-sm text-muted-foreground mt-1">
                        Already have an account? <Link href="/login" className="underline hover:text-primary">Login here</Link>.
                    </p>
                 }
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
