<script lang="ts">
	import type { load } from './+page.server.ts'
	import 'highlight.js/styles/github.css';
	import GuifierEditorPageContent from "$lib/guifierEditorPageContent.svelte";
	import { page } from '$app/state';
	import { setWebsiteColor } from "$lib/stores.svelte";

	interface Props {
		data: Awaited<ReturnType<typeof load>>;
	}

	const { data }: Props = $props();

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
		<div class="
			w-full
			prose
			prose-pre:p-0
			prose-code:rounded-md
			prose-pre:bg-transparent
			prose-code:border-2
			prose-code:overflow-hidden
			prose-img:border-2
			prose-img:overflow-hidden
			prose-img:rounded-md
			prose-h1:mt-8"
		>
			{@html data.html}
		</div>
	</div>
{:else if page.params.type === 'yaml'}
	<GuifierEditorPageContent type={page.params.type} />
	<div class="flex justify-center p-4 pb-8">
		<div class="
			w-full
			prose
			prose-pre:p-0
			prose-code:rounded-md
			prose-pre:bg-transparent
			prose-code:border-2
			prose-code:overflow-hidden
			prose-img:border-2
			prose-img:overflow-hidden
			prose-img:rounded-md
			prose-h1:mt-8"
		>
			{@html data.html}
		</div>
	</div>
{:else if page.params.type === 'xml'}
	<GuifierEditorPageContent type={page.params.type} />
	<div class="flex justify-center p-4 pb-8">
		<div class="
			w-full
			prose
			prose-pre:p-0
			prose-code:rounded-md
			prose-pre:bg-transparent
			prose-code:border-2
			prose-code:overflow-hidden
			prose-img:border-2
			prose-img:overflow-hidden
			prose-img:rounded-md
			prose-h1:mt-8"
		>
			{@html data.html}
		</div>
	</div>
{:else if page.params.type === 'toml'}
	<GuifierEditorPageContent type={page.params.type} />
	<div class="flex justify-center p-4 pb-8">
		<div class="
			w-full
			prose
			prose-pre:p-0
			prose-code:rounded-md
			prose-pre:bg-transparent
			prose-code:border-2
			prose-code:overflow-hidden
			prose-img:border-2
			prose-img:overflow-hidden
			prose-img:rounded-md
			prose-h1:mt-8"
		>
			{@html data.html}
		</div>
	</div>
{:else}
	<div>the ({page.params.type}) page doesnt exists</div>
{/if}
