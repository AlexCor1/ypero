import Stripe from 'stripe';
import { STRIPE_SECRET_KEY } from '$env/static/private';

export const stripe = new Stripe(STRIPE_SECRET_KEY, {
	apiVersion: '2025-02-24.acacia'
});

// One-time payment product config
export const PRODUCT = {
	name: 'Ypero — Lifetime Access',
	price: 4495, // $44.95 in cents (10% off $49.95)
	currency: 'usd'
} as const;
