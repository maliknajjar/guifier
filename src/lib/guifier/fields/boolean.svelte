<script lang="ts">
  import * as Tabs from "$lib/components/ui/tabs/index.js";

  interface Props {
    value: boolean;
  }

  const { value }: Props = $props();

  
</script>
 
<Tabs.Root value={value ? "true" : "false"} class="w-[400px]">
  <Tabs.List>
    <Tabs.Trigger value="true">true</Tabs.Trigger>
    <Tabs.Trigger value="false">false</Tabs.Trigger>
  </Tabs.List>
</Tabs.Root>