import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOHead from '../components/SEOHead';
import AdBanner from '../components/AdBanner';
import ToolCard from '../components/ToolCard';
import ErrorBoundary from '../components/ErrorBoundary';
import { getToolBySlug, getRelatedTools, getCategoryBySlug } from '../utils/toolsData';

export default function ToolLayout({ toolSlug, children }) {
    const tool = getToolBySlug(toolSlug);
    const category = tool ? getCategoryBySlug(tool.category) : null;
    const related = getRelatedTools(toolSlug, 4);

    if (!tool) return null;

    const toolUrl = `https://freetools.com/tools/${toolSlug}`;
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": tool.name,
        "description": tool.description,
        "applicationCategory": "BrowserApplication",
        "operatingSystem": "All",
        "url": toolUrl,
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        }
    };

    return (
        <>
            <SEOHead
                title={`${tool.name} - Free Online Tool`}
                description={tool.description}
                keywords={tool.keywords?.join(', ')}
                canonicalUrl={toolUrl}
                structuredData={schema}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Top Ad Banner - Full Width */}
                <AdBanner slot="tool-page-top" className="w-full mb-8" />

                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-surface-500 mb-6">
                    <Link to="/" className="hover:text-primary-600 transition-colors flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Home
                    </Link>
                    <span>/</span>
                    {category && (
                        <>
                            <Link to={`/category/${category.slug}`} className="hover:text-primary-600 transition-colors">{category.name}</Link>
                            <span>/</span>
                        </>
                    )}
                    <span className="text-surface-900 dark:text-white font-medium">{tool.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Main Tool Area */}
                    <div className="lg:col-span-3">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* Tool Header */}
                            <div className="mb-6 p-6 rounded-2xl bg-gradient-to-br from-accent-50 to-purple-50 dark:from-accent-900/20 dark:to-purple-900/20 border border-accent-100 dark:border-accent-800">
                                <div className="flex items-start gap-4">
                                    <div className="w-16 h-16 rounded-2xl bg-white dark:bg-surface-800 flex items-center justify-center text-4xl shadow-lg border border-accent-100 dark:border-accent-800">
                                        {tool.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h1 className="text-3xl md:text-4xl font-display font-bold text-surface-900 dark:text-white mb-2">{tool.name}</h1>
                                        <p className="text-surface-600 dark:text-surface-400 text-lg">{tool.description}</p>
                                        <div className="flex flex-wrap gap-2 mt-3">
                                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-400 text-xs font-semibold">
                                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                                </svg>
                                                No Login Required
                                            </span>
                                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold">
                                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                                100% Secure
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tool Content */}
                            <div className="glass-card p-6 md:p-8 mb-8">
                                <ErrorBoundary>
                                    {children}
                                </ErrorBoundary>
                            </div>

                            {/* In-Content Ad Banner */}
                            <AdBanner slot="tool-content-top" className="mb-8" />

                            {/* SEO Content Section */}
                            <div className="glass-card p-6 md:p-8 mb-8">
                                <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
                                    <svg className="w-6 h-6 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    How to Use {tool.name}
                                </h2>
                                <div className="prose dark:prose-invert max-w-none text-surface-600 dark:text-surface-400 text-sm leading-relaxed space-y-3">
                                    <p>
                                        <strong>{tool.name}</strong> is a free online tool that helps you {tool.description.toLowerCase()} This tool runs entirely in your browser — no data is uploaded to any server, ensuring your privacy and security.
                                    </p>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                                        <div className="p-4 rounded-xl bg-accent-50 dark:bg-accent-900/20 border border-accent-100 dark:border-accent-800">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="w-6 h-6 rounded-full bg-accent-500 text-white flex items-center justify-center text-sm font-bold">1</span>
                                                <span className="font-semibold text-surface-900 dark:text-white">Input</span>
                                            </div>
                                            <p className="text-sm text-surface-600 dark:text-surface-400">Provide the required input (file, text, or data) in the tool above.</p>
                                        </div>
                                        <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm font-bold">2</span>
                                                <span className="font-semibold text-surface-900 dark:text-white">Configure</span>
                                            </div>
                                            <p className="text-sm text-surface-600 dark:text-surface-400">Adjust any options or settings according to your needs.</p>
                                        </div>
                                        <div className="p-4 rounded-xl bg-pink-50 dark:bg-pink-900/20 border border-pink-100 dark:border-pink-800">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="w-6 h-6 rounded-full bg-pink-500 text-white flex items-center justify-center text-sm font-bold">3</span>
                                                <span className="font-semibold text-surface-900 dark:text-white">Process</span>
                                            </div>
                                            <p className="text-sm text-surface-600 dark:text-surface-400">Click the action button to process your input instantly.</p>
                                        </div>
                                        <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold">4</span>
                                                <span className="font-semibold text-surface-900 dark:text-white">Download</span>
                                            </div>
                                            <p className="text-sm text-surface-600 dark:text-surface-400">Download or copy your result with a single click.</p>
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-semibold text-surface-800 dark:text-surface-200 mt-6 mb-3">
                                        <svg className="w-5 h-5 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Frequently Asked Questions
                                    </h3>
                                    <div className="space-y-3">
                                        <details className="group rounded-xl border border-surface-200 dark:border-surface-700 overflow-hidden">
                                            <summary className="cursor-pointer font-medium text-surface-700 dark:text-surface-300 bg-surface-50 dark:bg-surface-800 px-4 py-3 hover:bg-accent-50 dark:hover:bg-accent-900/20 transition-colors flex items-center justify-between">
                                                <span>Is {tool.name} free to use?</span>
                                                <svg className="w-5 h-5 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </summary>
                                            <div className="px-4 py-3 text-surface-600 dark:text-surface-400">
                                                Yes! {tool.name} is completely free with no registration required. Use it as many times as you need, with no limitations.
                                            </div>
                                        </details>
                                        <details className="group rounded-xl border border-surface-200 dark:border-surface-700 overflow-hidden">
                                            <summary className="cursor-pointer font-medium text-surface-700 dark:text-surface-300 bg-surface-50 dark:bg-surface-800 px-4 py-3 hover:bg-accent-50 dark:hover:bg-accent-900/20 transition-colors flex items-center justify-between">
                                                <span>Is my data safe?</span>
                                                <svg className="w-5 h-5 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </summary>
                                            <div className="px-4 py-3 text-surface-600 dark:text-surface-400">
                                                Absolutely. All processing happens locally in your browser. Your files and data are never uploaded to any server, ensuring complete privacy.
                                            </div>
                                        </details>
                                        <details className="group rounded-xl border border-surface-200 dark:border-surface-700 overflow-hidden">
                                            <summary className="cursor-pointer font-medium text-surface-700 dark:text-surface-300 bg-surface-50 dark:bg-surface-800 px-4 py-3 hover:bg-accent-50 dark:hover:bg-accent-900/20 transition-colors flex items-center justify-between">
                                                <span>Does it work on mobile devices?</span>
                                                <svg className="w-5 h-5 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </summary>
                                            <div className="px-4 py-3 text-surface-600 dark:text-surface-400">
                                                Yes! This tool is fully responsive and works perfectly on all devices including phones, tablets, and desktop computers.
                                            </div>
                                        </details>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Ad Banner */}
                            <AdBanner slot="tool-content-bottom" className="mb-8" />

                            {/* Related Tools */}
                            {related.length > 0 && (
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-6 flex items-center gap-2">
                                        <svg className="w-6 h-6 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                        </svg>
                                        Related Tools
                                    </h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {related.map((t, i) => (
                                            <ToolCard key={t.id} tool={t} index={i} />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Sticky Sidebar Ad - Top */}
                        <div className="sticky top-6 space-y-6">
                            <AdBanner slot="sidebar-top" size="rectangle" />
                            
                            {/* Tool Info Card */}
                            <div className="glass-card p-5 rounded-2xl">
                                <h3 className="font-bold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Tool Info
                                </h3>
                                <ul className="space-y-3 text-sm">
                                    <li className="flex items-center gap-2 text-surface-600 dark:text-surface-400">
                                        <span className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 text-xs">✓</span>
                                        Free to use
                                    </li>
                                    <li className="flex items-center gap-2 text-surface-600 dark:text-surface-400">
                                        <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 text-xs">🔒</span>
                                        No data uploaded
                                    </li>
                                    <li className="flex items-center gap-2 text-surface-600 dark:text-surface-400">
                                        <span className="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 text-xs">⚡</span>
                                        Instant results
                                    </li>
                                    <li className="flex items-center gap-2 text-surface-600 dark:text-surface-400">
                                        <span className="w-5 h-5 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center text-pink-600 dark:text-pink-400 text-xs">📱</span>
                                        Mobile friendly
                                    </li>
                                    <li className="flex items-center gap-2 text-surface-600 dark:text-surface-400">
                                        <span className="w-5 h-5 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 text-xs">🌐</span>
                                        Works offline
                                    </li>
                                </ul>
                            </div>

                            {/* Sidebar Ad - Bottom */}
                            <AdBanner slot="sidebar-bottom" size="rectangle" />
                        </div>
                    </div>
                </div>

                {/* Bottom Full-Width Ad */}
                <AdBanner slot="tool-page-bottom" className="w-full mt-12" />
            </div>
        </>
    );
}
