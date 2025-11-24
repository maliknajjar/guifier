<script lang="ts" module>
    export function arrayContainerSelectHandler(v: CreateFieldButtonOptions, data: unknown[]) {
        if (v === 'object') {
            data.push({});
        } else if (v === 'array') {
            data.push([]);
        } else if (v === 'string') {
            data.push("");
        } else if (v === 'number') {
            data.push(0);
        } else if (v === 'boolean') {
            data.push(true);
        }
    }
</script>

<script lang="ts">
    import type { ClassValue } from "svelte/elements";
    import { cn } from "$lib/utils";
    import Field from "../fields/field.svelte";
    import { Brackets, Trash } from "lucide-svelte";
    import ArrayContainer from "./arrayContainer.svelte"
    import ObjectContainer, { objectContainerSelectHandler } from "./objectContainer.svelte";
	import { isContainerValue, isPlainObject } from "../utils";
	import CreateFieldButton, { type CreateFieldButtonOptions } from "$lib/createFieldButton.svelte";
	import Button from "$lib/components/ui/button/button.svelte";
	import type { GuifierData } from "../guifier.svelte";

    interface Props {
        data: Array<unknown>;
        levels: number;
        parentData: GuifierData;
        name?: string;
        class?: ClassValue;
        style?: string;
        mainContainer?: boolean;
    }

    let { name, data = $bindable([]), parentData = $bindable(), class: className, levels, style, mainContainer = false }: Props = $props();
</script>

{#snippet inner()}
    {#each data as value, index}
        {@const isLast = data.length === index + 1}
        <div class="
            flex
            items-center
            {isLast && !isContainerValue(value) ? "" : "border-b"}
            h-14
        ">
            {#each Array.from({ length: levels }) as _, levelIndex}
                {@const isLastLevel = levels === levelIndex + 1}
                <div class="flex flex-col w-[1.8rem] h-full">
                    <div class="flex-1 {true ? "border-r border-dashed" : ""}"></div>
                    <div class="flex-1 {true ? "border-r border-dashed" : ""}"></div>
                </div>
            {/each}
            <div class="relative flex w-14 h-full">
                <div class="absolute top-0 flex justify-center items-center w-full h-full">
                    <div class="w-8 h-8 border rounded-full bg-background text-muted-foreground flex justify-center items-center text-xs">{index + 1}</div>
                </div>
                {#if levels === 0}
                    <div class="flex-1 h-full border-r border-dashed"></div>
                    <div class="flex-1 h-full"></div>
                {:else}
                    <div class="flex flex-col flex-1 h-full">
                        <div class="flex-1 h-full border-b border-dashed"></div>
                        <div class="flex-1 h-full { isContainerValue(value) ? "border-r border-dashed" : ""}"></div>
                    </div>
                    <div class="flex flex-col flex-1 h-full">
                        <div class="flex h-full"></div>
                        <div class="flex h-full"></div>
                    </div>
                {/if}
            </div>
            <div class="flex items-center flex-1 h-full">
                {#if isContainerValue(value)}
                    <div class="flex items-center justify-between text-sm h-full w-full">
                        <div>{Array.isArray(value) ? "Array" : "Object"}</div>
                        <div class="flex justify-center items-center pr-4 gap-3">
                            <Button variant="ghost" class="p-0! hover:bg-transparent hover:cursor-pointer" onclick={() => {
                                data.splice(index, 1)
                            }}>
                                <Trash />
                            </Button>
                            <CreateFieldButton onSelect={(v) => {
                                if (Array.isArray(value)) {
                                    arrayContainerSelectHandler(v, value);
                                } else if (isPlainObject(value)) {
                                    objectContainerSelectHandler(v, value)
                                }
                            }} />
                        </div>
                    </div>
                {:else}
                    <div class="flex gap-3 pr-4 w-full">
                        <Field bind:value={data[index]} />
                        <Button variant="ghost" class="p-0! hover:bg-transparent hover:cursor-pointer" onclick={() => {
                            data.splice(index, 1);
                        }}>
                            <Trash />
                        </Button>
                    </div>
                {/if}
            </div>
        </div>
        {#if isContainerValue(value)}
            {#if Array.isArray(value)}
                <div class={Array.isArray(data) && !isLast ? "border-b" : ""}>
                    <ArrayContainer bind:data={data[index] as Array<unknown>} bind:parentData={data} levels={levels + 1} />
                </div>
            {:else if (isPlainObject(value))}
                <div class="flex items-stretch {Array.isArray(data) && !isLast ? "border-b" : ""}">
                    {#each Array.from({ length: levels + 1 }) as _, index}
                        <div class="w-[1.8rem] border-r border-dashed"></div>
                    {/each}
                    <div class="flex-1">
                        <ObjectContainer bind:data={data[index] as Record<string, unknown>} bind:parentData={data} />
                    </div>
                </div>
            {:else}
                <div>Error: For some reason the value is not a an object nor an array</div>
            {/if}
        {/if}
    {/each}
{/snippet}

{#if name}
    <div class="grid grid-rows-[auto_1fr] rounded-md h-fit {className}" style={style}>
        <div class="flex gap-2 justify-between items-center h-10 px-4 border-t border-l border-r rounded-t-md">
            <div class="flex items-center gap-2">
                <Brackets size={17.5} />
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
                <CreateFieldButton onSelect={(v) => arrayContainerSelectHandler(v, data)} />
            </div>
        </div>
        <div
            class={cn("grid grid-cols-1 rounded-md rounded-t-none border overflow-auto")}
        >
            {@render inner()}
        </div>
    </div>
{:else}
    {@render inner()}
{/if}
