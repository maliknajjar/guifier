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

    let parentData: GuifierData = $derived({
        data,
    });
</script>

{#if Array.isArray(data)}
    <ArrayContainer name="root" bind:data bind:parentData levels={0} class={className} style={style} mainContainer={true} />
{:else}
    <ObjectContainer name="root" bind:data bind:parentData class={className} style={style} mainContainer={true} />
{/if}
