import { Link } from 'react-router-dom';
import { categories } from '../utils/toolsData';

export default function Footer() {
    return (
        <footer className="bg-surface-900 dark:bg-surface-950 text-surface-400 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">F</div>
                            <span className="font-display font-bold text-xl text-white">FreeTools</span>
                        </Link>
                        <p className="text-sm text-surface-500 leading-relaxed">
                            30+ free online tools for everyone. No login required. Fast, secure, and privacy-focused.
                        </p>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Categories</h3>
                        <ul className="space-y-2">
                            {categories.map(cat => (
                                <li key={cat.id}>
                                    <Link to={`/category/${cat.slug}`} className="text-sm text-surface-400 hover:text-primary-400 transition-colors">
                                        {cat.icon} {cat.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Popular Tools */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Popular Tools</h3>
                        <ul className="space-y-2">
                            {['JSON Formatter', 'Image Compressor', 'Word Counter', 'Merge PDF', 'Password Generator'].map(name => (
                                <li key={name}>
                                    <Link
                                        to={`/tools/${name.toLowerCase().replace(/ /g, '-')}`}
                                        className="text-sm text-surface-400 hover:text-primary-400 transition-colors"
                                    >
                                        {name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Info */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">About</h3>
                        <ul className="space-y-2 text-sm">
                            <li className="text-surface-400">✅ 100% Free to use</li>
                            <li className="text-surface-400">🔒 No data stored on server</li>
                            <li className="text-surface-400">⚡ Fast client-side processing</li>
                            <li className="text-surface-400">📱 Works on all devices</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-surface-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-surface-500">© {new Date().getFullYear()} FreeTools. All rights reserved.</p>
                    <div className="flex items-center gap-6 text-sm">
                        <Link to="/" className="text-surface-500 hover:text-primary-400 transition-colors">Privacy</Link>
                        <Link to="/" className="text-surface-500 hover:text-primary-400 transition-colors">Terms</Link>
                        <Link to="/" className="text-surface-500 hover:text-primary-400 transition-colors">Contact</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
