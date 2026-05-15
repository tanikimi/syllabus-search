<script lang="ts">
    import { Check, Clock } from "@lucide/svelte";
    import { ToggleGroup } from "bits-ui";

    let { selectedPeriod = $bindable() } = $props();

    const periodItems = [
        ["1限", "1"],
        ["2限", "2"],
        ["3限", "3"],
        ["4限", "4"],
        ["5限", "5"],
        ["6限", "6"],
    ];
</script>

<div class="mb-12">
    <div class="flex gap-2">
        <Clock class="h-5" />
        <h3 class="font-semibold mb-4 text-sm">時限</h3>
    </div>
    <ToggleGroup.Root
        class="font-semibold gap-2 grid grid-cols-3 text-sm text-slate-600"
        type="multiple"
        bind:value={selectedPeriod}
    >
        {#each periodItems as [display, value]}
            <ToggleGroup.Item
                class="bg-slate-100 cursor-pointer flex gap-2 group justify-center items-center py-2 rounded-lg transition-colors data-[state=on]:bg-emerald-50 data-[state=on]:text-emerald-600 hover:bg-slate-200"
                {value}
            >
                <Check class="h-5 hidden -ml-2 group-data-[state=on]:inline" />
                <span>{display}</span>
            </ToggleGroup.Item>
        {/each}
    </ToggleGroup.Root>
</div>
