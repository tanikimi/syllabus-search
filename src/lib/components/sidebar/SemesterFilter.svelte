<script lang="ts">
    import { Calendar, Check } from "@lucide/svelte";
    import { ToggleGroup } from "bits-ui";

    let { selectedSemester = $bindable() } = $props();

    const semesterItems = [
        ["前期", "前期"],
        ["後期", "後期"],
        ["1Q", "第1クォーター"],
        ["2Q", "第2クォーター"],
        ["3Q", "第3クォーター"],
        ["4Q", "第4クォーター"],
        ["通年", "通年"],
    ];
</script>

<div class="mb-12">
    <div class="flex gap-2">
        <Calendar class="h-5" />
        <h3 class="font-semibold mb-4 text-sm">開講期間</h3>
    </div>
    <ToggleGroup.Root
        class="font-semibold gap-2 grid grid-cols-2 text-sm text-slate-600"
        type="multiple"
        bind:value={selectedSemester}
    >
        {#each semesterItems as [display, value]}
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
