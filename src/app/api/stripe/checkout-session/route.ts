
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeSecretKey) {
    console.error("Stripe secret key is not set. Please add STRIPE_SECRET_KEY to your .env file.");
    return NextResponse.json({ error: 'Server configuration error: Stripe secret key is not set.' }, { status: 500 });
  }

  const stripe = new Stripe(stripeSecretKey);

  try {
    const { plan, userEmail } = await req.json();

    if (!plan || !userEmail || !plan.name || !plan.price) {
      return NextResponse.json({ error: 'Missing plan information or user email.' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: userEmail,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${plan.name} Plan`,
              description: `Monthly subscription to the Healthsyntra ${plan.name} plan.`,
            },
            unit_amount: Math.round(plan.price * 100), // Price in cents, rounded to avoid floating point issues
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${req.nextUrl.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/checkout/cancel`,
    });

    return NextResponse.json({ sessionId: session.id });

  } catch (error) {
    console.error('Stripe session creation error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: `Stripe Error: ${errorMessage}` }, { status: 500 });
  }
}
