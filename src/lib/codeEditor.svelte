<script lang="ts">
	import CodeMirror from "svelte-codemirror-editor";
    import { javascript } from "@codemirror/lang-javascript";

	interface Props {
		value?: string;
		class?: string;
	}

	let { value = $bindable(), class: className }: Props = $props();
</script>

<CodeMirror bind:value lang={javascript()} class={className} />

<style>
	:global(.cm-editor) {
		height: 100%;
	}
</style>