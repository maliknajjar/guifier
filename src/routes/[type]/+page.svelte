<script lang="ts">
	import GuifierEditorPageContent from "$lib/guifierEditorPageContent.svelte";
	import { page } from '$app/state';
	import { setWebsiteColor } from "$lib/stores.svelte";
	import MdRenderer from "$lib/mdRenderer.svelte";

	$effect(() => {
		if (page.params.type === 'json') {
			setWebsiteColor(page.params.type)
		} else if (page.params.type === 'yaml') {
			setWebsiteColor(page.params.type)
		} else if (page.params.type === 'xml') {
			setWebsiteColor(page.params.type)
		} else if (page.params.type === 'toml') {
			setWebsiteColor(page.params.type)
		}
	})
</script>

{#if page.params.type === 'json'}
	<GuifierEditorPageContent type={page.params.type} />
	<div class="flex justify-center p-4 pb-8">
		<MdRenderer mdName="json" />
	</div>
{:else if page.params.type === 'yaml'}
	<GuifierEditorPageContent type={page.params.type} />
	<div class="flex justify-center p-4 pb-8">
		<MdRenderer mdName="yaml" />
	</div>
{:else if page.params.type === 'xml'}
	<GuifierEditorPageContent type={page.params.type} />
	<div class="flex justify-center p-4 pb-8">
		<MdRenderer mdName="xml" />
	</div>
{:else if page.params.type === 'toml'}
	<GuifierEditorPageContent type={page.params.type} />
	<div class="flex justify-center p-4 pb-8">
		<MdRenderer mdName="toml" />
	</div>
{:else}
	<div>the ({page.params.type}) page doesnt exists</div>
{/if}
