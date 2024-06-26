import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        console.log(data);

        const priceId = data.priceId;
        const title = data.title;
        const price = data.price;

        const checkoutSession: Stripe.Checkout.Session = 
        await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
              {
                price: priceId,
                quantity: 1
              }
            ],
            mode: 'payment',
            success_url: `${process.env.NEXT_BASE_URL}/billing`,
            cancel_url: `${process.env.NEXT_BASE_URL}/billing`,
            metadata: {
              title,
              price,
            }
          });
          return NextResponse.json({result: checkoutSession, ok: true});
    } catch (error) {
        console.log(error);
        return new NextResponse('Internal Sever', {status: 500})
    }
}