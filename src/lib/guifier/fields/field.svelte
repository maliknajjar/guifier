<script lang="ts">
  import Input from "$lib/components/ui/input/input.svelte";
  import { isPlainObject } from "$lib/utils";
  import type { ClassValue } from "svelte/elements";
  import ArrayContainer from "../arrayContainer.svelte";
  import ObjectContainer from "../objectContainer.svelte";
  import Boolean from "./boolean.svelte";

    interface Props {
        value: unknown;
        level: number;
        key?: string;
        class?: ClassValue;
    }

    const { value, key, class: className, level }: Props = $props();
</script>

<!-- TODO: add the icons for each field man -->
<div class="w-full {className}">
    {#if typeof value === "string"}
        <Input {value} />
    {:else if typeof value === "number"}
        <Input {value} type="number" />
    {:else if typeof value === "boolean"}
        <Boolean {value} />
    {:else if isPlainObject(value)}
        <ObjectContainer data={value as Record<string, unknown>} level={level + 1} class="rounded-t-none" />
    {:else if Array.isArray(value)}
        <ArrayContainer data={value as Array<unknown>} level={level + 1} class="rounded-t-none" />
    {:else}
        <div class="text-red-500">This type doesnt have a default field</div>
    {/if}
</div>
