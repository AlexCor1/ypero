<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import type { BlogPostMeta } from '$lib/blog';

	let { data } = $props();
	const posts: BlogPostMeta[] = data.posts;

	function formatDate(iso: string): string {
		return new Date(iso).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>Blog | Ypero</title>
	<meta name="description" content="News, updates, and trading guides from the Ypero team." />
</svelte:head>

<!-- Header -->
<section class="relative max-w-4xl mx-auto px-6 pt-16 pb-12 overflow-hidden">
	<div class="float-orb float-orb-green w-[400px] h-[400px] -top-32 right-[-160px] opacity-50"></div>
	<div class="float-orb float-orb-purple w-[250px] h-[250px] top-20 left-[-80px] opacity-30"></div>

	<div class="relative" use:reveal>
		<p class="text-xs uppercase tracking-widest text-primary font-label mb-3 reveal">Blog</p>
		<h1 class="font-headline text-4xl md:text-5xl font-bold tracking-tight reveal">
			News & <span class="kinetic-gradient-animated">Guides</span>
		</h1>
		<p class="mt-4 text-on-surface-variant text-lg max-w-xl reveal" style="transition-delay: 100ms;">
			Updates, strategy breakdowns, and everything you need to get the most out of Ypero.
		</p>
	</div>
</section>

<!-- Posts -->
<section class="max-w-4xl mx-auto px-6 pb-24">
	{#if posts.length === 0}
		<div class="text-center py-16 reveal-scale" use:reveal>
			<div class="w-16 h-16 rounded-xl bg-surface-container-highest flex items-center justify-center mx-auto mb-4">
				<span class="material-symbols-outlined text-outline text-3xl">article</span>
			</div>
			<p class="text-on-surface-variant">No posts yet. Check back soon.</p>
		</div>
	{:else}
		<div class="grid gap-5" use:reveal>
			{#each posts as post, i}
				<a
					href="/blog/{post.slug}"
					class="group block rounded-xl overflow-hidden reveal blog-card"
					style="transition-delay: {i * 100}ms;"
				>
					<div class="p-6 md:p-7 relative">
						<!-- Hover glow effect -->
						<div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
							style="background: radial-gradient(ellipse at 30% 50%, rgba(52,254,160,0.04) 0%, transparent 70%);">
						</div>

						<div class="relative">
							<!-- Top row: icon + meta -->
							<div class="flex items-center gap-4 mb-4">
								<div class="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors duration-300">
									<span class="material-symbols-outlined text-primary text-lg">article</span>
								</div>
								<div class="flex items-center gap-3 text-xs text-on-surface-variant">
									<span>{formatDate(post.date)}</span>
									<span class="w-1 h-1 rounded-full bg-outline-variant"></span>
									<span class="flex items-center gap-1">
										<span class="material-symbols-outlined text-xs">schedule</span>
										{post.readingTime} min read
									</span>
								</div>
							</div>

							<!-- Title -->
							<h2 class="font-headline text-xl font-bold group-hover:text-primary transition-colors duration-300">
								{post.title}
							</h2>

							<!-- Description -->
							<p class="text-sm text-on-surface-variant mt-2 leading-relaxed line-clamp-2">
								{post.description}
							</p>

							<!-- Read more arrow -->
							<div class="mt-4 flex items-center gap-1.5 text-xs text-primary font-semibold translate-x-0 group-hover:translate-x-1 transition-transform duration-300">
								Read more
								<span class="material-symbols-outlined text-sm">arrow_forward</span>
							</div>
						</div>
					</div>

					<!-- Bottom accent bar -->
					<div class="h-[2px] bg-gradient-to-r from-primary/0 via-primary/40 to-secondary/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
				</a>
			{/each}
		</div>
	{/if}
</section>

<style>
	.blog-card {
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid rgba(255, 255, 255, 0.05);
		transition: background-color 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
	}
	.blog-card:hover {
		background: rgba(255, 255, 255, 0.04);
		border-color: rgba(52, 254, 160, 0.12);
		transform: translateY(-2px);
	}
</style>
