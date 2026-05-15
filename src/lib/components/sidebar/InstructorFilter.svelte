<script lang="ts">
    import { ChevronDown, User } from "@lucide/svelte";
    import { Combobox } from "bits-ui";

    let { allInstructors = [], selectedInstructor = $bindable() } = $props();
    const items = $derived(
        allInstructors.map((name) => ({ value: name, label: name })),
    );

    let searchValue = $state("");

    const filteredItems = $derived(
        searchValue === ""
            ? items
            : items.filter((i) =>
                  i.label.toLowerCase().includes(searchValue.toLowerCase()),
              ),
    );
</script>

<div>
    <div class="flex gap-2">
        <User class="h-5" />
        <h3 class="font-semibold mb-6 text-sm">担当教員</h3>
    </div>

    <Combobox.Root bind:value={selectedInstructor} type="single">
        <div class="relative">
            <!-- ユーザーが文字を入力する場所 -->
            <Combobox.Input
                oninput={(e) => (searchValue = e.currentTarget.value)}
                placeholder="担当教員"
                class="bg-slate-100 font-semibold px-4 py-3 rounded-lg text-slate-600 text-sm w-full focus:outline-2 focus:outline-emerald-500"
            />
            <!-- 開閉用のボタン（任意） -->
            <Combobox.Trigger
                class="absolute cursor-pointer right-0 top-1/2 -translate-1/2"
            >
                <ChevronDown class="text-slate-600" />
            </Combobox.Trigger>
        </div>

        <Combobox.Portal>
            <Combobox.Content
                class="bg-slate-50 shadow-md max-h-80 min-w-(--bits-combobox-anchor-width) p-1 rounded-lg w-(--bits-combobox-anchor-width) z-40"
            >
                <Combobox.Viewport>
                    {#each filteredItems as item}
                        <Combobox.Item
                            value={item.value}
                            label={item.label}
                            class="cursor-pointer data-highlighted:bg-slate-200 px-3 py-2 rounded-md"
                        >
                            {item.label}
                        </Combobox.Item>
                    {:else}
                        <p class="p-2 text-gray-500">該当教員なし</p>
                    {/each}
                </Combobox.Viewport>
            </Combobox.Content>
        </Combobox.Portal>
    </Combobox.Root>
</div>
