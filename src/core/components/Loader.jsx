export function Loader() {
    return (
        <div className="flex items-center justify-center min-h-[300px]">
            <div className="relative">
                <div className="w-12 h-12 rounded-full border-4 border-surface-200 dark:border-surface-700 border-t-primary-500 animate-spin" />
                <div className="absolute inset-0 w-12 h-12 rounded-full border-4 border-transparent border-b-purple-500 animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }} />
            </div>
        </div>
    );
}

export function SkeletonCard() {
    return (
        <div className="glass-card p-6 animate-pulse">
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-surface-200 dark:bg-surface-700" />
                <div className="flex-1 space-y-3">
                    <div className="h-4 bg-surface-200 dark:bg-surface-700 rounded w-3/4" />
                    <div className="h-3 bg-surface-200 dark:bg-surface-700 rounded w-full" />
                    <div className="h-3 bg-surface-200 dark:bg-surface-700 rounded w-1/2" />
                </div>
            </div>
        </div>
    );
}
