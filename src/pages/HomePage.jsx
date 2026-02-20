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

    const stats = useMemo(() => ({
        totalTools: toolsData.length,
        totalCategories: categories.length,
        dailyUsers: '50K+'
    }), []);

    return (
        <>
            <SEOHead
                title="FreeTools — 100+ Free Online Tools (No Signup Required)"
                description="Access 100+ free online tools for image editing, PDF processing, video editing, audio tools, developer utilities, design tools, finance calculators, and health calculators. Fast, secure, and no login required."
                canonicalUrl="https://freetools.com/"
                keywords="free online tools, image compressor, PDF tools, video converter, audio tools, developer tools, JSON formatter, word counter, BMI calculator, loan calculator, color palette generator, QR code generator, no signup required"
                openGraph={{
                    type: "website",
                    locale: "en_US",
                    url: "https://freetools.com/",
                    siteName: "FreeTools",
                    title: "FreeTools — 100+ Free Online Utilities",
                    description: "100+ free online tools for image editing, PDF processing, video editing, audio tools, developer utilities, and more. No signup required.",
                    images: [
                        {
                            url: "https://freetools.com/og-image.png",
                            width: 1200,
                            height: 630,
                            alt: "FreeTools - Free Online Utilities"
                        }
                    ]
                }}
                twitter={{
                    card: "summary_large_image",
                    site: "@freetools",
                    creator: "@freetools",
                    title: "FreeTools — 100+ Free Online Utilities",
                    description: "100+ free online tools for image editing, PDF processing, video editing, audio tools, developer utilities, and more.",
                    image: "https://freetools.com/twitter-card.png"
                }}
                structuredData={{
                    "@context": "https://schema.org",
                    "@type": "WebSite",
                    "name": "FreeTools",
                    "url": "https://freetools.com/",
                    "description": "100+ free online tools for image editing, PDF processing, video editing, audio tools, developer utilities, design tools, finance calculators, and health calculators.",
                    "potentialAction": {
                        "@type": "SearchAction",
                        "target": "https://freetools.com/?q={search_term_string}",
                        "query-input": "required name=search_term_string"
                    },
                    "publisher": {
                        "@type": "Organization",
                        "name": "FreeTools",
                        "logo": {
                            "@type": "ImageObject",
                            "url": "https://freetools.com/logo.png"
                        }
                    },
                    "sameAs": [
                        "https://twitter.com/freetools",
                        "https://github.com/freetools",
                        "https://www.producthunt.com/products/freetools"
                    ]
                }}
            />

            {/* Hero Section with Gradient */}
            <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 dark:from-indigo-800 dark:via-purple-800 dark:to-pink-700">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff20_1px,transparent_1px),linear-gradient(to_bottom,#ffffff20_1px,transparent_1px)] bg-[size:24px_32px]"></div>
                </div>

                {/* Floating Orbs */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-pink-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-indigo-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-semibold mb-8 shadow-lg"
                        >
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                            {stats.totalTools}+ Free Tools Available
                        </motion.div>

                        {/* Main Heading */}
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold text-white leading-tight mb-6 tracking-tight drop-shadow-lg">
                            Free Online Tools
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200">
                                Built for Everyone
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
                            A complete suite of {stats.totalTools}+ high-performance utilities for developers, designers, students, and creators. 
                            100% free, no signup required.
                        </p>

                        {/* Stats */}
                        <div className="flex flex-wrap justify-center gap-6 mb-12">
                            <div className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                                <div className="text-3xl font-bold text-white">{stats.totalTools}+</div>
                                <div className="text-sm text-white/80">Free Tools</div>
                            </div>
                            <div className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                                <div className="text-3xl font-bold text-white">{stats.totalCategories}</div>
                                <div className="text-sm text-white/80">Categories</div>
                            </div>
                            <div className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                                <div className="text-3xl font-bold text-white">{stats.dailyUsers}</div>
                                <div className="text-sm text-white/80">Daily Users</div>
                            </div>
                        </div>

                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto relative group z-20">
                            <div className="relative flex items-center shadow-2xl hover:shadow-white/20 transition-shadow duration-300 rounded-2xl bg-white dark:bg-surface-900 border-0">
                                <svg className="absolute left-5 w-6 h-6 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search for PDF converter, image editor, JSON formatter..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-14 pr-4 py-5 rounded-2xl bg-transparent text-surface-900 dark:text-white placeholder-surface-400 text-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
                                />
                                <div className="hidden sm:flex absolute right-4 items-center gap-1 text-xs font-medium text-surface-400 border border-surface-200 dark:border-surface-700 rounded-lg px-3 py-2 bg-surface-50 dark:bg-surface-800">
                                    <kbd className="font-sans">⌘</kbd>
                                    <kbd className="font-sans">K</kbd>
                                </div>
                            </div>

                            {/* Search Results Dropdown */}
                            {filteredTools.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute top-full left-0 right-0 mt-3 bg-white dark:bg-surface-900 rounded-2xl shadow-2xl overflow-hidden z-30 border border-surface-200 dark:border-surface-700"
                                >
                                    <div className="p-2">
                                        {filteredTools.slice(0, 8).map(tool => (
                                            <Link
                                                key={tool.id}
                                                to={`/tools/${tool.slug}`}
                                                onClick={() => setSearchQuery('')}
                                                className="flex items-center gap-4 px-4 py-3 hover:bg-surface-50 dark:hover:bg-surface-800 rounded-xl transition-colors group"
                                            >
                                                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-surface-100 dark:bg-surface-800 text-2xl group-hover:bg-accent-50 dark:group-hover:bg-accent-900/30 transition-colors">
                                                    {tool.icon}
                                                </span>
                                                <div className="flex-1">
                                                    <div className="font-semibold text-surface-900 dark:text-white">{tool.name}</div>
                                                    <div className="text-xs text-surface-500">{tool.categoryName}</div>
                                                </div>
                                                <svg className="w-5 h-5 text-surface-400 group-hover:text-accent-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </Link>
                                        ))}
                                    </div>
                                    {filteredTools.length > 8 && (
                                        <div className="px-4 py-3 bg-surface-50 dark:bg-surface-800 text-center">
                                            <Link to="/category/all" className="text-sm font-semibold text-accent-600 hover:text-accent-700">
                                                View all {filteredTools.length} results →
                                            </Link>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </div>
                
                {/* Wave Divider */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-12 md:h-20">
                        <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="currentColor" className="text-surface-50 dark:text-surface-950"/>
                    </svg>
                </div>
            </section>

            {/* Top Ad Banner */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                <AdBanner slot="home-top-banner" className="w-full" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Categories Grid */}
                <section className="py-16">
                    <div className="text-center mb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-surface-900 dark:text-white mb-4">
                                Browse by Category
                            </h2>
                            <p className="text-surface-500 dark:text-surface-400 text-lg max-w-2xl mx-auto">
                                Explore our collection of {stats.totalTools}+ tools organized by category
                            </p>
                        </motion.div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map((cat, i) => (
                            <motion.div
                                key={cat.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                            >
                                <Link
                                    to={`/category/${cat.slug}`}
                                    className="group relative overflow-hidden rounded-2xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 p-6 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                                >
                                    {/* Gradient Background on Hover */}
                                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${cat.color.split(' ')[0]}`}></div>

                                    <div className="relative">
                                        {/* Icon with gradient background */}
                                        <div className={`w-16 h-16 rounded-2xl ${cat.color} flex items-center justify-center text-4xl mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-xl`}>
                                            {cat.icon}
                                        </div>
                                        
                                        {/* Title */}
                                        <h3 className="text-xl font-bold text-surface-900 dark:text-white group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
                                            {cat.name}
                                        </h3>
                                        
                                        {/* Description */}
                                        <p className="text-sm text-surface-600 dark:text-surface-400 mt-3 line-clamp-2 leading-relaxed">
                                            {cat.description}
                                        </p>
                                        
                                        {/* CTA Link */}
                                        <div className="flex items-center gap-2 mt-5 text-sm font-semibold text-accent-600 dark:text-accent-400 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                            <span>Browse {toolsData.filter(t => t.category === cat.id).length} Tools</span>
                                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Middle Ad Banner */}
                <AdBanner slot="home-categories-bottom" className="w-full mb-16" />

                {/* Popular Tools */}
                <section className="pb-16">
                    <div className="text-center mb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-100 to-red-100 dark:bg-orange-900/30 dark:to-red-900/30 text-orange-600 dark:text-orange-400 text-sm font-semibold mb-4 shadow-sm">
                                🔥 Trending Now
                            </span>
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-surface-900 dark:text-white mb-4">
                                Popular Tools
                            </h2>
                            <p className="text-surface-500 dark:text-surface-400 text-lg max-w-2xl mx-auto">
                                Most used tools by our community this week
                            </p>
                        </motion.div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {popular.map((tool, i) => (
                            <ToolCard key={tool.id} tool={tool} index={i} variant="popular" />
                        ))}
                    </div>
                </section>

                {/* In-Content Ad */}
                <AdBanner slot="home-popular-bottom" className="w-full mb-16" />

                {/* All Tools Section */}
                <section className="pb-20">
                    <div className="text-center mb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-surface-900 dark:text-white mb-4">
                                All Tools
                            </h2>
                            <p className="text-surface-500 dark:text-surface-400 text-lg max-w-2xl mx-auto">
                                Complete collection of our free online utilities
                            </p>
                        </motion.div>
                    </div>
                    
                    {/* Tools Grid with Ads Inserted */}
                    <div className="space-y-6">
                        {toolsData.reduce((acc, tool, i) => {
                            acc.push(
                                <ToolCard key={tool.id} tool={tool} index={i} />
                            );
                            // Insert ad every 6 tools
                            if ((i + 1) % 6 === 0 && i < toolsData.length - 1) {
                                acc.push(
                                    <div key={`ad-${i}`} className="col-span-1 sm:col-span-2 lg:col-span-3">
                                        <AdBanner slot={`home-tools-${Math.floor(i/6)}`} className="w-full" />
                                    </div>
                                );
                            }
                            return acc;
                        }, [])}
                    </div>
                </section>

                {/* Bottom Ad Banner */}
                <AdBanner slot="home-bottom-banner" className="w-full mb-16" />

                {/* CTA Section */}
                <section className="py-16 mb-16">
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-8 md:p-12">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:24px_32px]"></div>
                        {/* Floating Orbs */}
                        <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
                        <div className="absolute bottom-10 left-10 w-40 h-40 bg-cyan-300/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                        <div className="relative text-center">
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                                Need a Custom Tool?
                            </h2>
                            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                                We're constantly adding new tools based on user feedback. Let us know what you need!
                            </p>
                            <a
                                href="mailto:contact@freetools.com"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-white to-emerald-50 text-emerald-700 rounded-xl font-semibold hover:from-white hover:to-emerald-100 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Request a Tool
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
