<script lang="ts">
  import type { ClassValue } from "svelte/elements";
  import Boolean from "./boolean.svelte";
  import Number from "./number.svelte";
  import String from "./string.svelte";
  import Null from "./null.svelte";

    interface Props {
        value: unknown;
        class?: ClassValue;
    }

    let { value = $bindable(), class: className }: Props = $props();
</script>

<div class="w-full {className}">
    {#if typeof value === "string"}
        <String bind:value={value} />
    {:else if typeof value === "number"}
        <Number bind:value={value} />
    {:else if typeof value === "boolean"}
        <Boolean bind:value={value} />
    {:else if value === null}
        <Null />
    {:else}
        <div class="text-red-500">This type doesnt have a default field</div>
    {/if}
</div>
