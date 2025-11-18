<script lang="ts">
    import 'highlight.js/styles/github.css';
    import hljs from 'highlight.js';
    import { Marked } from "marked";
    import { markedHighlight } from "marked-highlight";
    import readme from "../../README.md?raw"
	import { setWebsiteColor, websiteStore } from '$lib/stores.svelte';

    setWebsiteColor('json');

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

<svelte:head>
	<!-- base tags -->
	<title>Guifier Library: Simplify JSON, YAML, TOML & XML Data</title>
	<meta name="description" content="Discover Guifier: the interactive front-end toolkit that empowers data-driven apps with user-friendly processing of JSON, YAML, TOML, and XML data. Simplify real-time visualization, editing, and format conversion. Elevate your data manipulation with its intuitive GUI and seamless export features." />
	<link rel="canonical" href="https://guifier.com">

	<!--  Social Media Tags -->
	<meta property="og:title" content="Guifier: Interactive Front-End Toolkit for JSON, YAML, TOML, and XML Data">
	<meta property="og:type" content="website" />
	<meta property="og:image" content="https://guifier.com/thumbnail.jpg">
	<meta property="og:url" content="https://guifier.com">
	<meta name="twitter:card" content="summary_large_image">
	<meta property="og:description" content="Discover Guifier: the interactive front-end toolkit that empowers data-driven apps with user-friendly processing of JSON, YAML, TOML, and XML data. Simplify real-time visualization, editing, and format conversion. Elevate your data manipulation with its intuitive GUI and seamless export features.">
	<meta property="og:site_name" content="Guifier">
	<meta name="twitter:image:alt" content="Guifier npm library logo">

	<!-- structured-data for search engines -->
	<script type="application/ld+json">
		{
		  "@context": "http://schema.org",
		  "@type": "WebPage",
		  "name": "Guifier: Interactive Front-End Toolkit for JSON, YAML, TOML, and XML Data",
		  "description": "Discover Guifier: the interactive front-end toolkit that empowers data-driven apps with user-friendly processing of JSON, YAML, TOML, and XML data. Simplify real-time visualization, editing, and format conversion. Elevate your data manipulation with its intuitive GUI and seamless export features.",
		  "url": "https://guifier.com/"
		}
	</script>

	<script type="application/ld+json">
		{
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Guifier", 
                    "item": "https://guifier.com/"
                }
            ]
		}
	</script>
</svelte:head>

<div class="flex justify-center p-4">
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
    >{@html html}</div>
</div>
