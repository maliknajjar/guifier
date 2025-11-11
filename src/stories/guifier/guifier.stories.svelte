<script module>
  import "../../app.css"

  import { defineMeta } from '@storybook/addon-svelte-csf';
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
<Story name="Simple Object" args={{
  class: "max-w-xl",
  data: {
    name: "malik",
    age: 33,
    hair_color: "black",
    is_married: true,
  }
}} />

<Story name="Simple Array" args={{
  class: "max-w-xl",
  data: [
    "malik",
    54,
    true,
  ]
}} />


<Story name="Nested Object" args={{
  class: "max-w-xl",
  data: {
    name: "malik",
    age: 33,
    hair_color: "black",
    is_married: true,
    wife: {
      name: "mounira",
      age: 32,
      hair_color: "black",
      is_married: true,
      child: {
        name: "mounira",
        age: 32,
        hair_color: "black",
        is_married: true,
      }
    }
  }
}} />

<Story name="Nested Array" args={{
  class: "max-w-xl",
  data: [
    "malik",
    54,
    true,
    [
      "malik",
      54,
      true,
      [
        "malik",
        54,
        true,
      ]
    ]
  ]
}} />

<Story name="Object in Array" args={{
  class: "max-w-xl",
  data: [
    "malik",
    54,
    true,
    {
      name: "malik",
      age: 33,
      hair_color: "black",
      is_married: true,
    }
  ]
}} />

<Story name="Object in Array in Array" args={{
  class: "max-w-xl",
  data: [
    "malik",
    54,
    true,
    [
      "malik",
      54,
      true,
      {
        name: "malik",
        age: 33,
        hair_color: "black",
        is_married: true,
      }
    ]
  ]
}} />