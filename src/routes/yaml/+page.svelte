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

<script lang="ts">
	import CodeEditor from "$lib/codeEditor.svelte";
	import FeatureSuggest from "$lib/featureSuggest.svelte";
	import Guifier from "$lib/guifier/guifier.svelte";
	import { encode, decode } from "$lib/guifier/utils";
	import sample from "./sample.yaml?raw";

    let value = $state(encode('yaml', sample));
</script>

<div class="flex flex-col items-center p-4 gap-4">
    <h1 class="text-3xl font-bold">YAML Viewer & Editor</h1>
    <FeatureSuggest />
    <div class="flex gap-4 w-full max-w-2xl">
        <CodeEditor bind:value={
            () => {
                return decode('yaml', value)
            },
            (v) => {
                value = encode('yaml', v)
            }
        } class="border flex-1 h-[60vh] rounded-md min-w-0" />
        <Guifier class="flex-1 min-w-0" bind:data={value} />
    </div>
</div>
