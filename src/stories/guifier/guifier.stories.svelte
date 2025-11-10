<script module>
  import "../../app.css"

  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { fn } from 'storybook/test';
  import Guifier from '../../lib/guifier/guifier.svelte';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: 'Guifier',
    component: Guifier,
    tags: ['autodocs'],
    argTypes: {
      backgroundColor: { control: 'color' },
      size: {
        control: { type: 'select' },
        options: ['small', 'medium', 'large'],
      },
    },
  });
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Primary" args={{ data: {
  name: "malik",
  age: 33
} }} />
