<script lang="ts">
	import '../app.css';
	import Header from '$lib/header.svelte';
	import Footer from '$lib/footer.svelte';

	let { children } = $props();
</script>

<Header />
<div class="flex-1">
	{@render children()}
</div>
<Footer />
