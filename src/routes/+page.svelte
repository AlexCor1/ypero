<script lang="ts">
	import PnlChart from '$lib/components/PnlChart.svelte';
</script>

<svelte:head>
	<title>Ypero | Automate Your Polymarket Success</title>
	<meta
		name="description"
		content="The easiest way to trade Solana on Polymarket. High-precision trades in 15-minute cycles."
	/>
</svelte:head>

<!-- HERO -->
<section class="max-w-7xl mx-auto px-6 pt-16 pb-24">
	<div class="flex flex-col lg:flex-row items-start gap-12">
		<div class="flex-1">
			<div class="inline-flex items-center gap-2 bg-surface-container-low px-4 py-1.5 rounded-full mb-6">
				<span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
				<span class="text-xs font-label uppercase tracking-widest text-on-surface-variant">
					Live on Polymarket
				</span>
			</div>

			<h1 class="font-headline text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
				Automate Your
				<br />
				<span class="kinetic-gradient">Polymarket Success.</span>
			</h1>

			<p class="mt-6 text-on-surface-variant text-lg max-w-lg leading-relaxed">
				The easiest way to trade Solana on Polymarket. Our algorithmic bot executes high-precision
				trades in 15-minute cycles, turning volatility into consistent gains.
			</p>

			<div class="flex items-center gap-4 mt-8">
				<a
					href="/pricing"
					class="bg-primary text-on-primary px-8 py-3 rounded-xl font-bold active:scale-95 transition-all"
				>
					Launch Bot Now
				</a>
				<a
					href="/simulator"
					class="bg-surface-container-highest/40 backdrop-blur-sm text-on-surface px-8 py-3 rounded-xl font-semibold ghost-border hover:bg-surface-bright transition-all"
				>
					View Simulator
				</a>
			</div>
		</div>

		<!-- PnL Chart placeholder -->
		<div class="flex-1 w-full">
			<div class="glass-card rounded-xl p-6">
				<p class="text-xs uppercase tracking-widest text-on-surface-variant mb-1">Live Portfolio</p>
				<div class="flex justify-between items-baseline">
					<span class="font-headline text-2xl font-bold">Current PnL</span>
					<span class="text-primary font-headline font-bold text-xl">+$2,481.50</span>
				</div>
				<div class="h-40 mt-4">
					<PnlChart />
				</div>
			</div>
		</div>
	</div>

	<!-- Quick stats -->
	<div class="flex flex-wrap gap-10 mt-12">
		<div>
			<span class="font-headline text-2xl font-bold text-primary">85%</span>
			<p class="text-xs text-on-surface-variant uppercase tracking-widest mt-1">Avg. Winrate</p>
		</div>
		<div>
			<span class="font-headline text-2xl font-bold">$5-50 Bets</span>
			<p class="text-xs text-on-surface-variant uppercase tracking-widest mt-1">
				Target $300-2400 Monthly
			</p>
		</div>
		<div>
			<span class="font-headline text-2xl font-bold">15m</span>
			<p class="text-xs text-on-surface-variant uppercase tracking-widest mt-1">Execution Window</p>
		</div>
	</div>
</section>

<!-- FEATURES -->
<section class="bg-surface-container-low py-24">
	<div class="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-6">
		<div class="glass-card rounded-xl p-8">
			<span class="material-symbols-outlined text-primary text-3xl mb-4">eco</span>
			<h3 class="font-headline text-xl font-bold mb-3">Edge in Every Candle</h3>
			<p class="text-on-surface-variant text-sm leading-relaxed">
				Stop guessing and start winning. Our bot analyzes global sentiment and market volume to
				execute trades precisely — capturing the most predictable price movements.
			</p>
		</div>
		<div class="glass-card rounded-xl p-8">
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
<section class="py-24">
	<div class="max-w-3xl mx-auto px-6 text-center">
		<h2 class="font-headline text-4xl md:text-5xl font-bold tracking-tight">
			Dominate the Market Today.
		</h2>
		<p class="mt-4 text-on-surface-variant text-lg">
			Join over 1,240+ professional traders using the most advanced algorithmic suite for Solana.
			Setup complete in under 120 seconds.
		</p>
		<div class="flex items-center justify-center gap-4 mt-8">
			<a
				href="/pricing"
				class="bg-surface-container-highest/40 backdrop-blur-sm text-on-surface px-8 py-3 rounded-xl font-semibold ghost-border"
			>
				Start Trading Now
			</a>
			<a
				href="/simulator"
				class="bg-primary text-on-primary px-8 py-3 rounded-xl font-bold"
			>
				Try the Simulator
			</a>
		</div>
	</div>
</section>

<!-- TESTIMONIALS -->
<section class="bg-surface-container-low py-24">
	<div class="max-w-7xl mx-auto px-6 text-center">
		<p class="text-xs uppercase tracking-[0.3em] text-primary font-label mb-3">Testimonials</p>
		<h2 class="font-headline text-3xl md:text-4xl font-bold">Trusted by the Community</h2>
		<p class="mt-3 text-on-surface-variant max-w-lg mx-auto">
			Don't just take our word for it. Join a community of serious traders who've automated their
			way to consistency.
		</p>

		<div class="grid md:grid-cols-3 gap-6 mt-12 text-left">
			<!-- TODO: Map testimonial data -->
			<div class="glass-card rounded-xl p-6">
				<p class="text-on-surface-variant text-sm leading-relaxed mb-4">
					"The 15m strategy is a game changer. I've seen consistent results since I started using it."
				</p>
				<div class="flex items-center gap-3">
					<div class="w-10 h-10 rounded-full bg-primary/20"></div>
					<div>
						<p class="font-headline font-bold text-sm">Jordan D.</p>
						<p class="text-xs text-primary uppercase tracking-widest">Full-time Whale</p>
					</div>
				</div>
			</div>
			<div class="glass-card rounded-xl p-6">
				<p class="text-on-surface-variant text-sm leading-relaxed mb-4">
					"Setup took minutes. I love that the bot executes through my own RPC so I'm always in control."
				</p>
				<div class="flex items-center gap-3">
					<div class="w-10 h-10 rounded-full bg-secondary/20"></div>
					<div>
						<p class="font-headline font-bold text-sm">Sarah K.</p>
						<p class="text-xs text-primary uppercase tracking-widest">Algo Strategy Lead</p>
					</div>
				</div>
			</div>
			<div class="glass-card rounded-xl p-6">
				<p class="text-on-surface-variant text-sm leading-relaxed mb-4">
					"Finally, a tool that actually does what it says. It's been a great addition to my trading routine."
				</p>
				<div class="flex items-center gap-3">
					<div class="w-10 h-10 rounded-full bg-tertiary/20"></div>
					<div>
						<p class="font-headline font-bold text-sm">Marcus T.</p>
						<p class="text-xs text-primary uppercase tracking-widest">Active Community Member</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- STATS -->
<section class="py-20">
	<div class="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
		<div>
			<span class="font-headline text-4xl font-bold">$4.2M</span>
			<p class="text-xs text-on-surface-variant uppercase tracking-widest mt-2">Total Volume Traded</p>
		</div>
		<div>
			<span class="font-headline text-4xl font-bold text-primary">1,240</span>
			<p class="text-xs text-on-surface-variant uppercase tracking-widest mt-2">Active Bot Instances</p>
		</div>
		<div>
			<span class="font-headline text-4xl font-bold">150k+</span>
			<p class="text-xs text-on-surface-variant uppercase tracking-widest mt-2">Successful Predictions</p>
		</div>
		<div>
			<span class="font-headline text-4xl font-bold text-primary">99.9%</span>
			<p class="text-xs text-on-surface-variant uppercase tracking-widest mt-2">Uptime Reliability</p>
		</div>
	</div>
</section>
