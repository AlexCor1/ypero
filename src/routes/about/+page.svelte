<script lang="ts">
	let name = $state('');
	let email = $state('');
	let message = $state('');
	let sending = $state(false);

	async function handleSubmit() {
		sending = true;
		// TODO: POST to Supabase contact_messages table
		console.log('Submit:', { name, email, message });
		sending = false;
	}
</script>

<svelte:head>
	<title>About & Contact | Ypero</title>
</svelte:head>

<!-- Hero -->
<section class="max-w-4xl mx-auto px-6 pt-16 pb-20 text-center">
	<h1 class="font-headline text-4xl md:text-6xl font-bold tracking-tight">
		Three Friends.
		<br />
		<span class="kinetic-gradient">One Vision.</span>
	</h1>
	<p class="mt-6 text-on-surface-variant text-lg max-w-xl mx-auto leading-relaxed">
		We're three friends and crypto lovers who built this tool to share our project and expertise. Ypero was born from a simple idea: how can I exploit the confidence of a market to earn extra income.
	</p>
</section>

<!-- Team cards -->
<section class="max-w-7xl mx-auto px-6 pb-20">
	<div class="grid md:grid-cols-3 gap-6">
		{#each [
			{ name: 'Alex', role: 'Lead Architect', icon: 'code', desc: 'Tech enthusiast. Loves the idea of combining tech and finance. Always looking for the new opportunity.' },
			{ name: 'Marcus', role: 'Quant Strategy', icon: 'bar_chart', desc: 'A math-crypto lover who believes in data over hype. If you lose money, he\'s the guy to blame. Will beat you at Valorant ' },
			{ name: 'Elena', role: 'Community Manager', icon: 'image', desc: 'She\'s the reason you found the website in the first place. Will try to take your money. Loves marketing a bit too much' },
		] as member}
			<div class="glass-card rounded-xl p-8">
				<div class="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center mb-6">
					<span class="material-symbols-outlined text-primary">{member.icon}</span>
				</div>
				<h3 class="font-headline text-xl font-bold">{member.name}</h3>
				<p class="text-xs uppercase tracking-widest text-primary font-bold mt-1">{member.role}</p>
				<p class="text-sm text-on-surface-variant mt-3 leading-relaxed">{member.desc}</p>
			</div>
		{/each}
	</div>
</section>

<!-- Philosophy -->
<section class="max-w-7xl mx-auto px-6 pb-24">
	<div
		class="rounded-2xl bg-gradient-to-br from-surface-container-high to-surface-container-low p-10 md:p-14 grid md:grid-cols-2 gap-10 ghost-border"
	>
		<div>
			<p class="text-xs uppercase tracking-[0.3em] text-primary font-label mb-3">Our Philosophy</p>
			<h2 class="font-headline text-3xl md:text-4xl font-bold leading-tight">
				Built by Traders,
				<br />For Traders.
			</h2>
		</div>
		<div class="space-y-5">
			{#each [
				'We prioritize precision over flashy UI, delivering the metrics that actually matter for your PnL.',
				'Always available so you never miss an opportunity. The only bot beating Polymarket',
				'Open transparency. We share our logic and data because we trust the community.',
			] as point}
				<div class="flex items-start gap-3">
					<span class="material-symbols-outlined text-primary mt-0.5">check_circle</span>
					<p class="text-sm text-on-surface-variant leading-relaxed">{point}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Contact + Community -->
<section class="max-w-7xl mx-auto px-6 pb-24 grid md:grid-cols-2 gap-16">
	<!-- Contact form -->
	<div>
		<h2 class="font-headline text-2xl font-bold mb-6">Get in Touch</h2>

		<div class="space-y-5">
			<div class="grid grid-cols-2 gap-4">
				<div>
					<label class="text-xs uppercase tracking-widest text-on-surface-variant font-label block mb-2">
						Name
					</label>
					<div class="flex items-center gap-2 bg-surface-container-highest rounded-lg px-4 py-3">
						<span class="material-symbols-outlined text-on-surface-variant text-lg">person</span>
						<input
							type="text"
							bind:value={name}
							placeholder="John Doe"
							class="bg-transparent outline-none text-sm flex-1 text-on-surface placeholder:text-outline"
						/>
					</div>
				</div>
				<div>
					<label class="text-xs uppercase tracking-widest text-on-surface-variant font-label block mb-2">
						Email
					</label>
					<div class="flex items-center gap-2 bg-surface-container-highest rounded-lg px-4 py-3">
						<span class="material-symbols-outlined text-on-surface-variant text-lg">alternate_email</span>
						<input
							type="email"
							bind:value={email}
							placeholder="john@example.com"
							class="bg-transparent outline-none text-sm flex-1 text-on-surface placeholder:text-outline"
						/>
					</div>
				</div>
			</div>

			<div>
				<label class="text-xs uppercase tracking-widest text-on-surface-variant font-label block mb-2">
					Message
				</label>
				<div class="flex items-start gap-2 bg-surface-container-highest rounded-lg px-4 py-3">
					<span class="material-symbols-outlined text-on-surface-variant text-lg mt-0.5">chat</span>
					<textarea
						bind:value={message}
						placeholder="How can we help you?"
						rows="5"
						class="bg-transparent outline-none text-sm flex-1 text-on-surface placeholder:text-outline resize-y"
					></textarea>
				</div>
			</div>

			<button
				onclick={handleSubmit}
				disabled={sending}
				class="bg-primary text-on-primary px-8 py-3 rounded-xl font-bold active:scale-[0.98] transition-all disabled:opacity-50"
			>
				{sending ? 'Sending...' : 'Send Signal'}
			</button>
		</div>
	</div>

	<!-- Community links -->
	<div>
		<h2 class="font-headline text-2xl font-bold mb-3">Community</h2>
		<p class="text-on-surface-variant text-sm mb-6">
			Come chat with the founders and other traders.
		</p>

		<div class="space-y-3">
			{#each [
				{ name: 'Telegram', sub: 'Live signals & chat', icon: 'send' },
				{ name: 'Discord', sub: 'Development logs', icon: 'forum' },
				{ name: 'X (Twitter)', sub: 'Daily market updates', icon: 'share' },
			] as link}
				<a
					href="#"
					class="flex items-center justify-between bg-surface-container rounded-xl p-4 hover:bg-surface-bright transition-colors"
				>
					<div class="flex items-center gap-4">
						<div class="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center">
							<span class="material-symbols-outlined text-primary">{link.icon}</span>
						</div>
						<div>
							<p class="font-headline font-bold text-sm">{link.name}</p>
							<p class="text-xs text-on-surface-variant">{link.sub}</p>
						</div>
					</div>
					<span class="material-symbols-outlined text-on-surface-variant">arrow_forward</span>
				</a>
			{/each}
		</div>
	</div>
</section>
