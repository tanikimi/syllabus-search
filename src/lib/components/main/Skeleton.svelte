<ul class="h-[calc(100vh-8rem)] overflow-hidden w-full">
    {#each { length: 10 }, _}
        <li
            class="animate-pulse border-b border-b-slate-200 list-none px-2 w-full"
        >
            <div class="py-6 w-full">
                <div class="flex justify-between mb-3 w-full">
                    <div class="bg-slate-100 h-7 rounded w-1/3"></div>
                    <div class="bg-slate-100 h-5 rounded w-24"></div>
                </div>
                <div class="mb-3">
                    <div class="bg-slate-100 h-5 rounded w-32"></div>
                </div>
                <div>
                    <div class="bg-slate-100 h-5 rounded w-2xl"></div>
                </div>
            </div>
        </li>
    {/each}
</ul>
