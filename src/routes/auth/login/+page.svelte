<script lang="ts">
	import { supabase } from '$lib/supabase';
	import { goto } from '$app/navigation';
	import { isLoggedIn, authReady, fetchProfile } from '$lib/stores/auth';

	// Redirect logged-in users to profile
	$effect(() => {
		if ($authReady && $isLoggedIn) goto('/profile');
	});

	let email = $state('');
	let password = $state('');
	let loading = $state(false);
	let error = $state('');

	async function handleLogin() {
		loading = true;
		error = '';

		const { data, error: authError } = await supabase.auth.signInWithPassword({
			email,
			password
		});

		if (authError) {
			error = authError.message;
			loading = false;
			return;
		}

		// Fetch profile to check payment status
		if (data.user) {
			const profile = await fetchProfile(data.user.id);

			if (profile?.has_paid) {
				goto('/profile');
			} else {
				goto('/pricing');
			}
		} else {
			goto('/profile');
		}

		loading = false;
	}
</script>

<svelte:head>
	<title>Login | Ypero</title>
</svelte:head>

<section class="min-h-[80vh] flex items-center justify-center px-6">
	<div class="w-full max-w-sm">
		<h1 class="font-headline text-3xl font-bold text-center mb-2">Welcome Back</h1>
		<p class="text-center text-on-surface-variant text-sm mb-8">
			Sign in to access your bot dashboard.
		</p>

		{#if error}
			<div class="bg-error-container/30 text-on-error-container text-sm rounded-lg p-3 mb-4">
				{error}
			</div>
		{/if}

		<div class="space-y-4">
			<div>
				<label for="login-email" class="text-xs uppercase tracking-widest text-on-surface-variant font-label block mb-2">
					Email
				</label>
				<input
					id="login-email"
					type="email"
					bind:value={email}
					placeholder="you@example.com"
					class="w-full bg-surface-container-highest rounded-lg px-4 py-3 text-sm text-on-surface outline-none focus:bg-surface-bright transition-colors placeholder:text-outline"
				/>
			</div>

			<div>
				<label for="login-password" class="text-xs uppercase tracking-widest text-on-surface-variant font-label block mb-2">
					Password
				</label>
				<input
					id="login-password"
					type="password"
					bind:value={password}
					placeholder="••••••••"
					class="w-full bg-surface-container-highest rounded-lg px-4 py-3 text-sm text-on-surface outline-none focus:bg-surface-bright transition-colors placeholder:text-outline"
				/>
			</div>

			<button
				onclick={handleLogin}
				disabled={loading}
				class="w-full bg-primary text-on-primary py-3 rounded-xl font-bold active:scale-[0.98] transition-all disabled:opacity-50 mt-2"
			>
				{loading ? 'Signing in...' : 'Sign In'}
			</button>
		</div>

		<p class="text-center text-sm text-on-surface-variant mt-6">
			Don't have an account?
			<a href="/auth/register" class="text-primary font-semibold hover:underline">Sign up</a>
		</p>
	</div>
</section>
