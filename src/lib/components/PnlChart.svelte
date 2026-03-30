<script lang="ts">
	import { onMount } from 'svelte';
	import {
		Chart,
		LineController,
		LineElement,
		PointElement,
		LinearScale,
		CategoryScale,
		Filler,
		Tooltip
	} from 'chart.js';

	Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Filler, Tooltip);

	let canvas: HTMLCanvasElement;
	let chart: Chart | null = null;

	// Demo PnL data — upward trend with realistic volatility
	const labels = ['01 Jan', '04 Jan', '08 Jan', '11 Jan', '15 Jan', '18 Jan', '22 Jan', '25 Jan', 'Today'];
	const data = [12, 28, 41, 38, 72, 95, 118, 164, 248];

	onMount(() => {
		const ctx = canvas.getContext('2d')!;

		// Gradient fill matching the Obsidian Pulse design
		const gradient = ctx.createLinearGradient(0, 0, 0, canvas.clientHeight);
		gradient.addColorStop(0, 'rgba(52, 254, 160, 0.25)');
		gradient.addColorStop(0.6, 'rgba(52, 254, 160, 0.05)');
		gradient.addColorStop(1, 'rgba(52, 254, 160, 0)');

		chart = new Chart(ctx, {
			type: 'line',
			data: {
				labels,
				datasets: [
					{
						data,
						borderColor: '#34fea0',
						borderWidth: 2.5,
						backgroundColor: gradient,
						fill: true,
						tension: 0.35,
						pointRadius: 0,
						pointHoverRadius: 5,
						pointHoverBackgroundColor: '#34fea0',
						pointHoverBorderColor: '#0e0e0e',
						pointHoverBorderWidth: 2
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				animation: {
					duration: 2000,
					easing: 'easeOutQuart'
				},
				interaction: {
					mode: 'index',
					intersect: false
				},
				plugins: {
					tooltip: {
						backgroundColor: '#1a1919',
						borderColor: 'rgba(72, 72, 71, 0.3)',
						borderWidth: 1,
						titleColor: '#adaaaa',
						bodyColor: '#34fea0',
						titleFont: { family: 'Inter', size: 11, weight: 'normal' as const },
						bodyFont: { family: 'Space Grotesk', size: 14, weight: 'bold' as const },
						padding: 10,
						cornerRadius: 8,
						displayColors: false,
						callbacks: {
							label: (ctx) => `$${(ctx.parsed.y ?? 0).toLocaleString()}`
						}
					}
				},
				scales: {
					x: {
						grid: { display: false },
						border: { display: false },
						ticks: {
							color: '#767575',
							font: { family: 'Inter', size: 10 },
							maxRotation: 0
						}
					},
					y: {
						display: false
					}
				}
			}
		});

		return () => {
			chart?.destroy();
		};
	});
</script>

<div class="w-full h-full min-h-[160px]">
	<canvas bind:this={canvas}></canvas>
</div>
