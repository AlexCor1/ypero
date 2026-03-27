<script lang="ts">
	import { supabase } from '$lib/supabase';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { isLoggedIn, authReady } from '$lib/stores/auth';

	// Redirect already-authenticated users to profile (but not during OTP step)
	onMount(() => {
		const unsub = authReady.subscribe((ready) => {
			if (!ready) return;
			const loggedInUnsub = isLoggedIn.subscribe((loggedIn) => {
				if (loggedIn && step === 'signup') goto('/profile');
			});
			return loggedInUnsub;
		});
		return unsub;
	});

	// Steps: 'signup' → 'verify'
	let step = $state<'signup' | 'verify'>('signup');
	let email = $state('');
	let password = $state('');
	let confirmPassword = $state('');
	let otpCode = $state('');
	let loading = $state(false);
	let error = $state('');
	let resendCooldown = $state(0);

	async function handleSignup() {
		loading = true;
		error = '';

		if (password !== confirmPassword) {
			error = 'Passwords do not match.';
			loading = false;
			return;
		}

		if (password.length < 6) {
			error = 'Password must be at least 6 characters.';
			loading = false;
			return;
		}

		const { error: authError } = await supabase.auth.signUp({
			email,
			password
		});

		if (authError) {
			error = authError.message;
		} else {
			step = 'verify';
		}

		loading = false;
	}

	async function handleVerify() {
		loading = true;
		error = '';

		const { error: verifyError } = await supabase.auth.verifyOtp({
			email,
			token: otpCode,
			type: 'signup'
		});

		if (verifyError) {
			error = verifyError.message;
		} else {
			// Email verified → redirect to pricing to purchase validation
			goto('/pricing');
		}

		loading = false;
	}

	async function handleResend() {
		if (resendCooldown > 0) return;

		const { error: resendError } = await supabase.auth.resend({
			type: 'signup',
			email
		});

		if (resendError) {
			error = resendError.message;
		} else {
			resendCooldown = 60;
			const interval = setInterval(() => {
				resendCooldown--;
				if (resendCooldown <= 0) clearInterval(interval);
			}, 1000);
		}
	}
</script>

<svelte:head>
	<title>Sign Up | Ypero</title>
</svelte:head>

<section class="min-h-[80vh] flex items-center justify-center px-6">
	<div class="w-full max-w-sm">

		{#if step === 'signup'}
			<!-- STEP 1: Email & Password -->
			<h1 class="font-headline text-3xl font-bold text-center mb-2">Create Your Account</h1>
			<p class="text-center text-on-surface-variant text-sm mb-8">
				Sign up to get started with Ypero.
			</p>

			{#if error}
				<div class="bg-error-container/30 text-on-error-container text-sm rounded-lg p-3 mb-4">
					{error}
				</div>
			{/if}

			<div class="space-y-4">
				<div>
					<label for="reg-email" class="text-xs uppercase tracking-widest text-on-surface-variant font-label block mb-2">
						Email
					</label>
					<input
						id="reg-email"
						type="email"
						bind:value={email}
						placeholder="you@example.com"
						class="w-full bg-surface-container-highest rounded-lg px-4 py-3 text-sm text-on-surface outline-none focus:bg-surface-bright transition-colors placeholder:text-outline"
					/>
				</div>

				<div>
					<label for="reg-password" class="text-xs uppercase tracking-widest text-on-surface-variant font-label block mb-2">
						Password
					</label>
					<input
						id="reg-password"
						type="password"
						bind:value={password}
						placeholder="••••••••"
						class="w-full bg-surface-container-highest rounded-lg px-4 py-3 text-sm text-on-surface outline-none focus:bg-surface-bright transition-colors placeholder:text-outline"
					/>
				</div>

				<div>
					<label for="reg-confirm" class="text-xs uppercase tracking-widest text-on-surface-variant font-label block mb-2">
						Confirm Password
					</label>
					<input
						id="reg-confirm"
						type="password"
						bind:value={confirmPassword}
						placeholder="••••••••"
						class="w-full bg-surface-container-highest rounded-lg px-4 py-3 text-sm text-on-surface outline-none focus:bg-surface-bright transition-colors placeholder:text-outline"
					/>
				</div>

				<button
					onclick={handleSignup}
					disabled={loading}
					class="w-full bg-primary text-on-primary py-3 rounded-xl font-bold active:scale-[0.98] transition-all disabled:opacity-50 mt-2"
				>
					{loading ? 'Creating account...' : 'Continue'}
				</button>
			</div>

			<p class="text-center text-sm text-on-surface-variant mt-6">
				Already have an account?
				<a href="/auth/login" class="text-primary font-semibold hover:underline">Sign in</a>
			</p>

		{:else}
			<!-- STEP 2: OTP Verification -->
			<div class="text-center mb-8">
				<div class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
					<span class="material-symbols-outlined text-primary text-3xl">mail</span>
				</div>
				<h1 class="font-headline text-3xl font-bold mb-2">Verify Your Email</h1>
				<p class="text-on-surface-variant text-sm">
					We sent a 6-digit code to
					<span class="text-on-surface font-semibold">{email}</span>
				</p>
			</div>

			{#if error}
				<div class="bg-error-container/30 text-on-error-container text-sm rounded-lg p-3 mb-4">
					{error}
				</div>
			{/if}

			<div class="space-y-4">
				<div>
					<label for="otp-code" class="text-xs uppercase tracking-widest text-on-surface-variant font-label block mb-2">
						Verification Code
					</label>
					<input
						id="otp-code"
						type="text"
						inputmode="numeric"
						maxlength="6"
						bind:value={otpCode}
						placeholder="000000"
						class="w-full bg-surface-container-highest rounded-lg px-4 py-4 text-center text-2xl font-headline font-bold tracking-[0.5em] text-on-surface outline-none focus:bg-surface-bright transition-colors placeholder:text-outline placeholder:tracking-[0.5em]"
					/>
				</div>

				<button
					onclick={handleVerify}
					disabled={loading || otpCode.length < 6}
					class="w-full bg-primary text-on-primary py-3 rounded-xl font-bold active:scale-[0.98] transition-all disabled:opacity-50"
				>
					{loading ? 'Verifying...' : 'Verify Email'}
				</button>
			</div>

			<div class="text-center mt-6">
				<p class="text-sm text-on-surface-variant">
					Didn't receive the code?
					{#if resendCooldown > 0}
						<span class="text-outline">Resend in {resendCooldown}s</span>
					{:else}
						<button onclick={handleResend} class="text-primary font-semibold hover:underline">
							Resend Code
						</button>
					{/if}
				</p>
				<button
					onclick={() => { step = 'signup'; error = ''; }}
					class="text-sm text-on-surface-variant mt-3 hover:text-on-surface transition-colors"
				>
					← Back to sign up
				</button>
			</div>
		{/if}

	</div>
</section>
