// ============================================
// Database types (mirrors Supabase schema)
// ============================================

export interface User {
	id: string;
	email: string;
	created_at: string;
	has_paid: boolean;
	stripe_customer_id: string | null;
	stripe_payment_id: string | null;
	paid_at: string | null;
}

export interface ContactMessage {
	id: string;
	name: string;
	email: string;
	message: string;
	created_at: string;
}

// ============================================
// Simulator types
// ============================================

export interface SimulatorParams {
	betSize: number;
}

export interface SimulatorResult {
	weeklyEarnings: number[];
	dailyData: number[];
	monthlyProjection: number;
	yearlyProjection: number;
	dailyAverage: number;
	peakExpectancy: number;
}

// ============================================
// Navigation
// ============================================

export interface NavLink {
	label: string;
	href: string;
}

export const NAV_LINKS: NavLink[] = [
	{ label: 'Home', href: '/' },
	{ label: 'Pricing', href: '/pricing' },
	{ label: 'Simulator', href: '/simulator' },
	{ label: 'About & Contact', href: '/about' },
];
