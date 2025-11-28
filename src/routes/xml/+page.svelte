<script lang="ts">
	import 'highlight.js/styles/github.css';
	import GuifierEditorPageContent from "$lib/guifierEditorPageContent.svelte";
	import { setWebsiteColor } from "$lib/stores.svelte";
	import hljs from 'highlight.js';
	import { Marked } from "marked";
	import { markedHighlight } from "marked-highlight";
	import mdString from "./xml.md?raw";

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
		setWebsiteColor("xml");
		processMarkedFile();
	})
</script>

<svelte:head>
	<!-- base tags -->
	<title>XML Viewer & Editor</title>
	<meta name="description" content="Explore our XML viewer and editor, offering seamless data interaction. Simplify XML tasks effortlessly with Guifier's intuitive features." />
	<meta name="keywords" content="xml viewer, online xml viewer, xml viewer online, xml online viewer, xml validator, validate xml, xml visualizer">
	<link rel="canonical" href="https://guifier.com/xml">

	<!--  Social Media Tags -->
	<meta property="og:title" content="XML Viewer & XML editor | Guifier">
	<meta property="og:type" content="website" />
	<meta property="og:image" content="https://guifier.com/thumbnail.jpg">
	<meta property="og:url" content="https://guifier.com/xml">
	<meta name="twitter:card" content="summary_large_image">
	<meta property="og:description" content="Explore our XML viewer and editor, offering seamless data interaction. Simplify XML tasks effortlessly with Guifier's intuitive features.">
	<meta property="og:site_name" content="XML Viewer & XML editor | Guifier">
	<meta name="twitter:image:alt" content="Guifier npm library logo">

	<!-- structured-data for search engines -->
	<script type="application/ld+json">
		{
		  "@context": "http://schema.org",
		  "@type": "WebPage",
		  "name": "XML Viewer & XML editor | Guifier",
		  "description": "Explore our XML viewer and editor, offering seamless data interaction. Simplify XML tasks effortlessly with Guifier's intuitive features.",
		  "url": "https://guifier.com/xml"
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
                    "name": "xml",
                    "item": "https://guifier.com/xml"
                }
            ]
		}
	</script>
</svelte:head>

<GuifierEditorPageContent type={"xml"} />
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
