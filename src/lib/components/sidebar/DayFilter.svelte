<script lang="ts">
    import { Check, Sheet } from "@lucide/svelte";
    import { ToggleGroup } from "bits-ui";

    let { selectedDay = $bindable() } = $props();

    const dayItems = ["月", "火", "水", "木", "金", "他"];
</script>

<div class="mb-12">
    <div class="flex gap-2">
        <Sheet class="h-5" />
        <h3 class="font-semibold mb-4 text-sm">曜日</h3>
    </div>
    <ToggleGroup.Root
        class="font-semibold gap-2 grid grid-cols-3 text-sm text-slate-600"
        type="multiple"
        bind:value={selectedDay}
    >
        {#each dayItems as day}
            <ToggleGroup.Item
                class="bg-slate-100 cursor-pointer flex gap-2 group justify-center items-center py-2 rounded-lg transition-colors data-[state=on]:bg-emerald-50 data-[state=on]:text-emerald-600 hover:bg-slate-200"
                value={day}
            >
                <Check class="h-5 hidden -ml-2 group-data-[state=on]:inline" />
                <span>{day}</span>
            </ToggleGroup.Item>
        {/each}
    </ToggleGroup.Root>
</div>
