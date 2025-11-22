<script lang="ts">
    import 'highlight.js/styles/github.css';
    import hljs from 'highlight.js';
    import { Marked } from "marked";
    import { markedHighlight } from "marked-highlight";
	import { onMount } from 'svelte';

    interface Props {
        mdName: string;
    }

    const { mdName }: Props = $props();
    let html: string = $state("");

    onMount(async () => {
        const mdString = (await import(`./md/${mdName}.md?raw`)).default;
        const marked = new Marked(
            markedHighlight({
                emptyLangClass: 'hljs',
                langPrefix: 'hljs language-',
                highlight(code, lang, info) {
                    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
                    return hljs.highlight(code, { language }).value;
                }
            })
        );
        html = await marked.parse(mdString);
    });

</script>

{#if html}
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
        {@html html}
    </div>
{/if}
