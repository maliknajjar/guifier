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

<script lang="ts">
	import CodeEditor from "$lib/codeEditor.svelte";
	import FeatureSuggest from "$lib/featureSuggest.svelte";
	import Guifier from "$lib/guifier/guifier.svelte";
	import { encode, decode } from "$lib/guifier/utils";
	import sample from "./sample.xml?raw";

    let value = $state(encode('xml', sample));
</script>

<div class="flex flex-col items-center p-4 gap-4">
    <h1 class="text-3xl font-bold">XML Viewer & Editor</h1>
    <FeatureSuggest />
    <div class="flex gap-4 w-full max-w-2xl">
        <CodeEditor bind:value={
            () => {
                return decode('xml', value)
            },
            (v) => {
                value = encode('xml', v)
            }
        } class="border flex-1 h-[60vh] rounded-md min-w-0" />
        <Guifier class="flex-1 min-w-0" bind:data={value} />
    </div>
</div>
