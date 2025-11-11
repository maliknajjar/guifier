<script lang="ts">
  import type { ClassValue } from "svelte/elements";
    import ObjectContainer from "./objectContainer.svelte";
  import ArrayContainer from "./arrayContainer.svelte";

    export type GuifierData = Record<string, unknown> | Array<unknown>;

    interface Props {
        data: GuifierData;
        class?: ClassValue;
    }

    let { data = $bindable(), class: className }: Props = $props();
</script>

<div class="border rounded-md {className}">
    {#if Array.isArray(data)}
        <ArrayContainer bind:data={data} levels={0} />
    {:else}
        <ObjectContainer bind:data={data} />
    {/if}
</div>