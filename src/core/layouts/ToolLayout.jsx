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
                title={tool.name}
                description={tool.description}
                keywords={tool.keywords?.join(', ')}
                canonicalUrl={toolUrl}
                structuredData={schema}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-surface-500 mb-6">
                    <Link to="/" className="hover:text-primary-600 transition-colors">Home</Link>
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
                            <div className="mb-6">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-3xl">{tool.icon}</span>
                                    <h1 className="text-2xl md:text-3xl font-display font-bold text-surface-900 dark:text-white">{tool.name}</h1>
                                </div>
                                <p className="text-surface-500 dark:text-surface-400 text-lg">{tool.description}</p>
                            </div>

                            {/* Tool Content */}
                            <div className="glass-card p-6 md:p-8 mb-8">
                                <ErrorBoundary>
                                    {children}
                                </ErrorBoundary>
                            </div>

                            <AdBanner slot="in-content" className="mb-8" />

                            {/* SEO Content Section */}
                            <div className="glass-card p-6 md:p-8 mb-8">
                                <h2 className="text-xl font-bold text-surface-900 dark:text-white mb-4">
                                    How to Use {tool.name}
                                </h2>
                                <div className="prose dark:prose-invert max-w-none text-surface-600 dark:text-surface-400 text-sm leading-relaxed space-y-3">
                                    <p>
                                        {tool.name} is a free online tool that helps you {tool.description.toLowerCase()} This tool runs entirely in your browser — no data is uploaded to any server, ensuring your privacy and security.
                                    </p>
                                    <h3 className="text-lg font-semibold text-surface-800 dark:text-surface-200 mt-4">Steps to Use</h3>
                                    <ol className="list-decimal list-inside space-y-1">
                                        <li>Open the {tool.name} tool from the list above.</li>
                                        <li>Provide the required input (file, text, or data).</li>
                                        <li>Configure any options or settings as needed.</li>
                                        <li>Click the action button to process your input.</li>
                                        <li>Download or copy the result.</li>
                                    </ol>
                                    <h3 className="text-lg font-semibold text-surface-800 dark:text-surface-200 mt-4">Frequently Asked Questions</h3>
                                    <details className="group">
                                        <summary className="cursor-pointer font-medium text-surface-700 dark:text-surface-300 hover:text-primary-600 transition-colors">
                                            Is {tool.name} free to use?
                                        </summary>
                                        <p className="mt-2 ml-4">Yes! {tool.name} is completely free with no registration required. Use it as many times as you need.</p>
                                    </details>
                                    <details className="group">
                                        <summary className="cursor-pointer font-medium text-surface-700 dark:text-surface-300 hover:text-primary-600 transition-colors">
                                            Is my data safe?
                                        </summary>
                                        <p className="mt-2 ml-4">Absolutely. All processing happens in your browser. Your files and data are never uploaded to any server.</p>
                                    </details>
                                    <details className="group">
                                        <summary className="cursor-pointer font-medium text-surface-700 dark:text-surface-300 hover:text-primary-600 transition-colors">
                                            Does it work on mobile?
                                        </summary>
                                        <p className="mt-2 ml-4">Yes! This tool is fully responsive and works on all devices including phones, tablets, and desktops.</p>
                                    </details>
                                </div>
                            </div>

                            {/* Related Tools */}
                            {related.length > 0 && (
                                <div className="mb-8">
                                    <h2 className="text-xl font-bold text-surface-900 dark:text-white mb-4">Related Tools</h2>
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
                        <AdBanner slot="sidebar-top" className="sticky top-20" />
                        <div className="glass-card p-5">
                            <h3 className="font-semibold text-surface-900 dark:text-white mb-3">Tool Info</h3>
                            <ul className="space-y-2 text-sm text-surface-500 dark:text-surface-400">
                                <li className="flex items-center gap-2">✅ Free to use</li>
                                <li className="flex items-center gap-2">🔒 No data uploaded</li>
                                <li className="flex items-center gap-2">⚡ Instant results</li>
                                <li className="flex items-center gap-2">📱 Mobile friendly</li>
                            </ul>
                        </div>
                        <AdBanner slot="sidebar-bottom" />
                    </div>
                </div>
            </div>
        </>
    );
}
