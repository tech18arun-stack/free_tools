import { useState, useCallback } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';
import FileUploader from '../../core/components/FileUploader';

export default function ImageResizer() {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState('');
    const [width, setWidth] = useState(800);
    const [height, setHeight] = useState(600);
    const [keepRatio, setKeepRatio] = useState(true);
    const [origDims, setOrigDims] = useState({ w: 0, h: 0 });
    const [result, setResult] = useState(null);

    const handleFile = useCallback((file) => {
        setImage(file);
        setResult(null);
        const reader = new FileReader();
        reader.onload = (e) => {
            setPreview(e.target.result);
            const img = new Image();
            img.onload = () => {
                setOrigDims({ w: img.naturalWidth, h: img.naturalHeight });
                setWidth(img.naturalWidth);
                setHeight(img.naturalHeight);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }, []);

    const handleWidthChange = (val) => {
        const w = Number(val);
        setWidth(w);
        if (keepRatio && origDims.w) setHeight(Math.round((w / origDims.w) * origDims.h));
    };

    const handleHeightChange = (val) => {
        const h = Number(val);
        setHeight(h);
        if (keepRatio && origDims.h) setWidth(Math.round((h / origDims.h) * origDims.w));
    };

    const resize = () => {
        if (!preview) return;
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            setResult(canvas.toDataURL('image/png'));
        };
        img.src = preview;
    };

    const download = () => {
        const a = document.createElement('a');
        a.href = result;
        a.download = `resized-${width}x${height}.png`;
        a.click();
    };

    return (
        <ToolLayout toolSlug="image-resizer">
            <div className="space-y-6">
                <FileUploader accept="image/*" onFilesSelected={handleFile} label="Drop an image to resize" />

                {preview && (
                    <>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Width (px)</label>
                                <input type="number" value={width} onChange={(e) => handleWidthChange(e.target.value)} className="input-field" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Height (px)</label>
                                <input type="number" value={height} onChange={(e) => handleHeightChange(e.target.value)} className="input-field" />
                            </div>
                        </div>
                        <label className="flex items-center gap-2 text-sm text-surface-600 dark:text-surface-400">
                            <input type="checkbox" checked={keepRatio} onChange={(e) => setKeepRatio(e.target.checked)} className="accent-primary-500" />
                            Maintain aspect ratio
                        </label>
                        <p className="text-xs text-surface-400">Original: {origDims.w} × {origDims.h}</p>
                        <button onClick={resize} className="btn-primary w-full">📐 Resize Image</button>
                        {result && (
                            <>
                                <img src={result} alt="Resized" className="max-h-72 mx-auto rounded-xl" />
                                <button onClick={download} className="btn-primary w-full">⬇️ Download Resized Image</button>
                            </>
                        )}
                    </>
                )}
            </div>
        </ToolLayout>
    );
}
