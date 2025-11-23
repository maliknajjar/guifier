<script lang="ts">
    import * as Popover from "$lib/components/ui/popover/index.ts";
	import { Binary, Braces, Brackets, Hash, Plus, Type } from "lucide-svelte";
	import Button from "./components/ui/button/button.svelte";

    export type CreateFieldButtonOptions = "object" | "array" | "string" | "number" | "boolean";

    interface Props {
        onSelect: (value: CreateFieldButtonOptions) => void;
    }

    const { onSelect }: Props = $props();

    let open: boolean = $state(false);
</script>

<Popover.Root bind:open>
    <Popover.Trigger>
        <Button variant="ghost" class="p-0! hover:bg-transparent hover:cursor-pointer">
            <Plus />
        </Button>
    </Popover.Trigger>
    <Popover.Content class="p-1 text-sm w-48">
        <Button variant="ghost" class="gap-2 justify-between w-full px-2! py-1!" onclick={() => { onSelect("object"); open = false; }}>
            <div class="flex items-center gap-2">
                <Braces />
                <div class="font-normal text-sm">Object</div>
            </div>
            <Plus class="text-muted-foreground" />
        </Button>
        <Button variant="ghost" class="gap-2 justify-between w-full px-2! py-1!" onclick={() => { onSelect("array"); open = false; }}>
            <div class="flex items-center gap-2">
                <Brackets />
                <div class="font-normal text-sm">Array</div>
            </div>
            <Plus class="text-muted-foreground" />
        </Button>
        <Button variant="ghost" class="gap-2 justify-between w-full px-2! py-1!" onclick={() => { onSelect("string"); open = false; }}>
            <div class="flex items-center gap-2">
                <Type />
                <div class="font-normal text-sm">String</div>
            </div>
            <Plus class="text-muted-foreground" />
        </Button>
        <Button variant="ghost" class="gap-2 justify-between w-full px-2! py-1!" onclick={() => { onSelect("number"); open = false; }}>
            <div class="flex items-center gap-2">
                <Hash />
                <div class="font-normal text-sm">Number</div>
            </div>
            <Plus class="text-muted-foreground" />
        </Button>
        <Button variant="ghost" class="gap-2 justify-between w-full px-2! py-1!" onclick={() => { onSelect("boolean"); open = false; }}>
            <div class="flex items-center gap-2">
                <Binary />
                <div class="font-normal text-sm">Boolean</div>
            </div>
            <Plus class="text-muted-foreground" />
        </Button>
    </Popover.Content>
</Popover.Root>