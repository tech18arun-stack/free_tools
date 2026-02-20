import { useState, useCallback } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';
import FileUploader from '../../core/components/FileUploader';

export default function ImageCompressor() {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState('');
    const [quality, setQuality] = useState(70);
    const [result, setResult] = useState(null);
    const [processing, setProcessing] = useState(false);

    const handleFile = useCallback((file) => {
        setImage(file);
        setResult(null);
        const reader = new FileReader();
        reader.onload = (e) => setPreview(e.target.result);
        reader.readAsDataURL(file);
    }, []);

    const compress = useCallback(() => {
        if (!image) return;
        setProcessing(true);
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            canvas.toBlob((blob) => {
                setResult({
                    url: URL.createObjectURL(blob),
                    size: blob.size,
                    originalSize: image.size,
                });
                setProcessing(false);
            }, 'image/jpeg', quality / 100);
        };
        img.src = preview;
    }, [image, preview, quality]);

    const download = () => {
        if (!result) return;
        const a = document.createElement('a');
        a.href = result.url;
        a.download = `compressed-${image.name}`;
        a.click();
    };

    const formatSize = (bytes) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / 1048576).toFixed(2) + ' MB';
    };

    return (
        <ToolLayout toolSlug="image-compressor">
            <div className="space-y-6">
                <FileUploader accept="image/*" onFilesSelected={handleFile} label="Drop an image to compress" />

                {preview && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                                Quality: {quality}%
                            </label>
                            <input
                                type="range" min="10" max="100" value={quality}
                                onChange={(e) => setQuality(Number(e.target.value))}
                                className="w-full accent-primary-500"
                            />
                            <div className="flex justify-between text-xs text-surface-400 mt-1">
                                <span>Low (smaller file)</span>
                                <span>High (better quality)</span>
                            </div>
                        </div>

                        <button onClick={compress} disabled={processing} className="btn-primary w-full">
                            {processing ? 'Compressing...' : '🗜️ Compress Image'}
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="text-center">
                                <p className="text-sm font-medium text-surface-600 dark:text-surface-400 mb-2">Original ({formatSize(image.size)})</p>
                                <img src={preview} alt="Original" className="max-h-64 mx-auto rounded-xl" />
                            </div>
                            {result && (
                                <div className="text-center">
                                    <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-2">
                                        Compressed ({formatSize(result.size)}) — {((1 - result.size / result.originalSize) * 100).toFixed(1)}% smaller
                                    </p>
                                    <img src={result.url} alt="Compressed" className="max-h-64 mx-auto rounded-xl" />
                                </div>
                            )}
                        </div>

                        {result && (
                            <button onClick={download} className="btn-primary w-full">⬇️ Download Compressed Image</button>
                        )}
                    </div>
                )}
            </div>
        </ToolLayout>
    );
}
