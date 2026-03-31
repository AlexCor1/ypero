<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { isLoggedIn, isValidated, authUser } from '$lib/stores/auth';
	import { reveal } from '$lib/actions/reveal';

	let loading = $state(false);
	let error = $state('');
	let videoZoomed = $state(false);

	let paymentSuccess = $derived(page.url.searchParams.get('success') === 'true');
	let paymentCanceled = $derived(page.url.searchParams.get('canceled') === 'true');

	async function handlePurchase() {
		if (!$isLoggedIn || !$authUser) {
			goto('/auth/register');
			return;
		}
		if ($isValidated) return;

		loading = true;
		error = '';

		try {
			const res = await fetch('/api/checkout', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					userId: $authUser.id,
					email: $authUser.email
				})
			});

			if (!res.ok) {
				const data = await res.json();
				throw new Error(data.message || 'Failed to create checkout session');
			}

			const { url } = await res.json();
			if (url) {
				window.location.href = url;
			} else {
				throw new Error('No checkout URL returned');
			}
		} catch (err: any) {
			error = err.message || 'Something went wrong. Please try again.';
		} finally {
			loading = false;
		}
	}
</script>

<svelte:window onkeydown={(e) => { if (e.key === 'Escape') videoZoomed = false; }} />

<svelte:head>
	<title>Pricing | Ypero</title>
</svelte:head>

<!-- HERO: Centered, price-dominant -->
<section class="relative overflow-hidden">
	<div class="float-orb float-orb-green w-[350px] h-[350px] -top-16 left-1/2 -translate-x-1/2 opacity-40"></div>

	<div class="max-w-3xl mx-auto px-6 pt-12 pb-6 text-center relative">

		<!-- Banners -->
		{#if paymentSuccess || $isValidated}
			<div class="max-w-md mx-auto mb-6 bg-primary/10 rounded-xl p-4 flex items-center gap-3">
				<span class="material-symbols-outlined text-primary text-2xl">check_circle</span>
				<div class="text-left">
					<p class="font-headline font-bold text-sm">Account Validated</p>
					<p class="text-xs text-on-surface-variant">
						{#if paymentSuccess}
							Head to <a href="/profile" class="text-primary font-semibold hover:underline">your profile</a> to download the app.
						{:else}
							You already have lifetime access.
						{/if}
					</p>
				</div>
			</div>
		{/if}

		{#if paymentCanceled}
			<div class="max-w-md mx-auto mb-6 bg-error/10 rounded-xl p-4 flex items-center gap-3">
				<span class="material-symbols-outlined text-error text-2xl">cancel</span>
				<p class="text-left text-xs text-on-surface-variant">Payment canceled. No charge was made.</p>
			</div>
		{/if}

		{#if error}
			<div class="max-w-md mx-auto mb-6 bg-error-container/30 text-on-error-container text-sm rounded-lg p-3">{error}</div>
		{/if}

		<!-- Price as the hero -->
		<p class="text-xs uppercase tracking-[0.3em] text-on-surface-variant font-label">Lifetime Access</p>
		<p class="font-headline text-7xl md:text-8xl font-bold mt-2 tracking-tight">$49<span class="text-primary">.95</span></p>
		<p class="text-on-surface-variant mt-2 text-base">One payment. No subscription. You keep 100% of your profits.</p>

		<!-- CTA -->
		<div class="mt-6">
			{#if $isValidated}
				<a
					href="/profile"
					class="inline-flex items-center gap-2 bg-surface-container-highest text-primary px-10 py-3.5 rounded-xl font-bold text-lg"
				>
					<span class="material-symbols-outlined">verified</span>
					Go to Profile
				</a>
			{:else}
				<button
					onclick={handlePurchase}
					disabled={loading}
					class="bg-primary text-on-primary px-10 py-3.5 rounded-xl font-bold active:scale-[0.98] transition-all text-lg disabled:opacity-50 hover:shadow-[0_0_30px_rgba(52,254,160,0.3)]"
				>
					{#if loading}
						<span class="flex items-center gap-2">
							<span class="material-symbols-outlined animate-spin text-lg">progress_activity</span>
							Redirecting...
						</span>
					{:else if !$isLoggedIn}
						Get Started — $49.95
					{:else}
						Validate Account — $49.95
					{/if}
				</button>
			{/if}
		</div>

		<!-- Trust row -->
		<div class="flex items-center justify-center gap-5 mt-4 text-xs text-on-surface-variant flex-wrap">
			<span class="flex items-center gap-1">
				<span class="material-symbols-outlined text-sm text-primary">lock</span>
				Secure Checkout
			</span>
			<span class="flex items-center gap-1">
				<span class="material-symbols-outlined text-sm">credit_card</span>
				Visa, Mastercard, Amex
			</span>
			<span class="flex items-center gap-1">
				<span class="material-symbols-outlined text-sm">block</span>
				No Subscription
			</span>
		</div>
	</div>

	<!-- Video -->
	<div class="max-w-2xl mx-auto px-6 pb-10">
		<div class="relative mt-6">
			<div class="absolute -inset-3 rounded-2xl pointer-events-none" style="background: radial-gradient(ellipse at 50% 50%, rgba(52,254,160,0.04) 0%, transparent 60%);"></div>
			<div
				class="relative rounded-xl overflow-hidden ghost-border cursor-pointer"
				style="box-shadow: 0 6px 30px rgba(0,0,0,0.35);"
				onclick={() => (videoZoomed = true)}
				role="button"
				tabindex="0"
				onkeydown={(e) => { if (e.key === 'Enter') videoZoomed = true; }}
			>
				<video autoplay loop muted playsinline class="w-full h-auto block">
					<source src="/showcase.mp4" type="video/mp4" />
				</video>
				<div class="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/20">
					<span class="material-symbols-outlined text-white text-3xl">fullscreen</span>
				</div>
			</div>
			<p class="text-center text-xs text-on-surface-variant mt-3 flex items-center justify-center gap-1.5">
				<span class="material-symbols-outlined text-sm text-primary">play_circle</span>
				Click to expand - Live Bot Demo
			</p>
		</div>
	</div>
</section>

<!-- Fullscreen video overlay -->
{#if videoZoomed}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm cursor-pointer"
		onclick={() => (videoZoomed = false)}
		style="animation: fade-in 0.2s ease-out;"
	>
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="relative w-[90vw] max-w-5xl" onclick={(e) => e.stopPropagation()} role="dialog">
			<button
				onclick={() => (videoZoomed = false)}
				class="absolute -top-10 right-0 text-on-surface-variant hover:text-white transition-colors"
			>
				<span class="material-symbols-outlined text-2xl">close</span>
			</button>
			<div class="rounded-xl overflow-hidden" style="box-shadow: 0 0 60px rgba(52,254,160,0.06);">
				<video autoplay loop muted playsinline class="w-full h-auto block">
					<source src="/showcase.mp4" type="video/mp4" />
				</video>
			</div>
		</div>
	</div>
{/if}

<!-- Compact stats bar -->
<section class="py-5" style="border-top: 1px solid rgba(72,72,71,0.1); border-bottom: 1px solid rgba(72,72,71,0.1);">
	<div class="max-w-3xl mx-auto px-6">
		<div class="flex items-center justify-between gap-4 flex-wrap" use:reveal>
			{#each [
				{ value: '85%', label: 'Win Rate' },
				{ value: '15m', label: 'Trade Cycles' },
				{ value: '96/day', label: 'Opportunities' },
				{ value: '100%', label: 'Self-Custodial' },
			] as stat}
				<div class="text-center flex-1 min-w-[70px] reveal">
					<p class="font-headline text-xl md:text-2xl font-bold text-primary">{stat.value}</p>
					<p class="text-[10px] md:text-xs text-on-surface-variant uppercase tracking-widest mt-0.5">{stat.label}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- What you get -->
<section class="py-14">
	<div class="max-w-5xl mx-auto px-6">
		<p class="text-xs uppercase tracking-[0.3em] text-primary font-label text-center mb-3">Included</p>
		<h2 class="font-headline text-2xl md:text-3xl font-bold text-center mb-8">Everything you need</h2>

		<div class="grid grid-cols-2 md:grid-cols-3 gap-4 reveal-stagger" use:reveal>
			{#each [
				{ icon: 'download', title: 'Desktop App', desc: 'Windows, Linux & macOS' },
				{ icon: 'update', title: 'Lifetime Updates', desc: 'Every version, free forever' },
				{ icon: 'key', title: 'Self-Custodial', desc: 'Your keys stay on your machine' },
				{ icon: 'speed', title: '15m Engine', desc: '85% historical win rate' },
				{ icon: 'notifications_active', title: 'Alerts', desc: 'Telegram trade notifications' },
				{ icon: 'support_agent', title: 'Support', desc: 'Discord dev team access' },
			] as item}
				<div class="glass-card rounded-xl p-4 card-hover reveal">
					<span class="material-symbols-outlined text-primary text-xl mb-2">{item.icon}</span>
					<p class="text-sm font-semibold">{item.title}</p>
					<p class="text-xs text-on-surface-variant mt-0.5">{item.desc}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- How it works -->
<section class="bg-surface-container-low py-14">
	<div class="max-w-4xl mx-auto px-6">
		<p class="text-xs uppercase tracking-[0.3em] text-primary font-label text-center mb-3">How it works</p>
		<h2 class="font-headline text-2xl md:text-3xl font-bold text-center mb-10">Trading in 3 steps</h2>

		<div class="grid md:grid-cols-3 gap-8 reveal-stagger" use:reveal>
			{#each [
				{ step: '01', icon: 'person_add', title: 'Create & Validate', desc: 'Sign up, verify your email, and complete the one-time payment.' },
				{ step: '02', icon: 'settings', title: 'Configure & Connect', desc: 'Download the bot, enter your Polymarket API keys, set your bet size.' },
				{ step: '03', icon: 'rocket_launch', title: 'Launch & Profit', desc: 'Hit start. The bot trades every 15 minutes, 24/7.' },
			] as card}
				<div class="text-center reveal">
					<span class="font-headline text-4xl font-bold text-on-surface-variant/20">{card.step}</span>
					<div class="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center mx-auto mt-3 mb-3">
						<span class="material-symbols-outlined text-primary text-xl">{card.icon}</span>
					</div>
					<h3 class="font-headline font-bold text-sm mb-1.5">{card.title}</h3>
					<p class="text-xs text-on-surface-variant leading-relaxed">{card.desc}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- FAQ -->
<section class="py-14">
	<div class="max-w-2xl mx-auto px-6">
		<h2 class="font-headline text-2xl md:text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>

		{#each [
			{ q: 'How fast can I set it up?', a: 'Under 5 minutes. Create an account, pay once, download the app, paste your Polymarket API keys, and hit start.' },
			{ q: 'Is my capital safe?', a: 'Yes. The bot runs 100% locally on your machine. Your private keys never leave your device. We never have access to your funds.' },
			{ q: 'Which markets does it trade?', a: 'SOL up/down 15-minute prediction markets on Polymarket. 96 trading opportunities per day.' },
			{ q: 'How much can I make?', a: 'Results vary based on bet size and market conditions. Use our simulator to model projections for your setup.' },
			{ q: 'Is there a subscription?', a: 'No. $49.95 once — lifetime access, all updates, premium support. No monthly fees, no revenue share.' },
			{ q: 'Do I need a VPN?', a: 'Polymarket is restricted in some countries. If you\'re in a restricted region, you\'ll need a VPN to an allowed country.' },
		] as faq}
			<details class="group bg-surface-container rounded-xl mb-2">
				<summary class="flex justify-between items-center cursor-pointer p-4 text-sm font-semibold">
					{faq.q}
					<span class="material-symbols-outlined text-on-surface-variant group-open:rotate-180 transition-transform text-lg">expand_more</span>
				</summary>
				<p class="px-4 pb-4 text-sm text-on-surface-variant leading-relaxed">{faq.a}</p>
			</details>
		{/each}
	</div>
</section>

<!-- Final CTA -->
<section class="bg-surface-container-low py-14">
	<div class="max-w-3xl mx-auto px-6 text-center">
		<h2 class="font-headline text-2xl md:text-3xl font-bold">Still exploring?</h2>
		<p class="mt-3 text-on-surface-variant max-w-md mx-auto text-sm">
			Try the simulator to see projected returns for your bet size. No account needed.
		</p>
		<div class="flex items-center justify-center gap-3 mt-6">
			<a href="/simulator" class="bg-primary text-on-primary px-7 py-2.5 rounded-xl font-bold text-sm active:scale-[0.98] transition-all">
				Try the Simulator
			</a>
			<a href="/about" class="bg-surface-container-highest/40 text-on-surface px-7 py-2.5 rounded-xl font-semibold text-sm ghost-border hover:bg-surface-bright transition-colors">
				Meet the Team
			</a>
		</div>
	</div>
</section>
