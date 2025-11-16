<script lang="ts" module>
    import type { ClassValue } from "svelte/elements";
    import ObjectContainer from "./objectContainer.svelte";
    import ArrayContainer from "./arrayContainer.svelte";

    export type GuifierData = Record<string, unknown> | Array<unknown>;

    export interface GuifierProps {
        data: GuifierData;
        class?: ClassValue;
        style?: string;
    }
</script>

<script lang="ts">
    let { data = $bindable(), class: className, style }: GuifierProps = $props();
</script>

<div class="border rounded-md {className}" style={style}>
    {#if Array.isArray(data)}
        <ArrayContainer bind:data={data} levels={0} />
    {:else}
        <ObjectContainer bind:data={data} />
    {/if}
</div>