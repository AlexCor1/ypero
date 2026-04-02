<script lang="ts">
	import { calculateProjection } from '$lib/simulator';
	import EarningsChart from '$lib/components/EarningsChart.svelte';
	import { reveal } from '$lib/actions/reveal';

	let betSize = $state(10);

	let result = $derived(calculateProjection(betSize));

	function formatCurrency(n: number): string {
		return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);
	}
</script>

<svelte:head>
	<title>Simulator | Ypero</title>
</svelte:head>

<!-- Header -->
<section class="relative max-w-4xl mx-auto px-6 pt-14 pb-8 overflow-hidden">
	<div class="float-orb float-orb-green w-[300px] h-[300px] -top-20 right-[-100px] opacity-40"></div>

	<div use:reveal>
		<p class="text-xs uppercase tracking-widest text-primary font-label mb-2 reveal">
			Simulation Engine
		</p>
		<h1 class="font-headline text-4xl md:text-5xl font-bold tracking-tight reveal" style="transition-delay: 60ms;">
			Predict Your <span class="kinetic-gradient-animated">Profits.</span>
		</h1>
		<p class="mt-3 text-on-surface-variant text-base max-w-lg reveal" style="transition-delay: 120ms;">
			Adjust your bet size to visualize potential returns. Based on 85% historical win rate.
		</p>
	</div>
</section>

<!-- Chart + Controls -->
<section class="max-w-6xl mx-auto pt-8 px-6 pb-20">

	<!-- Chart card -->
	<div class="glass-card rounded-xl p-6 reveal-scale" use:reveal>
		<!-- Header row -->
		<div class="flex items-start justify-between mb-5">
			<div>
				<p class="text-xs uppercase tracking-widest text-on-surface-variant font-label">
					Projected Monthly Earnings
				</p>
				<p class="font-headline text-4xl md:text-5xl font-bold mt-1 tracking-tight">
					{formatCurrency(result.monthlyProjection)}
				</p>
			</div>
			<span class="text-xs bg-primary/15 text-primary px-3 py-1 rounded-full font-bold shrink-0 mt-1">
				LIVE DATA
			</span>
		</div>

		<!-- Chart -->
		<div class="h-72 md:h-80">
			<EarningsChart dailyData={result.dailyData} peakExpectancy={result.peakExpectancy} />
		</div>

		<!-- Week labels -->
		<div class="flex justify-between mt-3 text-xs text-on-surface-variant px-1">
			<span>Day 1</span>
			<span>Week 1</span>
			<span>Week 2</span>
			<span>Week 3</span>
			<span>Week 4</span>
		</div>

		<!-- Separator -->
		<div class="w-full h-px bg-outline-variant/15 my-5"></div>

		<!-- Slider + Stats row -->
		<div class="flex flex-col md:flex-row md:items-end gap-6">

			<!-- Bet size slider -->
			<div class="md:w-56 shrink-0">
				<div class="flex items-baseline justify-between mb-1">
					<label for="betSize" class="text-xs uppercase tracking-widest text-on-surface-variant font-label">
						Bet Size
					</label>
					<span class="font-headline text-xl font-bold text-primary">
						{formatCurrency(betSize)}
					</span>
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
				<div class="flex justify-between text-[10px] text-on-surface-variant mt-1">
					<span>$1</span>
					<span>$100</span>
				</div>
			</div>

			<!-- Stat pills -->
			<div class="flex-1 grid grid-cols-3 gap-3">
				<div class="rounded-lg bg-surface-container-low p-3 text-center">
					<p class="text-[10px] uppercase tracking-widest text-on-surface-variant font-label">Daily Avg</p>
					<p class="font-headline text-lg md:text-xl font-bold mt-0.5">{formatCurrency(result.dailyAverage)}</p>
				</div>
				<div class="rounded-lg bg-surface-container-low p-3 text-center">
					<p class="text-[10px] uppercase tracking-widest text-on-surface-variant font-label">Yearly Est.</p>
					<p class="font-headline text-lg md:text-xl font-bold mt-0.5">{formatCurrency(result.yearlyProjection)}</p>
				</div>
				<div class="rounded-lg bg-surface-container-low p-3 text-center">
					<p class="text-[10px] uppercase tracking-widest text-on-surface-variant font-label">Reliability</p>
					<p class="font-headline text-lg md:text-xl font-bold mt-0.5 text-primary">99.9%</p>
				</div>
			</div>
		</div>
	</div>

	<!-- Bot specs row -->
	<div class="flex items-center justify-center gap-6 mt-6 text-xs text-on-surface-variant flex-wrap">
		<span class="flex items-center gap-1.5">
			<span class="material-symbols-outlined text-primary text-sm">speed</span>
			100ms execution
		</span>
		<span class="flex items-center gap-1.5">
			<span class="material-symbols-outlined text-primary text-sm">trending_up</span>
			85% win rate
		</span>
		<span class="flex items-center gap-1.5">
			<span class="material-symbols-outlined text-primary text-sm">schedule</span>
			15m cycles
		</span>
		<span class="flex items-center gap-1.5">
			<span class="material-symbols-outlined text-primary text-sm">shield</span>
			Self-custodial
		</span>
	</div>
</section>

<!-- CTA -->
<section class="max-w-4xl mx-auto px-6 pb-24">
	<div class="rounded-2xl bg-linear-to-br from-surface-container-high to-surface-container-low p-10 md:p-12 text-center ghost-border">
		<h2 class="font-headline text-2xl md:text-3xl font-bold">Ready to stop guessing?</h2>
		<p class="mt-3 text-on-surface-variant max-w-md mx-auto text-sm">
			Get lifetime access to Ypero and start trading on the next 15-minute cycle.
		</p>
		<div class="flex items-center justify-center gap-3 mt-6">
			<a href="/pricing" class="bg-primary text-on-primary px-7 py-2.5 rounded-xl font-bold text-sm active:scale-[0.98] transition-all hover:shadow-[0_0_24px_rgba(52,254,160,0.25)]">
				Start Trading Now
			</a>
			<a href="/about" class="bg-surface-container-highest/40 text-on-surface px-7 py-2.5 rounded-xl font-semibold text-sm ghost-border hover:bg-surface-bright transition-colors">
				Learn More
			</a>
		</div>
	</div>
</section>
