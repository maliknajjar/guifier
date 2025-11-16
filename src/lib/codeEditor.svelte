<script lang="ts">
	import CodeMirror from "svelte-codemirror-editor";
	import { LanguageSupport } from '@codemirror/language';
    import { javascript } from "@codemirror/lang-javascript";
	import { json } from "@codemirror/lang-json";
	import { yaml } from "@codemirror/lang-yaml";
	import { xml } from "@codemirror/lang-xml";

	interface Props {
		lang: "js" | "json" | "yaml" | "xml" | "toml";
		value?: string;
		class?: string;
	}

	let { lang, value = $bindable(), class: className }: Props = $props();

	let language: LanguageSupport | undefined = $state(getLang());

	function getLang(): typeof language {
		if (lang === 'js') {
			return javascript();
		} else if (lang === 'json') {
			return json();
		} else if (lang === 'toml') {
			return javascript();
		} else if (lang === 'xml') {
			return xml();
		} else if (lang === 'yaml') {
			return yaml();
		}
	}
</script>

<CodeMirror bind:value lang={language} class={className} />

<style>
	:global(.cm-editor) {
		height: 100%;
	}
</style>