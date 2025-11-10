<script lang="ts">
  import Input from "$lib/components/ui/input/input.svelte";
  import { isPlainObject } from "$lib/utils";
  import ObjectContainer from "../objectContainer.svelte";
  import Boolean from "./boolean.svelte";

    interface Props {
        value: unknown;
        key?: string;
    }

    const { value, key }: Props = $props();
</script>

<div class="{isPlainObject(value) ? "col-span-2" : ""}">
    {#if typeof value === "string"}
        <div>{key}</div>
        <Input {value} />
    {:else if typeof value === "number"}
        <div>{key}</div>
        <Input {value} type="number" />
    {:else if typeof value === "boolean"}
        <div>{key}</div>
        <Boolean {value} />
    {:else if isPlainObject(value)}
        <div class="py-4 px-6 border-t border-l border-r rounded-t-md">{key}</div>
        <ObjectContainer data={value as Record<string, unknown>} class="rounded-t-none" />
    {:else}
        <div class="text-red-500">This type doesnt have a default field</div>
    {/if}
</div>
