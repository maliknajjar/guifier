<script lang="ts">
    import type { ClassValue } from "svelte/elements";
    import ObjectContainer from "./containers/objectContainer.svelte";
    import ArrayContainer from "./containers/arrayContainer.svelte";
	import { Braces, Brackets } from "lucide-svelte";

    export type GuifierData = Record<string, unknown> | Array<unknown>;
    
    interface GuifierProps {
        data: GuifierData;
        class?: ClassValue;
        style?: string;
    }
    
    let { data = $bindable(), class: className, style }: GuifierProps = $props();
</script>

<div class="grid grid-rows-[auto_1fr] rounded-md h-fit {className}" style={style}>
    <div class="flex gap-2 items-center py-2 px-4 border-t border-l border-r rounded-t-md">
        {#if Array.isArray(data)}
            <Brackets size={17.5} />
        {:else}
            <Braces size={17.5} />
        {/if}
        <div>root</div>
    </div>
    <div class="border rounded-b-md overflow-auto">
        {#if Array.isArray(data)}
            <ArrayContainer bind:data={data} levels={0} />
        {:else}
            <ObjectContainer bind:data={data}  />
        {/if}
    </div>
</div>