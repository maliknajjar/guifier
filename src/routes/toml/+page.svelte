<svelte:head>
	<!-- base tags -->
	<title>TOMl Viewer & Editor</title>
	<meta name="description" content="Explore our TOML viewer and editor, offering seamless data interaction. Simplify TOML tasks effortlessly with Guifier's intuitive features." />
	<meta name="keywords" content="toml viewer, online toml viewer, toml viewer online, toml online viewer, toml validator, validate toml, toml visualizer">
	<link rel="canonical" href="https://guifier.com/toml">

	<!--  Social Media Tags -->
	<meta property="og:title" content="TOML Viewer & TOML editor | Guifier">
	<meta property="og:type" content="website" />
	<meta property="og:image" content="https://guifier.com/thumbnail.jpg">
	<meta property="og:url" content="https://guifier.com/toml">
	<meta name="twitter:card" content="summary_large_image">
	<meta property="og:description" content="Explore our TOML viewer and editor, offering seamless data interaction. Simplify TOML tasks effortlessly with Guifier's intuitive features.">
	<meta property="og:site_name" content="TOML Viewer & TOML editor | Guifier">
	<meta name="twitter:image:alt" content="Guifier npm library logo">

	<!-- structured-data for search engines -->
	<script type="application/ld+json">
		{
		  "@context": "http://schema.org",
		  "@type": "WebPage",
		  "name": "TOML Viewer & TOML editor | Guifier",
		  "description": "Explore our TOML viewer and editor, offering seamless data interaction. Simplify TOML tasks effortlessly with Guifier's intuitive features.",
		  "url": "https://guifier.com/toml"
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
                    "name": "toml",
                    "item": "https://guifier.com/toml"
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
	import sample from "./sample.toml?raw";

    let value = $state(encode('toml', sample));
</script>

<div class="flex flex-col items-center p-4 gap-4">
    <h1 class="text-3xl font-bold">TOML Viewer & Editor</h1>
    <FeatureSuggest />
    <div class="flex gap-4 w-full max-w-2xl">
        <CodeEditor bind:value={
            () => {
                return decode('toml', value)
            },
            (v) => {
                value = encode('toml', v)
            }
        } class="border flex-1 h-[60vh] rounded-md min-w-0" />
        <Guifier class="flex-1 min-w-0" bind:data={value} />
    </div>
</div>
