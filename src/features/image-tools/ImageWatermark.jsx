import { useState, useCallback } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';
import FileUploader from '../../core/components/FileUploader';

export default function ImageWatermark() {
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [watermarkType, setWatermarkType] = useState('text'); // 'text' or 'image'
    const [watermarkText, setWatermarkText] = useState('© Your Name');
    const [watermarkFile, setWatermarkFile] = useState(null);
    const [watermarkPreview, setWatermarkPreview] = useState(null);
    const [position, setPosition] = useState('bottom-right');
    const [opacity, setOpacity] = useState(50);
    const [fontSize, setFontSize] = useState(48);
    const [color, setColor] = useState('#ffffff');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleImageSelect = useCallback((files) => {
        const file = files[0];
        if (file && file.type.startsWith('image/')) {
            setImageFile(file);
            setError('');
            setResult(null);
            const reader = new FileReader();
            reader.onload = (e) => setImagePreview(e.target.result);
            reader.readAsDataURL(file);
        } else {
            setError('Please select a valid image file');
        }
    }, []);

    const handleWatermarkImageSelect = useCallback((files) => {
        const file = files[0];
        if (file && file.type.startsWith('image/')) {
            setWatermarkFile(file);
            const reader = new FileReader();
            reader.onload = (e) => setWatermarkPreview(e.target.result);
            reader.readAsDataURL(file);
        }
    }, []);

    const addWatermark = useCallback(async () => {
        if (!imageFile || !imagePreview) return;

        try {
            const img = new Image();
            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
                img.src = imagePreview;
            });

            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');

            // Draw original image
            ctx.drawImage(img, 0, 0);

            // Calculate position
            const padding = Math.max(img.width, img.height) * 0.05;
            let x, y, wmWidth, wmHeight;

            if (watermarkType === 'text') {
                // Text watermark
                ctx.globalAlpha = opacity / 100;
                ctx.font = `bold ${fontSize}px Arial`;
                ctx.fillStyle = color;
                ctx.textAlign = 'right';
                ctx.textBaseline = 'bottom';

                const textMetrics = ctx.measureText(watermarkText);
                wmWidth = textMetrics.width;
                wmHeight = fontSize;

                switch (position) {
                    case 'top-left':
                        x = padding;
                        y = padding + fontSize;
                        ctx.textAlign = 'left';
                        ctx.textBaseline = 'top';
                        break;
                    case 'top-center':
                        x = img.width / 2;
                        y = padding + fontSize;
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'top';
                        break;
                    case 'top-right':
                        x = img.width - padding;
                        y = padding + fontSize;
                        ctx.textAlign = 'right';
                        ctx.textBaseline = 'top';
                        break;
                    case 'center':
                        x = img.width / 2;
                        y = img.height / 2 + fontSize / 2;
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        break;
                    case 'bottom-left':
                        x = padding;
                        y = img.height - padding;
                        ctx.textAlign = 'left';
                        ctx.textBaseline = 'bottom';
                        break;
                    case 'bottom-center':
                        x = img.width / 2;
                        y = img.height - padding;
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';
                        break;
                    case 'bottom-right':
                    default:
                        x = img.width - padding;
                        y = img.height - padding;
                        ctx.textAlign = 'right';
                        ctx.textBaseline = 'bottom';
                        break;
                }

                // Add text shadow for better visibility
                ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
                ctx.shadowBlur = 4;
                ctx.shadowOffsetX = 2;
                ctx.shadowOffsetY = 2;
                ctx.fillText(watermarkText, x, y);
            } else if (watermarkType === 'image' && watermarkPreview) {
                // Image watermark
                const wmImg = new Image();
                await new Promise((resolve, reject) => {
                    wmImg.onload = resolve;
                    wmImg.onerror = reject;
                    wmImg.src = watermarkPreview;
                });

                ctx.globalAlpha = opacity / 100;
                
                // Scale watermark to 20% of main image width
                wmWidth = img.width * 0.2;
                wmHeight = (wmImg.height / wmImg.width) * wmWidth;

                switch (position) {
                    case 'top-left':
                        x = padding;
                        y = padding;
                        break;
                    case 'top-center':
                        x = (img.width - wmWidth) / 2;
                        y = padding;
                        break;
                    case 'top-right':
                        x = img.width - wmWidth - padding;
                        y = padding;
                        break;
                    case 'center':
                        x = (img.width - wmWidth) / 2;
                        y = (img.height - wmHeight) / 2;
                        break;
                    case 'bottom-left':
                        x = padding;
                        y = img.height - wmHeight - padding;
                        break;
                    case 'bottom-center':
                        x = (img.width - wmWidth) / 2;
                        y = img.height - wmHeight - padding;
                        break;
                    case 'bottom-right':
                    default:
                        x = img.width - wmWidth - padding;
                        y = img.height - wmHeight - padding;
                        break;
                }

                ctx.drawImage(wmImg, x, y, wmWidth, wmHeight);
            }

            const dataUrl = canvas.toDataURL('image/png');
            const blob = await (await fetch(dataUrl)).blob();
            const url = URL.createObjectURL(blob);

            setResult({
                url,
                filename: `watermarked-${imageFile.name}`,
                size: blob.size
            });
        } catch (err) {
            console.error('Watermark error:', err);
            setError('Failed to add watermark. Please try again.');
        }
    }, [imageFile, imagePreview, watermarkType, watermarkText, watermarkPreview, position, opacity, fontSize, color]);

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
        setImagePreview(null);
        setWatermarkFile(null);
        setWatermarkPreview(null);
        setResult(null);
        setError('');
    };

    return (
        <ToolLayout toolSlug="image-watermark">
            <div className="space-y-6">
                {/* Info Banner */}
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-xl">
                    <h3 className="font-semibold text-indigo-900 dark:text-indigo-300 mb-2">
                        💧 Image Watermark Adder
                    </h3>
                    <p className="text-sm text-indigo-700 dark:text-indigo-400">
                        Add text or image watermarks to protect your photos. Customize position, opacity, and style.
                    </p>
                </div>

                {/* Main Image Upload */}
                <div>
                    <FileUploader
                        accept="image/*"
                        maxFiles={1}
                        onFilesSelected={handleImageSelect}
                        dragText="Drag & drop your main image here"
                        browseText="Browse Image"
                        maxSize={20}
                    />
                </div>

                {/* Watermark Options */}
                {imagePreview && !result && (
                    <div className="space-y-4">
                        {/* Watermark Type */}
                        <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-xl">
                            <h3 className="font-semibold text-surface-900 dark:text-white mb-3">Watermark Type</h3>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setWatermarkType('text')}
                                    className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                                        watermarkType === 'text'
                                            ? 'bg-accent-500 text-white'
                                            : 'bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300'
                                    }`}
                                >
                                    📝 Text Watermark
                                </button>
                                <button
                                    onClick={() => setWatermarkType('image')}
                                    className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                                        watermarkType === 'image'
                                            ? 'bg-accent-500 text-white'
                                            : 'bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300'
                                    }`}
                                >
                                    🖼️ Image Watermark
                                </button>
                            </div>
                        </div>

                        {/* Text Watermark Input */}
                        {watermarkType === 'text' && (
                            <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-xl space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                                        Watermark Text
                                    </label>
                                    <input
                                        type="text"
                                        value={watermarkText}
                                        onChange={(e) => setWatermarkText(e.target.value)}
                                        className="input-field"
                                        placeholder="© Your Name"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                                            Font Size: {fontSize}px
                                        </label>
                                        <input
                                            type="range"
                                            min="12"
                                            max="120"
                                            value={fontSize}
                                            onChange={(e) => setFontSize(Number(e.target.value))}
                                            className="w-full accent-accent-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                                            Color
                                        </label>
                                        <div className="flex gap-2">
                                            <input
                                                type="color"
                                                value={color}
                                                onChange={(e) => setColor(e.target.value)}
                                                className="w-12 h-10 rounded-lg cursor-pointer"
                                            />
                                            <input
                                                type="text"
                                                value={color}
                                                onChange={(e) => setColor(e.target.value)}
                                                className="input-field flex-1 font-mono"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Image Watermark Upload */}
                        {watermarkType === 'image' && watermarkPreview && (
                            <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-xl">
                                <div className="flex items-center gap-4">
                                    <img src={watermarkPreview} alt="Watermark" className="w-20 h-20 object-contain rounded-lg bg-surface-100 dark:bg-surface-700" />
                                    <button onClick={() => setWatermarkPreview(null)} className="text-sm text-red-500">Remove</button>
                                </div>
                            </div>
                        )}

                        {watermarkType === 'image' && !watermarkPreview && (
                            <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-xl">
                                <FileUploader
                                    accept="image/*"
                                    maxFiles={1}
                                    onFilesSelected={handleWatermarkImageSelect}
                                    dragText="Upload watermark logo/image"
                                    browseText="Choose Image"
                                    maxSize={5}
                                />
                            </div>
                        )}

                        {/* Position */}
                        <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-xl">
                            <h3 className="font-semibold text-surface-900 dark:text-white mb-3">Position</h3>
                            <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
                                {[
                                    { value: 'top-left', label: '↖' },
                                    { value: 'top-center', label: '↑' },
                                    { value: 'top-right', label: '↗' },
                                    { value: 'center-left', label: '←' },
                                    { value: 'center', label: '●' },
                                    { value: 'center-right', label: '→' },
                                    { value: 'bottom-left', label: '↙' },
                                    { value: 'bottom-center', label: '↓' },
                                    { value: 'bottom-right', label: '↘' },
                                ].map(pos => (
                                    <button
                                        key={pos.value}
                                        onClick={() => setPosition(pos.value)}
                                        className={`p-3 rounded-lg text-xl transition-all ${
                                            position === pos.value
                                                ? 'bg-accent-500 text-white'
                                                : 'bg-surface-100 dark:bg-surface-700 hover:bg-accent-100 dark:hover:bg-accent-900/30'
                                        }`}
                                    >
                                        {pos.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Opacity */}
                        <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-xl">
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-sm font-medium text-surface-700 dark:text-surface-300">Opacity</label>
                                <span className="text-sm font-bold text-accent-600">{opacity}%</span>
                            </div>
                            <input
                                type="range"
                                min="10"
                                max="100"
                                value={opacity}
                                onChange={(e) => setOpacity(Number(e.target.value))}
                                className="w-full accent-accent-500"
                            />
                        </div>

                        {/* Preview */}
                        <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-xl">
                            <h3 className="font-semibold text-surface-900 dark:text-white mb-3">Preview</h3>
                            <div className="relative rounded-lg overflow-hidden border border-surface-200 dark:border-surface-700">
                                <img src={imagePreview} alt="Preview" className="w-full object-contain" />
                                {watermarkType === 'text' && (
                                    <div
                                        className="absolute pointer-events-none"
                                        style={{
                                            color,
                                            fontSize: `${fontSize}px`,
                                            fontWeight: 'bold',
                                            opacity: opacity / 100,
                                            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                                            ...getPositionStyle(position, '5%')
                                        }}
                                    >
                                        {watermarkText}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Add Button */}
                        <button onClick={addWatermark} className="btn-primary w-full py-4 text-lg">
                            💧 Add Watermark
                        </button>
                    </div>
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
                            <h3 className="text-xl font-bold text-green-900 dark:text-green-300 mb-2">Watermark Added!</h3>
                            <p className="text-sm text-green-700 dark:text-green-400 mb-4">{result.filename}</p>
                            <button onClick={download} className="btn-primary px-8 py-3">📥 Download</button>
                        </div>
                        <button onClick={reset} className="btn-secondary w-full">🔄 Start Over</button>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
}

function getPositionStyle(position, padding) {
    const styles = {
        'top-left': { top: padding, left: padding },
        'top-center': { top: padding, left: '50%', transform: 'translateX(-50%)' },
        'top-right': { top: padding, right: padding },
        'center-left': { top: '50%', left: padding, transform: 'translateY(-50%)' },
        'center': { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
        'center-right': { top: '50%', right: padding, transform: 'translateY(-50%)' },
        'bottom-left': { bottom: padding, left: padding },
        'bottom-center': { bottom: padding, left: '50%', transform: 'translateX(-50%)' },
        'bottom-right': { bottom: padding, right: padding },
    };
    return styles[position] || styles['bottom-right'];
}
