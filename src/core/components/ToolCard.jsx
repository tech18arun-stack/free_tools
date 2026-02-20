import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ToolCard({ tool, index = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
        >
            <Link
                to={`/tools/${tool.slug}`}
                className="glass-card block p-5 group flex flex-col h-full"
            >
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-surface-100 dark:bg-surface-800 flex items-center justify-center text-xl flex-shrink-0 group-hover:bg-accent-50 dark:group-hover:bg-accent-900/30 transition-colors duration-200 border border-surface-200 dark:border-surface-700">
                        {tool.icon}
                    </div>
                    <h3 className="font-semibold text-surface-900 dark:text-white group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors leading-tight">
                        {tool.name}
                    </h3>
                </div>
                <p className="text-sm text-surface-500 dark:text-surface-400 flex-grow">
                    {tool.description}
                </p>
                <span className="inline-flex items-center mt-4 text-xs font-semibold text-accent-600 dark:text-accent-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    Open Tool <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                </span>
            </Link>
        </motion.div>
    );
}
