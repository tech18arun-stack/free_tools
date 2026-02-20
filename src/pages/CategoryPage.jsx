import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOHead from '../core/components/SEOHead';
import ToolCard from '../core/components/ToolCard';
import AdBanner from '../core/components/AdBanner';
import { getCategoryBySlug, getToolsByCategory, categories } from '../core/utils/toolsData';

export default function CategoryPage() {
    const { slug } = useParams();
    const category = getCategoryBySlug(slug);
    const tools = getToolsByCategory(slug);

    if (!category) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <h1 className="text-4xl font-bold text-surface-900 dark:text-white mb-4">Category Not Found</h1>
                <p className="text-surface-500 mb-8">The category you're looking for doesn't exist.</p>
                <Link to="/" className="btn-primary">← Back to Home</Link>
            </div>
        );
    }

    return (
        <>
            <SEOHead
                title={`${category.name} - Free Online Tools`}
                description={`${category.description} Browse ${tools.length} free ${category.name.toLowerCase()} on FreeTools. Fast, secure, and no signup required.`}
                canonicalUrl={`https://freetools.com/category/${slug}`}
                structuredData={{
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    "name": `${category.name} Tools`,
                    "description": category.description,
                    "url": `https://freetools.com/category/${slug}`
                }}
            />

            {/* Category Hero with Gradient */}
            <section className="relative overflow-hidden bg-gradient-to-br from-accent-600 via-purple-600 to-pink-500 dark:from-accent-800 dark:via-purple-800 dark:to-pink-700">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff20_1px,transparent_1px),linear-gradient(to_bottom,#ffffff20_1px,transparent_1px)] bg-[size:24px_32px]"></div>
                </div>
                
                {/* Floating Orbs */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        {/* Breadcrumb */}
                        <nav className="flex items-center justify-center gap-2 text-sm text-white/80 mb-8 font-medium">
                            <Link to="/" className="hover:text-white transition-colors flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                Home
                            </Link>
                            <span className="text-white/40">/</span>
                            <span className="text-white">{category.name}</span>
                        </nav>

                        {/* Category Icon */}
                        <div className={`inline-flex items-center justify-center w-24 h-24 rounded-3xl ${category.color} text-5xl mb-8 shadow-2xl border-4 border-white/20 transform hover:scale-110 transition-transform duration-300`}>
                            {category.icon}
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight drop-shadow-lg">
                            {category.name}
                        </h1>

                        {/* Description */}
                        <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed mb-8">
                            {category.description}
                        </p>

                        {/* Stats Badge */}
                        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold shadow-lg">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/30">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </span>
                            {tools.length} Free Tools Available
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
                <AdBanner slot="category-top-banner" className="w-full" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 text-sm font-semibold mb-4">
                            {category.icon} {tools.length} Tools
                        </span>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-surface-900 dark:text-white mb-4">
                            All {category.name}
                        </h2>
                        <p className="text-surface-500 dark:text-surface-400 text-lg max-w-2xl mx-auto">
                            Browse our complete collection of {category.name.toLowerCase()}
                        </p>
                    </motion.div>
                </div>

                {/* Tools Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {tools.map((tool, i) => (
                        <motion.div
                            key={tool.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <ToolCard tool={tool} index={i} />
                        </motion.div>
                    ))}
                </div>

                {/* Middle Ad Banner */}
                <AdBanner slot="category-tools-middle" className="w-full mb-12" />

                {/* Other Categories */}
                <section>
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-2">
                            Explore Other Categories
                        </h2>
                        <p className="text-surface-500 dark:text-surface-400">
                            Discover more free tools in other categories
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {categories.filter(c => c.slug !== slug).map((cat, i) => (
                            <motion.div
                                key={cat.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <Link
                                    to={`/category/${cat.slug}`}
                                    className="group block p-5 rounded-2xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 hover:border-accent-300 dark:hover:border-accent-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className={`w-12 h-12 rounded-xl ${cat.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}>
                                            {cat.icon}
                                        </span>
                                        <span className="font-semibold text-surface-900 dark:text-white group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
                                            {cat.name}
                                        </span>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Bottom Ad Banner */}
                <AdBanner slot="category-bottom-banner" className="w-full mt-12" />
            </div>
        </>
    );
}
