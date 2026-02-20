import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../../store/useStore';
import { categories, searchTools } from '../utils/toolsData';

export default function Navbar() {
    const { theme, toggleTheme, searchQuery, setSearchQuery } = useStore();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const searchRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (searchQuery.trim()) {
            const timer = setTimeout(() => {
                setSearchResults(searchTools(searchQuery).slice(0, 6));
            }, 200);
            return () => clearTimeout(timer);
        } else {
            setSearchResults([]);
        }
    }, [searchQuery]);

    useEffect(() => {
        const handleClick = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setSearchOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    const handleResultClick = (slug) => {
        setSearchQuery('');
        setSearchOpen(false);
        navigate(`/tools/${slug}`);
    };

    return (
        <nav className="sticky top-0 z-50 bg-white/90 dark:bg-surface-950/90 backdrop-blur-md border-b border-surface-200 dark:border-surface-800 transition-colors duration-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2.5 group">
                        <div className="w-8 h-8 rounded-lg bg-surface-900 dark:bg-white flex items-center justify-center text-white dark:text-surface-900 font-bold text-lg transition-transform group-hover:scale-105">
                            F
                        </div>
                        <span className="font-display font-bold text-xl text-surface-900 dark:text-white tracking-tight">
                            Free<span className="text-surface-500 dark:text-surface-400 font-semibold">Tools</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {categories.map(cat => (
                            <Link
                                key={cat.id}
                                to={`/category/${cat.slug}`}
                                className="px-3 py-2 text-sm font-medium text-surface-600 dark:text-surface-400 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all"
                            >
                                {cat.icon} {cat.name}
                            </Link>
                        ))}
                    </div>

                    {/* Search + Theme + Mobile Toggle */}
                    <div className="flex items-center gap-2">
                        {/* Search */}
                        <div ref={searchRef} className="relative">
                            <button
                                onClick={() => setSearchOpen(!searchOpen)}
                                className="p-2 rounded-xl text-surface-500 hover:text-primary-600 hover:bg-surface-100 dark:hover:bg-surface-800 transition-all"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </button>
                            <AnimatePresence>
                                {searchOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                        className="absolute right-0 top-12 w-80 bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 rounded-xl shadow-xl overflow-hidden z-20"
                                    >
                                        <div className="p-3">
                                            <input
                                                autoFocus
                                                type="text"
                                                placeholder="Search tools..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="input-field text-sm"
                                            />
                                        </div>
                                        {searchResults.length > 0 && (
                                            <div className="border-t border-surface-200 dark:border-surface-700 max-h-64 overflow-y-auto">
                                                {searchResults.map(tool => (
                                                    <button
                                                        key={tool.id}
                                                        onClick={() => handleResultClick(tool.slug)}
                                                        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                                                    >
                                                        <span className="text-lg">{tool.icon}</span>
                                                        <div>
                                                            <div className="text-sm font-medium text-surface-900 dark:text-white">{tool.name}</div>
                                                            <div className="text-xs text-surface-500">{tool.categoryName}</div>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                        {searchQuery && searchResults.length === 0 && (
                                            <div className="px-4 py-6 text-center text-sm text-surface-500">No tools found</div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-xl text-surface-500 hover:text-primary-600 hover:bg-surface-100 dark:hover:bg-surface-800 transition-all"
                            aria-label="Toggle theme"
                        >
                            {theme === 'light' ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                            )}
                        </button>

                        {/* Mobile Menu */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden p-2 rounded-xl text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-800 transition-all"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {mobileOpen
                                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                }
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="md:hidden overflow-hidden border-t border-surface-200 dark:border-surface-700"
                    >
                        <div className="px-4 py-3 space-y-1">
                            {categories.map(cat => (
                                <Link
                                    key={cat.id}
                                    to={`/category/${cat.slug}`}
                                    onClick={() => setMobileOpen(false)}
                                    className="block px-3 py-2 text-sm font-medium text-surface-600 dark:text-surface-400 hover:text-primary-600 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all"
                                >
                                    {cat.icon} {cat.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
