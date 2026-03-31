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

<section class="relative max-w-4xl mx-auto px-6 pt-16 pb-12 overflow-hidden">
	<div class="float-orb float-orb-green w-[350px] h-[350px] -top-20 right-[-120px] opacity-40"></div>

	<div class="relative" use:reveal>
		<p class="text-xs uppercase tracking-widest text-primary font-label mb-3 reveal">Blog</p>
		<h1 class="font-headline text-4xl md:text-5xl font-bold tracking-tight reveal">
			News & Guides
		</h1>
		<p class="mt-4 text-on-surface-variant text-lg max-w-xl reveal">
			Updates, strategy breakdowns, and everything you need to get the most out of Ypero.
		</p>
	</div>
</section>

<section class="max-w-4xl mx-auto px-6 pb-24">
	{#if posts.length === 0}
		<div class="text-center py-16">
			<span class="material-symbols-outlined text-outline text-4xl mb-4">article</span>
			<p class="text-on-surface-variant">No posts yet. Check back soon.</p>
		</div>
	{:else}
		<div class="grid gap-6" use:reveal>
			{#each posts as post, i}
				<a
					href="/blog/{post.slug}"
					class="group block rounded-xl overflow-hidden card-hover reveal"
					style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); transition-delay: {i * 80}ms;"
				>
					<div class="flex flex-col md:flex-row">
						<!-- Content -->
						<div class="flex-1 p-6 flex flex-col justify-center">
							<div class="flex items-center gap-3 text-xs text-on-surface-variant mb-3">
								<span>{formatDate(post.date)}</span>
								<span class="w-1 h-1 rounded-full bg-outline-variant"></span>
								<span>{post.readingTime} min read</span>
							</div>
							<h2 class="font-headline text-xl font-bold group-hover:text-primary transition-colors">
								{post.title}
							</h2>
							<p class="text-sm text-on-surface-variant mt-2 leading-relaxed line-clamp-2">
								{post.description}
							</p>
							<span class="text-xs text-primary font-semibold mt-4 inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
								Read more
								<span class="material-symbols-outlined text-sm">arrow_forward</span>
							</span>
						</div>
					</div>
				</a>
			{/each}
		</div>
	{/if}
</section>
