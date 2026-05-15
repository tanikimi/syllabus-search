<script lang="ts">
    import { Check, GraduationCap } from "@lucide/svelte";
    import { ToggleGroup } from "bits-ui";

    let { selectedYear = $bindable() } = $props();

    const yearItems = [
        ["1年", "1"],
        ["2年", "2"],
        ["3年", "3"],
        ["4年", "4"],
    ];
</script>

<div class="mb-12">
    <div class="flex gap-2">
        <GraduationCap class="h-5" />
        <h3 class="font-semibold mb-4 text-sm">学年</h3>
    </div>
    <ToggleGroup.Root
        class="font-semibold gap-2 grid grid-cols-2 text-sm text-slate-600"
        type="multiple"
        bind:value={selectedYear}
    >
        {#each yearItems as [display, value]}
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
