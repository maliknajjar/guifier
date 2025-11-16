<script lang="ts">
    import { cn } from "$lib/utils";
    import type { ClassValue } from "svelte/elements";
    import Field from "../fields/field.svelte";
    import ArrayContainer from "./arrayContainer.svelte";
    import ObjectContainer from "./objectContainer.svelte";
    import { Ban, Binary, Braces, Brackets, Hash, Type } from "lucide-svelte";
	import { isContainerValue } from "../utils";

    interface Props {
        data: Record<string, unknown>;
        class?: ClassValue;
    }

    const { data = $bindable({}), class: className }: Props = $props();
</script>

<div
    class={cn("grid grid-cols-2 gap-4 p-4 rounded-md", className)}
>
    {#each Object.entries(data) as [key, value]}
        {@const isContainer = isContainerValue(value)}
        <div class="{isContainer ? "col-span-2" : ""}">
            {#if isContainerValue(value)}
                <div class="flex gap-2 items-center py-2 px-4 border-t border-l border-r rounded-t-md">
                    {#if Array.isArray(value)}
                        <Brackets size={17.5} />
                    {:else}
                        <Braces size={17.5} />
                    {/if}
                    <div>{key}</div>
                </div>
                <div class="border rounded-b-md">
                    {#if Array.isArray(value)}
                        <ArrayContainer bind:data={data[key] as Array<unknown>} levels={0} class="rounded-t-none" />
                    {:else}
                        <ObjectContainer bind:data={data[key] as Record<string, unknown>} class="rounded-t-none" />
                    {/if}
                </div>
            {:else}
                <div class="flex items-center gap-2 mb-1">
                    <div class="font-bold text-xs">{key}</div>
                    <div class="text-muted-foreground">
                        {#if typeof value === "string"}
                            <Type size={15} />
                        {:else if typeof value === "number"}
                            <Hash size={15} />
                        {:else if typeof value === "boolean"}
                            <Binary size={15} />
                        {:else if value === null}
                            <Ban size={15} />
                        {/if}
                    </div>
                </div>
                <Field bind:value={data[key]} />
            {/if}
        </div>
    {/each}
</div>
