<script lang="ts">
	import '../app.css';
	import Header from '$lib/header.svelte';
	import Footer from '$lib/footer.svelte';
	import { websiteStore } from '$lib/stores.svelte';

	let { children } = $props();
</script>

<main class="flex flex-col min-h-screen" style="background-color: {websiteStore.backgroundColor};">
	<Header />
	<div class="flex-1 bg-background/85">
		{@render children()}
	</div>
	<Footer />
</main>
