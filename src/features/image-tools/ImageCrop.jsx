import { useState, useCallback, useRef, useEffect } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';
import FileUploader from '../../core/components/FileUploader';

export default function ImageCrop() {
    const [preview, setPreview] = useState('');
    const [cropX, setCropX] = useState(0);
    const [cropY, setCropY] = useState(0);
    const [cropW, setCropW] = useState(300);
    const [cropH, setCropH] = useState(300);
    const [origDims, setOrigDims] = useState({ w: 0, h: 0 });
    const [result, setResult] = useState(null);
    const [fileName, setFileName] = useState('');

    const handleFile = useCallback((file) => {
        setFileName(file.name.replace(/\.[^.]+$/, ''));
        setResult(null);
        const reader = new FileReader();
        reader.onload = (e) => {
            setPreview(e.target.result);
            const img = new Image();
            img.onload = () => {
                setOrigDims({ w: img.naturalWidth, h: img.naturalHeight });
                setCropW(Math.min(300, img.naturalWidth));
                setCropH(Math.min(300, img.naturalHeight));
                setCropX(0);
                setCropY(0);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }, []);

    const crop = () => {
        if (!preview) return;
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = cropW;
            canvas.height = cropH;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);
            setResult(canvas.toDataURL('image/png'));
        };
        img.src = preview;
    };

    const download = () => {
        const a = document.createElement('a');
        a.href = result;
        a.download = `cropped-${fileName}.png`;
        a.click();
    };

    return (
        <ToolLayout toolSlug="image-crop">
            <div className="space-y-6">
                <FileUploader accept="image/*" onFilesSelected={handleFile} label="Drop an image to crop" />

                {preview && (
                    <>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <div>
                                <label className="block text-xs font-medium text-surface-500 mb-1">X offset</label>
                                <input type="number" value={cropX} min={0} max={origDims.w - cropW} onChange={(e) => setCropX(Number(e.target.value))} className="input-field text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-surface-500 mb-1">Y offset</label>
                                <input type="number" value={cropY} min={0} max={origDims.h - cropH} onChange={(e) => setCropY(Number(e.target.value))} className="input-field text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-surface-500 mb-1">Width</label>
                                <input type="number" value={cropW} min={1} max={origDims.w} onChange={(e) => setCropW(Number(e.target.value))} className="input-field text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-surface-500 mb-1">Height</label>
                                <input type="number" value={cropH} min={1} max={origDims.h} onChange={(e) => setCropH(Number(e.target.value))} className="input-field text-sm" />
                            </div>
                        </div>
                        <p className="text-xs text-surface-400">Original size: {origDims.w} × {origDims.h}</p>
                        <button onClick={crop} className="btn-primary w-full">✂️ Crop Image</button>

                        <div className="text-center">
                            <img src={preview} alt="Original" className="max-h-48 mx-auto rounded-xl opacity-60" />
                        </div>

                        {result && (
                            <>
                                <div className="text-center">
                                    <p className="text-sm text-green-600 dark:text-green-400 font-medium mb-2">✅ Cropped to {cropW} × {cropH}</p>
                                    <img src={result} alt="Cropped" className="max-h-72 mx-auto rounded-xl" />
                                </div>
                                <button onClick={download} className="btn-primary w-full">⬇️ Download Cropped Image</button>
                            </>
                        )}
                    </>
                )}
            </div>
        </ToolLayout>
    );
}
