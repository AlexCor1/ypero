<script lang="ts">
	import { goto } from '$app/navigation';
	import { isLoggedIn, isValidated, authUser, profile, authReady, signOut } from '$lib/stores/auth';
	import { reveal } from '$lib/actions/reveal';

	$effect(() => {
		if ($authReady && !$isLoggedIn) {
			goto('/auth/login');
		}
	});

	async function handleSignOut() {
		await signOut();
		goto('/');
	}

	function formatDate(iso: string | null): string {
		if (!iso) return '—';
		return new Date(iso).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	const platforms = [
		{
			name: 'Windows',
			icon: 'desktop_windows',
			file: 'https://github.com/AlexCor1/ypero/releases/download/v1.0/ypero-windows.zip',
			detail: 'Windows 10/11 · x64'
		},
		{
			name: 'Linux',
			icon: 'terminal',
			file: 'https://github.com/AlexCor1/ypero/releases/download/v1.0/ypero-linux.zip',
			detail: 'Debian (.deb) & RPM'
		},
		{
			name: 'macOS',
			icon: 'laptop_mac',
			file: '/downloads/ypero-desktop-macos.zip',
			detail: 'macOS 12+ · Apple Silicon & Intel',
			comingSoon: true
		}
	];
</script>

<svelte:head>
	<title>Profile | Ypero</title>
</svelte:head>

{#if $isLoggedIn}
<section class="max-w-2xl mx-auto px-6 pt-16 pb-24">

	<!-- Header -->
	<div class="flex items-center justify-between mb-10">
		<div>
			<h1 class="font-headline text-3xl font-bold">Your Profile</h1>
			<p class="text-on-surface-variant text-sm mt-1">Manage your account and bot access.</p>
		</div>
		<button
			onclick={handleSignOut}
			class="px-5 py-2 text-sm font-semibold text-on-surface-variant hover:text-error transition-colors ghost-border rounded-lg"
		>
			Sign Out
		</button>
	</div>

	<!-- Verification status card -->
	{#if $isValidated}
		<div class="rounded-xl p-6 bg-primary/5 mb-6" style="border: 1px solid rgba(52, 254, 160, 0.15);">
			<div class="flex items-center gap-4">
				<div class="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
					<span class="material-symbols-outlined text-primary text-2xl">verified</span>
				</div>
				<div>
					<p class="font-headline font-bold">Account Validated</p>
					<p class="text-xs text-on-surface-variant mt-0.5">
						Lifetime access activated
						{#if $profile?.paid_at}
							on {formatDate($profile.paid_at)}
						{/if}
					</p>
				</div>
			</div>
		</div>
	{:else}
		<div class="rounded-xl p-6 bg-error/5 mb-6" style="border: 1px solid rgba(255, 113, 108, 0.15);">
			<div class="flex items-center justify-between gap-4">
				<div class="flex items-center gap-4">
					<div class="w-12 h-12 rounded-full bg-error/15 flex items-center justify-center shrink-0">
						<span class="material-symbols-outlined text-error text-2xl">warning</span>
					</div>
					<div>
						<p class="font-headline font-bold">Account Not Validated</p>
						<p class="text-xs text-on-surface-variant mt-0.5">
							Purchase the validation fee to unlock the bot and all features.
						</p>
					</div>
				</div>
				<a
					href="/pricing"
					class="bg-primary text-on-primary px-5 py-2.5 rounded-xl font-bold text-sm active:scale-[0.98] transition-all shrink-0"
				>
					Validate Now
				</a>
			</div>
		</div>
	{/if}

	<!-- Account details -->
	<div class="glass-card rounded-xl p-6 mb-6">
		<h2 class="font-headline font-bold text-sm uppercase tracking-widest text-on-surface-variant mb-5">
			Account Details
		</h2>
		<div class="space-y-4">
			<div class="flex justify-between items-center">
				<span class="text-sm text-on-surface-variant">Email</span>
				<span class="text-sm font-semibold">{$authUser?.email}</span>
			</div>
			<div class="w-full h-px bg-outline-variant/15"></div>
			<div class="flex justify-between items-center">
				<span class="text-sm text-on-surface-variant">Member Since</span>
				<span class="text-sm font-semibold">{formatDate($profile?.created_at ?? null)}</span>
			</div>
			<div class="w-full h-px bg-outline-variant/15"></div>
			<div class="flex justify-between items-center">
				<span class="text-sm text-on-surface-variant">Validation Status</span>
				{#if $isValidated}
					<span class="flex items-center gap-1.5 text-xs bg-primary/15 text-primary px-3 py-1 rounded-full font-bold">
						<span class="material-symbols-outlined text-sm">check_circle</span>
						Active
					</span>
				{:else}
					<span class="flex items-center gap-1.5 text-xs bg-error/15 text-error px-3 py-1 rounded-full font-bold">
						<span class="material-symbols-outlined text-sm">cancel</span>
						Pending
					</span>
				{/if}
			</div>
			{#if $profile?.stripe_payment_id}
				<div class="w-full h-px bg-outline-variant/15"></div>
				<div class="flex justify-between items-center">
					<span class="text-sm text-on-surface-variant">Payment ID</span>
					<span class="text-xs font-mono text-outline truncate max-w-[200px]">{$profile.stripe_payment_id}</span>
				</div>
			{/if}
		</div>
	</div>

	<!-- Download & Getting Started -->
	<div class="glass-card rounded-xl p-6">
		<h2 class="font-headline font-bold text-sm uppercase tracking-widest text-on-surface-variant mb-5">
			Download & Setup
		</h2>

		{#if $isValidated}

			<!-- Platform download cards -->
			<div class="grid gap-3 mb-8" use:reveal>
				{#each platforms as p}
					<div
						class="flex items-center justify-between p-4 rounded-xl card-hover reveal {p.comingSoon ? 'opacity-60' : ''}"
						style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05);"
					>
						<div class="flex items-center gap-4">
							<div class="w-11 h-11 rounded-lg bg-surface-container-highest flex items-center justify-center shrink-0">
								<span class="material-symbols-outlined text-primary text-xl">{p.icon}</span>
							</div>
							<div>
								<p class="text-sm font-semibold flex items-center gap-2">
									{p.name}
									{#if p.comingSoon}
										<span class="text-[10px] bg-surface-container-highest text-on-surface-variant px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">
											Coming Soon
										</span>
									{/if}
								</p>
								<p class="text-xs text-on-surface-variant mt-0.5">{p.detail}</p>
							</div>
						</div>

						{#if p.comingSoon}
							<span class="text-xs text-on-surface-variant">Notify me</span>
						{:else}
							<a
								href={p.file}
								download
								class="bg-primary text-on-primary px-5 py-2 rounded-xl font-bold text-sm active:scale-[0.98] transition-all inline-flex items-center gap-1.5 shrink-0"
							>
								<span class="material-symbols-outlined text-base">download</span>
								Download
							</a>
						{/if}
					</div>
				{/each}
			</div>

			<!-- Getting started steps -->
			<h3 class="font-headline font-bold text-sm mb-5">Getting Started</h3>

			<div class="space-y-0">
				<!-- Step 1 -->
				<div class="flex gap-4">
					<div class="flex flex-col items-center">
						<div class="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center text-xs font-bold shrink-0">1</div>
						<div class="w-px flex-1 bg-outline-variant/20 my-1"></div>
					</div>
					<div class="pb-6">
						<p class="text-sm font-semibold">Download & Log In</p>
						<p class="text-xs text-on-surface-variant mt-1 leading-relaxed">
							Download the app for your platform above. Extract the archive, open Ypero, and sign in with the same email and password you used to create this account. Your validated status syncs automatically.
						</p>
					</div>
				</div>

				<!-- Step 2 -->
				<div class="flex gap-4">
					<div class="flex flex-col items-center">
						<div class="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center text-xs font-bold shrink-0">2</div>
						<div class="w-px flex-1 bg-outline-variant/20 my-1"></div>
					</div>
					<div class="pb-6">
						<p class="text-sm font-semibold">Configure API Keys & Settings</p>
						<p class="text-xs text-on-surface-variant mt-1 leading-relaxed">
							Go to Settings in the app. Paste your Polymarket API credentials (API Key, Secret, and Passphrase).
							Set your preferred bet size ($5–$100 per trade) and configure your risk parameters.
						</p>
						<div class="mt-3 rounded-lg bg-surface-container-lowest p-3">
							<p class="text-xs text-on-surface-variant font-mono leading-relaxed">
								<span class="text-primary">POLYMARKET_API_KEY</span>=your_key_here<br/>
								<span class="text-primary">POLYMARKET_API_SECRET</span>=your_secret_here<br/>
								<span class="text-primary">POLYMARKET_API_PASSPHRASE</span>=your_passphrase<br/>
								<span class="text-primary">POLYMARKET_PRIVATE_KEY</span>=your_wallet_key<br/>
								<span class="text-primary">POLYMARKET_FUNDER</span>=your_wallet_address
							</p>
						</div>
						<p class="text-xs text-on-surface-variant mt-2 flex items-start gap-1.5">
							<span class="material-symbols-outlined text-sm mt-px shrink-0">help</span>
							Don't have API keys? Follow the
							<a href="https://docs.polymarket.com" target="_blank" rel="noopener" class="text-primary hover:underline">Polymarket API docs</a>
							to generate them from your account.
						</p>
					</div>
				</div>

				<!-- Step 3 -->
				<div class="flex gap-4">
					<div class="flex flex-col items-center">
						<div class="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center text-xs font-bold shrink-0">3</div>
						<div class="w-px flex-1 bg-outline-variant/20 my-1"></div>
					</div>
					<div class="pb-6">
						<p class="text-sm font-semibold">VPN Setup (If Required)</p>
						<p class="text-xs text-on-surface-variant mt-1 leading-relaxed">
							Polymarket is restricted in some countries (including the US, France, and others).
							If you're in a restricted region, connect to a VPN server in an allowed country before starting the bot.
							Popular choices: Canada, UK, Germany, Singapore.
						</p>
						<div class="mt-2 flex items-start gap-1.5">
							<span class="material-symbols-outlined text-error text-sm mt-px shrink-0">warning</span>
							<p class="text-xs text-on-surface-variant">
								The bot will fail to connect to Polymarket without a VPN if you're in a restricted region. Make sure the VPN is active before launching.
							</p>
						</div>
					</div>
				</div>

				<!-- Step 4 -->
				<div class="flex gap-4">
					<div class="flex flex-col items-center">
						<div class="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center text-xs font-bold shrink-0">4</div>
					</div>
					<div class="pb-2">
						<p class="text-sm font-semibold">Start the Bot & Monitor</p>
						<p class="text-xs text-on-surface-variant mt-1 leading-relaxed">
							Click "Start Trading" in the app. The bot will connect to Binance for price data and begin executing trades on the next 15-minute Polymarket cycle.
							You can monitor live PnL, trade history, and risk metrics from the dashboard.
						</p>
						<div class="mt-3 p-3 rounded-lg bg-primary/5 flex items-start gap-2" style="border: 1px solid rgba(52, 254, 160, 0.1);">
							<span class="material-symbols-outlined text-primary text-sm mt-px shrink-0">tips_and_updates</span>
							<p class="text-xs text-on-surface-variant">
								<span class="text-on-surface font-semibold">Pro tip:</span> Start with a small bet size ($5–$10) for the first few days to get comfortable with the bot's behavior. Scale up once you've confirmed it's working as expected.
							</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Support -->
			<div class="mt-8 pt-6" style="border-top: 1px solid rgba(72, 72, 71, 0.15);">
				<div class="flex items-center justify-between">
					<div>
						<p class="text-sm font-semibold">Need help?</p>
						<p class="text-xs text-on-surface-variant mt-0.5">Our team usually responds within a few hours.</p>
					</div>
					<div class="flex gap-2">
						<a href="/about" class="flex items-center gap-1.5 text-xs bg-surface-container-highest text-on-surface-variant px-4 py-2 rounded-lg font-semibold hover:bg-surface-bright transition-colors">
							<span class="material-symbols-outlined text-sm">forum</span>
							Discord
						</a>
						<a href="/about" class="flex items-center gap-1.5 text-xs bg-surface-container-highest text-on-surface-variant px-4 py-2 rounded-lg font-semibold hover:bg-surface-bright transition-colors">
							<span class="material-symbols-outlined text-sm">send</span>
							Telegram
						</a>
					</div>
				</div>
			</div>

		{:else}
			<!-- Locked state -->
			<div class="text-center py-8">
				<div class="w-16 h-16 rounded-xl bg-surface-container-highest flex items-center justify-center mx-auto mb-4">
					<span class="material-symbols-outlined text-outline text-3xl">lock</span>
				</div>
				<p class="text-sm font-semibold mb-1">Bot Access Locked</p>
				<p class="text-sm text-on-surface-variant mb-5 max-w-sm mx-auto">
					Validate your account to download the bot and access the setup guide.
				</p>
				<a
					href="/pricing"
					class="bg-primary text-on-primary px-8 py-3 rounded-xl font-bold active:scale-[0.98] transition-all inline-flex items-center gap-2"
				>
					Validate Account — $49.95
					<span class="material-symbols-outlined text-lg">arrow_forward</span>
				</a>
			</div>
		{/if}
	</div>

</section>
{/if}
