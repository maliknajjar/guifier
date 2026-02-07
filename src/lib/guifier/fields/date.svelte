<script lang="ts">
  import Input from "$lib/components/ui/input/input.svelte";

  interface Props {
    value: Date;
  }

  let { value = $bindable() }: Props = $props();

  function formatDate(d: Date) {
    // Check if date is valid before formatting
    if (isNaN(d.getTime())) {
      return '';
    }
    return d.toISOString().slice(0, 10);
  }

  function parseDate(str: string) {
    const date = new Date(str);
    // Keep the previous value if parsing fails
    return isNaN(date.getTime()) ? value : date;
  }
</script>

<Input
  type="date"
  bind:value={
    () => formatDate(value),
    (v) => value = parseDate(v)
  }
/>
