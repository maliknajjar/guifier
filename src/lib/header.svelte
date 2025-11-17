<script lang="ts">
	import github from '../images/github-mark.png'
	import { websiteStore } from './stores.svelte';
	import { page } from '$app/state';
</script>

<header class="flex items-center justify-between h-14 px-4 bg-background/50" style="border-bottom: 2px solid {websiteStore.borderColor};">
	<a class="font-bold italic text-2xl" href="/">Guifier</a>
	<nav class="flex gap-8 text-lg">
		<a href="/json" class="text-muted-foreground{page.url.pathname.startsWith("/json") ? "text-primary font-medium" : ""}">json</a>
		<a href="/yaml" class="text-muted-foreground{page.url.pathname.startsWith("/yaml") ? "text-primary font-medium" : ""}">yaml</a>
		<a href="/xml" class="text-muted-foreground{page.url.pathname.startsWith("/xml") ? "text-primary font-medium" : ""}">xml</a>
		<a href="/toml" class="text-muted-foreground{page.url.pathname.startsWith("/toml") ? "text-primary font-medium" : ""}">toml</a>
	</nav>
	<a href="https://github.com/maliknajjar/guifier" target="_blank" rel="noopener">
		<img class="h-8" src="{github}" alt="github_page" />
	</a>
</header>