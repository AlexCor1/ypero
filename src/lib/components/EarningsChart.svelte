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

	interface Props {
		dailyData: number[];
		peakExpectancy: number;
	}

	let { dailyData, peakExpectancy }: Props = $props();

	let canvas: HTMLCanvasElement;
	let chart: Chart | null = null;

	const labels = Array.from({ length: 28 }, () => '');

	function createGradient(ctx: CanvasRenderingContext2D, height: number) {
		const gradient = ctx.createLinearGradient(0, 0, 0, height);
		gradient.addColorStop(0, 'rgba(52, 254, 160, 0.20)');
		gradient.addColorStop(0.5, 'rgba(52, 254, 160, 0.05)');
		gradient.addColorStop(1, 'rgba(52, 254, 160, 0)');
		return gradient;
	}

	// Peak annotation plugin
	const peakAnnotationPlugin = {
		id: 'peakAnnotation',
		afterDatasetsDraw(chartInstance: Chart) {
			const dataset = chartInstance.data.datasets[0];
			if (!dataset?.data?.length) return;

			const meta = chartInstance.getDatasetMeta(0);
			if (!meta?.data?.length) return;

			let peakIdx = 0;
			let peakVal = -Infinity;
			for (let i = 0; i < (dataset.data as number[]).length; i++) {
				const val = dataset.data[i] as number;
				if (val > peakVal) {
					peakVal = val;
					peakIdx = i;
				}
			}

			const point = meta.data[peakIdx];
			if (!point) return;

			const ctx = chartInstance.ctx;
			const x = point.x;
			const y = point.y;

			const boxW = 140;
			const boxH = 46;
			const boxX = Math.min(x - boxW / 2, chartInstance.width - boxW - 10);
			const boxY = Math.max(4, y - boxH - 14);

			ctx.save();
			ctx.fillStyle = 'rgba(26, 25, 25, 0.92)';
			ctx.strokeStyle = 'rgba(72, 72, 71, 0.3)';
			ctx.lineWidth = 1;
			ctx.beginPath();
			ctx.roundRect(boxX, boxY, boxW, boxH, 8);
			ctx.fill();
			ctx.stroke();

			ctx.fillStyle = '#adaaaa';
			ctx.font = "600 9px 'Inter'";
			ctx.letterSpacing = '0.1em';
			ctx.fillText('PEAK EXPECTANCY', boxX + 12, boxY + 17);
			ctx.letterSpacing = '0';

			ctx.fillStyle = '#34fea0';
			ctx.font = "700 16px 'Space Grotesk'";
			ctx.fillText(
				`$${peakVal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
				boxX + 12,
				boxY + 37
			);

			ctx.beginPath();
			ctx.arc(x, y, 4, 0, Math.PI * 2);
			ctx.fillStyle = '#34fea0';
			ctx.fill();
			ctx.beginPath();
			ctx.arc(x, y, 7, 0, Math.PI * 2);
			ctx.strokeStyle = 'rgba(52, 254, 160, 0.3)';
			ctx.lineWidth = 2;
			ctx.stroke();

			ctx.restore();
		}
	};

	onMount(() => {
		const ctx = canvas.getContext('2d')!;

		chart = new Chart(ctx, {
			type: 'line',
			data: {
				labels,
				datasets: [
					{
						data: [...dailyData],
						borderColor: '#34fea0',
						borderWidth: 2.5,
						backgroundColor: createGradient(ctx, canvas.clientHeight),
						fill: true,
						tension: 0.3,
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
					duration: 500,
					easing: 'easeOutCubic'
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
						bodyColor: '#ffffff',
						titleFont: { family: 'Inter', size: 11, weight: 'normal' as const },
						bodyFont: { family: 'Space Grotesk', size: 13, weight: 'bold' as const },
						padding: 10,
						cornerRadius: 8,
						displayColors: false,
						callbacks: {
							title: (items) => `Day ${items[0].dataIndex + 1}`,
							label: (ctx) =>
								`$${(ctx.parsed.y ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
						}
					}
				},
				scales: {
					x: {
						grid: {
							color: 'rgba(72, 72, 71, 0.08)',
							drawTicks: false
						},
						border: { display: false },
						ticks: { display: false }
					},
					y: {
						grid: {
							color: 'rgba(72, 72, 71, 0.06)',
							drawTicks: false
						},
						border: { display: false },
						ticks: { display: false }
					}
				}
			},
			plugins: [peakAnnotationPlugin]
		});

		return () => {
			chart?.destroy();
		};
	});

	// Update chart when dailyData changes (new random shape per slider move)
	$effect(() => {
		if (chart && dailyData) {
			chart.data.datasets[0].data = [...dailyData];
			chart.update();
		}
	});
</script>

<div class="w-full h-full min-h-[260px]">
	<canvas bind:this={canvas}></canvas>
</div>
