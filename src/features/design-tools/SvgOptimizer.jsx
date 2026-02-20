import { useState } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';
import FileUploader from '../../core/components/FileUploader';

export default function SvgOptimizer() {
    const [svg, setSvg] = useState('');
    const [optimized, setOptimized] = useState('');
    const [removeComments, setRemoveComments] = useState(true);
    const [minify, setMinify] = useState(true);

    const optimize = () => {
        if (!svg) return;
        let result = svg;
        
        if (removeComments) {
            result = result.replace(/<!--[\s\S]*?-->/g, '');
        }
        
        if (minify) {
            result = result.replace(/\s+/g, ' ').replace(/>\s+</g, '><').trim();
        }
        
        setOptimized(result);
    };

    const copyResult = () => {
        navigator.clipboard.writeText(optimized);
    };

    const download = () => {
        if (!optimized) return;
        const blob = new Blob([optimized], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'optimized.svg';
        a.click();
    };

    const savings = svg && optimized ? Math.round((1 - optimized.length / svg.length) * 100) : 0;

    return (
        <ToolLayout toolSlug="svg-optimizer">
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Input SVG</label>
                    <textarea
                        value={svg}
                        onChange={(e) => setSvg(e.target.value)}
                        placeholder="<svg>...</svg>"
                        className="w-full h-40 px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 font-mono text-sm"
                    />
                </div>

                <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={removeComments}
                            onChange={(e) => setRemoveComments(e.target.checked)}
                            className="rounded"
                        />
                        <span className="text-sm">Remove comments</span>
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={minify}
                            onChange={(e) => setMinify(e.target.checked)}
                            className="rounded"
                        />
                        <span className="text-sm">Minify</span>
                    </label>
                </div>

                <button onClick={optimize} disabled={!svg} className="btn-primary w-full disabled:opacity-50">
                    ✨ Optimize SVG
                </button>

                {optimized && (
                    <div className="space-y-4">
                        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                            <div className="text-green-600 dark:text-green-400 font-semibold mb-1">
                                {savings > 0 ? `Reduced by ${savings}%` : 'Optimized'}
                            </div>
                            <div className="text-sm text-surface-600 dark:text-surface-400">
                                Original: {svg.length} bytes → Optimized: {optimized.length} bytes
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Optimized SVG</label>
                            <textarea
                                value={optimized}
                                readOnly
                                className="w-full h-40 px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800 font-mono text-sm"
                            />
                        </div>

                        <div className="flex gap-3">
                            <button onClick={copyResult} className="flex-1 py-3 bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 rounded-xl font-semibold transition-colors">
                                📋 Copy
                            </button>
                            <button onClick={download} className="flex-1 py-3 bg-accent-600 hover:bg-accent-700 text-white rounded-xl font-semibold transition-colors">
                                📥 Download
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
}
