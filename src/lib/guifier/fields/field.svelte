<script lang="ts">
  import Input from "$lib/components/ui/input/input.svelte";
  import { isPlainObject } from "$lib/utils";
  import type { ClassValue } from "svelte/elements";
  import ArrayContainer from "../arrayContainer.svelte";
  import ObjectContainer from "../objectContainer.svelte";
  import Boolean from "./boolean.svelte";

    interface Props {
        value: unknown;
        class?: ClassValue;
    }

    const { value, class: className }: Props = $props();
</script>

<!-- TODO: add the icons for each field man -->
<div class="w-full {className}">
    {#if typeof value === "string"}
        <Input {value} />
    {:else if typeof value === "number"}
        <Input {value} type="number" />
    {:else if typeof value === "boolean"}
        <Boolean {value} />
    {:else}
        <div class="text-red-500">This type doesnt have a default field</div>
    {/if}
</div>
