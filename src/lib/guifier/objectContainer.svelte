<script lang="ts">
  import { cn, isContainerValue, isPlainObject } from "$lib/utils";
  import type { ClassValue } from "svelte/elements";
  import Field from "./fields/field.svelte";

    interface Props {
        data: Record<string, unknown>;
        level: number;
        class?: ClassValue;
    }

    const { data, class: className, level }: Props = $props();
</script>

<div
    class={cn("grid grid-cols-2 gap-4 p-4 rounded-md", className)}
>
    {#each Object.entries(data) as [key, value]}
        {@const isContainer = isContainerValue(value)}
        <div class="{isContainer ? "col-span-2" : ""}">
            {#if isContainerValue(value)}
                <div class="py-4 px-6 border-t border-l border-r rounded-t-md">{key}</div>
                <Field value={value} key={key} class={"border rounded-b-md"} level={level + 1} />
            {:else}
                <div>{key}</div>
                <Field value={value} key={key} level={level + 1} />
            {/if}
        </div>
    {/each}
</div>
