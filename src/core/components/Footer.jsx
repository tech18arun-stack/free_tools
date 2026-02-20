import { Link } from 'react-router-dom';
import toolsData, { categories, popularTools } from '../utils/toolsData';

export default function Footer() {
    const popular = popularTools.map(slug => toolsData.find(t => t.slug === slug)).filter(Boolean);
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-b from-surface-900 via-surface-900 to-surface-950 dark:from-surface-950 dark:via-surface-950 dark:to-black text-surface-400 mt-auto border-t border-surface-800">
            {/* Newsletter/CTA Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff20_1px,transparent_1px),linear-gradient(to_bottom,#ffffff20_1px,transparent_1px)] bg-[size:24px_32px]"></div>
                    </div>
                    {/* Floating Orbs */}
                    <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
                    <div className="absolute bottom-10 left-10 w-40 h-40 bg-cyan-300/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-teal-300/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                    
                    <div className="relative">
                        <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
                            🚀 Love FreeTools?
                        </h3>
                        <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
                            Bookmark us and share with your friends! We're constantly adding new tools based on your feedback.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a
                                href="mailto:contact@freetools.com"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-white to-cyan-50 text-cyan-700 rounded-xl font-semibold hover:from-white hover:to-cyan-100 transition-all hover:scale-105 shadow-lg hover:shadow-xl"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Contact Us
                            </a>
                            <Link
                                to="/category/all"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/30 transition-all hover:scale-105 border border-white/30 hover:border-white/50"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                </svg>
                                All Tools
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <Link to="/" className="flex items-center gap-3 mb-6 group">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:shadow-accent-500/50 transition-all duration-300 group-hover:scale-105">
                                F
                            </div>
                            <div>
                                <span className="font-display font-bold text-2xl text-white">
                                    Free<span className="text-accent-400">Tools</span>
                                </span>
                                <p className="text-xs text-surface-500 -mt-1">50+ Free Online Utilities</p>
                            </div>
                        </Link>
                        <p className="text-surface-400 leading-relaxed mb-6 max-w-sm">
                            Your one-stop destination for free online tools. From image editing to PDF processing, 
                            developer utilities to student calculators — all free, fast, and secure.
                        </p>
                        
                        {/* Social Links */}
                        <div className="flex items-center gap-3">
                            {[
                                { name: 'Twitter', icon: '𝕏', url: '#' },
                                { name: 'GitHub', icon: '🐙', url: '#' },
                                { name: 'Product Hunt', icon: '🦄', url: '#' },
                                { name: 'Discord', icon: '💬', url: '#' },
                            ].map((social, index) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    className={`w-10 h-10 rounded-xl bg-surface-800 flex items-center justify-center text-lg transition-all duration-300 hover:scale-110 hover:shadow-lg
                                        ${index === 0 ? 'hover:bg-sky-500 hover:shadow-sky-500/25' : ''}
                                        ${index === 1 ? 'hover:bg-gray-700 hover:shadow-gray-700/25' : ''}
                                        ${index === 2 ? 'hover:bg-orange-500 hover:shadow-orange-500/25' : ''}
                                        ${index === 3 ? 'hover:bg-indigo-500 hover:shadow-indigo-500/25' : ''}
                                    `}
                                    title={social.name}
                                    aria-label={social.name}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                            <span>🚀</span> Quick Links
                        </h3>
                        <ul className="space-y-2.5">
                            <li>
                                <Link to="/" className="text-surface-400 hover:text-accent-400 transition-colors flex items-center gap-2 group">
                                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/category/all" className="text-surface-400 hover:text-accent-400 transition-colors flex items-center gap-2 group">
                                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    All Tools
                                </Link>
                            </li>
                            <li>
                                <Link to="/category/popular" className="text-surface-400 hover:text-accent-400 transition-colors flex items-center gap-2 group">
                                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    Popular
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-surface-400 hover:text-accent-400 transition-colors flex items-center gap-2 group">
                                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-surface-400 hover:text-accent-400 transition-colors flex items-center gap-2 group">
                                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                            <span>📁</span> Categories
                        </h3>
                        <ul className="space-y-2.5">
                            {categories.map(cat => (
                                <li key={cat.id}>
                                    <Link
                                        to={`/category/${cat.slug}`}
                                        className="text-surface-400 hover:text-accent-400 transition-colors flex items-center gap-2 group"
                                    >
                                        <span className="group-hover:scale-110 transition-transform inline-block">{cat.icon}</span>
                                        <span>{cat.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Popular Tools */}
                    <div>
                        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                            <span>🔥</span> Popular Tools
                        </h3>
                        <ul className="space-y-2.5">
                            {popular.slice(0, 6).map(tool => (
                                <li key={tool.id}>
                                    <Link
                                        to={`/tools/${tool.slug}`}
                                        className="text-surface-400 hover:text-accent-400 transition-colors flex items-center gap-2 group"
                                    >
                                        <span className="group-hover:scale-110 transition-transform inline-block">{tool.icon}</span>
                                        <span className="truncate">{tool.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="mt-12 pt-8 border-t border-surface-800">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { icon: '✅', iconBg: 'from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30', title: '100% Free', desc: 'No hidden costs' },
                            { icon: '🔒', iconBg: 'from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30', title: 'Secure', desc: 'Local processing' },
                            { icon: '⚡', iconBg: 'from-yellow-100 to-amber-100 dark:from-yellow-900/30 dark:to-amber-900/30', title: 'Fast', desc: 'Instant results' },
                            { icon: '📱', iconBg: 'from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30', title: 'Responsive', desc: 'All devices' },
                        ].map(feature => (
                            <div key={feature.title} className="flex items-center gap-3 p-4 rounded-xl bg-surface-800/50 hover:bg-surface-800 transition-colors">
                                <span className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.iconBg} flex items-center justify-center text-2xl`}>{feature.icon}</span>
                                <div>
                                    <div className="font-semibold text-white">{feature.title}</div>
                                    <div className="text-xs text-surface-500">{feature.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-surface-800 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        {/* Copyright */}
                        <p className="text-sm text-surface-500">
                            © {currentYear} <span className="text-accent-400 font-semibold">FreeTools</span>. All rights reserved.
                        </p>

                        {/* Legal Links */}
                        <div className="flex items-center gap-6 text-sm">
                            <Link to="/privacy" className="text-surface-400 hover:text-accent-400 transition-colors flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                Privacy Policy
                            </Link>
                            <Link to="/terms" className="text-surface-400 hover:text-accent-400 transition-colors flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Terms of Service
                            </Link>
                            <Link to="/cookies" className="text-surface-400 hover:text-accent-400 transition-colors flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                                </svg>
                                Cookies
                            </Link>
                        </div>

                        {/* Language/Region */}
                        <div className="flex items-center gap-2 text-sm text-surface-500">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Global</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
