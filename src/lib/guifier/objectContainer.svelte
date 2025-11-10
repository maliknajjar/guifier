<script lang="ts">
  import { cn, isPlainObject } from "$lib/utils";
  import type { ClassValue } from "svelte/elements";
  import Field from "./fields/field.svelte";

    interface Props {
        data: Record<string, unknown>;
        class?: ClassValue;
    }

    const { data, class: className }: Props = $props();
</script>

<div
    class={cn("grid grid-cols-2 gap-4 border p-4 rounded-md", className)}
>
    {#each Object.entries(data) as [key, value]}
        <Field value={value} key={key} />
    {/each}
</div>
