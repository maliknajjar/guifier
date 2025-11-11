<script lang="ts">
  import type { ClassValue } from "svelte/elements";
    import ObjectContainer from "./objectContainer.svelte";
  import ArrayContainer from "./arrayContainer.svelte";

    export type GuifierData = Record<string, unknown> | Array<unknown>;

    interface Props {
        data: GuifierData;
        class?: ClassValue;
    }

    const { data, class: className }: Props = $props();
</script>

<div class="border rounded-md {className}">
    {#if Array.isArray(data)}
        <ArrayContainer {data} level={0} />
    {:else}
        <ObjectContainer {data} level={0} />
    {/if}
</div>