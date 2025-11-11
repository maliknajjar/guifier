<script lang="ts">
    import { mount, onMount } from "svelte";
  import Guifier from "./guifier.svelte";

    onMount(() => {
        const guifierContainer = document.querySelector(".guifier_container");

        if (!guifierContainer) {
            throw new Error("The guifier container doesnt exist yet");
        }

        mount(Guifier, {
            target: guifierContainer,
            props: {
                data: {
                    name: "malik",
                    age: 33,
                    hair_color: "black",
                    is_married: true,
                    is_crazy: null
                }
            }
        })
    })
</script>

<div class="guifier_container"></div>