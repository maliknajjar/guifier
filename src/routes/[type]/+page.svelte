<script lang="ts">
	import GuifierEditorPageContent from "$lib/guifierEditorPageContent.svelte";
	import { page } from '$app/state';
</script>

{#if page.params.type === 'json'}
	<GuifierEditorPageContent type={page.params.type} />
{:else if page.params.type === 'yaml'}
	<GuifierEditorPageContent type={page.params.type} />
{:else if page.params.type === 'xml'}
	<GuifierEditorPageContent type={page.params.type} />
{:else if page.params.type === 'toml'}
	<GuifierEditorPageContent type={page.params.type} />
{:else}
	<div>the ({page.params.type}) page doesnt exists</div>
{/if}
