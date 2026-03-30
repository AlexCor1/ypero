import { writable, derived } from 'svelte/store';
import { supabase } from '$lib/supabase';
import type { Session, User as AuthUser } from '@supabase/supabase-js';
import type { User } from '$lib/types';

// Raw Supabase auth state
export const session = writable<Session | null>(null);
export const authUser = writable<AuthUser | null>(null);

// True once the initial session check has completed
export const authReady = writable(false);

// Public profile from our users table (has_paid, stripe info, etc.)
export const profile = writable<User | null>(null);

// Derived convenience booleans
export const isLoggedIn = derived(session, ($s) => !!$s);
export const isValidated = derived(profile, ($p) => !!$p?.has_paid);

/**
 * Fetch the user's profile row from public.users.
 * Called after login and after payment confirmation.
 */
export async function fetchProfile(userId: string): Promise<User | null> {
	const { data, error } = await supabase
		.from('users')
		.select('*')
		.eq('id', userId)
		.single();

	if (error) {
		console.error('fetchProfile error:', error);
		profile.set(null);
		return null;
	}

	profile.set(data as User);
	return data as User;
}

/**
 * Initialize auth listener. Call once in the root layout.
 * Subscribes to Supabase auth state changes and syncs stores.
 */
export function initAuth() {
	// Get initial session
	supabase.auth.getSession().then(({ data: { session: s } }) => {
		session.set(s);
		authUser.set(s?.user ?? null);
		if (s?.user) {
			fetchProfile(s.user.id).finally(() => authReady.set(true));
		} else {
			authReady.set(true);
		}
	});

	// Listen for changes (login, logout, token refresh)
	const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
		session.set(s);
		authUser.set(s?.user ?? null);
		if (s?.user) {
			fetchProfile(s.user.id);
		} else {
			profile.set(null);
		}
	});

	return () => {
		subscription.unsubscribe();
	};
}

/**
 * Sign out and clear all stores.
 */
export async function signOut() {
	await supabase.auth.signOut();
	session.set(null);
	authUser.set(null);
	profile.set(null);
}
