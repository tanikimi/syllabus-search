<script lang="ts">
    import { Info, X } from "@lucide/svelte";
    import { Dialog } from "bits-ui";
    import { cubicOut } from "svelte/easing";
    import { fade, fly } from "svelte/transition";
</script>

<div>
    <Dialog.Root>
        <Dialog.Trigger
            class="cursor-pointer p-2 rounded-full text-slate-600 transition-colors hover:bg-slate-100"
        >
            <Info class="h-5 text-slate-600 w-5" />
        </Dialog.Trigger>

        <Dialog.Portal>
            <Dialog.Overlay forceMount>
                {#snippet child({ props, open })}
                    {#if open}
                        <div
                            {...props}
                            transition:fade={{ duration: 200 }}
                            class="backdrop-blur-xs bg-black/20 fixed inset-0 z-20"
                        ></div>
                    {/if}
                {/snippet}
            </Dialog.Overlay>

            <Dialog.Content forceMount>
                {#snippet child({ props, open })}
                    {#if open}
                        <div
                            {...props}
                            transition:fly={{
                                y: 10,
                                duration: 200,
                                easing: cubicOut,
                            }}
                            class="bg-white fixed h-fit left-[calc(50%-1rem)] max-h-2/3 max-w-xl min-h-80 mx-4 overflow-scroll pb-6 rounded-2xl top-1/2 -translate-1/2 w-[calc(100%-2rem)] z-30"
                        >
                            <div
                                class="bg-white flex items-center justify-between pt-4 pb-3 px-6 mb-3 sticky top-0 w-full"
                            >
                                <Dialog.Title>
                                    <h2 class="font-semibold text-xl">About</h2>
                                </Dialog.Title>
                                <Dialog.Close>
                                    <div
                                        class="cursor-pointer p-2 rounded-full -mr-2 text-slate-600 transition-colors hover:bg-slate-100"
                                    >
                                        <X class="h-5 w-5" />
                                    </div>
                                </Dialog.Close>
                                <div
                                    class="absolute bg-linear-to-b from-white h-4 left-0 pointer-events-none top-full to-transparent w-full"
                                ></div>
                            </div>

                            <Dialog.Description class="px-6">
                                <h3 class="font-semibold mb-3 text-sm">
                                    Syllabus Searchとは
                                </h3>
                                <p class="mb-2 text-xs text-slate-600">
                                    Syllabus Search
                                    は、和歌山大学の非公式シラバス検索サービスです。
                                </p>
                                <ul
                                    class="list-disc mb-6 text-xs text-slate-600"
                                >
                                    <li class="list-inside">
                                        <a
                                            class="underline"
                                            href="https://github.com/tanikimi/syllabus-search"
                                            target="_blank">GitHubリポジトリ</a
                                        >
                                    </li>
                                </ul>
                                <h3 class="font-semibold mb-3 text-sm">
                                    掲載情報について
                                </h3>
                                <p class="mb-2 text-xs text-slate-600">
                                    当サービスで掲載・利用している情報は、
                                    <a
                                        class="underline"
                                        href="https://web.wakayama-u.ac.jp/syllabus/"
                                        target="_blank"
                                    >
                                        和歌山大学オンラインシラバス
                                    </a>
                                    から自動的に取得したものです。
                                </p>
                                <p class="mb-6 text-xs text-slate-600">
                                    当サービスは授業情報の円滑な検索を目的としており、著作権等権利の侵害を目的としたものではありません。
                                    掲載内容に問題がある場合、お手数ですが下記「製作者」欄のいずれかの連絡先までご連絡ください。
                                </p>
                                <h3 class="font-semibold mb-3 text-sm">
                                    免責事項
                                </h3>
                                <p class="mb-6 text-xs text-slate-600">
                                    万全を期してはおりますが、情報の正確性・最新性・完全性について、当サービスはいかなる保証も行いません。
                                    また、当サービスの利用により生じた問題・損害（直接的・間接的を問わず）についても、一切の責任を負いません。
                                </p>
                                <h3 class="font-semibold mb-3 text-sm">
                                    製作者
                                </h3>
                                <p class="mb-2 text-xs text-slate-600">
                                    谷川 木穣 / Kiminori Tanigawa
                                </p>
                                <ul
                                    class="list-disc mb-6 text-xs text-slate-600"
                                >
                                    <li class="list-inside mb-2">
                                        <a
                                            class="underline"
                                            href="https://kiminori.me/"
                                            target="_blank">ホームページ</a
                                        >
                                    </li>
                                    <li class="list-inside mb-2">
                                        <a
                                            class="underline"
                                            href="mailto:s2310155＠wakayama-u.ac.jp"
                                            target="_blank">大学メール</a
                                        >
                                    </li>
                                    <li class="list-inside mb-2">
                                        <a
                                            class="underline"
                                            href="mailto:hello@kiminori.me"
                                            target="_blank">個人メール</a
                                        >
                                    </li>
                                    <li class="list-inside">
                                        <a
                                            class="underline"
                                            href="https://x.com/kiminori_me"
                                            target="_blank">X</a
                                        >
                                    </li>
                                </ul>
                                <h3 class="font-semibold mb-3 text-sm">
                                    著作表示
                                </h3>
                                <p class="mb-2 text-xs text-slate-600">
                                    ©︎ 2026 Syllabus Search / Kiminori Tanigawa
                                </p>
                                <ul class="list-disc text-xs text-slate-600">
                                    <li class="list-inside mb-2">
                                        <a
                                            class="underline"
                                            href="https://github.com/tanikimi/syllabus-search/blob/main/licenses/license.txt"
                                            target="_blank">OSSライセンス</a
                                        >
                                    </li>
                                    <li class="list-inside">
                                        <a
                                            class="underline"
                                            href="https://github.com/tanikimi/syllabus-search/blob/main/licenses/font-license.txt"
                                            target="_blank"
                                            >フォントライセンス</a
                                        >
                                    </li>
                                </ul>
                            </Dialog.Description>
                        </div>
                    {/if}
                {/snippet}
            </Dialog.Content>
        </Dialog.Portal>
    </Dialog.Root>
</div>
