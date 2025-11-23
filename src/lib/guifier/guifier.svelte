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

{#if Array.isArray(data)}
    <ArrayContainer name="root" bind:data={data} levels={0} class={className} style={style} />
{:else}
    <ObjectContainer name="root" bind:data={data} class={className} style={style} />
{/if}
