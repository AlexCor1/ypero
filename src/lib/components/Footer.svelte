<script lang="ts">
	const year = new Date().getFullYear();
</script>

<footer class="bg-surface-container-lowest pt-16 pb-8">
	<div class="max-w-7xl mx-auto px-6">
		<div class="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
			<!-- Brand -->
			<div>
				<span class="text-xl font-bold tracking-tighter font-headline" style="color: #14F195;">
					Ypero
				</span>
				<p class="mt-3 text-sm text-on-surface-variant leading-relaxed">
					The ultimate bot for Solana traders on Polymarket. Speed,
					precision, and trust.
				</p>
			</div>

			<!-- Socials -->
			<div>
				<h4 class="text-xs font-headline uppercase tracking-widest text-on-surface-variant mb-4">
					Community
				</h4>
				<div class="flex flex-col gap-2.5">
					<a href="/" class="text-sm text-on-surface-variant hover:text-primary transition-colors">X</a>
					<a href="/" class="text-sm text-on-surface-variant hover:text-primary transition-colors">Telegram</a>
					<a href="/" class="text-sm text-on-surface-variant hover:text-primary transition-colors">Discord</a>
				</div>
			</div>

			<!-- Legal -->
			<div>
				<h4 class="text-xs font-headline uppercase tracking-widest text-on-surface-variant mb-4">
					Legal
				</h4>
				<div class="flex flex-col gap-2.5">
					<a href="/privacy" class="text-sm text-on-surface-variant hover:text-primary transition-colors">Privacy Policy</a>
					<a href="/terms" class="text-sm text-on-surface-variant hover:text-primary transition-colors">Terms of Service</a>
				</div>
			</div>

			<!-- Status -->
			<div>
				<h4 class="text-xs font-headline uppercase tracking-widest text-on-surface-variant mb-4">
					Status
				</h4>
				<div class="flex items-center gap-2">
					<span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
					<span class="text-sm text-on-surface-variant">All systems operational</span>
				</div>
			</div>
		</div>

		<!-- Bottom bar -->
		<div
			class="flex flex-col md:flex-row justify-between items-center pt-6 gap-4"
			style="border-top: 1px solid rgba(72, 72, 71, 0.15);"
		>
			<span class="text-xs text-on-surface-variant">
				&copy; {year} Ypero. All rights reserved.
			</span>
			<div class="flex items-center gap-3">
				<span class="material-symbols-outlined text-primary text-lg">security</span>
				<span class="material-symbols-outlined text-secondary text-lg">bolt</span>
				<span class="material-symbols-outlined text-tertiary text-lg">verified</span>
			</div>
		</div>
	</div>
</footer>
