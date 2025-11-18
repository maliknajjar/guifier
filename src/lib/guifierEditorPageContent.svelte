<script lang="ts">
	import CodeEditor from "$lib/codeEditor.svelte";
	import FeatureSuggest from "$lib/featureSuggest.svelte";
	import Guifier, { type GuifierData } from "$lib/guifier/guifier.svelte";
	import { encode, decode } from "$lib/guifier/utils";
	import { onMount } from "svelte";
	import * as Tabs from "$lib/components/ui/tabs/index.js";
	import Skeleton from "./components/ui/skeleton/skeleton.svelte";

    interface Props {
        type: "json" | "yaml" | "xml" | "toml";
    }

    const { type }: Props = $props();

    let value: GuifierData | undefined = $state();
    let showGuiEditor: boolean = $state(true);

    onMount(async () => {
        const sample = (await import(`./samples/sample.${type}?raw`)).default;
        value = encode(type, sample);
    })
</script>

<svelte:head>
    <!-- base tags -->
	<title>{type.toUpperCase()} Viewer & Editor</title>
	<meta name="description" content="Explore our {type.toUpperCase()} viewer and editor, offering seamless data interaction. Simplify {type.toUpperCase()} tasks effortlessly with Guifier's intuitive features." />
	<meta name="keywords" content="{type} viewer, online {type} viewer, {type} viewer online, {type} online viewer, {type} validator, validate {type}, {type} visualizer">
    <link rel="canonical" href="https://guifier.com/{type}">

	<!--  Social Media Tags -->
	<meta property="og:title" content="{type.toUpperCase()} Viewer & {type.toUpperCase()} editor | Guifier">
	<meta property="og:type" content="website" />
	<meta property="og:image" content="https://guifier.com/thumbnail.jpg">
	<meta property="og:url" content="https://guifier.com/{type}">
	<meta name="twitter:card" content="summary_large_image">
	<meta property="og:description" content="Explore our {type.toUpperCase()} viewer and editor, offering seamless data interaction. Simplify {type.toUpperCase()} tasks effortlessly with Guifier's intuitive features.">
	<meta property="og:site_name" content="{type.toUpperCase()} Viewer & {type.toUpperCase()} editor | Guifier">
	<meta name="twitter:image:alt" content="Guifier npm library logo">

	<!-- structured-data for search engines -->
	<script type="application/ld+json">
		{
		  "@context": "http://schema.org",
		  "@type": "WebPage",
		  "name": `${type.toUpperCase()} Viewer & ${type.toUpperCase()} editor | Guifier`,
		  "description": `Explore our ${type.toUpperCase()} viewer and editor, offering seamless data interaction. Simplify {type.toUpperCase()} tasks effortlessly with Guifier's intuitive features.`,
		  "url": `https://guifier.com/${type}`
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
                    "name": {type},
                    "item": `https://guifier.com/${type}`
                }
            ]
		}
	</script>
</svelte:head>

<div class="flex flex-col items-center p-4 gap-4">
    <h1 class="text-3xl font-bold">{type.toUpperCase()} Viewer & Editor</h1>
    <FeatureSuggest />
    <Tabs.Root class="sm:hidden" value={"gui"} onValueChange={(v) => { showGuiEditor = v === "code" ? false : true }}>
        <Tabs.List class="border">
            <Tabs.Trigger value="code">Code Editor</Tabs.Trigger>
            <Tabs.Trigger value="gui">Gui Editor</Tabs.Trigger>
        </Tabs.List>
    </Tabs.Root>
    <div class="relative flex gap-4 w-full max-w-2xl h-140">
        {#if value}
            <CodeEditor lang={type} bind:value={
                    () => {
                        if (value) {
                            return decode(type, value)
                        }
                    },
                    (v) => {
                        if (v) {
                            value = encode(type, v)
                        }
                    }
                }
                class="
                    border
                    flex-1
                    rounded-md
                    min-w-0
                    bg-background
                    overflow-hidden
                    h-full
                    max-sm:absolute
                    max-sm:top-0
                    max-sm:left-0
                    max-sm:w-full
                "
            />
            {#if showGuiEditor}
                <Guifier class="flex-1 min-w-0 bg-background h-full max-sm:absolute" bind:data={value} />
            {/if}
        {:else}
            <div class="flex-1 min-w-0 w-full h-full max-sm:absolute border bg-background rounded-md"></div>
            <div class="flex-1 min-w-0 w-full h-full max-sm:absolute border bg-background rounded-md"></div>
        {/if}
    </div>
</div>
