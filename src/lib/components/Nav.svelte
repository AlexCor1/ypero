<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { NAV_LINKS } from '$lib/types';
	import { isLoggedIn, isValidated, authUser, signOut } from '$lib/stores/auth';

	let mobileOpen = $state(false);

	function isActive(href: string): boolean {
		if (href === '/') return page.url.pathname === '/';
		return page.url.pathname.startsWith(href);
	}

	async function handleSignOut() {
		await signOut();
		goto('/');
	}
</script>

<nav
	class="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl h-20"
	style="border-bottom: 1px solid rgba(72, 72, 71, 0.15); box-shadow: 0 8px 32px 0 rgba(20, 241, 149, 0.05);"
>
	<div class="flex justify-between items-center max-w-7xl mx-auto px-6 h-full">
		<!-- Logo -->
		<a href="/" class="text-2xl font-bold tracking-tighter font-headline" style="color: #14F195;">
			Ypero
		</a>

		<!-- Desktop links -->
		<div class="hidden md:flex items-center gap-8 font-headline tracking-tight">
			{#each NAV_LINKS as link}
				<a
					href={link.href}
					class="text-sm uppercase transition-colors {isActive(link.href)
						? 'text-primary font-bold border-b-2 border-primary pb-1'
						: 'text-on-surface-variant hover:text-primary'}"
				>
					{link.label}
				</a>
			{/each}
		</div>

		<!-- Auth buttons -->
		<div class="flex items-center gap-4">
			{#if $isLoggedIn}
				<div class="hidden lg:flex items-center gap-3">
					{#if $isValidated}
						<span class="flex items-center gap-1.5 text-xs bg-primary/15 text-primary px-3 py-1 rounded-full font-bold">
							<span class="material-symbols-outlined text-sm">verified</span>
							Validated
						</span>
					{:else}
						<a
							href="/pricing"
							class="flex items-center gap-1.5 text-xs bg-error/15 text-error px-3 py-1 rounded-full font-bold hover:bg-error/25 transition-colors"
						>
							<span class="material-symbols-outlined text-sm">warning</span>
							Not Validated
						</a>
					{/if}
					<a
						href="/profile"
						class="flex items-center gap-1.5 text-sm text-on-surface-variant hover:text-primary transition-colors"
					>
						<span class="material-symbols-outlined text-lg">account_circle</span>
						<span class="truncate max-w-[140px]">{$authUser?.email}</span>
					</a>
				</div>
				<button
					onclick={handleSignOut}
					class="hidden lg:block px-5 py-2 text-sm font-semibold text-on-surface-variant hover:text-error transition-colors"
				>
					Sign Out
				</button>
			{:else}
				<a
					href="/auth/login"
					class="hidden lg:block px-5 py-2 text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors"
				>
					Login
				</a>
				<a
					href="/auth/register"
					class="bg-primary text-on-primary px-6 py-2.5 rounded-xl font-bold active:scale-95 transition-all duration-300 text-sm"
				>
					Get Started
				</a>
			{/if}

			<!-- Mobile hamburger -->
			<button
				class="md:hidden text-on-surface-variant"
				onclick={() => (mobileOpen = !mobileOpen)}
				aria-label="Toggle menu"
			>
				<span class="material-symbols-outlined text-2xl">
					{mobileOpen ? 'close' : 'menu'}
				</span>
			</button>
		</div>
	</div>

	<!-- Mobile menu -->
	{#if mobileOpen}
		<div class="md:hidden bg-surface-container/95 backdrop-blur-xl px-6 pb-6 pt-2">
			{#each NAV_LINKS as link}
				<a
					href={link.href}
					onclick={() => (mobileOpen = false)}
					class="block py-3 font-headline text-sm uppercase transition-colors {isActive(link.href)
						? 'text-primary font-bold'
						: 'text-on-surface-variant'}"
				>
					{link.label}
				</a>
			{/each}
			<div class="mt-4 pt-4" style="border-top: 1px solid rgba(72, 72, 71, 0.15);">
				{#if $isLoggedIn}
					<a
						href="/profile"
						onclick={() => (mobileOpen = false)}
						class="flex items-center gap-2 py-3 text-on-surface-variant font-headline text-sm hover:text-primary transition-colors"
					>
						<span class="material-symbols-outlined text-lg">account_circle</span>
						Profile
					</a>
					<div class="flex items-center gap-2 py-2">
						{#if $isValidated}
							<span class="material-symbols-outlined text-primary text-sm">verified</span>
							<span class="text-xs text-primary font-bold">Validated</span>
						{:else}
							<span class="material-symbols-outlined text-error text-sm">warning</span>
							<a href="/pricing" class="text-xs text-error font-bold" onclick={() => (mobileOpen = false)}>Not Validated — Purchase Now</a>
						{/if}
					</div>
					<p class="text-xs text-on-surface-variant py-1 truncate">{$authUser?.email}</p>
					<button
						onclick={() => { mobileOpen = false; handleSignOut(); }}
						class="block py-3 text-error font-headline text-sm"
					>
						Sign Out
					</button>
				{:else}
					<a href="/auth/login" class="block py-3 text-on-surface-variant font-headline text-sm" onclick={() => (mobileOpen = false)}>
						Login
					</a>
					<a href="/auth/register" class="block py-3 text-primary font-headline text-sm font-bold" onclick={() => (mobileOpen = false)}>
						Get Started
					</a>
				{/if}
			</div>
		</div>
	{/if}
</nav>
