<script lang="ts">
	import { websiteStore } from "./stores.svelte";
</script>

<footer class="border-t-2 p-6 bg-background/75" style="border-top: 2px solid {websiteStore.borderColor};">
	<div class="max-w-6xl mx-auto">
		<div class="flex flex-col items-center gap-6">
			<nav class="flex flex-wrap gap-6 justify-center text-sm">
				<a href="/about" class="text-muted-foreground hover:text-primary transition-colors">About</a>
				<a href="/contact" class="text-muted-foreground hover:text-primary transition-colors">Contact</a>
				<a href="/privacy" class="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
				<a href="/terms" class="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a>
				<a href="https://github.com/maliknajjar/guifier" target="_blank" rel="noopener" class="text-muted-foreground hover:text-primary transition-colors">GitHub</a>
			</nav>
			<div class="text-center text-sm text-muted-foreground">
				Copyright ©&nbsp;<a class="underline font-bold hover:text-primary" href="https://github.com/maliknajjar/guifier" target="_blank" rel="noopener">Guifier</a>&nbsp;2023-{new Date().getFullYear()} | Released under the&nbsp;<a class="underline font-bold hover:text-primary" href="https://github.com/maliknajjar/guifier/blob/main/LICENSE" target="_blank" rel="noopener">MIT license</a>
			</div>
		</div>
	</div>
</footer>