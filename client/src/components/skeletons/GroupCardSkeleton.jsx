export default function GroupCardSkeleton() {
    return (
        <div class="w-full max-h-80 shadow-md active:brightness-95 flex flex-col rounded-xl bg-neutral-200 dark:bg-neutral-900">
            <div class="flex flex-row items-center p-2 bg-gray-200 dark:bg-neutral-800 rounded-t-xl border-b animate-pulse">
                <div class="bg-neutral-300 dark:bg-neutral-800 rounded-circle h-8 w-8 "></div>
                <div class="bg-neutral-300 dark:bg-neutral-800 rounded-circle h-4 w-4 ml-2 "></div>
                <div class="bg-neutral-300 dark:bg-neutral-800 rounded ml-2 w-16 h-3 "></div>
            </div>

            <div class="flex flex-col px-4 pt-4 gap-1 h-full animate-pulse">
                <div class="h-5 bg-neutral-300 dark:bg-neutral-800 rounded w-1/3"></div>
                <div class="h-4 bg-neutral-300 dark:bg-neutral-800 rounded w-2/3"></div>
            </div>

            <div class="flex flex-row justify-between px-4 py-4 animate-pulse">
                <div class="flex flex-row items-center bg-neutral-300 dark:bg-neutral-800 rounded-lg py-1.5 px-2.5 gap-1.5 shadow-sm min-w-32 justify-center">
                    <div class="h-4 w-4 bg-neutral-400 dark:bg-neutral-700 rounded ml-1"></div>
                    <div class="h-3 bg-neutral-400 dark:bg-neutral-700 rounded ml-2 w-16"></div>
                </div>
                <div class="flex flex-row items-center bg-neutral-300 dark:bg-neutral-800 rounded-lg py-1.5 px-2.5 gap-1.5 shadow-sm min-w-16 justify-center animate-pulse">
                    <div class="h-4 w-4 bg-neutral-400 dark:bg-neutral-700 rounded ml-1"></div>
                    <div class="h-3 bg-neutral-400 dark:bg-neutral-700 rounded ml-2 w-8"></div>
                </div>
            </div>
        </div>
    );
}