<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { initAuth } from '$lib/stores/auth';

	let { children } = $props();

	onMount(() => {
		const unsubscribe = initAuth();
		return unsubscribe;
	});
</script>

<Nav />

<main class="min-h-screen pt-20">
	{@render children()}
</main>

<Footer />
