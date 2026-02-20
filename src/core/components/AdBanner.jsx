import { useState, useEffect } from 'react';

export default function AdBanner({ 
    slot = 'default', 
    className = '', 
    size = 'responsive',
    format = 'banner'
}) {
    const [isVisible, setIsVisible] = useState(true);

    // Ad sizes configuration
    const adSizes = {
        responsive: 'min-h-[90px]',
        banner: 'min-h-[90px]',
        leaderboard: 'min-h-[90px]',
        rectangle: 'min-h-[250px]',
        skyscraper: 'min-h-[600px]',
        square: 'min-h-[250px]',
        mobile: 'min-h-[50px]',
    };

    // Ad formats with different layouts
    const adFormats = {
        banner: {
            container: 'flex items-center justify-center',
            content: 'text-center',
        },
        sidebar: {
            container: 'flex flex-col items-center',
            content: 'text-center',
        },
        inline: {
            container: 'flex items-center gap-4 p-4',
            content: 'text-left',
        },
    };

    const currentFormat = adFormats[format] || adFormats.banner;
    const currentSize = adSizes[size] || adSizes.responsive;

    // Get ad label based on slot
    const getAdLabel = () => {
        const labels = {
            'header-banner': 'Header Banner (728x90)',
            'footer-banner': 'Footer Banner (728x90)',
            'home-top-banner': 'Home Top (970x90)',
            'home-middle': 'Home Middle (728x90)',
            'home-categories-bottom': 'Home Categories (970x90)',
            'home-popular-bottom': 'Home Popular (728x90)',
            'home-bottom-banner': 'Home Bottom (970x90)',
            'category-top': 'Category Top (728x90)',
            'category-bottom': 'Category Bottom (728x90)',
            'tool-top': 'Tool Page Top (728x90)',
            'tool-sidebar': 'Tool Sidebar (300x600)',
            'tool-bottom': 'Tool Page Bottom (728x90)',
            'content-inline': 'Inline Ad (336x280)',
            'default': 'Ad Space',
        };
        return labels[slot] || 'Ad Space';
    };

    // Close button handler
    const handleClose = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div 
            className={`
                ad-banner relative group
                rounded-2xl border-2 border-dashed 
                bg-gradient-to-br from-surface-50 to-surface-100 
                dark:from-surface-900/50 dark:to-surface-800/50
                border-surface-300 dark:border-surface-700
                ${currentSize}
                ${currentFormat.container}
                ${className}
            `}
        >
            {/* Close Button (for preview) */}
            <button
                onClick={handleClose}
                className="absolute top-2 right-2 p-1.5 rounded-lg bg-surface-200 dark:bg-surface-700 text-surface-500 dark:text-surface-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-500"
                title="Hide ad (preview only)"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {/* Ad Content Placeholder */}
            <div className={currentFormat.content}>
                {/* Ad Icon */}
                <div className="mb-3">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-accent-100 to-purple-100 dark:from-accent-900/50 dark:to-purple-900/50 text-accent-600 dark:text-accent-400">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                    </div>
                </div>

                {/* Ad Text */}
                <p className="font-semibold text-surface-600 dark:text-surface-400 text-sm">
                    Advertisement
                </p>
                <p className="text-xs text-surface-400 dark:text-surface-500 mt-1 font-mono">
                    {getAdLabel()}
                </p>

                {/* AdSense Placeholder Note */}
                <p className="text-xs text-surface-400 dark:text-surface-500 mt-2 max-w-xs mx-auto">
                    Replace with Google AdSense, Carbon Ads, or custom ad code
                </p>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-accent-500/5 to-transparent rounded-br-full"></div>
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-purple-500/5 to-transparent rounded-tl-full"></div>

            {/* Hover Effect Border */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-accent-300 dark:group-hover:border-accent-700 transition-colors duration-300 pointer-events-none"></div>
        </div>
    );
}
