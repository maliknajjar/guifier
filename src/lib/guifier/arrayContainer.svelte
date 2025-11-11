<script lang="ts">
    import type { ClassValue } from "svelte/elements";
    import { cn, isContainerValue, isPlainObject } from "$lib/utils";
    import Field from "./fields/field.svelte";
    import { ChevronDown, ChevronUp } from "lucide-svelte";
    import ArrayContainer from "./arrayContainer.svelte"
  import ObjectContainer from "./objectContainer.svelte";

    interface Props {
        data: Array<unknown>;
        level: number;
        class?: ClassValue;
    }

    const { data, class: className, level }: Props = $props();
</script>

<div
    class={cn("grid grid-cols-1 rounded-md", className)}
>
    {#each data as value, index}
        {@const isLast = data.length === index + 1}
        <div class="flex items-center {isLast && !isContainerValue(value) ? "" : "border-b"} h-14">
            {#each Array.from({ length: level }) as _, index}
                <div class="w-7 h-full"></div>
            {/each}
            <div class="relative flex w-14 h-full">
                <div class="absolute top-0 flex justify-center items-center w-full h-full">
                    <div class="w-8 h-8 border rounded-full bg-background text-muted-foreground flex justify-center items-center text-xs">{index + 1}</div>
                </div>
                {#if level === 0}
                    <div class="flex-1 h-full border-r border-dashed"></div>
                    <div class="flex-1 h-full"></div>
                {:else}
                    <div class="flex flex-col flex-1 h-full">
                        <div class="flex-1 h-full border-l border-dashed border-b"></div>
                        <div class="flex-1 h-full {isLast ? "" : "border-l border-dashed"}"></div>
                    </div>
                    <div class="flex flex-col flex-1 h-full">
                        <div class="flex h-full"></div>
                        <div class="flex h-full {isContainerValue(value) ? "border-l border-dashed" : ""}"></div>
                    </div>
                {/if}
            </div>
            <div class="flex-1 py-2 pr-2 h-full">
                {#if isContainerValue(value)}
                    <div class="flex items-center justify-between text-sm h-full">
                        <div>{Array.isArray(value) ? "Array" : "Object"}</div>
                        <div class="flex justify-center items-center aspect-square w-10 h-full">
                            <ChevronUp size={17.5} />
                        </div>
                    </div>
                {:else}
                    <Field value={value} level={level + 1} />
                {/if}
            </div>
        </div>
        {#if isContainerValue(value)}
            {#if Array.isArray(value)}
                <ArrayContainer data={value} level={level + 1} />
            {:else if (isPlainObject(value))}
                <div class="flex">
                    {#each Array.from({ length: level + 1 }) as _, index}
                        <div class="w-7 h-full"></div>
                    {/each}
                    <div class="flex-1 border-l border-dashed">
                        <ObjectContainer data={value as Record<string, unknown>} level={level + 1} />
                    </div>
                </div>
            {:else}
                <div>this is the cool thing</div>
            {/if}
        {/if}
    {/each}
</div>
