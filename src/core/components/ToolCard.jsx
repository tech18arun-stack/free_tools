import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ToolCard({ tool, index = 0, variant = 'default' }) {
    const isPopular = variant === 'popular';
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
        >
            <Link
                to={`/tools/${tool.slug}`}
                className={`group relative block h-full rounded-2xl border bg-white dark:bg-surface-900 transition-all duration-300 overflow-hidden
                    ${isPopular
                        ? 'border-accent-200 dark:border-accent-800 shadow-lg shadow-accent-100/50 dark:shadow-accent-900/20 hover:shadow-xl hover:shadow-accent-200/50 dark:hover:shadow-accent-900/30'
                        : 'border-surface-200 dark:border-surface-800 shadow-sm hover:shadow-xl hover:shadow-surface-200/50 dark:hover:shadow-surface-900/50'
                    }
                `}
            >
                {/* Gradient Border on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                {/* Animated Gradient Border */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 animate-gradient"></div>
                
                {/* Popular Badge */}
                {isPopular && (
                    <div className="absolute top-3 right-3 z-10">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white text-xs font-bold shadow-lg animate-pulse">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            Popular
                        </span>
                    </div>
                )}

                <div className="relative p-5 h-full flex flex-col">
                    {/* Icon Header */}
                    <div className="flex items-start gap-4 mb-4">
                        <div className={`
                            w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0
                            transition-all duration-300 group-hover:scale-110 group-hover:rotate-3
                            ${isPopular
                                ? 'bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-indigo-900/50 dark:via-purple-900/50 dark:to-pink-900/50 border-2 border-indigo-200 dark:border-indigo-700 shadow-md'
                                : 'bg-gradient-to-br from-surface-100 to-surface-50 dark:from-surface-800 dark:to-surface-900 border border-surface-200 dark:border-surface-700'
                            }
                        `}>
                            {tool.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className={`
                                font-bold text-lg leading-tight mb-1.5 truncate
                                ${isPopular 
                                    ? 'text-surface-900 dark:text-white group-hover:text-accent-600 dark:group-hover:text-accent-400' 
                                    : 'text-surface-900 dark:text-white group-hover:text-accent-600 dark:group-hover:text-accent-400'
                                }
                            `}>
                                {tool.name}
                            </h3>
                            <span className="inline-block px-2.5 py-0.5 rounded-md bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 text-xs font-medium">
                                {tool.categoryName}
                            </span>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-surface-600 dark:text-surface-400 flex-grow leading-relaxed line-clamp-2">
                        {tool.description}
                    </p>

                    {/* Footer with CTA */}
                    <div className="mt-4 pt-4 border-t border-surface-100 dark:border-surface-800 flex items-center justify-between">
                        <span className={`
                            inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-300
                            ${isPopular 
                                ? 'text-accent-600 dark:text-accent-400' 
                                : 'text-accent-600 dark:text-accent-400'
                            }
                        `}>
                            Open Tool
                            <svg 
                                className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </span>
                        
                        {/* Quick Action Icons */}
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-xs text-surface-400">
                                {tool.keywords?.length || 4} tags
                            </span>
                        </div>
                    </div>
                </div>

                {/* Bottom Gradient Line */}
                <div className={`
                    absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                    transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left
                `}></div>
            </Link>
        </motion.div>
    );
}
