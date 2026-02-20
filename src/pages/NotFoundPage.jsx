import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOHead from '../core/components/SEOHead';

export default function NotFoundPage() {
    return (
        <>
            <SEOHead title="404 — Page Not Found" description="The page you're looking for doesn't exist." />
            <div className="min-h-[60vh] flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <div className="text-8xl mb-6">🔍</div>
                    <h1 className="text-6xl font-display font-bold gradient-text mb-4">404</h1>
                    <p className="text-xl text-surface-500 dark:text-surface-400 mb-8">Oops! The page you're looking for doesn't exist.</p>
                    <Link to="/" className="btn-primary text-lg px-8 py-4">← Back to Home</Link>
                </motion.div>
            </div>
        </>
    );
}
