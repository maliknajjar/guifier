<script lang="ts">
    import { onMount } from "svelte";
    import { Guifier as GuifierClass } from "./Guifier.svelte";

    onMount(() => {
        const guifierContainer = document.querySelector(".guifier_container");

        if (!guifierContainer) {
            throw new Error("The guifier container doesnt exist yet");
        }

        new GuifierClass({
            target: guifierContainer,
            dataType: "js",
            data: {
                name: "malik"
            }
        })
    })
</script>

<div class="guifier_container"></div>