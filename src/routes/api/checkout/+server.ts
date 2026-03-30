import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { stripe, PRODUCT } from '$lib/stripe';

export const POST: RequestHandler = async ({ request, url }) => {
	const body = await request.json();
	const { userId, email } = body;

	if (!userId || !email) {
		throw error(400, 'Missing userId or email');
	}

	try {
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			customer_email: email,
			metadata: {
				user_id: userId
			},
			line_items: [
				{
					price_data: {
						currency: PRODUCT.currency,
						product_data: {
							name: PRODUCT.name,
							description: 'One-time payment for lifetime bot access'
						},
						unit_amount: PRODUCT.price
					},
					quantity: 1
				}
			],
			mode: 'payment',
			success_url: `${url.origin}/pricing?success=true`,
			cancel_url: `${url.origin}/pricing?canceled=true`
		});

		return json({ sessionId: session.id, url: session.url });
	} catch (err) {
		console.error('Stripe checkout error:', err);
		throw error(500, 'Failed to create checkout session');
	}
};
