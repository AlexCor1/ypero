import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { stripe } from '$lib/stripe';
import { supabaseAdmin } from '$lib/supabase-admin';
import { STRIPE_WEBHOOK_SECRET } from '$env/static/private';

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.text();
	const signature = request.headers.get('stripe-signature');

	if (!signature) {
		throw error(400, 'Missing stripe-signature header');
	}

	let event;

	try {
		event = stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET);
	} catch (err) {
		console.error('Webhook signature verification failed:', err);
		throw error(400, 'Invalid signature');
	}

	// Handle successful one-time payment
	if (event.type === 'checkout.session.completed') {
		const session = event.data.object;

		const userId = session.metadata?.user_id;
		if (!userId) {
			console.error('No user_id in session metadata');
			throw error(400, 'Missing user_id metadata');
		}

		// Update user record: mark as paid
		const { error: dbError } = await supabaseAdmin
			.from('users')
			.update({
				has_paid: true,
				stripe_customer_id: session.customer as string,
				stripe_payment_id: session.payment_intent as string,
				paid_at: new Date().toISOString()
			})
			.eq('id', userId);

		if (dbError) {
			console.error('Supabase update error:', dbError);
			throw error(500, 'Failed to update user payment status');
		}

		console.log(`✅ Payment confirmed for user ${userId}`);
	}

	return json({ received: true });
};
