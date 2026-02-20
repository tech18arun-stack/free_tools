import { motion } from 'framer-motion';

export function Loader({ size = 'md', fullScreen = false, text = 'Loading...' }) {
    const sizes = {
        sm: { container: 'w-8 h-8', dot: 'w-2 h-2' },
        md: { container: 'w-16 h-16', dot: 'w-3 h-3' },
        lg: { container: 'w-24 h-24', dot: 'w-4 h-4' },
    };

    const currentSize = sizes[size];

    const content = (
        <div className="flex flex-col items-center justify-center gap-4">
            {/* Animated Logo Loader */}
            <div className={`relative ${currentSize.container}`}>
                {/* Outer Ring */}
                <motion.div
                    className="absolute inset-0 rounded-full border-4 border-surface-200 dark:border-surface-700"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Middle Ring with Gradient */}
                <motion.div
                    className="absolute inset-0 rounded-full border-4 border-transparent border-t-accent-500 border-r-purple-500"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Inner Pulsing Core */}
                <motion.div
                    className="absolute inset-3 rounded-full bg-gradient-to-br from-accent-500 via-purple-500 to-pink-500 shadow-lg shadow-accent-500/50"
                    animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.8, 1, 0.8],
                    }}
                    transition={{ 
                        duration: 1.5, 
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                
                {/* Orbiting Dots */}
                {[0, 120, 240].map((delay, i) => (
                    <motion.div
                        key={i}
                        className={`absolute inset-0 ${currentSize.dot} bg-white rounded-full shadow-lg`}
                        style={{ 
                            top: '50%',
                            left: '50%',
                            marginTop: `-${currentSize.dot.replace('w-', '')/2}px`,
                            marginLeft: `-${currentSize.dot.replace('w-', '')/2}px`,
                        }}
                        animate={{ 
                            rotate: 360,
                        }}
                        transition={{ 
                            duration: 2, 
                            delay: delay / 360,
                            repeat: Infinity, 
                            ease: "linear" 
                        }}
                    >
                        <motion.div
                            className="absolute"
                            style={{ 
                                top: size === 'sm' ? '-8px' : size === 'lg' ? '-16px' : '-12px',
                                left: '50%',
                                transform: 'translateX(-50%)'
                            }}
                            animate={{ 
                                scale: [1, 1.3, 1],
                            }}
                            transition={{ 
                                duration: 1, 
                                delay: delay / 360,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    </motion.div>
                ))}
            </div>

            {/* Loading Text */}
            {text && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center"
                >
                    <p className="text-surface-600 dark:text-surface-400 font-medium">{text}</p>
                    <motion.div
                        className="flex items-center justify-center gap-1 mt-2"
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                    >
                        <motion.span
                            className="w-2 h-2 bg-accent-500 rounded-full"
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        />
                        <motion.span
                            className="w-2 h-2 bg-purple-500 rounded-full"
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.span
                            className="w-2 h-2 bg-pink-500 rounded-full"
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        />
                    </motion.div>
                </motion.div>
            )}
        </div>
    );

    if (fullScreen) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-white/80 dark:bg-surface-950/80 backdrop-blur-sm z-50 flex items-center justify-center"
            >
                {content}
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center min-h-[300px] w-full"
        >
            {content}
        </motion.div>
    );
}

export function SkeletonCard() {
    return (
        <div className="rounded-2xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 p-5 animate-pulse">
            <div className="flex items-start gap-4">
                {/* Icon Skeleton */}
                <div className="w-14 h-14 rounded-2xl bg-surface-200 dark:bg-surface-700" />
                
                {/* Content Skeleton */}
                <div className="flex-1 space-y-3">
                    <div className="h-5 bg-surface-200 dark:bg-surface-700 rounded w-3/4" />
                    <div className="h-4 bg-surface-200 dark:bg-surface-700 rounded w-full" />
                    <div className="h-4 bg-surface-200 dark:bg-surface-700 rounded w-2/3" />
                </div>
            </div>
            
            {/* Footer Skeleton */}
            <div className="mt-4 pt-4 border-t border-surface-100 dark:border-surface-800 flex items-center justify-between">
                <div className="h-3 bg-surface-200 dark:bg-surface-700 rounded w-20" />
                <div className="h-3 bg-surface-200 dark:bg-surface-700 rounded w-16" />
            </div>
        </div>
    );
}

export function SkeletonText({ lines = 3 }) {
    return (
        <div className="space-y-3 animate-pulse">
            {Array.from({ length: lines }).map((_, i) => (
                <div
                    key={i}
                    className="h-4 bg-surface-200 dark:bg-surface-700 rounded"
                    style={{ width: `${100 - (i * 10)}%` }}
                />
            ))}
        </div>
    );
}

export function SkeletonImage() {
    return (
        <div className="relative overflow-hidden rounded-2xl bg-surface-200 dark:bg-surface-700 animate-pulse">
            <div className="aspect-video" />
        </div>
    );
}

export function PageLoader() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-surface-50 dark:bg-surface-950">
            <Loader size="lg" text="Loading FreeTools..." />
        </div>
    );
}
