<script lang="ts">
    import { cn } from "$lib/utils";
    import type { ClassValue } from "svelte/elements";
    import Field from "../fields/field.svelte";
    import ArrayContainer from "./arrayContainer.svelte";
    import ObjectContainer from "./objectContainer.svelte";
    import { Ban, Binary, Braces, Hash, Plus, Type } from "lucide-svelte";
	import { isContainerValue } from "../utils";
	import Button from "$lib/components/ui/button/button.svelte";

    interface Props {
        data: Record<string, unknown>;
        name?: string;
        class?: ClassValue;
        style?: string;
    }

    const { data = $bindable({}), name, class: className, style }: Props = $props();
</script>

{#snippet inner()}
    {#each Object.entries(data) as [key, value]}
        {@const isContainer = isContainerValue(value)}
        <div class="{isContainer ? "col-span-2" : ""}">
            {#if isContainerValue(value)}
                {#if Array.isArray(value)}
                    <ArrayContainer name={key} bind:data={data[key] as Array<unknown>} levels={0} class="rounded-t-none" />
                {:else}
                    <ObjectContainer name={key} bind:data={data[key] as Record<string, unknown>} class="rounded-t-none" />
                {/if}
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
{/snippet}

{#if name}
    <div class="grid grid-rows-[auto_1fr] rounded-md h-fit {className}" style={style}>
        <div class="flex gap-2 justify-between items-center h-10 px-4 border-t border-l border-r rounded-t-md">
            <div class="flex items-center gap-2">
                <Braces size={17.5} />
                <div class="text-sm">{name}</div>
            </div>
            <div class="flex items-center">
                <Button variant="ghost" class="p-0! hover:bg-transparent hover:cursor-pointer">
                    <Plus />
                </Button>
            </div>
        </div>
        <div
            class={cn("grid grid-cols-2 gap-4 p-4 rounded-md rounded-t-none border overflow-auto", className)}
        >
            {@render inner()}
        </div>
    </div>
{:else}
    <div class="grid grid-cols-2 gap-4 p-4 overflow-auto rounded-t-none">
        {@render inner()}
    </div>
{/if}
