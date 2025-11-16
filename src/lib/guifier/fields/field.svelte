<script lang="ts">
    import type { ClassValue } from "svelte/elements";
    import Boolean from "./boolean.svelte";
    import Number from "./number.svelte";
    import String from "./string.svelte";
    import Null from "./null.svelte";
	import DateElement from "./date.svelte";

    interface Props {
        value: unknown;
        class?: ClassValue;
    }

    let { value = $bindable(), class: className }: Props = $props();
</script>

<div class="w-full {className}">
    {#if typeof value === "string"}
        <String bind:value />
    {:else if typeof value === "number"}
        <Number bind:value />
    {:else if typeof value === "boolean"}
        <Boolean bind:value />
    {:else if value === null}
        <Null />
    {:else if value instanceof Date}
        <DateElement bind:value />
    {:else}
        <div class="text-red-500">This type doesnt have a default field</div>
    {/if}
</div>
