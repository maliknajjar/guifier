<script lang="ts">
    import ObjectContainer from "./objectContainer.svelte";

    export type GuifierData = Record<string, unknown> | Array<unknown>;

    interface Props {
        data: GuifierData;
    }

    const { data }: Props = $props();
</script>

{#if Array.isArray(data)}
    the array is not implemented yet man
{:else}
    <ObjectContainer {data} />
{/if}