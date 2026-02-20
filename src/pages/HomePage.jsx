import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOHead from '../core/components/SEOHead';
import ToolCard from '../core/components/ToolCard';
import AdBanner from '../core/components/AdBanner';
import toolsData, { categories, popularTools, searchTools } from '../core/utils/toolsData';

export default function HomePage() {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredTools = useMemo(() => {
        if (!searchQuery.trim()) return [];
        return searchTools(searchQuery);
    }, [searchQuery]);

    const popular = useMemo(() =>
        popularTools.map(slug => toolsData.find(t => t.slug === slug)).filter(Boolean),
        []);

    return (
        <>
            <SEOHead
                title="Free Online Tools"
                description="30+ free online tools for image editing, PDF processing, developer utilities, text tools, and student calculators. Fast, secure, and no login required."
                canonicalUrl="https://freetools.com/"
                structuredData={{
                    "@context": "https://schema.org",
                    "@type": "WebSite",
                    "name": "FreeTools",
                    "url": "https://freetools.com/",
                    "description": "30+ free online tools for image editing, PDF processing, developer utilities, text tools, and student calculators.",
                    "potentialAction": {
                        "@type": "SearchAction",
                        "target": "https://freetools.com/?q={search_term_string}",
                        "query-input": "required name=search_term_string"
                    }
                }}
            />

            {/* Hero Section */}
            <section className="relative overflow-hidden border-b border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-950">
                {/* Subtle Grid Background Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px]"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-100 dark:bg-surface-900 border border-surface-200 dark:border-surface-800 text-surface-600 dark:text-surface-400 text-xs font-semibold uppercase tracking-wider mb-8"
                        >
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            30+ Utilities Available
                        </motion.div>

                        <h1 className="text-5xl md:text-7xl font-display font-extrabold text-surface-900 dark:text-white leading-tight mb-8 tracking-tight">
                            Tools for makers,<br />
                            built for <span className="text-accent-600 dark:text-accent-500">speed.</span>
                        </h1>

                        <p className="text-lg md:text-xl text-surface-600 dark:text-surface-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                            A curated suite of high-performance utilities for developers, designers, and students. Completely free, local-first processing, and no sign-ups required.
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto relative group z-20">
                            <div className="relative flex items-center shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700">
                                <svg className="absolute left-5 w-5 h-5 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search for image resizer, JSON formatter..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-14 pr-4 py-4 rounded-xl bg-transparent text-surface-900 dark:text-white placeholder-surface-400 text-lg focus:outline-none"
                                />
                                <div className="hidden sm:flex absolute right-4 items-center gap-1 text-xs font-medium text-surface-400 border border-surface-200 dark:border-surface-700 rounded-md px-2 py-1 bg-surface-50 dark:bg-surface-800">
                                    <kbd>⌘</kbd> <kbd>K</kbd>
                                </div>
                            </div>

                            {/* Search Results Dropdown */}
                            {filteredTools.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-surface-900 rounded-xl shadow-xl overflow-hidden z-30 border border-surface-200 dark:border-surface-800"
                                >
                                    <div className="p-2 space-y-1">
                                        {filteredTools.slice(0, 6).map(tool => (
                                            <Link
                                                key={tool.id}
                                                to={`/tools/${tool.slug}`}
                                                onClick={() => setSearchQuery('')}
                                                className="flex items-center gap-4 px-4 py-3 hover:bg-surface-50 dark:hover:bg-surface-800 rounded-lg transition-colors group"
                                            >
                                                <span className="flex items-center justify-center w-8 h-8 rounded-md bg-surface-100 dark:bg-surface-950 text-surface-700 dark:text-surface-300 border border-surface-200 dark:border-surface-800 group-hover:bg-accent-50 dark:group-hover:bg-accent-900/40 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
                                                    {tool.icon}
                                                </span>
                                                <div>
                                                    <div className="font-semibold text-surface-900 dark:text-white text-sm">{tool.name}</div>
                                                    <div className="text-xs text-surface-500">{tool.categoryName}</div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Categories Grid */}
                <section className="py-16">
                    <div className="text-center mb-12">
                        <h2 className="section-title mb-4">Tool Categories</h2>
                        <p className="text-surface-500 dark:text-surface-400 text-lg max-w-2xl mx-auto">
                            Browse our collection of 30+ tools organized by category
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map((cat, i) => (
                            <motion.div
                                key={cat.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                            >
                                <Link
                                    to={`/category/${cat.slug}`}
                                    className="glass-card block p-6 group flex flex-col items-start"
                                >
                                    <div className={`w-12 h-12 rounded-xl ${cat.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300 border border-current opacity-80 group-hover:opacity-100`}>
                                        {cat.icon}
                                    </div>
                                    <h3 className="text-lg font-bold text-surface-900 dark:text-white group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
                                        {cat.name}
                                    </h3>
                                    <p className="text-sm text-surface-500 dark:text-surface-400 mt-2 line-clamp-2">
                                        {cat.description}
                                    </p>
                                    <span className="inline-flex items-center mt-4 text-sm font-semibold text-accent-600 dark:text-accent-400 group-hover:gap-2 transition-all opacity-0 group-hover:opacity-100">
                                        Browse Tools <span>→</span>
                                    </span>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <AdBanner slot="home-middle" className="mb-12" />

                {/* Popular Tools */}
                <section className="pb-16">
                    <div className="text-center mb-12">
                        <h2 className="section-title mb-4">🔥 Popular Tools</h2>
                        <p className="text-surface-500 dark:text-surface-400 text-lg max-w-2xl mx-auto">
                            Most used tools by our community
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {popular.map((tool, i) => (
                            <ToolCard key={tool.id} tool={tool} index={i} />
                        ))}
                    </div>
                </section>

                {/* All Tools Section */}
                <section className="pb-20">
                    <div className="text-center mb-12">
                        <h2 className="section-title mb-4">All Tools</h2>
                        <p className="text-surface-500 dark:text-surface-400 text-lg max-w-2xl mx-auto">
                            Complete collection of our free online utilities
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {toolsData.map((tool, i) => (
                            <ToolCard key={tool.id} tool={tool} index={i} />
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
}
