<script lang="ts">
  import Input from "$lib/components/ui/input/input.svelte";

  interface Props {
    value: Date;
  }

  let { value = $bindable() }: Props = $props();

  function formatDate(d: Date) {
    return d.toISOString().slice(0, 10);
  }

  function parseDate(str: string) {
    return new Date(str);
  }
</script>

<Input
  type="date"
  bind:value={
    () => formatDate(value),
    (v) => value = parseDate(v)
  }
/>
