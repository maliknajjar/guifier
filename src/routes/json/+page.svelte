<script lang="ts">
	import 'highlight.js/styles/github.css';
	import GuifierEditorPageContent from "$lib/guifierEditorPageContent.svelte";
	import { setWebsiteColor } from "$lib/stores.svelte";
	import hljs from 'highlight.js';
	import { Marked } from "marked";
	import { markedHighlight } from "marked-highlight";
	import mdString from "./json.md?raw";

	let html: string | undefined = $state();

	async function processMarkedFile() {
		const marked = new Marked(
			markedHighlight({
				emptyLangClass: 'hljs',
				langPrefix: 'hljs language-',
				highlight(code, lang) {
					const language = hljs.getLanguage(lang) ? lang : 'plaintext';
					return hljs.highlight(code, { language }).value;
				}
			})
		);
		html = await marked.parse(mdString);
	}

	$effect(() => {
		setWebsiteColor("json");
		processMarkedFile();
	})
</script>

<svelte:head>
    <!-- base tags -->
	<title>JSON Viewer & Editor</title>
	<meta name="description" content="Explore our JSON viewer and editor, offering seamless data interaction. Simplify JSON tasks effortlessly with Guifier's intuitive features." />
	<meta name="keywords" content="json viewer, online json viewer, json viewer online, json online viewer, json validator, validate json, json visualizer">
    <link rel="canonical" href="https://guifier.com/json">

	<!--  Social Media Tags -->
	<meta property="og:title" content="JSON Viewer & JSON editor | Guifier">
	<meta property="og:type" content="website" />
	<meta property="og:image" content="https://guifier.com/thumbnail.jpg">
	<meta property="og:url" content="https://guifier.com/json">
	<meta name="twitter:card" content="summary_large_image">
	<meta property="og:description" content="Explore our JSON viewer and editor, offering seamless data interaction. Simplify JSON tasks effortlessly with Guifier's intuitive features.">
	<meta property="og:site_name" content="JSON Viewer & JSON editor | Guifier">
	<meta name="twitter:image:alt" content="Guifier npm library logo">

	<!-- structured-data for search engines -->
	<script type="application/ld+json">
		{
		  "@context": "http://schema.org",
		  "@type": "WebPage",
		  "name": "JSON Viewer & JSON editor | Guifier",
		  "description": "Explore our JSON viewer and editor, offering seamless data interaction. Simplify JSON tasks effortlessly with Guifier's intuitive features.",
		  "url": "https://guifier.com/json"
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
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "json",
                    "item": "https://guifier.com/json"
                }
            ]
		}
	</script>
</svelte:head>

<GuifierEditorPageContent type={"json"} />
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
		{@html html}
	</div>
</div>
