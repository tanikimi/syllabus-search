<script lang="ts">
    // フィルターコンポーネントの読み込み
    import CourseFilter from "../lib/components/sidebar/CourseFilter.svelte";
    import SemesterFilter from "../lib/components/sidebar/SemesterFilter.svelte";
    import YearFilter from "../lib/components/sidebar/YearFilter.svelte";
    import DayFilter from "../lib/components/sidebar/DayFilter.svelte";
    import PeriodFilter from "../lib/components/sidebar/PeriodFilter.svelte";
    import OnlineFilter from "../lib/components/sidebar/OnlineFilter.svelte";
    import InstructorFilter from "../lib/components/sidebar/InstructorFilter.svelte";

    // メイン部コンポーネントの読み込み
    import Header from "../lib/components/main/Header.svelte";
    import Skelton from "../lib/components/main/Skeleton.svelte";
    import ClassItem from "../lib/components/main/ClassItem.svelte";

    // アイコンの読み込み
    import { BrushCleaning, Database, SearchCheck, X } from "@lucide/svelte";

    // アニメーション用読み込み
    import { fade } from "svelte/transition";

    // JSONデータ受け取り用の型定義
    import type { PageData } from "./$types";

    // JSONの読み込み
    type SyllabusInfo = {
        開講科目名: string;
        開講所属: string;
        曜限: string[];
        開講区分: string;
        単位数: string;
        学年: string[];
        主担当教員: string;
        教室: string[];
        概要: string;
        担当教員: string[];
        オンライン: boolean;
        タイムスタンプ: number;
        URL: string;
    };

    type SyllabusData = Record<string, SyllabusInfo>;

    // デバッグ
    let { data } = $props<{ data: { jsonData: SyllabusData } }>();
    let jsonData = $derived(data.jsonData as SyllabusData);
    let classItemsArray = $derived(jsonData ? Object.entries(jsonData) : []);

    // 各種フィルター用state
    let searchQuery = $state("");
    let selectedCourse = $state<string[]>([]);
    let selectedSemester = $state<string[]>([]);
    let selectedYear = $state<string[]>([]);
    let selectedDay = $state<string[]>([]);
    let selectedPeriod = $state<string[]>([]);
    let isOnlineOnly = $state(false as boolean);
    let selectedInstructor = $state("");

    // poop判定用state
    let isQueryPoop = $derived(
        ["うんこ", "うんち", "poop"].includes(searchQuery.trim().toLowerCase()),
    );

    // 教員一覧を作成
    let allInstructors = $derived.by(() => {
        if (!jsonData) return [];
        const names = Object.values(jsonData).flatMap((c) => c.担当教員);
        return [...new Set(names)].sort();
    });

    // フィルター適用処理
    let filteredClassItems = $derived(() => {
        if (!jsonData) return [];

        let items = Object.entries(jsonData);

        // 検索
        if (searchQuery.trim() !== "") {
            const keywords = searchQuery.trim().split(/[\s　]+/);
            items = items.filter(([_, courseInfo]) => {
                return keywords.every((keyword) =>
                    courseInfo.開講科目名.includes(keyword),
                );
            });
        }

        // 所属
        if (selectedCourse.length > 0) {
            items = items.filter(([_, courseInfo]) => {
                return selectedCourse.includes(courseInfo.開講所属);
            });
        }

        // 開講期間
        if (selectedSemester.length > 0) {
            items = items.filter(([_, courseInfo]) => {
                return selectedSemester.includes(courseInfo.開講区分);
            });
        }

        // 学年
        if (selectedYear.length > 0) {
            items = items.filter(([_, courseInfo]) => {
                return selectedYear.some((grade) =>
                    courseInfo.学年.includes(grade),
                );
            });
        }

        // 曜日・時限
        if (selectedDay.length > 0 || selectedPeriod.length > 0) {
            items = items.filter(([_, courseInfo]) => {
                return courseInfo.曜限.some((yogen) => {
                    const matchDay =
                        selectedDay.length === 0 ||
                        selectedDay.some((day) => yogen.includes(day));
                    const matchPeriod =
                        selectedPeriod.length === 0 ||
                        selectedPeriod.some((period) => yogen.includes(period));
                    return matchDay && matchPeriod;
                });
            });
        }

        // オンライン
        if (isOnlineOnly === true) {
            items = items.filter(([_, courseInfo]) => {
                return courseInfo.オンライン === true;
            });
        }

        // 担当教員
        if (selectedInstructor !== "") {
            items = items.filter(([_, courseInfo]) => {
                return courseInfo.担当教員.includes(selectedInstructor);
            });
        }

        return items;
    });

    // フィルターリセット
    function resetFilters() {
        selectedCourse = [];
        selectedSemester = [];
        selectedYear = [];
        isOnlineOnly = false;
        selectedInstructor = "";
        selectedDay = [];
        selectedPeriod = [];
    }

    // フィルター有無の確認
    let isActive = $derived(
        selectedCourse.length > 0 ||
            selectedSemester.length > 0 ||
            selectedYear.length > 0 ||
            selectedDay.length > 0 ||
            selectedPeriod.length > 0 ||
            isOnlineOnly === true ||
            selectedInstructor !== "",
    );

    // レスポンシブ用サイドバー開閉用state
    let isSidebarOpen = $state(false);
</script>

<!-- フォント読み込み -->
<svelte:head>
    <title>Syllabus Search</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
        href="https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap"
        rel="stylesheet"
    />
</svelte:head>

<div class="flex text-slate-900">
    <!-- サイドバー -->
    <aside
        class="bg-white border-slate-200 border-r fixed h-dvh overflow-scroll shrink-0 transition-transform w-xs z-10 lg:relative lg:translate-x-0
        {isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}"
    >
        <nav>
            <div
                class="bg-white flex items-center pl-6 pr-4 pt-6 pb-3 sticky top-0 w-full"
            >
                <h2 class="font-semibold leading-10 text-lg">Filter</h2>
                <button
                    class="ml-auto p-2 rounded-full transition-colors {isActive
                        ? 'cursor-pointer text-slate-900 hover:bg-slate-100'
                        : 'text-slate-300 cursor-default'}"
                    onclick={resetFilters}
                >
                    <BrushCleaning class="h-5 w-5" />
                </button>
                <button
                    class="cursor-pointer ml-2 p-2 rounded-full transition-colors hover:bg-slate-100 lg:hidden"
                    onclick={() => (isSidebarOpen = false)}
                >
                    <X class="h-5 w-5" />
                </button>
                <div
                    class="absolute bg-linear-to-b from-white h-4 left-0 pointer-events-none top-full to-transparent w-full"
                ></div>
            </div>
            <div class="p-6">
                <!-- 所属 -->
                <CourseFilter bind:selectedCourse />
                <!-- 開講期間 -->
                <SemesterFilter bind:selectedSemester />
                <!-- 学年 -->
                <YearFilter bind:selectedYear />
                <!-- 曜日 -->
                <DayFilter bind:selectedDay />
                <!-- 時限 -->
                <PeriodFilter bind:selectedPeriod />
                <!-- オンライン -->
                <OnlineFilter bind:isOnlineOnly />
                <!-- 講師 -->
                <InstructorFilter {allInstructors} bind:selectedInstructor />
            </div>
        </nav>
    </aside>
    <main class="h-dvh min-w-0 overflow-scroll relative w-full">
        <!-- ヘッダー -->
        <Header bind:searchQuery bind:isSidebarOpen />
        <div class="px-6 w-full">
            <!-- 検索件数 -->
            <div class="flex gap-2 items-center mt-4 mb-3 text-slate-400">
                <SearchCheck class="h-4 w-4" />
                <span class="font-semibold text-sm">
                    Result: {filteredClassItems().length} / {classItemsArray.length}
                </span>
            </div>

            <!-- 検索結果 -->
            <ClassItem classItems={filteredClassItems()} bind:isQueryPoop />
        </div>
    </main>
</div>
<!-- 背景用 -->
{#if isSidebarOpen}
    <button
        aria-label="メニューを閉じる"
        class=" backdrop-blur-xs bg-black/20 fixed inset-0 lg:hidden"
        onclick={() => (isSidebarOpen = false)}
        transition:fade={{ duration: 200 }}
    ></button>
{/if}
