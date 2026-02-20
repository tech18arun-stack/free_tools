import { useState } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';

export default function GradientGenerator() {
    const [color1, setColor1] = useState('#3B82F6');
    const [color2, setColor2] = useState('#8B5CF6');
    const [direction, setDirection] = useState('to right');
    const [type, setType] = useState('linear');

    const gradient = type === 'linear'
        ? `linear-gradient(${direction}, ${color1}, ${color2})`
        : `radial-gradient(circle, ${color1}, ${color2})`;

    const copyCSS = () => {
        navigator.clipboard.writeText(`background: ${gradient};`);
    };

    const directions = [
        { value: 'to right', label: '→ Right' },
        { value: 'to left', label: '← Left' },
        { value: 'to bottom', label: '↓ Down' },
        { value: 'to top', label: '↑ Up' },
        { value: '45deg', label: '↗ 45°' },
        { value: '135deg', label: '↘ 135°' },
    ];

    return (
        <ToolLayout toolSlug="gradient-generator">
            <div className="space-y-6">
                <div
                    className="w-full h-64 rounded-2xl shadow-lg"
                    style={{ background: gradient }}
                />

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Color 1</label>
                        <div className="flex gap-2">
                            <input type="color" value={color1} onChange={(e) => setColor1(e.target.value)} className="w-12 h-12 rounded-lg cursor-pointer" />
                            <input
                                type="text"
                                value={color1}
                                onChange={(e) => setColor1(e.target.value)}
                                className="flex-1 px-4 py-2 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 font-mono"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Color 2</label>
                        <div className="flex gap-2">
                            <input type="color" value={color2} onChange={(e) => setColor2(e.target.value)} className="w-12 h-12 rounded-lg cursor-pointer" />
                            <input
                                type="text"
                                value={color2}
                                onChange={(e) => setColor2(e.target.value)}
                                className="flex-1 px-4 py-2 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 font-mono"
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Type</label>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setType('linear')}
                            className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
                                type === 'linear'
                                    ? 'bg-accent-600 text-white'
                                    : 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300'
                            }`}
                        >
                            Linear
                        </button>
                        <button
                            onClick={() => setType('radial')}
                            className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
                                type === 'radial'
                                    ? 'bg-accent-600 text-white'
                                    : 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300'
                            }`}
                        >
                            Radial
                        </button>
                    </div>
                </div>

                {type === 'linear' && (
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Direction</label>
                        <div className="grid grid-cols-3 gap-2">
                            {directions.map((dir) => (
                                <button
                                    key={dir.value}
                                    onClick={() => setDirection(dir.value)}
                                    className={`py-2 rounded-lg font-medium transition-colors ${
                                        direction === dir.value
                                            ? 'bg-accent-600 text-white'
                                            : 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300'
                                    }`}
                                >
                                    {dir.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-surface-500">CSS Code</span>
                        <button onClick={copyCSS} className="text-sm text-accent-600 hover:text-accent-700 font-medium">
                            📋 Copy
                        </button>
                    </div>
                    <code className="text-sm font-mono text-surface-700 dark:text-surface-300 break-all">
                        background: {gradient};
                    </code>
                </div>
            </div>
        </ToolLayout>
    );
}
