<script lang="ts">
    import { Check, Globe } from "@lucide/svelte";
    import { Checkbox, Label } from "bits-ui";

    let { isOnlineOnly = $bindable() } = $props();
</script>

<div class="mb-10">
    <div class="flex gap-2">
        <Globe class="h-5" />
        <h3 class="font-semibold mb-6 text-sm">オンライン</h3>
    </div>
    <div class="cursor-pointer flex gap-2 group items-center pr-2 py-2 w-fit">
        <Checkbox.Root bind:checked={isOnlineOnly} class="ml-0.5" id="online">
            {#snippet children({ checked })}
                {#if checked}
                    <div
                        class="bg-emerald-500 cursor-pointer flex h-5 items-center rounded-sm transition-colors w-5 group-hover:bg-emerald-600"
                    >
                        <Check class="h-4 text-white" />
                    </div>
                {:else}
                    <div
                        class="border border-slate-300 bg-slate-100 cursor-pointer h-5 rounded-sm transition-colors w-5 group-hover:bg-slate-200"
                    ></div>
                {/if}
            {/snippet}
        </Checkbox.Root>
        <Label.Root class="cursor-pointer font-semibold text-sm" for="online"
            >オンライン授業のみ</Label.Root
        >
    </div>
</div>
