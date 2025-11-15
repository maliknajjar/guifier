<script lang="ts">
    import 'highlight.js/styles/github.css';
    import hljs from 'highlight.js';
    import { Marked } from "marked";
    import { markedHighlight } from "marked-highlight";
    import readme from "../../README.md?raw"

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

    let html = marked.parse(readme);
</script>

<div class="flex justify-center p-4">
    <div class="prose prose-pre:p-0 prose-code:border prose-img:border prose-img:rounded-md prose-h1:mt-8">{@html html}</div>
</div>
