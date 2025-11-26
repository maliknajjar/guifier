<script lang="ts" module>
    export function objectContainerSelectHandler(v: CreateFieldButtonOptions, data: Record<string, unknown>) {
        const keyName = prompt("Enter the name of the new property");
        if (keyName) {
            if (v === 'object') {
                data[keyName] = {};
            } else if (v === 'array') {
                data[keyName] = [];
            } else if (v === 'string') {
                data[keyName] = "";
            } else if (v === 'number') {
                data[keyName] = 0;
            } else if (v === 'boolean') {
                data[keyName] = true;
            }
        }
    }
</script>

<script lang="ts">
    import { cn } from "$lib/utils";
    import type { ClassValue } from "svelte/elements";
    import Field from "../fields/field.svelte";
    import ArrayContainer from "./arrayContainer.svelte";
    import ObjectContainer from "./objectContainer.svelte";
    import { Ban, Binary, Braces, Hash, Plus, Trash, Type } from "lucide-svelte";
	import { isContainerValue, isPlainObject } from "../utils";
	import CreateFieldButton, { type CreateFieldButtonOptions } from "$lib/createFieldButton.svelte";
	import Button from "$lib/components/ui/button/button.svelte";
	import type { GuifierData } from "../guifier.svelte";

    interface Props {
        data: Record<string, unknown>;
        parentData: GuifierData;
        name?: string;
        class?: ClassValue;
        style?: string;
        mainContainer?: boolean;
    }

    let { data = $bindable({}), parentData = $bindable(), name, class: className, style, mainContainer = false }: Props = $props();
</script>

{#snippet inner()}
    {#if Object.entries(data).length}
        {#each Object.entries(data) as [key, value]}
            {@const isContainer = isContainerValue(value)}
            <div class="{isContainer ? "col-span-2" : ""}">
                {#if isContainerValue(value)}
                    {#if Array.isArray(value)}
                        <ArrayContainer name={key} bind:data={data[key] as Array<unknown>} bind:parentData={data} levels={0} class="rounded-t-none" />
                    {:else}
                        <ObjectContainer name={key} bind:data={data[key] as Record<string, unknown>} bind:parentData={data} class="rounded-t-none" />
                    {/if}
                {:else}
                    <div class="flex items-center gap-1 mb-1">
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
                        <div>
                            <button class="flex justify-center hover:cursor-pointer h-4" onclick={() => {
                            delete data[key];
                            }}>
                                <Trash class="h-full" />
                            </button>
                        </div>
                    </div>
                    <Field bind:value={data[key]} />
                {/if}
            </div>
        {/each}
    {:else}
        <div class="col-span-full">
            <div class="text-center text-md text-muted-foreground">No items yet</div>
            <div class="text-center text-xs text-muted-foreground">Click + to add your first one</div>
        </div>
    {/if}
{/snippet}

{#if name}
    <div class="grid grid-rows-[auto_1fr] rounded-md h-fit {className}" style={style}>
        <div class="flex gap-2 justify-between items-center h-10 px-4 border-t border-l border-r rounded-t-md">
            <div class="flex items-center gap-2">
                <Braces size={17.5} />
                <div class="text-sm">{name}</div>
            </div>
            <div class="flex items-center gap-3">
                {#if !mainContainer}
                    <Button variant="ghost" class="p-0! hover:bg-transparent hover:cursor-pointer" onclick={() => {
                        if (isPlainObject(parentData)) {
                            delete parentData[name];
                        }
                    }}>
                        <Trash />
                    </Button>
                {/if}
                <CreateFieldButton onSelect={(v) => objectContainerSelectHandler(v, data)} />
            </div>
        </div>
        <div
            class={cn("rounded-md rounded-t-none border overflow-auto")}
        >
            <div class="grid grid-cols-2 gap-4 p-4">
                {@render inner()}
            </div>
        </div>
    </div>
{:else}
    <div class="grid grid-cols-2 gap-4 p-4 overflow-auto rounded-t-none">
        {@render inner()}
    </div>
{/if}
