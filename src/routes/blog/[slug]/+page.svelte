<script lang="ts">
	import { reveal } from '$lib/actions/reveal';

	let { data } = $props();
	const post = data.post;

	function formatDate(iso: string): string {
		return new Date(iso).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	// Track reading progress
	let scrollProgress = $state(0);

	function handleScroll() {
		const el = document.documentElement;
		const scrollTop = el.scrollTop || document.body.scrollTop;
		const scrollHeight = el.scrollHeight - el.clientHeight;
		scrollProgress = scrollHeight > 0 ? Math.min(1, scrollTop / scrollHeight) : 0;
	}
</script>

<svelte:window onscroll={handleScroll} />

<svelte:head>
	<title>{post.title} | Ypero Blog</title>
	<meta name="description" content={post.description} />
</svelte:head>

<!-- Reading progress bar -->
<div class="fixed top-20 left-0 w-full h-[2px] z-40" style="background: rgba(26,25,25,0.5);">
	<div
		class="h-full transition-[width] duration-100 ease-out"
		style="width: {scrollProgress * 100}%; background: linear-gradient(90deg, #34fea0 0%, #b984ff 100%);"
	></div>
</div>

<article class="relative max-w-3xl mx-auto px-6 pt-16 pb-24 overflow-hidden">
	<!-- Ambient orb -->
	<div class="float-orb float-orb-green w-[300px] h-[300px] -top-16 right-[-120px] opacity-30"></div>

	<!-- Back link -->
	<div use:reveal>
		<a
			href="/blog"
			class="inline-flex items-center gap-1.5 text-xs text-on-surface-variant hover:text-primary transition-colors mb-8 reveal group"
		>
			<span class="material-symbols-outlined text-sm group-hover:-translate-x-0.5 transition-transform">arrow_back</span>
			Back to Blog
		</a>
	</div>

	<!-- Header -->
	<div use:reveal>
		<!-- Meta pills -->
		<div class="flex items-center gap-2 mb-5 reveal">
			<span class="inline-flex items-center gap-1.5 text-xs bg-surface-container-highest text-on-surface-variant px-3 py-1 rounded-full">
				<span class="material-symbols-outlined text-xs">calendar_today</span>
				{formatDate(post.date)}
			</span>
			<span class="inline-flex items-center gap-1.5 text-xs bg-surface-container-highest text-on-surface-variant px-3 py-1 rounded-full">
				<span class="material-symbols-outlined text-xs">schedule</span>
				{post.readingTime} min read
			</span>
		</div>

		<!-- Title -->
		<h1 class="font-headline text-3xl md:text-4xl font-bold tracking-tight leading-tight reveal" style="transition-delay: 80ms;">
			{post.title}
		</h1>
		<p class="text-on-surface-variant text-lg mt-3 leading-relaxed reveal" style="transition-delay: 160ms;">
			{post.description}
		</p>

		<!-- Accent line -->
		<div class="mt-8 h-[2px] rounded-full reveal" style="background: linear-gradient(90deg, #34fea0 0%, #b984ff 50%, transparent 100%); transition-delay: 240ms;"></div>
	</div>

	<!-- Rendered markdown -->
	<div class="prose mt-10" use:reveal>
		<div class="reveal">
			{@html post.html}
		</div>
	</div>

	<!-- Footer CTA -->
	<div class="mt-16 pt-8" style="border-top: 1px solid rgba(72, 72, 71, 0.15);" use:reveal>
		<div class="relative rounded-xl p-8 text-center overflow-hidden reveal-scale" style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05);">
			<!-- Background glow -->
			<div class="absolute inset-0 pointer-events-none"
				style="background: radial-gradient(ellipse at 50% 100%, rgba(52,254,160,0.06) 0%, transparent 60%);">
			</div>

			<div class="relative">
				<h3 class="font-headline text-xl font-bold mb-2">Ready to start trading?</h3>
				<p class="text-sm text-on-surface-variant mb-5">
					Try the simulator or get lifetime access to the Ypero bot.
				</p>
				<div class="flex items-center justify-center gap-3">
					<a href="/simulator" class="bg-surface-container-highest/40 text-on-surface px-6 py-2.5 rounded-xl font-semibold text-sm ghost-border hover:bg-surface-bright transition-colors">
						Try Simulator
					</a>
					<a href="/pricing" class="bg-primary text-on-primary px-6 py-2.5 rounded-xl font-bold text-sm active:scale-[0.98] transition-all hover:shadow-[0_0_20px_rgba(52,254,160,0.2)]">
						Get Ypero
					</a>
				</div>
			</div>
		</div>
	</div>
</article>
