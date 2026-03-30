<script lang="ts">
	import PnlChart from '$lib/components/PnlChart.svelte';
	import { reveal } from '$lib/actions/reveal';
</script>

<svelte:head>
	<title>Ypero | Automate Your Polymarket Success</title>
	<meta
		name="description"
		content="The easiest way to trade Solana on Polymarket. High-precision trades in 15-minute cycles."
	/>
</svelte:head>

<!-- HERO -->
<section class="relative max-w-7xl mx-auto px-6 pt-16 pb-24 overflow-hidden">
	<!-- Floating ambient orbs -->
	<div class="float-orb float-orb-green w-[400px] h-[400px] -top-20 -left-40 opacity-60"></div>
	<div class="float-orb float-orb-purple w-[350px] h-[350px] top-20 right-[-100px] opacity-50"></div>

	<div class="relative flex flex-col lg:flex-row items-start gap-12" use:reveal>
		<div class="flex-1 reveal-left">
			<div class="inline-flex items-center gap-2 bg-surface-container-low px-4 py-1.5 rounded-full mb-6">
				<span class="w-2 h-2 rounded-full bg-primary pulse-ring text-primary"></span>
				<span class="text-xs font-label uppercase tracking-widest text-on-surface-variant">
					Live on Polymarket
				</span>
			</div>

			<h1 class="font-headline text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
				Automate Your
				<br />
				<span class="kinetic-gradient-animated">Polymarket Success.</span>
			</h1>

			<p class="mt-6 text-on-surface-variant text-lg max-w-lg leading-relaxed">
				The easiest way to trade Solana on Polymarket. Our bot exploits the confidence of the market, turning volatility into consistent gains.
			</p>

			<div class="flex items-center gap-4 mt-8">
				<a
					href="/pricing"
					class="bg-primary text-on-primary px-8 py-3 rounded-xl font-bold active:scale-95 transition-all hover:shadow-[0_0_24px_rgba(52,254,160,0.25)]"
				>
					Launch Bot Now
				</a>
				<a
					href="/simulator"
					class="bg-surface-container-highest/40 backdrop-blur-sm text-on-surface px-8 py-3 rounded-xl font-semibold ghost-border card-hover"
				>
					View Simulator
				</a>
			</div>
		</div>

		<!-- PnL Chart -->
		<div class="flex-1 w-full reveal-right" style="transition-delay: 200ms;">
			<div class="glass-card rounded-xl p-6 card-hover">
				<p class="text-xs uppercase tracking-widest text-on-surface-variant mb-1">Live Portfolio</p>
				<div class="flex justify-between items-baseline">
					<span class="font-headline text-2xl font-bold">Current PnL</span>
					<span class="text-primary font-headline font-bold text-xl">+$248</span>
				</div>
				<div class="h-40 mt-4">
					<PnlChart />
				</div>
			</div>
		</div>
	</div>

	<!-- Quick stats -->
	<div class="flex flex-wrap gap-10 mt-12 reveal-stagger" use:reveal>
		<div class="reveal">
			<span class="font-headline text-2xl font-bold text-primary">85%</span>
			<p class="text-xs text-on-surface-variant uppercase tracking-widest mt-1">Avg. Winrate</p>
		</div>
		<div class="reveal">
			<span class="font-headline text-2xl font-bold">$5-100 Bets</span>
			<p class="text-xs text-on-surface-variant uppercase tracking-widest mt-1">
				Target $60-500 Monthly
			</p>
		</div>
		<div class="reveal">
			<span class="font-headline text-2xl font-bold">15m</span>
			<p class="text-xs text-on-surface-variant uppercase tracking-widest mt-1">Execution Window</p>
		</div>
	</div>
</section>

<!-- FEATURES -->
<section class="relative bg-surface-container-low py-24 overflow-hidden">
	<div class="float-orb float-orb-purple w-[300px] h-[300px] bottom-0 left-1/4 opacity-40"></div>

	<div class="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-6 reveal-stagger" use:reveal>
		<div class="glass-card rounded-xl p-8 card-hover reveal">
			<span class="material-symbols-outlined text-primary text-3xl mb-4">eco</span>
			<h3 class="font-headline text-xl font-bold mb-3">Edge in Every Candle</h3>
			<p class="text-on-surface-variant text-sm leading-relaxed">
				Stop guessing and start winning. Our bot analyzes global sentiment and market volume to
				execute trades precisely — capturing the most predictable price movements.
			</p>
		</div>
		<div class="glass-card rounded-xl p-8 card-hover reveal">
			<span class="material-symbols-outlined text-secondary text-3xl mb-4">key</span>
			<h3 class="font-headline text-xl font-bold mb-3">Your Keys, Your Gains</h3>
			<p class="text-on-surface-variant text-sm leading-relaxed">
				Experience true self-custody. The bot operates via secure RPC protocols, ensuring your funds
				never leave your wallet until the moment of trade.
			</p>
		</div>
	</div>
</section>

<!-- CTA -->
<section class="relative py-24 overflow-hidden">
	<div class="float-orb float-orb-green w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30"></div>

	<div class="relative max-w-3xl mx-auto px-6 text-center reveal-scale" use:reveal>
		<h2 class="font-headline text-4xl md:text-5xl font-bold tracking-tight">
			Dominate the Market Today.
		</h2>
		<p class="mt-4 text-on-surface-variant text-lg">
			Join over 1,240+ professional traders using the best Polymarket bot.
			Setup complete in under 5 minutes.
		</p>
		<div class="flex items-center justify-center gap-4 mt-8">
			<a
				href="/pricing"
				class="bg-surface-container-highest/40 backdrop-blur-sm text-on-surface px-8 py-3 rounded-xl font-semibold ghost-border card-hover"
			>
				Start Trading Now
			</a>
			<a
				href="/simulator"
				class="bg-primary text-on-primary px-8 py-3 rounded-xl font-bold hover:shadow-[0_0_24px_rgba(52,254,160,0.25)] transition-all"
			>
				Try the Simulator
			</a>
		</div>
		<div class="flex items-center justify-center gap-6 mt-6 text-xs text-on-surface-variant uppercase tracking-widest">
			<span class="flex items-center gap-1.5">
				<span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
				No Subscription
			</span>
			<span class="flex items-center gap-1.5">
				<span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
				Configurable & Scalable
			</span>
			<span class="flex items-center gap-1.5">
				<span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
				24/7 Execution
			</span>
		</div>
	</div>
</section>

<!-- TESTIMONIALS -->
<section class="bg-surface-container-low py-24">
	<div class="max-w-7xl mx-auto px-6 text-center" use:reveal>
		<p class="text-xs uppercase tracking-[0.3em] text-primary font-label mb-3 reveal">Testimonials</p>
		<h2 class="font-headline text-3xl md:text-4xl font-bold reveal">Trusted by the Community</h2>
		<p class="mt-3 text-on-surface-variant max-w-lg mx-auto reveal">
			Don't just take our word for it. Join a community of serious traders who profit each month.
		</p>

		<div class="grid md:grid-cols-3 gap-6 mt-12 text-left reveal-stagger">
			{#each [
				{ quote: '"This bot is amazing, it\'s simple to use and so powerful ! I\'ve seen consistent results since I started using it."', name: 'Jordan D.', role: 'Crypto Enthusiast', color: 'primary' },
				{ quote: '"I love that the bot is on my computer, I don\'t have to trust some online services with my credentials and I\'m always in full control."', name: 'Sarah K.', role: 'Beginner and already profitable', color: 'secondary' },
				{ quote: '"Finally, a bot that\'s profitable. It\'s been a great and fun addition to my trading routine. If you\'re looking for some side-income, this will be perfect for you."', name: 'Marcus T.', role: 'Long time whale - Expert', color: 'tertiary' },
			] as t}
				<div class="glass-card rounded-xl p-6 card-hover reveal">
					<p class="text-on-surface-variant text-sm leading-relaxed mb-4">{t.quote}</p>
					<div class="flex items-center gap-3">
						<div class="w-10 h-10 rounded-full bg-{t.color}/20 flex items-center justify-center">
							<span class="material-symbols-outlined text-{t.color} text-lg">person</span>
						</div>
						<div>
							<p class="font-headline font-bold text-sm">{t.name}</p>
							<p class="text-xs text-primary uppercase tracking-widest">{t.role}</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- STATS -->
<section class="py-20" use:reveal>
	<div class="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center reveal-stagger">
		<div class="reveal">
			<span class="font-headline text-4xl font-bold num-animate">$1.3M</span>
			<p class="text-xs text-on-surface-variant uppercase tracking-widest mt-2">Total Volume Traded</p>
		</div>
		<div class="reveal">
			<span class="font-headline text-4xl font-bold text-primary num-animate" style="animation-delay: 100ms;">631</span>
			<p class="text-xs text-on-surface-variant uppercase tracking-widest mt-2">Active Bot Instances</p>
		</div>
		<div class="reveal">
			<span class="font-headline text-4xl font-bold num-animate" style="animation-delay: 200ms;">150k+</span>
			<p class="text-xs text-on-surface-variant uppercase tracking-widest mt-2">Successful Predictions</p>
		</div>
		<div class="reveal">
			<span class="font-headline text-4xl font-bold text-primary num-animate" style="animation-delay: 300ms;">99.9%</span>
			<p class="text-xs text-on-surface-variant uppercase tracking-widest mt-2">Uptime Reliability</p>
		</div>
	</div>
</section>
