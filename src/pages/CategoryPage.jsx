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
                title={`${category.name} Tools`}
                description={category.description}
                canonicalUrl={`https://freetools.com/category/${slug}`}
                structuredData={{
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    "name": `${category.name} Tools`,
                    "description": category.description,
                    "url": `https://freetools.com/category/${slug}`
                }}
            />

            {/* Category Hero */}
            <section className="relative overflow-hidden border-b border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-950">
                {/* Subtle Grid Background Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px]"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <nav className="flex items-center justify-center gap-2 text-sm text-surface-500 mb-8 font-medium">
                            <Link to="/" className="hover:text-surface-900 dark:hover:text-white transition-colors">Home</Link>
                            <span>/</span>
                            <span className="text-surface-900 dark:text-white">{category.name}</span>
                        </nav>
                        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl ${category.color} text-4xl mb-6 shadow-sm border border-current opacity-90`}>
                            {category.icon}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-display font-bold text-surface-900 dark:text-white mb-6 tracking-tight">
                            {category.name}
                        </h1>
                        <p className="text-lg text-surface-600 dark:text-surface-400 max-w-2xl mx-auto leading-relaxed">
                            {category.description}
                        </p>
                        <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 text-sm font-medium text-surface-700 dark:text-surface-300">
                            <span className="w-2 h-2 rounded-full bg-accent-500"></span>
                            {tools.length} highly optimized tools
                        </div>
                    </motion.div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Tools Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {tools.map((tool, i) => (
                        <ToolCard key={tool.id} tool={tool} index={i} />
                    ))}
                </div>

                <AdBanner slot="category-bottom" className="mb-12" />

                {/* Other Categories */}
                <section>
                    <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-6">Other Categories</h2>
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
                                    className="glass-card block p-4 group hover:-translate-y-0.5 transition-all"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">{cat.icon}</span>
                                        <span className="font-semibold text-surface-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors text-sm">
                                            {cat.name}
                                        </span>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
}
