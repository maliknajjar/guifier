<script lang="ts">
  import { cn, isContainerValue, isPlainObject } from "$lib/utils";
  import type { ClassValue } from "svelte/elements";
  import Field from "./fields/field.svelte";
  import ArrayContainer from "./arrayContainer.svelte";
  import ObjectContainer from "./objectContainer.svelte";

    interface Props {
        data: Record<string, unknown>;
        class?: ClassValue;
    }

    const { data, class: className }: Props = $props();
</script>

<div
    class={cn("grid grid-cols-2 gap-4 p-4 rounded-md", className)}
>
    {#each Object.entries(data) as [key, value]}
        {@const isContainer = isContainerValue(value)}
        <div class="{isContainer ? "col-span-2" : ""}">
            {#if isContainerValue(value)}
                <div class="py-2 px-4 border-t border-l border-r rounded-t-md">{key}</div>
                <div class="border rounded-b-md">
                    {#if Array.isArray(value)}
                        <ArrayContainer data={value as Array<unknown>} levels={0} class="rounded-t-none" />
                    {:else}
                        <ObjectContainer data={value as Record<string, unknown>} class="rounded-t-none" />
                    {/if}
                </div>
            {:else}
                <div>{key}</div>
                <Field value={value} />
            {/if}
        </div>
    {/each}
</div>
