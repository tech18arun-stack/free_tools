import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../../store/useStore';
import toolsData, { categories, searchTools, popularTools } from '../utils/toolsData';

export default function Navbar() {
    const { theme, toggleTheme, searchQuery, setSearchQuery } = useStore();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [expandedCategory, setExpandedCategory] = useState(null);
    const searchRef = useRef(null);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClick = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setSearchOpen(false);
            }
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setActiveDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    // Search functionality
    useEffect(() => {
        if (searchQuery.trim()) {
            const timer = setTimeout(() => {
                setSearchResults(searchTools(searchQuery).slice(0, 8));
            }, 200);
            return () => clearTimeout(timer);
        } else {
            setSearchResults([]);
        }
    }, [searchQuery]);

    const handleResultClick = (slug) => {
        setSearchQuery('');
        setSearchOpen(false);
        navigate(`/tools/${slug}`);
    };

    const getToolsByCategory = (categorySlug) => {
        return toolsData.filter(t => t.category === categorySlug).slice(0, 8);
    };

    const popular = popularTools.map(slug => toolsData.find(t => t.slug === slug)).filter(Boolean);

    // Dropdown animation variants
    const dropdownVariants = {
        hidden: { opacity: 0, y: 10, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2 } },
        exit: { opacity: 0, y: 10, scale: 0.95, transition: { duration: 0.15 } }
    };

    return (
        <nav className="sticky top-0 z-50 bg-white/95 dark:bg-surface-950/95 backdrop-blur-xl border-b border-surface-200 dark:border-surface-800 shadow-md transition-colors duration-200">
            <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:shadow-accent-500/50 transition-all duration-300 group-hover:scale-105">
                            F
                        </div>
                        <div>
                            <span className="font-display font-bold text-2xl text-surface-900 dark:text-white tracking-tight">
                                Free<span className="text-accent-600 dark:text-accent-400">Tools</span>
                            </span>
                            <p className="text-xs text-surface-500 dark:text-surface-400 -mt-0.5">50+ Free Online Utilities</p>
                        </div>
                    </Link>

                    {/* Desktop Nav with Dropdowns */}
                    <div className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
                        {/* Home */}
                        <Link
                            to="/"
                            className="px-4 py-2.5 text-sm font-medium text-surface-600 dark:text-surface-400 hover:text-accent-600 dark:hover:text-accent-400 rounded-xl hover:bg-accent-50 dark:hover:bg-accent-900/20 transition-all"
                        >
                            🏠 Home
                        </Link>

                        {/* Categories Dropdown */}
                        <div className="relative group">
                            <button
                                onClick={() => setActiveDropdown(activeDropdown === 'categories' ? null : 'categories')}
                                className="px-5 py-3 text-sm font-medium text-surface-600 dark:text-surface-400 hover:text-accent-600 dark:hover:text-accent-400 rounded-xl hover:bg-accent-50 dark:hover:bg-accent-900/20 transition-all flex items-center gap-2"
                            >
                                <span>📁</span> Categories
                                <svg className={`w-4 h-4 transition-transform ${activeDropdown === 'categories' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            
                            <AnimatePresence>
                                {activeDropdown === 'categories' && (
                                    <motion.div
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        variants={dropdownVariants}
                                        className="absolute top-full left-0 mt-3 w-[720px] bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-2xl shadow-2xl overflow-hidden z-50"
                                    >
                                        <div className="grid grid-cols-3 gap-4 p-6">
                                            {categories.map((cat) => (
                                                <Link
                                                    key={cat.id}
                                                    to={`/category/${cat.slug}`}
                                                    onClick={() => setActiveDropdown(null)}
                                                    className="group p-4 rounded-xl hover:bg-surface-50 dark:hover:bg-surface-800 transition-all"
                                                >
                                                    <div className={`w-12 h-12 rounded-xl ${cat.color} flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform`}>
                                                        {cat.icon}
                                                    </div>
                                                    <h4 className="font-semibold text-surface-900 dark:text-white group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
                                                        {cat.name}
                                                    </h4>
                                                    <p className="text-xs text-surface-500 dark:text-surface-400 mt-1 line-clamp-2">
                                                        {cat.description}
                                                    </p>
                                                    <div className="flex items-center gap-1 mt-2 text-xs text-accent-600 dark:text-accent-400 font-medium">
                                                        <span>{toolsData.filter(t => t.category === cat.id).length} tools</span>
                                                        <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Tools Dropdown */}
                        <div className="relative group">
                            <button
                                onClick={() => setActiveDropdown(activeDropdown === 'tools' ? null : 'tools')}
                                className="px-5 py-3 text-sm font-medium text-surface-600 dark:text-surface-400 hover:text-accent-600 dark:hover:text-accent-400 rounded-xl hover:bg-accent-50 dark:hover:bg-accent-900/20 transition-all flex items-center gap-2"
                            >
                                <span>🛠️</span> Tools
                                <svg className={`w-4 h-4 transition-transform ${activeDropdown === 'tools' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            
                            <AnimatePresence>
                                {activeDropdown === 'tools' && (
                                    <motion.div
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        variants={dropdownVariants}
                                        className="absolute top-full left-0 mt-3 w-[800px] bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-2xl shadow-2xl overflow-hidden z-50"
                                    >
                                        <div className="flex">
                                            {/* Popular Tools Sidebar */}
                                            <div className="w-48 bg-gradient-to-b from-accent-50 to-purple-50 dark:from-accent-900/20 dark:to-purple-900/20 p-4 border-r border-surface-200 dark:border-surface-700">
                                                <h4 className="font-bold text-surface-900 dark:text-white mb-3 flex items-center gap-2">
                                                    <span className="text-lg">🔥</span> Popular
                                                </h4>
                                                <ul className="space-y-1">
                                                    {popular.slice(0, 6).map(tool => (
                                                        <li key={tool.id}>
                                                            <Link
                                                                to={`/tools/${tool.slug}`}
                                                                onClick={() => setActiveDropdown(null)}
                                                                className="block px-3 py-2 text-sm text-surface-600 dark:text-surface-400 hover:text-accent-600 dark:hover:text-accent-400 hover:bg-white dark:hover:bg-surface-800 rounded-lg transition-all"
                                                            >
                                                                {tool.icon} {tool.name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            
                                            {/* Tools by Category */}
                                            <div className="flex-1 p-4 max-h-[400px] overflow-y-auto">
                                                {categories.map(cat => (
                                                    <div key={cat.id} className="mb-4">
                                                        <button
                                                            onClick={() => setExpandedCategory(expandedCategory === cat.id ? null : cat.id)}
                                                            className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-surface-700 dark:text-surface-300 hover:text-accent-600 dark:hover:text-accent-400 rounded-lg hover:bg-surface-50 dark:hover:bg-surface-800 transition-all"
                                                        >
                                                            <span className="flex items-center gap-2">
                                                                <span className={cat.color.split(' ')[0]}>{cat.icon}</span>
                                                                {cat.name}
                                                            </span>
                                                            <svg className={`w-4 h-4 transition-transform ${expandedCategory === cat.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                            </svg>
                                                        </button>
                                                        
                                                        <AnimatePresence>
                                                            {expandedCategory === cat.id && (
                                                                <motion.div
                                                                    initial={{ height: 0, opacity: 0 }}
                                                                    animate={{ height: 'auto', opacity: 1 }}
                                                                    exit={{ height: 0, opacity: 0 }}
                                                                    className="overflow-hidden"
                                                                >
                                                                    <div className="grid grid-cols-2 gap-2 mt-2 ml-8">
                                                                        {getToolsByCategory(cat.id).map(tool => (
                                                                            <Link
                                                                                key={tool.id}
                                                                                to={`/tools/${tool.slug}`}
                                                                                onClick={() => setActiveDropdown(null)}
                                                                                className="flex items-center gap-2 px-3 py-2 text-sm text-surface-600 dark:text-surface-400 hover:text-accent-600 dark:hover:text-accent-400 hover:bg-surface-50 dark:hover:bg-surface-800 rounded-lg transition-all"
                                                                            >
                                                                                <span>{tool.icon}</span>
                                                                                <span className="truncate">{tool.name}</span>
                                                                            </Link>
                                                                        ))}
                                                                    </div>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Quick Links */}
                        <Link
                            to="/category/all"
                            className="px-5 py-3 text-sm font-medium text-surface-600 dark:text-surface-400 hover:text-accent-600 dark:hover:text-accent-400 rounded-xl hover:bg-accent-50 dark:hover:bg-accent-900/20 transition-all"
                        >
                            ⭐ All Tools
                        </Link>
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-2">
                        {/* Search - Expanded on Desktop */}
                        <div ref={searchRef} className="relative hidden sm:block">
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    placeholder="Search 50+ tools..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onFocus={() => setSearchOpen(true)}
                                    className="w-72 pl-10 pr-4 py-3 rounded-xl bg-surface-100 dark:bg-surface-800 border-0 text-surface-900 dark:text-white placeholder-surface-400 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 transition-all"
                                />
                                <svg className="absolute left-3 w-5 h-5 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <div className="absolute right-3 hidden md:flex items-center gap-1 text-xs font-medium text-surface-400 bg-surface-200 dark:bg-surface-700 rounded px-2 py-1">
                                    <kbd className="font-sans">⌘</kbd>
                                    <kbd className="font-sans">K</kbd>
                                </div>
                            </div>

                            {/* Search Results Dropdown */}
                            <AnimatePresence>
                                {searchOpen && searchQuery && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 8 }}
                                        className="absolute top-full right-0 mt-3 w-96 bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-2xl shadow-2xl overflow-hidden z-50"
                                    >
                                        {searchResults.length > 0 ? (
                                            <div className="max-h-80 overflow-y-auto p-2">
                                                <div className="px-3 py-2 text-xs font-semibold text-surface-500 uppercase tracking-wider">
                                                    Search Results
                                                </div>
                                                {searchResults.map(tool => (
                                                    <button
                                                        key={tool.id}
                                                        onClick={() => handleResultClick(tool.slug)}
                                                        className="w-full flex items-center gap-3 px-3 py-3 hover:bg-surface-50 dark:hover:bg-surface-800 rounded-xl transition-colors group"
                                                    >
                                                        <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-surface-100 dark:bg-surface-800 text-xl group-hover:bg-accent-50 dark:group-hover:bg-accent-900/30 transition-colors">
                                                            {tool.icon}
                                                        </span>
                                                        <div className="text-left flex-1">
                                                            <div className="font-medium text-surface-900 dark:text-white text-sm">{tool.name}</div>
                                                            <div className="text-xs text-surface-500">{tool.categoryName}</div>
                                                        </div>
                                                        <svg className="w-5 h-5 text-surface-400 group-hover:text-accent-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </button>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="px-6 py-8 text-center">
                                                <div className="text-4xl mb-3">🔍</div>
                                                <p className="text-sm text-surface-500">No tools found for "{searchQuery}"</p>
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-3 rounded-xl text-surface-500 hover:text-accent-600 hover:bg-accent-50 dark:hover:bg-accent-900/20 transition-all"
                            aria-label="Toggle theme"
                        >
                            {theme === 'light' ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            )}
                        </button>

                        {/* Mobile Search Toggle */}
                        <button
                            onClick={() => setSearchOpen(!searchOpen)}
                            className="sm:hidden p-3 rounded-xl text-surface-500 hover:text-accent-600 hover:bg-accent-50 dark:hover:bg-accent-900/20 transition-all"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="lg:hidden p-3 rounded-xl text-surface-500 hover:text-accent-600 hover:bg-accent-50 dark:hover:bg-accent-900/20 transition-all"
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Search Bar */}
            <AnimatePresence>
                {searchOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="sm:hidden overflow-hidden border-b border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-950"
                    >
                        <div className="px-4 py-3">
                            <input
                                autoFocus
                                type="text"
                                placeholder="Search tools..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-surface-100 dark:bg-surface-800 border-0 text-surface-900 dark:text-white placeholder-surface-400 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500"
                            />
                        </div>
                        {searchResults.length > 0 && (
                            <div className="max-h-64 overflow-y-auto px-4 pb-4">
                                {searchResults.map(tool => (
                                    <button
                                        key={tool.id}
                                        onClick={() => handleResultClick(tool.slug)}
                                        className="w-full flex items-center gap-3 py-3 text-left"
                                    >
                                        <span className="text-xl">{tool.icon}</span>
                                        <div>
                                            <div className="font-medium text-surface-900 dark:text-white text-sm">{tool.name}</div>
                                            <div className="text-xs text-surface-500">{tool.categoryName}</div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="lg:hidden overflow-hidden border-t border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-950"
                    >
                        <div className="px-4 py-4 space-y-4 max-h-[70vh] overflow-y-auto">
                            {/* Quick Links */}
                            <Link
                                to="/"
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-surface-600 dark:text-surface-400 hover:text-accent-600 hover:bg-accent-50 dark:hover:bg-accent-900/20 rounded-xl transition-all"
                            >
                                <span className="text-xl">🏠</span> Home
                            </Link>

                            {/* Categories Accordion */}
                            <div>
                                <button
                                    onClick={() => setExpandedCategory(expandedCategory === 'mobile-cats' ? null : 'mobile-cats')}
                                    className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-surface-600 dark:text-surface-400 hover:text-accent-600 hover:bg-accent-50 dark:hover:bg-accent-900/20 rounded-xl transition-all"
                                >
                                    <span className="flex items-center gap-3">
                                        <span className="text-xl">📁</span> Categories
                                    </span>
                                    <svg className={`w-5 h-5 transition-transform ${expandedCategory === 'mobile-cats' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                
                                <AnimatePresence>
                                    {expandedCategory === 'mobile-cats' && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="mt-2 space-y-1">
                                                {categories.map(cat => (
                                                    <Link
                                                        key={cat.id}
                                                        to={`/category/${cat.slug}`}
                                                        onClick={() => setMobileOpen(false)}
                                                        className="flex items-center gap-3 px-8 py-2.5 text-sm text-surface-600 dark:text-surface-400 hover:text-accent-600 hover:bg-accent-50 dark:hover:bg-accent-900/20 rounded-lg transition-all"
                                                    >
                                                        <span className={cat.color.split(' ')[0]}>{cat.icon}</span>
                                                        <span>{cat.name}</span>
                                                        <span className="ml-auto text-xs text-surface-400">
                                                            {toolsData.filter(t => t.category === cat.id).length}
                                                        </span>
                                                    </Link>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Popular Tools */}
                            <div>
                                <div className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-surface-500 uppercase tracking-wider">
                                    <span>🔥</span> Popular Tools
                                </div>
                                <div className="space-y-1">
                                    {popular.slice(0, 6).map(tool => (
                                        <Link
                                            key={tool.id}
                                            to={`/tools/${tool.slug}`}
                                            onClick={() => setMobileOpen(false)}
                                            className="flex items-center gap-3 px-8 py-2.5 text-sm text-surface-600 dark:text-surface-400 hover:text-accent-600 hover:bg-accent-50 dark:hover:bg-accent-900/20 rounded-lg transition-all"
                                        >
                                            <span>{tool.icon}</span>
                                            <span>{tool.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* All Tools Link */}
                            <Link
                                to="/category/all"
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-accent-600 dark:text-accent-400 bg-accent-50 dark:bg-accent-900/20 rounded-xl transition-all"
                            >
                                <span>⭐</span> View All Tools ({toolsData.length})
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
