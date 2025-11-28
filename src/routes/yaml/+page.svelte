<script lang="ts">
	import 'highlight.js/styles/github.css';
	import GuifierEditorPageContent from "$lib/guifierEditorPageContent.svelte";
	import { setWebsiteColor } from "$lib/stores.svelte";
	import hljs from 'highlight.js';
	import { Marked } from "marked";
	import { markedHighlight } from "marked-highlight";
	import mdString from "./yaml.md?raw";

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
		setWebsiteColor("yaml");
		processMarkedFile();
	})
</script>
<svelte:head>
    <!-- base tags -->
	<title>YAML Viewer & Editor</title>
	<meta name="description" content="Explore our YAML viewer and editor, offering seamless data interaction. Simplify YAML tasks effortlessly with Guifier's intuitive features." />
	<meta name="keywords" content="yaml viewer, online yaml viewer, yaml viewer online, yaml online viewer, yaml validator, validate yaml, yaml visualizer">
	<link rel="canonical" href="https://guifier.com/yaml">

	<!--  Social Media Tags -->
	<meta property="og:title" content="YAML Viewer & YAML editor | Guifier">
	<meta property="og:type" content="website" />
	<meta property="og:image" content="https://guifier.com/thumbnail.jpg">
	<meta property="og:url" content="https://guifier.com/yaml">
	<meta name="twitter:card" content="summary_large_image">
	<meta property="og:description" content="Explore our YAML viewer and editor, offering seamless data interaction. Simplify YAML tasks effortlessly with Guifier's intuitive features.">
	<meta property="og:site_name" content="YAML Viewer & YAML editor | Guifier">
	<meta name="twitter:image:alt" content="Guifier npm library logo">

	<!-- structured-data for search engines -->
	<script type="application/ld+json">
		{
		  "@context": "http://schema.org",
		  "@type": "WebPage",
		  "name": "YAML Viewer & YAML editor | Guifier",
		  "description": "Explore our YAML viewer and editor, offering seamless data interaction. Simplify YAML tasks effortlessly with Guifier's intuitive features.",
		  "url": "https://guifier.com/yaml"
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
                    "name": "yaml",
                    "item": "https://guifier.com/yaml"
                }
            ]
		}
	</script>
</svelte:head>

<GuifierEditorPageContent type={"yaml"} />
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
