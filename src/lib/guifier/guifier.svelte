<script lang="ts">
    export type GuifierData = Record<string, any> | Array<any>;

    interface Props {
        data: GuifierData;
    }

    const { data }: Props = $props();
</script>

{#if Array.isArray(data)}
    the array is not implemented yet man
{:else}
    <div>this is the guifier component</div>
{/if}