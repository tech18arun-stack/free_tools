import { useState, useCallback, useMemo } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';

export default function AspectRatioCalculator() {
    const [mode, setMode] = useState('dimensions'); // 'dimensions', 'ratio', 'scale'
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [ratioW, setRatioW] = useState('');
    const [ratioH, setRatioH] = useState('');
    const [targetWidth, setTargetWidth] = useState('');
    const [targetHeight, setTargetHeight] = useState('');
    const [lockAspectRatio, setLockAspectRatio] = useState(true);

    const calculateAspectRatio = useCallback((w, h) => {
        const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
        const a = parseInt(w);
        const b = parseInt(h);
        if (!a || !b) return { w: 0, h: 0 };
        const divisor = gcd(a, b);
        return { w: a / divisor, h: b / divisor };
    }, []);

    const aspectRatio = useMemo(() => {
        if (width && height) {
            return calculateAspectRatio(width, height);
        }
        return null;
    }, [width, height, calculateAspectRatio]);

    const calculateHeight = useCallback((w, rw, rh) => {
        if (!w || !rw || !rh) return '';
        return Math.round((w * rh) / rw);
    }, []);

    const calculateWidth = useCallback((h, rw, rh) => {
        if (!h || !rw || !rh) return '';
        return Math.round((h * rw) / rh);
    }, []);

    const handleWidthChange = (value) => {
        setWidth(value);
        if (lockAspectRatio && aspectRatio) {
            setHeight(calculateHeight(value, aspectRatio.w, aspectRatio.h));
        }
    };

    const handleHeightChange = (value) => {
        setHeight(value);
        if (lockAspectRatio && aspectRatio) {
            setWidth(calculateWidth(value, aspectRatio.w, aspectRatio.h));
        }
    };

    const handleRatioChange = (field, value) => {
        if (field === 'w') {
            setRatioW(value);
        } else {
            setRatioH(value);
        }
    };

    const handleTargetWidthChange = (value) => {
        setTargetWidth(value);
        if (lockAspectRatio && ratioW && ratioH) {
            setTargetHeight(calculateHeight(value, ratioW, ratioH));
        }
    };

    const handleTargetHeightChange = (value) => {
        setTargetHeight(value);
        if (lockAspectRatio && ratioW && ratioH) {
            setTargetWidth(calculateWidth(value, ratioW, ratioH));
        }
    };

    const setPreset = (w, h) => {
        setWidth(w.toString());
        setHeight(h.toString());
    };

    const presets = [
        { name: '16:9 (HD/Full HD)', w: 16, h: 9, examples: '1920×1080, 1280×720' },
        { name: '16:9 (4K UHD)', w: 16, h: 9, examples: '3840×2160' },
        { name: '4:3 (Classic)', w: 4, h: 3, examples: '1024×768, 800×600' },
        { name: '3:2 (DSLR)', w: 3, h: 2, examples: '3000×2000, 1500×1000' },
        { name: '1:1 (Square)', w: 1, h: 1, examples: '1080×1080, 500×500' },
        { name: '9:16 (Vertical)', w: 9, h: 16, examples: '1080×1920, 720×1280' },
        { name: '21:9 (Ultrawide)', w: 21, h: 9, examples: '2560×1080, 3440×1440' },
        { name: '3:4 (Portrait)', w: 3, h: 4, examples: '750×1000, 600×800' },
    ];

    const commonResolutions = [
        { name: '4K UHD', w: 3840, h: 2160 },
        { name: 'Full HD', w: 1920, h: 1080 },
        { name: 'HD', w: 1280, h: 720 },
        { name: 'Instagram Post', w: 1080, h: 1080 },
        { name: 'Instagram Story', w: 1080, h: 1920 },
        { name: 'YouTube Thumbnail', w: 1280, h: 720 },
        { name: 'Twitter Post', w: 1200, h: 675 },
        { name: 'Facebook Post', w: 1200, h: 630 },
    ];

    return (
        <ToolLayout toolSlug="aspect-ratio-calculator">
            <div className="space-y-6">
                {/* Mode Selector */}
                <div className="flex flex-wrap gap-2">
                    {[
                        { id: 'dimensions', label: '📐 Dimensions → Ratio' },
                        { id: 'ratio', label: '🔢 Ratio Calculator' },
                        { id: 'scale', label: '📏 Scale & Resize' },
                    ].map(m => (
                        <button
                            key={m.id}
                            onClick={() => setMode(m.id)}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                mode === m.id
                                    ? 'bg-accent-600 text-white'
                                    : 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300'
                            }`}
                        >
                            {m.label}
                        </button>
                    ))}
                </div>

                {/* Mode: Dimensions to Ratio */}
                {mode === 'dimensions' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                                    Width (px)
                                </label>
                                <input
                                    type="number"
                                    value={width}
                                    onChange={(e) => setWidth(e.target.value)}
                                    placeholder="1920"
                                    className="input-field"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                                    Height (px)
                                </label>
                                <input
                                    type="number"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                    placeholder="1080"
                                    className="input-field"
                                />
                            </div>
                        </div>

                        {aspectRatio && (
                            <div className="p-6 bg-gradient-to-r from-accent-500 to-purple-600 rounded-2xl text-white text-center">
                                <div className="text-sm opacity-80 mb-2">Aspect Ratio</div>
                                <div className="text-5xl font-bold mb-2">
                                    {aspectRatio.w}:{aspectRatio.h}
                                </div>
                                <div className="text-lg opacity-80">
                                    {width} × {height} px
                                </div>
                            </div>
                        )}

                        {/* Presets */}
                        <div>
                            <h3 className="font-semibold text-surface-900 dark:text-white mb-3">Common Presets</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {presets.map(preset => (
                                    <button
                                        key={preset.name}
                                        onClick={() => setPreset(preset.w * 100, preset.h * 100)}
                                        className="p-3 bg-surface-50 dark:bg-surface-800 rounded-xl text-left hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                                    >
                                        <div className="font-medium text-surface-900 dark:text-white">
                                            {preset.name}
                                        </div>
                                        <div className="text-sm text-surface-500">
                                            {preset.examples}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Mode: Ratio Calculator */}
                {mode === 'ratio' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                                    Ratio Width
                                </label>
                                <input
                                    type="number"
                                    value={ratioW}
                                    onChange={(e) => handleRatioChange('w', e.target.value)}
                                    placeholder="16"
                                    className="input-field"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                                    Ratio Height
                                </label>
                                <input
                                    type="number"
                                    value={ratioH}
                                    onChange={(e) => handleRatioChange('h', e.target.value)}
                                    placeholder="9"
                                    className="input-field"
                                />
                            </div>
                        </div>

                        {ratioW && ratioH && (
                            <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-xl text-center">
                                <div className="text-3xl font-bold text-accent-600 dark:text-accent-400">
                                    {ratioW}:{ratioH}
                                </div>
                            </div>
                        )}

                        {/* Quick Ratios */}
                        <div className="flex flex-wrap gap-2">
                            {['1:1', '4:3', '3:2', '16:9', '21:9', '9:16'].map(ratio => {
                                const [w, h] = ratio.split(':');
                                return (
                                    <button
                                        key={ratio}
                                        onClick={() => { setRatioW(w); setRatioH(h); }}
                                        className="btn-secondary text-sm px-4 py-2"
                                    >
                                        {ratio}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Mode: Scale & Resize */}
                {mode === 'scale' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                                    Ratio Width
                                </label>
                                <input
                                    type="number"
                                    value={ratioW}
                                    onChange={(e) => handleRatioChange('w', e.target.value)}
                                    placeholder="16"
                                    className="input-field"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                                    Ratio Height
                                </label>
                                <input
                                    type="number"
                                    value={ratioH}
                                    onChange={(e) => handleRatioChange('h', e.target.value)}
                                    placeholder="9"
                                    className="input-field"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="lock"
                                checked={lockAspectRatio}
                                onChange={(e) => setLockAspectRatio(e.target.checked)}
                                className="w-4 h-4 accent-accent-500"
                            />
                            <label htmlFor="lock" className="text-sm font-medium text-surface-700 dark:text-surface-300">
                                Lock aspect ratio
                            </label>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                                    Target Width (px)
                                </label>
                                <input
                                    type="number"
                                    value={targetWidth}
                                    onChange={(e) => handleTargetWidthChange(e.target.value)}
                                    placeholder="1920"
                                    className="input-field"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                                    Target Height (px)
                                </label>
                                <input
                                    type="number"
                                    value={targetHeight}
                                    onChange={(e) => handleTargetHeightChange(e.target.value)}
                                    placeholder="1080"
                                    className="input-field"
                                />
                            </div>
                        </div>

                        {targetWidth && targetHeight && (
                            <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl text-white text-center">
                                <div className="text-sm opacity-80 mb-2">Resulting Dimensions</div>
                                <div className="text-4xl font-bold">
                                    {targetWidth} × {targetHeight} px
                                </div>
                            </div>
                        )}

                        {/* Common Resolutions */}
                        <div>
                            <h3 className="font-semibold text-surface-900 dark:text-white mb-3">Common Resolutions</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                {commonResolutions.map(res => (
                                    <button
                                        key={res.name}
                                        onClick={() => {
                                            setTargetWidth(res.w.toString());
                                            setTargetHeight(res.h.toString());
                                        }}
                                        className="p-3 bg-surface-50 dark:bg-surface-800 rounded-xl text-center hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                                    >
                                        <div className="font-medium text-surface-900 dark:text-white text-sm">
                                            {res.w}×{res.h}
                                        </div>
                                        <div className="text-xs text-surface-500">
                                            {res.name}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Info */}
                <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-xl">
                    <h3 className="font-semibold text-surface-900 dark:text-white mb-2">📐 What is Aspect Ratio?</h3>
                    <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed">
                        Aspect ratio is the proportional relationship between width and height. It's expressed as two 
                        numbers separated by a colon (e.g., 16:9). Common uses include video formats, image dimensions, 
                        screen resolutions, and print design. Maintaining aspect ratio prevents distortion when resizing.
                    </p>
                </div>
            </div>
        </ToolLayout>
    );
}
