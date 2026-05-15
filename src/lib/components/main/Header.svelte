<script lang="ts">
    import About from "./About.svelte";

    import { ArrowLeft, Eraser, Menu, Search } from "@lucide/svelte";
    let { searchQuery = $bindable(), isSidebarOpen = $bindable() } = $props();

    let isSearchOpen = $state(false);

    import type { Action } from "svelte/action";

    const autoFocus: Action<HTMLInputElement> = (node) => {
        node.focus();
    };
</script>

<header class="bg-white sticky top-0 w-full">
    <nav class="flex items-center pb-4 pt-6 px-4 w-full">
        <button
            class="cursor-pointer mr-2 p-2 rounded-full text-slate-600 transition-colors hover:bg-slate-100 lg:hidden"
            onclick={() => (isSidebarOpen = !isSidebarOpen)}
        >
            <Menu class="h-5 w-5" />
        </button>
        <h1 class="font-semibold leading-10 ml-2 shrink-0 text-xl">
            Syllabus Search
        </h1>
        <a
            class="bg-emerald-50 hidden font-semibold ml-2 px-2 py-1 rounded-full shrink-0 text-emerald-600 text-xs sm:block"
            href="https://github.com/tanikimi/syllabus-search"
            target="_blank"
            >v 1.0.0
        </a>
        <div class="relative ml-auto mr-4 w-fit sm:ml-6 sm:w-full">
            <div
                class="bg-white fixed gap-4 items-center left-0 pl-4 pr-6 py-6 top-0 w-full sm:block sm:relative sm:p-0 {isSearchOpen
                    ? 'flex'
                    : 'hidden'}"
            >
                <button
                    class="cursor-pointer h-fit p-2 rounded-full text-slate-600 transition-colors hover:bg-slate-100 sm:hidden"
                    onclick={() => (isSearchOpen = !isSearchOpen)}
                >
                    <ArrowLeft class="h-5 w-5" />
                </button>
                <div class="relative w-full">
                    {#if isSearchOpen}
                        <input
                            bind:value={searchQuery}
                            class="bg-slate-100 pl-10 pr-2 py-2 relative rounded-xl w-full focus:outline-2 focus:outline-emerald-500"
                            placeholder="授業を検索"
                            type="search"
                            use:autoFocus
                        />
                    {:else}
                        <input
                            bind:value={searchQuery}
                            class="bg-slate-100 pl-10 pr-2 py-2 relative rounded-xl w-full focus:outline-2 focus:outline-emerald-500"
                            placeholder="授業を検索"
                            type="search"
                        />
                    {/if}
                    <Search
                        class="absolute h-4 left-2 text-slate-600 top-1/2 -translate-y-1/2"
                    />
                    <button
                        class="absolute right-2 top-1/2 -translate-y-1/2"
                        onclick={() => (searchQuery = "")}
                    >
                        <Eraser
                            class="h-4
                            {searchQuery === ''
                                ? 'text-slate-300'
                                : 'cursor-pointer text-slate-600'}"
                        />
                    </button>
                </div>
            </div>
            <button
                class="cursor-pointer p-2 rounded-full text-slate-600 transition-colors hover:bg-slate-100 sm:hidden"
                onclick={() => (isSearchOpen = !isSearchOpen)}
            >
                <Search class="h-5 w-5" />
            </button>
        </div>
        <About />
    </nav>
    <div
        class="absolute bg-linear-to-b from-white h-4 left-0 pointer-events-none top-full to-transparent w-full"
    ></div>
</header>
