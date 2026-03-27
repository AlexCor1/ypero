<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabase';

	onMount(async () => {
		const { error } = await supabase.auth.getSession();
		if (error) {
			console.error('Auth callback error:', error);
			goto('/auth/login');
		} else {
			goto('/');
		}
	});
</script>

<section class="min-h-[80vh] flex items-center justify-center">
	<div class="text-center">
		<span class="material-symbols-outlined text-primary text-4xl animate-spin">progress_activity</span>
		<p class="text-on-surface-variant text-sm mt-4">Confirming your account...</p>
	</div>
</section>
