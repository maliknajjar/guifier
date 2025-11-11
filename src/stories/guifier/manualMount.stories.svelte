<script module>
  import "../../app.css"

  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ManuallyMountingGuifier from "$lib/guifier/manuallyMountingGuifier.svelte";

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: 'Manually Mounting Guifier',
    component: ManuallyMountingGuifier,
    tags: ['autodocs'],
  });
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="manual mounting" args={{
  data: {
    name: "malik",
    age: 33,
    hair_color: "black",
    is_married: true,
    is_crazy: null
  }
}} />
