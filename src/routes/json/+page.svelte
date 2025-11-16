<script lang="ts">
	import CodeEditor from "$lib/codeEditor.svelte";
	import Guifier from "$lib/guifier/guifier.svelte";
	import JsonSample from "./sample.json?raw";

    let value = $state(JsonSample);
</script>

<div class="flex flex-col items-center p-4 gap-4">
    <h1 class="text-3xl font-bold">JSON Viewer & Editor</h1>
    <div class="blink text-center rounded-md px-4 py-2">
        Suggest a Feature or Report a Bug by opening a new issue <a class="font-bold underline" href="https://github.com/maliknajjar/guifier/issues" target="_blank">HERE</a>
    </div>
    <div class="flex gap-4 w-full max-w-2xl">
        <CodeEditor bind:value class="border flex-1 h-[60vh]" />
        <Guifier class="flex-1" data={JSON.parse(value)} />
    </div>
</div>

<style>
    .blink {
        border: 2px dashed transparent;
        animation: blink-border 500ms infinite;
    }

    @keyframes blink-border {
        0% {
            border-color: transparent;
        }
        50% {
            border-color: black; /* any color */
        }
        100% {
            border-color: transparent;
        }
    }
</style>
