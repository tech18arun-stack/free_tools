import { useState, useCallback, useRef } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';
import FileUploader from '../../core/components/FileUploader';

export default function ImageFilterEditor() {
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [filters, setFilters] = useState({
        brightness: 100,
        contrast: 100,
        saturation: 100,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        hueRotate: 0,
        invert: 0,
    });
    const [applying, setApplying] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const canvasRef = useRef(null);

    const handleFileSelect = useCallback((files) => {
        const file = files[0];
        if (file && file.type.startsWith('image/')) {
            setImageFile(file);
            setError('');
            setResult(null);
            setFilters({
                brightness: 100,
                contrast: 100,
                saturation: 100,
                blur: 0,
                grayscale: 0,
                sepia: 0,
                hueRotate: 0,
                invert: 0,
            });
            
            const reader = new FileReader();
            reader.onload = (e) => setPreview(e.target.result);
            reader.readAsDataURL(file);
        } else {
            setError('Please select a valid image file');
        }
    }, []);

    const getFilterString = useCallback(() => {
        return `brightness(${filters.brightness}%) contrast(${filters.contrast}%) saturate(${filters.saturation}%) blur(${filters.blur}px) grayscale(${filters.grayscale}%) sepia(${filters.sepia}%) hue-rotate(${filters.hueRotate}deg) invert(${filters.invert}%)`;
    }, [filters]);

    const applyFilters = useCallback(async () => {
        if (!imageFile || !preview) return;

        setApplying(true);
        setError('');

        try {
            const img = new Image();
            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
                img.src = preview;
            });

            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            
            const ctx = canvas.getContext('2d');
            
            // Apply filters using CSS filter syntax
            ctx.filter = getFilterString();
            ctx.drawImage(img, 0, 0);

            const dataUrl = canvas.toDataURL('image/png', 1);
            const blob = await (await fetch(dataUrl)).blob();
            const url = URL.createObjectURL(blob);

            setResult({
                url,
                filename: `filtered-${imageFile.name}`,
                size: blob.size
            });
        } catch (err) {
            console.error('Filter error:', err);
            setError('Failed to apply filters. Please try again.');
        } finally {
            setApplying(false);
        }
    }, [imageFile, preview, getFilterString]);

    const download = () => {
        if (result?.url) {
            const link = document.createElement('a');
            link.href = result.url;
            link.download = result.filename;
            link.click();
        }
    };

    const reset = () => {
        setImageFile(null);
        setPreview(null);
        setResult(null);
        setError('');
        setFilters({
            brightness: 100,
            contrast: 100,
            saturation: 100,
            blur: 0,
            grayscale: 0,
            sepia: 0,
            hueRotate: 0,
            invert: 0,
        });
    };

    const resetFilters = () => {
        setFilters({
            brightness: 100,
            contrast: 100,
            saturation: 100,
            blur: 0,
            grayscale: 0,
            sepia: 0,
            hueRotate: 0,
            invert: 0,
        });
    };

    const filterPresets = [
        { name: 'Normal', filters: { brightness: 100, contrast: 100, saturation: 100, blur: 0, grayscale: 0, sepia: 0, hueRotate: 0, invert: 0 } },
        { name: 'Vintage', filters: { brightness: 110, contrast: 85, saturation: 70, blur: 0, grayscale: 0, sepia: 40, hueRotate: 0, invert: 0 } },
        { name: 'B&W', filters: { brightness: 100, contrast: 120, saturation: 0, blur: 0, grayscale: 100, sepia: 0, hueRotate: 0, invert: 0 } },
        { name: 'Warm', filters: { brightness: 105, contrast: 100, saturation: 120, blur: 0, grayscale: 0, sepia: 20, hueRotate: 0, invert: 0 } },
        { name: 'Cool', filters: { brightness: 100, contrast: 100, saturation: 90, blur: 0, grayscale: 0, sepia: 0, hueRotate: 30, invert: 0 } },
        { name: 'Dramatic', filters: { brightness: 90, contrast: 150, saturation: 80, blur: 0, grayscale: 0, sepia: 0, hueRotate: 0, invert: 0 } },
        { name: 'Fade', filters: { brightness: 120, contrast: 80, saturation: 80, blur: 0, grayscale: 20, sepia: 10, hueRotate: 0, invert: 0 } },
        { name: 'Invert', filters: { brightness: 100, contrast: 100, saturation: 100, blur: 0, grayscale: 0, sepia: 0, hueRotate: 0, invert: 100 } },
    ];

    const applyPreset = (presetFilters) => {
        setFilters(presetFilters);
    };

    return (
        <ToolLayout toolSlug="image-filter-editor">
            <div className="space-y-6">
                {/* Info Banner */}
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl">
                    <h3 className="font-semibold text-purple-900 dark:text-purple-300 mb-2">
                        🎨 Image Filter Editor
                    </h3>
                    <p className="text-sm text-purple-700 dark:text-purple-400">
                        Apply professional filters to your images. Adjust brightness, contrast, saturation, and more.
                    </p>
                </div>

                {/* File Upload */}
                {!result && (
                    <div>
                        <FileUploader
                            accept="image/*"
                            maxFiles={1}
                            onFilesSelected={handleFileSelect}
                            dragText="Drag & drop your image here"
                            browseText="Browse Image"
                            maxSize={20}
                        />
                    </div>
                )}

                {/* Editor */}
                {preview && !result && (
                    <div className="space-y-4">
                        {/* Preview with Filters */}
                        <div className="relative">
                            <div
                                className="rounded-xl overflow-hidden border border-surface-200 dark:border-surface-700 bg-surface-100 dark:bg-surface-800 flex items-center justify-center"
                                style={{ maxHeight: '400px' }}
                            >
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="max-w-full max-h-[400px] object-contain"
                                    style={{ filter: getFilterString() }}
                                />
                            </div>
                        </div>

                        {/* Presets */}
                        <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-xl">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-semibold text-surface-900 dark:text-white">Quick Presets</h3>
                                <button onClick={resetFilters} className="text-xs text-accent-600 hover:underline">
                                    Reset All
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {filterPresets.map(preset => (
                                    <button
                                        key={preset.name}
                                        onClick={() => applyPreset(preset.filters)}
                                        className="px-4 py-2 bg-surface-100 dark:bg-surface-700 rounded-lg text-sm font-medium hover:bg-accent-100 dark:hover:bg-accent-900/30 transition-colors"
                                    >
                                        {preset.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Filter Sliders */}
                        <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-xl space-y-4">
                            <h3 className="font-semibold text-surface-900 dark:text-white">Adjustments</h3>
                            
                            {[
                                { key: 'brightness', label: 'Brightness', min: 0, max: 200, unit: '%' },
                                { key: 'contrast', label: 'Contrast', min: 0, max: 200, unit: '%' },
                                { key: 'saturation', label: 'Saturation', min: 0, max: 200, unit: '%' },
                                { key: 'blur', label: 'Blur', min: 0, max: 20, unit: 'px' },
                                { key: 'grayscale', label: 'Grayscale', min: 0, max: 100, unit: '%' },
                                { key: 'sepia', label: 'Sepia', min: 0, max: 100, unit: '%' },
                                { key: 'hueRotate', label: 'Hue Rotate', min: 0, max: 360, unit: '°' },
                                { key: 'invert', label: 'Invert', min: 0, max: 100, unit: '%' },
                            ].map(filter => (
                                <div key={filter.key}>
                                    <div className="flex items-center justify-between mb-1">
                                        <label className="text-sm font-medium text-surface-700 dark:text-surface-300">
                                            {filter.label}
                                        </label>
                                        <span className="text-sm font-mono text-surface-500">
                                            {filters[filter.key]}{filter.unit}
                                        </span>
                                    </div>
                                    <input
                                        type="range"
                                        min={filter.min}
                                        max={filter.max}
                                        value={filters[filter.key]}
                                        onChange={(e) => setFilters({ ...filters, [filter.key]: Number(e.target.value) })}
                                        className="w-full accent-accent-500"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Apply Button */}
                        <button
                            onClick={applyFilters}
                            disabled={applying}
                            className="btn-primary w-full py-4 text-lg disabled:opacity-50"
                        >
                            {applying ? '🎨 Applying...' : '✨ Apply Filters'}
                        </button>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                        <p className="text-sm text-red-600 dark:text-red-400">❌ {error}</p>
                    </div>
                )}

                {/* Result */}
                {result && (
                    <div className="space-y-4">
                        <div className="p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl text-center">
                            <div className="text-4xl mb-3">✅</div>
                            <h3 className="text-xl font-bold text-green-900 dark:text-green-300 mb-2">
                                Filters Applied!
                            </h3>
                            <p className="text-sm text-green-700 dark:text-green-400 mb-4">
                                {result.filename} ({(result.size / 1024).toFixed(1)} KB)
                            </p>
                            <button onClick={download} className="btn-primary px-8 py-3">
                                📥 Download Image
                            </button>
                        </div>
                        <button onClick={reset} className="btn-secondary w-full">
                            🔄 Edit Another Image
                        </button>
                    </div>
                )}

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { icon: '🎨', title: '8 Filters', desc: 'Professional adjustments' },
                        { icon: '🔒', title: 'Private', desc: 'Local processing' },
                        { icon: '💯', title: 'Free', desc: 'No watermark' },
                    ].map(feature => (
                        <div key={feature.title} className="p-4 bg-surface-50 dark:bg-surface-800 rounded-xl text-center">
                            <div className="text-2xl mb-2">{feature.icon}</div>
                            <div className="font-semibold text-surface-900 dark:text-white">{feature.title}</div>
                            <div className="text-sm text-surface-500">{feature.desc}</div>
                        </div>
                    ))}
                </div>
            </div>
        </ToolLayout>
    );
}
