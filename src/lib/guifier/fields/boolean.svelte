<script lang="ts">
  import * as Tabs from "$lib/components/ui/tabs/index.js";

  interface Props {
    value: boolean;
  }

  let { value = $bindable() }: Props = $props();  
</script>
 
<Tabs.Root value={value ? "true" : "false"} onValueChange={(localValue) => { value = localValue === "true" ? true : false }}>
  <Tabs.List>
    <Tabs.Trigger value="true">true</Tabs.Trigger>
    <Tabs.Trigger value="false">false</Tabs.Trigger>
  </Tabs.List>
</Tabs.Root>