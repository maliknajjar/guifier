<script lang="ts">
  import Input from "$lib/components/ui/input/input.svelte";

  interface Props {
    value: string;
  }

  const { value }: Props = $props();
</script>
 
<Input type="text" value={value} />