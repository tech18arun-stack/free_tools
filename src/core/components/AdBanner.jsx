export default function AdBanner({ slot = 'default', className = '' }) {
    return (
        <div className={`ad-banner rounded-2xl border-2 border-dashed border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-900/50 flex items-center justify-center min-h-[90px] text-surface-400 dark:text-surface-600 text-sm ${className}`}>
            <div className="text-center p-4">
                <p className="font-medium">Ad Space</p>
                <p className="text-xs mt-1">({slot})</p>
            </div>
        </div>
    );
}
