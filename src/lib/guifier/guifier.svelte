<script lang="ts">
    import type { ClassValue } from "svelte/elements";
    import ObjectContainer from "./containers/objectContainer.svelte";
    import ArrayContainer from "./containers/arrayContainer.svelte";

    export type GuifierData = Record<string, unknown> | Array<unknown>;
    
    interface GuifierProps {
        data: GuifierData;
        class?: ClassValue;
        style?: string;
    }
    
    let { data = $bindable(), class: className, style }: GuifierProps = $props();
</script>

<div class="border rounded-md {className}" style={style}>
    {#if Array.isArray(data)}
        <ArrayContainer bind:data={data} levels={0} />
    {:else}
        <ObjectContainer bind:data={data} />
    {/if}
</div>