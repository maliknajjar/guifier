<script module>
  import "../../app.css"

  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Guifier from '../../lib/guifier/guifier.svelte';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: 'Guifier',
    component: Guifier,
    tags: ['autodocs'],
    args: {
      style: "max-width: 40rem"
    }
  });
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Simple Object" args={{
  data: {
    name: "malik",
    age: 33,
    hair_color: "black",
    is_married: true,
    is_crazy: null
  }
}} />

<Story name="Simple Array" args={{
  data: [
    "malik",
    54,
    true,
    null
  ]
}} />


<Story name="Nested Object" args={{
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

<Story name="Array in Object" args={{
  data: {
    name: "malik",
    age: 33,
    hair_color: "black",
    is_married: true,
    children: [
      "malik",
      54,
      true,
    ]
  }
}} />

<Story name="Array in Object in Object" args={{
  data: {
    name: "malik",
    age: 33,
    hair_color: "black",
    is_married: true,
    person: {
      name: "malik",
      age: 33,
      hair_color: "black",
      is_married: true,
      children: [
        "malik",
        54,
        true,
      ]
    }
  }
}} />
