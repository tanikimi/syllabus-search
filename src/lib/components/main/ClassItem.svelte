<script lang="ts">
    import { LampDesk, Toilet } from "@lucide/svelte";
    let { classItems, isQueryPoop = $bindable() } = $props();
</script>

{#if classItems.length === 0}
    <div
        class="absolute flex flex-col gap-4 items-center left-1/2 text-slate-500 top-1/2 -translate-1/2"
    >
        {#if isQueryPoop}
            <Toilet />
        {:else}
            <LampDesk />
        {/if}
        <p class="font-semibold">Not Found</p>
    </div>
{:else}
    <ul class="w-full">
        {#each classItems as [classItemId, classItem]}
            <li
                class="border-t border-t-slate-200 list-none transition-colors w-full sm:hover:border-t-transparent"
            >
                <a
                    class="block px-2 py-6 rounded-2xl transition-colors w-full sm:hover:bg-slate-100 sm:p-6"
                    href={classItem.URL}
                    target="_blank"
                >
                    <div class="flex gap-4 justify-between mb-2 w-full">
                        <h2 class="font-semibold text-xl">
                            {classItem.開講科目名}
                        </h2>
                        <span
                            class="hidden roboto-mono text-slate-600 text-sm sm:block"
                        >
                            {classItemId}
                        </span>
                    </div>
                    <div class="font-semibold text-left mb-2">
                        <span class="font-normal text-slate-500 text-sm"
                            >{classItem.開講所属} / {classItem.開講区分} / {classItem.曜限}
                            /
                            {classItem.主担当教員}</span
                        >
                    </div>
                    <div
                        class="max-w-2xl overflow-hidden text-ellipsis whitespace-nowrap"
                    >
                        <span class=" text-sm">
                            {classItem.概要}
                            >
                        </span>
                    </div>
                </a>
            </li>
        {/each}
    </ul>
{/if}

<style>
    li:first-child {
        border-top-color: transparent;
    }
    @media (width >= 40rem) {
        li:hover + li {
            border-top-color: transparent;
        }
    }
</style>
