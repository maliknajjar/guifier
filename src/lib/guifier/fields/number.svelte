<script lang="ts">
  import Input from "$lib/components/ui/input/input.svelte";

  interface Props {
    value: number;
  }

  let { value = $bindable() }: Props = $props();
</script>
 
<Input type="number" bind:value />