<script lang="ts">
    import { Check, Landmark } from "@lucide/svelte";
    import { ToggleGroup } from "bits-ui";

    let { selectedCourse = $bindable() } = $props();

    const courseItems = [
        ["共通", "共通"],
        ["教育", "教育学部"],
        ["経済", "経済学部"],
        ["シス工", "システム工学部"],
        ["観光", "観光学部"],
        ["社会", "社会インフォマティクス学環"],
    ];
</script>

<div class="mb-12">
    <div class="flex gap-2">
        <Landmark class="h-5" />
        <h3 class="font-semibold mb-4 text-sm">所属</h3>
    </div>
    <ToggleGroup.Root
        class="font-semibold gap-2 grid grid-cols-2 text-sm text-slate-600"
        type="multiple"
        bind:value={selectedCourse}
    >
        {#each courseItems as [display, value]}
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
