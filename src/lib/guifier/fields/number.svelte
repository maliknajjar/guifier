<script lang="ts">
  import Input from "$lib/components/ui/input/input.svelte";

  interface Props {
    value: number;
  }

  const { value }: Props = $props();
</script>
 
<Input type="number" value={value} />