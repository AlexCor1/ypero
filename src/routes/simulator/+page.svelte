<script lang="ts">
	import { calculateProjection } from '$lib/simulator';
	import EarningsChart from '$lib/components/EarningsChart.svelte';

	let betSize = $state(10);

	let result = $derived(calculateProjection(betSize));

	function formatCurrency(n: number): string {
		return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);
	}
</script>

<svelte:head>
	<title>Simulator | Ypero</title>
</svelte:head>

<section class="max-w-7xl mx-auto px-6 pt-16 pb-12">
	<p class="text-xs uppercase tracking-widest text-primary font-label mb-2">
		Simulation Engine v2.4
	</p>
	<h1 class="font-headline text-4xl md:text-6xl font-bold tracking-tight">
		Predict Your <span class="kinetic-gradient">Alpha.</span>
	</h1>
	<p class="mt-4 text-on-surface-variant text-lg max-w-xl">
		Adjust your parameters to visualize potential returns using our algorithmic execution engine.
		Powered by a verified 85% historical win rate on Polymarket events.
	</p>
</section>

<section class="max-w-7xl mx-auto px-6 pb-24">
	<div class="grid lg:grid-cols-[320px_1fr] gap-6">
		<!-- Controls panel -->
		<div class="space-y-6">
			<div class="glass-card rounded-xl p-6">
				<label for="betSize" class="text-xs uppercase tracking-widest text-on-surface-variant font-label">
					Starting Bet Size
				</label>
				<p class="font-headline text-3xl font-bold text-primary mt-1">
					{formatCurrency(betSize)}
				</p>
				<div class="flex items-center justify-between text-xs text-on-surface-variant mt-3 mb-1">
					<span>$1</span>
					<span>Max $100</span>
				</div>
				<input
					id="betSize"
					type="range"
					min="1"
					max="100"
					step="1"
					bind:value={betSize}
					class="w-full accent-primary"
				/>

				<div class="mt-6 space-y-4">
					<div class="flex justify-between items-center">
						<span class="text-sm text-on-surface-variant">Win Rate</span>
						<span class="text-sm font-bold text-primary">85%</span>
					</div>
					<div class="flex justify-between items-center">
						<span class="text-sm text-on-surface-variant">Execution Speed</span>
						<span class="text-sm font-bold">140ms</span>
					</div>
					<div class="flex justify-between items-center">
						<span class="text-sm text-on-surface-variant">Risk Profile</span>
						<span
							class="text-xs font-bold uppercase tracking-widest bg-primary/15 text-primary px-3 py-1 rounded-full"
						>
							Balanced
						</span>
					</div>
				</div>
			</div>

			<!-- Info card -->
			<div class="glass-card rounded-xl p-6">
				<div class="flex items-start justify-between">
					<div>
						<h3 class="font-headline font-bold text-sm">Automated Execution</h3>
						<p class="text-xs text-on-surface-variant mt-2 leading-relaxed">
							Our bot captures micro-inefficiencies in prediction markets before they normalize.
						</p>
					</div>
					<span class="material-symbols-outlined text-on-surface-variant/30 text-3xl">bolt</span>
				</div>
				<a href="/about" class="text-xs font-bold text-primary mt-4 inline-flex items-center gap-1">
					LEARN MORE
					<span class="material-symbols-outlined text-sm">arrow_forward</span>
				</a>
			</div>
		</div>

		<!-- Chart area -->
		<div class="glass-card rounded-xl p-6">
			<div class="flex items-start justify-between mb-6">
				<div>
					<p class="text-xs uppercase tracking-widest text-on-surface-variant font-label">
						Projected Monthly Earnings
					</p>
					<p class="font-headline text-4xl font-bold mt-1">
						{formatCurrency(result.monthlyProjection)}
					</p>
				</div>
				<div class="flex gap-2">
					<span class="text-xs bg-primary/15 text-primary px-3 py-1 rounded-full font-bold">
						LIVE DATA
					</span>
					<span class="text-xs bg-surface-container-highest text-on-surface-variant px-3 py-1 rounded-full">
						UTC-0
					</span>
				</div>
			</div>

			<!-- Earnings chart -->
			<div class="h-64">
				<EarningsChart dailyData={result.dailyData} peakExpectancy={result.peakExpectancy} />
			</div>

			<div class="flex justify-between mt-4 text-xs text-on-surface-variant">
				<span>Day 1</span>
				<span>Week 1</span>
				<span>Week 2</span>
				<span>Week 3</span>
				<span>Week 4</span>
			</div>
		</div>
	</div>

	<!-- Bottom stat cards -->
	<div class="grid md:grid-cols-3 gap-6 mt-6">
		<div class="glass-card rounded-xl p-6">
			<p class="text-xs uppercase tracking-widest text-on-surface-variant font-label">
				Daily Average Profit
			</p>
			<p class="font-headline text-3xl font-bold mt-1">{formatCurrency(result.dailyAverage)}</p>
			<p class="text-xs text-primary mt-2 flex items-center gap-1">
				<span class="material-symbols-outlined text-sm">trending_up</span>
				+80% return on wagered
			</p>
		</div>
		<div class="glass-card rounded-xl p-6">
			<p class="text-xs uppercase tracking-widest text-on-surface-variant font-label">
				Total Yearly Forecast
			</p>
			<p class="font-headline text-3xl font-bold mt-1">{formatCurrency(result.yearlyProjection)}</p>
			<p class="text-xs text-primary mt-2 flex items-center gap-1">
				<span class="material-symbols-outlined text-sm">trending_up</span>
				Compound estimate
			</p>
		</div>
		<div class="glass-card rounded-xl p-6">
			<p class="text-xs uppercase tracking-widest text-on-surface-variant font-label">
				Bot Reliability
			</p>
			<p class="font-headline text-3xl font-bold mt-1">99.9%</p>
			<p class="text-xs text-primary mt-2 flex items-center gap-1">
				<span class="material-symbols-outlined text-sm">verified</span>
				Uptime Guarantee
			</p>
		</div>
	</div>
</section>

<!-- CTA -->
<section class="max-w-7xl mx-auto px-6 pb-24">
	<div class="rounded-2xl bg-linear-to-br from-surface-container-high to-surface-container-low p-12 text-center ghost-border">
		<h2 class="font-headline text-3xl md:text-4xl font-bold">Ready to stop guessing?</h2>
		<p class="mt-4 text-on-surface-variant max-w-lg mx-auto">
			Join 2,500+ traders using Ypero's Polymarket execution bot to automate their edge.
			Secure your slot before the next pool rebalance.
		</p>
		<div class="flex items-center justify-center gap-4 mt-8">
			<a href="/pricing" class="bg-primary text-on-primary px-8 py-3 rounded-xl font-bold">
				Start Trading Now
			</a>
			<a
				href="/about"
				class="bg-surface-container-highest/40 backdrop-blur-sm text-on-surface px-8 py-3 rounded-xl font-semibold ghost-border"
			>
				View Documentation
			</a>
		</div>
	</div>
</section>
