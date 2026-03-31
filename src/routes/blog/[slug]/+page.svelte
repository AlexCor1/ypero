<script lang="ts">
	let { data } = $props();
	const post = data.post;

	function formatDate(iso: string): string {
		return new Date(iso).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>{post.title} | Ypero Blog</title>
	<meta name="description" content={post.description} />
</svelte:head>

<article class="max-w-3xl mx-auto px-6 pt-16 pb-24">

	<!-- Back link -->
	<a
		href="/blog"
		class="inline-flex items-center gap-1 text-xs text-on-surface-variant hover:text-primary transition-colors mb-8"
	>
		<span class="material-symbols-outlined text-sm">arrow_back</span>
		Back to Blog
	</a>

	<!-- Meta -->
	<div class="flex items-center gap-3 text-xs text-on-surface-variant mb-4">
		<span>{formatDate(post.date)}</span>
		<span class="w-1 h-1 rounded-full bg-outline-variant"></span>
		<span>{post.readingTime} min read</span>
	</div>

	<!-- Title -->
	<h1 class="font-headline text-3xl md:text-4xl font-bold tracking-tight leading-tight">
		{post.title}
	</h1>
	<p class="text-on-surface-variant text-lg mt-3 leading-relaxed">{post.description}</p>

	<!-- Rendered markdown -->
	<div class="prose mt-10">
		{@html post.html}
	</div>

	<!-- Footer CTA -->
	<div class="mt-16 pt-8" style="border-top: 1px solid rgba(72, 72, 71, 0.15);">
		<div class="glass-card rounded-xl p-8 text-center">
			<h3 class="font-headline text-xl font-bold mb-2">Ready to start trading?</h3>
			<p class="text-sm text-on-surface-variant mb-5">
				Try the simulator or get lifetime access to the Ypero bot.
			</p>
			<div class="flex items-center justify-center gap-3">
				<a href="/simulator" class="bg-surface-container-highest/40 text-on-surface px-6 py-2.5 rounded-xl font-semibold text-sm ghost-border hover:bg-surface-bright transition-colors">
					Try Simulator
				</a>
				<a href="/pricing" class="bg-primary text-on-primary px-6 py-2.5 rounded-xl font-bold text-sm active:scale-[0.98] transition-all">
					Get Ypero
				</a>
			</div>
		</div>
	</div>
</article>
