import { useState, useCallback } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';
import FileUploader from '../../core/components/FileUploader';

export default function AvifToJpgConverter() {
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [converting, setConverting] = useState(false);
    const [quality, setQuality] = useState(90);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleFileSelect = useCallback((files) => {
        const file = files[0];
        if (file && (file.type === 'image/avif' || file.name.endsWith('.avif'))) {
            setImageFile(file);
            setError('');
            setResult(null);
            
            const reader = new FileReader();
            reader.onload = (e) => setPreview(e.target.result);
            reader.readAsDataURL(file);
        } else {
            setError('Please select a valid AVIF image file');
        }
    }, []);

    const convert = useCallback(async () => {
        if (!imageFile) return;

        setConverting(true);
        setError('');

        try {
            const img = new Image();
            const imageUrl = URL.createObjectURL(imageFile);
            
            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
                img.src = imageUrl;
            });

            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            const dataUrl = canvas.toDataURL('image/jpeg', quality / 100);
            const blob = await (await fetch(dataUrl)).blob();
            const url = URL.createObjectURL(blob);

            setResult({
                url,
                filename: `${imageFile.name.replace('.avif', '.jpg')}`,
                size: blob.size,
                originalSize: imageFile.size,
                width: img.width,
                height: img.height
            });

            URL.revokeObjectURL(imageUrl);
        } catch (err) {
            console.error('Conversion error:', err);
            setError('Failed to convert AVIF. Your browser may not support this format.');
        } finally {
            setConverting(false);
        }
    }, [imageFile, quality]);

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
    };

    const formatSize = (bytes) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    };

    return (
        <ToolLayout toolSlug="avif-to-jpg-converter">
            <div className="space-y-6">
                {/* Info Banner */}
                <div className="p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl">
                    <h3 className="font-semibold text-orange-900 dark:text-orange-300 mb-2">
                        🖼️ AVIF to JPG Converter
                    </h3>
                    <p className="text-sm text-orange-700 dark:text-orange-400">
                        Convert AVIF images to JPG format for better compatibility. Free, fast, and high quality.
                    </p>
                </div>

                {/* File Upload */}
                {!result && (
                    <div>
                        <FileUploader
                            accept=".avif,image/avif"
                            maxFiles={1}
                            onFilesSelected={handleFileSelect}
                            dragText="Drag & drop your AVIF image here"
                            browseText="Browse AVIF"
                            maxSize={20}
                        />

                        {preview && (
                            <div className="mt-4 p-4 bg-surface-50 dark:bg-surface-800 rounded-xl">
                                <div className="flex items-start gap-4">
                                    <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded-lg border border-surface-200 dark:border-surface-700" />
                                    <div className="flex-1">
                                        <div className="font-medium text-surface-900 dark:text-white">{imageFile?.name}</div>
                                        <div className="text-sm text-surface-500">{formatSize(imageFile?.size || 0)}</div>
                                    </div>
                                    <button onClick={reset} className="text-sm text-red-500 hover:text-red-600">Remove</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Quality */}
                {imageFile && !result && (
                    <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-medium text-surface-700 dark:text-surface-300">Output Quality</label>
                            <span className="text-sm font-bold text-accent-600">{quality}%</span>
                        </div>
                        <input
                            type="range"
                            min="50"
                            max="100"
                            value={quality}
                            onChange={(e) => setQuality(Number(e.target.value))}
                            className="w-full accent-accent-500"
                        />
                        <div className="flex justify-between text-xs text-surface-500 mt-1">
                            <span>Smaller</span>
                            <span>Better</span>
                        </div>
                    </div>
                )}

                {/* Convert Button */}
                {imageFile && !result && (
                    <button
                        onClick={convert}
                        disabled={converting}
                        className="btn-primary w-full py-4 text-lg disabled:opacity-50"
                    >
                        {converting ? '🔄 Converting...' : '🔄 Convert to JPG'}
                    </button>
                )}

                {/* Error */}
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
                            <h3 className="text-xl font-bold text-green-900 dark:text-green-300 mb-4">Conversion Complete!</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                                <div className="p-3 bg-white dark:bg-surface-800 rounded-lg">
                                    <div className="text-xs text-surface-500">Original</div>
                                    <div className="font-mono font-bold">{formatSize(result.originalSize)}</div>
                                </div>
                                <div className="p-3 bg-white dark:bg-surface-800 rounded-lg">
                                    <div className="text-xs text-surface-500">Converted</div>
                                    <div className="font-mono font-bold">{formatSize(result.size)}</div>
                                </div>
                                <div className="p-3 bg-white dark:bg-surface-800 rounded-lg">
                                    <div className="text-xs text-surface-500">Width</div>
                                    <div className="font-mono font-bold">{result.width}px</div>
                                </div>
                                <div className="p-3 bg-white dark:bg-surface-800 rounded-lg">
                                    <div className="text-xs text-surface-500">Height</div>
                                    <div className="font-mono font-bold">{result.height}px</div>
                                </div>
                            </div>
                            <button onClick={download} className="btn-primary px-8 py-3">📥 Download JPG</button>
                        </div>
                        <button onClick={reset} className="btn-secondary w-full">🔄 Convert Another AVIF</button>
                    </div>
                )}

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { icon: '⚡', title: 'Fast', desc: 'Instant conversion' },
                        { icon: '🔒', title: 'Secure', desc: 'Local processing' },
                        { icon: '💯', title: 'Free', desc: 'No limits' },
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
