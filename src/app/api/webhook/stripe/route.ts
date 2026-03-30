import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  const body = await req.text();
  const sig = (await headers()).get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) {
      console.error('Webhook Error: Missing signature or webhook secret');
      return NextResponse.json({ error: 'Missing information' }, { status: 400 });
    }

    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      console.log(`Paiement réussi pour la session: ${session.id}`);
      // TODO: Mettre à jour la base de données de Vera ici
      // ex: users.update({ stripeId: session.customer, plan: 'CORE' })
      break;
    
    case 'invoice.payment_succeeded':
      const invoice = event.data.object as Stripe.Invoice;
      console.log(`Facture payée: ${invoice.id}`);
      break;

    case 'customer.subscription.deleted':
      console.log('Abonnement annulé');
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
