<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { isLoggedIn, isValidated, authUser } from '$lib/stores/auth';

	let loading = $state(false);
	let error = $state('');

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

<svelte:head>
	<title>Pricing | Ypero</title>
</svelte:head>

<section class="max-w-7xl mx-auto px-6 pt-16 pb-24 text-center">
	<!-- Post-payment banners -->
	{#if paymentSuccess || $isValidated}
		<div class="max-w-lg mx-auto mb-8 bg-primary/10 rounded-xl p-5 flex items-center gap-4">
			<span class="material-symbols-outlined text-primary text-3xl">check_circle</span>
			<div class="text-left">
				<p class="font-headline font-bold text-sm">Account Validated</p>
				<p class="text-xs text-on-surface-variant mt-0.5">
					{#if paymentSuccess}
						Payment confirmed. Head to <a href="/profile" class="text-primary font-semibold hover:underline">your profile</a> to get started.
					{:else}
						You already have lifetime access. You're all set.
					{/if}
				</p>
			</div>
		</div>
	{/if}

	{#if paymentCanceled}
		<div class="max-w-lg mx-auto mb-8 bg-error/10 rounded-xl p-5 flex items-center gap-4">
			<span class="material-symbols-outlined text-error text-3xl">cancel</span>
			<div class="text-left">
				<p class="font-headline font-bold text-sm">Payment Canceled</p>
				<p class="text-xs text-on-surface-variant mt-0.5">No charge was made. You can try again whenever you're ready.</p>
			</div>
		</div>
	{/if}

	{#if error}
		<div class="max-w-lg mx-auto mb-8 bg-error-container/30 text-on-error-container text-sm rounded-lg p-3">
			{error}
		</div>
	{/if}

	<!-- Header -->
	<div class="inline-flex items-center gap-2 bg-surface-container-low px-4 py-1.5 rounded-full mb-6">
		<span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
		<span class="text-xs font-label uppercase tracking-widest text-primary">Available Now</span>
	</div>

	<h1 class="font-headline text-4xl md:text-6xl font-bold tracking-tight">
		Start Trading with <em class="kinetic-gradient not-italic">Precision</em>
	</h1>
	<p class="mt-4 text-on-surface-variant text-lg max-w-2xl mx-auto">
		One payment. Lifetime access. No subscriptions, no hidden fees, no revenue share.
		You keep 100% of your profits.
	</p>

	<!-- Pricing card -->
	<div class="max-w-lg mx-auto mt-12 rounded-2xl p-8 md:p-10 bg-gradient-to-b from-surface-container-high to-surface-container-low ghost-border">
		<p class="text-xs uppercase tracking-[0.3em] text-on-surface-variant font-label">
			Account Validation
		</p>
		<p class="font-headline text-6xl font-bold mt-2">$49.95</p>
		<p class="text-sm uppercase tracking-widest text-primary font-bold mt-2">One-time Payment · Lifetime Access</p>

		<!-- What's included -->
		<div class="mt-8 text-left space-y-4">
			<p class="text-xs uppercase tracking-widest text-on-surface-variant font-label">What you get</p>

			{#each [
				{ icon: 'download', title: 'Full Bot Application', desc: 'Desktop app for Windows, macOS & Linux. Download instantly after payment.' },
				{ icon: 'update', title: 'Lifetime Updates', desc: 'Every new version, strategy improvement, and market expansion — free, forever.' },
				{ icon: 'key', title: 'Self-Custodial Trading', desc: 'The bot runs on your machine with your keys. We never touch your funds or private keys.' },
				{ icon: 'speed', title: '15-Minute Execution Engine', desc: 'Algorithmically trades SOL up/down markets on Polymarket with an 85% historical win rate.' },
				{ icon: 'notifications_active', title: '24/7 Telegram Alerts', desc: 'Real-time trade notifications, PnL updates, and risk alerts sent to your Telegram.' },
				{ icon: 'support_agent', title: 'Premium Discord Support', desc: 'Direct access to the dev team. Setup help, strategy questions, troubleshooting.' },
			] as item}
				<div class="flex items-start gap-3 py-2">
					<span class="material-symbols-outlined text-primary text-lg mt-0.5 shrink-0">{item.icon}</span>
					<div>
						<p class="text-sm font-semibold">{item.title}</p>
						<p class="text-xs text-on-surface-variant mt-0.5 leading-relaxed">{item.desc}</p>
					</div>
				</div>
			{/each}
		</div>

		<!-- Separator -->
		<div class="w-full h-px bg-outline-variant/15 my-6"></div>

		<!-- CTA -->
		{#if $isValidated}
			<a
				href="/profile"
				class="w-full bg-surface-container-highest text-primary py-3.5 rounded-xl font-bold text-lg flex items-center justify-center gap-2"
			>
				<span class="material-symbols-outlined">verified</span>
				Account Validated — Go to Profile
			</a>
		{:else}
			<button
				onclick={handlePurchase}
				disabled={loading}
				class="w-full bg-primary text-on-primary py-3.5 rounded-xl font-bold active:scale-[0.98] transition-all text-lg disabled:opacity-50"
			>
				{#if loading}
					<span class="flex items-center justify-center gap-2">
						<span class="material-symbols-outlined animate-spin text-lg">progress_activity</span>
						Redirecting to payment...
					</span>
				{:else if !$isLoggedIn}
					Create Account & Pay — $49.95
				{:else}
					Validate Account — $49.95
				{/if}
			</button>
		{/if}

		<div class="flex items-center justify-center gap-4 mt-4 text-xs text-on-surface-variant">
			<span class="flex items-center gap-1">
				<span class="material-symbols-outlined text-sm">lock</span>
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
</section>

<!-- How it works -->
<section class="bg-surface-container-low py-20">
	<div class="max-w-4xl mx-auto px-6">
		<p class="text-xs uppercase tracking-[0.3em] text-primary font-label text-center mb-3">How it works</p>
		<h2 class="font-headline text-3xl font-bold text-center mb-12">Trading in 3 steps</h2>

		<div class="grid md:grid-cols-3 gap-8">
			{#each [
				{ step: '01', icon: 'person_add', title: 'Create & Validate', desc: 'Sign up, verify your email, and complete the one-time payment. Takes under 2 minutes.' },
				{ step: '02', icon: 'settings', title: 'Configure & Connect', desc: 'Download the bot, enter your Polymarket API keys, and set your preferred bet size ($5–$100).' },
				{ step: '03', icon: 'rocket_launch', title: 'Launch & Profit', desc: 'Hit start. The bot executes trades every 15 minutes, 24/7. You monitor, it trades.' },
			] as card}
				<div class="text-center">
					<span class="font-headline text-5xl font-bold text-surface-container-highest">{card.step}</span>
					<div class="w-14 h-14 rounded-xl bg-surface-container-highest flex items-center justify-center mx-auto mt-4 mb-4">
						<span class="material-symbols-outlined text-primary text-2xl">{card.icon}</span>
					</div>
					<h3 class="font-headline font-bold mb-2">{card.title}</h3>
					<p class="text-sm text-on-surface-variant leading-relaxed">{card.desc}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Trust signals -->
<section class="py-20">
	<div class="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
		{#each [
			{ icon: 'trending_up', value: '85%', label: 'Historical Win Rate', desc: 'Verified across 150k+ predictions on Polymarket SOL markets.' },
			{ icon: 'schedule', value: '15m', label: 'Execution Cycles', desc: 'Trades every 15-minute window. 96 opportunities per day.' },
			{ icon: 'shield', value: '100%', label: 'Self-Custodial', desc: 'Your keys, your wallet, your funds. We never have access.' },
			{ icon: 'groups', value: '1,240+', label: 'Active Traders', desc: 'Growing community of traders using our execution engine.' },
		] as stat}
			<div class="glass-card rounded-xl p-6 text-center">
				<div class="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center mx-auto mb-3">
					<span class="material-symbols-outlined text-primary">{stat.icon}</span>
				</div>
				<p class="font-headline text-2xl font-bold text-primary">{stat.value}</p>
				<p class="font-headline font-bold text-xs mt-1">{stat.label}</p>
				<p class="text-xs text-on-surface-variant mt-2 leading-relaxed">{stat.desc}</p>
			</div>
		{/each}
	</div>
</section>

<!-- FAQ -->
<section class="max-w-2xl mx-auto px-6 py-20">
	<h2 class="font-headline text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>

	{#each [
		{ q: 'How fast can I set it up?', a: 'Under 5 minutes. Create an account, pay once, download the app, paste your Polymarket API keys, and hit start. The bot begins trading on the next 15-minute cycle.' },
		{ q: 'Is my capital safe?', a: 'Yes. The bot runs 100% locally on your machine. It signs transactions with your private keys stored on your device. We never have access to your funds, wallet, or keys.' },
		{ q: 'Which markets does the bot trade?', a: 'It trades the "Will SOL go up/down in 15 minutes?" prediction markets on Polymarket. These markets resolve every 15 minutes, giving the bot 96 trading opportunities per day.' },
		{ q: 'How much can I make?', a: 'Results vary based on your bet size and market conditions. With a $10 bet size, typical monthly returns are around $500. With $50, closer to $2,500. Use our simulator to model projections.' },
		{ q: 'What if I need help setting it up?', a: 'Our Discord has an active support channel. The dev team responds within hours. We also include a step-by-step setup guide with the download.' },
		{ q: 'Is there a subscription?', a: 'No. You pay $49.95 once and get lifetime access to the bot, all future updates, strategy improvements, and premium support. No monthly fees, no revenue share.' },
		{ q: 'Do I need a VPN?', a: 'Polymarket is not available in all countries. If you are in a restricted region, you will need a VPN to an allowed country. The bot itself works from anywhere.' },
		{ q: 'Can I run it on a VPS?', a: 'Yes. The bot is lightweight and runs on any Linux, Windows, or macOS machine. Many users run it on a $5/mo VPS for 24/7 uptime.' },
	] as faq}
		<details class="group bg-surface-container rounded-xl mb-3">
			<summary class="flex justify-between items-center cursor-pointer p-5 text-sm font-semibold">
				{faq.q}
				<span class="material-symbols-outlined text-on-surface-variant group-open:rotate-180 transition-transform">
					expand_more
				</span>
			</summary>
			<p class="px-5 pb-5 text-sm text-on-surface-variant leading-relaxed">{faq.a}</p>
		</details>
	{/each}
</section>

<!-- Final CTA -->
<section class="max-w-4xl mx-auto px-6 pb-24">
	<div class="rounded-2xl bg-gradient-to-br from-surface-container-high to-surface-container-low p-10 md:p-14 text-center ghost-border">
		<h2 class="font-headline text-3xl md:text-4xl font-bold">Still on the fence?</h2>
		<p class="mt-4 text-on-surface-variant max-w-lg mx-auto">
			Try the simulator first. See projected returns for your bet size, risk-free. 
			When you're ready, the bot is one click away.
		</p>
		<div class="flex items-center justify-center gap-4 mt-8">
			<a href="/simulator" class="bg-primary text-on-primary px-8 py-3 rounded-xl font-bold active:scale-[0.98] transition-all">
				Try the Simulator
			</a>
			<a href="/about" class="bg-surface-container-highest/40 backdrop-blur-sm text-on-surface px-8 py-3 rounded-xl font-semibold ghost-border">
				Meet the Team
			</a>
		</div>
	</div>
</section>
