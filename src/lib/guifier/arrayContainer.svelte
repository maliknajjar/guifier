<script lang="ts">
    import type { ClassValue } from "svelte/elements";
    import { cn, isContainerValue, isPlainObject } from "$lib/utils";
    import Field from "./fields/field.svelte";
    import { ChevronDown, ChevronUp } from "lucide-svelte";
    import ArrayContainer from "./arrayContainer.svelte"
  import ObjectContainer from "./objectContainer.svelte";

    interface Props {
        data: Array<unknown>;
        class?: ClassValue;
    }

    const { data, class: className }: Props = $props();
</script>

<div
    class={cn("grid grid-cols-1 rounded-md", className)}
>
    {#each data as value, index}
        {@const isLast = data.length === index + 1}
        <div class="flex items-center {isLast ? "" : "border-b"} h-14">
            <div class="relative flex w-14 h-full">
                <div class="absolute top-0 flex justify-center items-center w-full h-full">
                    <div class="w-8 h-8 border rounded-full bg-background text-muted-foreground flex justify-center items-center text-xs">{index + 1}</div>
                </div>
                <div class="flex-1 h-full border-r border-dashed"></div>
                <div class="flex-1 h-full"></div>
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
                    <Field value={value} />
                {/if}
            </div>
        </div>
        {#if isContainerValue(value)}
            <div class="flex items-center h-14">
                <div class="relative flex w-14 h-full">
                    <div class="flex-1 h-full border-r border-dashed"></div>
                    <div class="flex-1 h-full"></div>
                </div>
                <div class="flex-1 py-2 pr-2 h-full">
                    {#if Array.isArray(value)}
                        <ArrayContainer data={value} />
                    {:else if (isPlainObject(value))}
                        <ObjectContainer data={value as Record<string, unknown>} />
                    {:else}
                        <div>this is the cool thing</div>
                    {/if}
                </div>
            </div>
        {/if}
    {/each}
</div>
