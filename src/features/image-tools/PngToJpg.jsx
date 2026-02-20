import { useState, useCallback } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';
import FileUploader from '../../core/components/FileUploader';

export default function PngToJpg() {
    const [result, setResult] = useState(null);
    const [fileName, setFileName] = useState('');
    const [quality, setQuality] = useState(90);

    const handleFile = useCallback((file) => {
        setFileName(file.name.replace(/\.[^.]+$/, ''));
        setResult(null);
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                const ctx = canvas.getContext('2d');
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0);
                setResult(canvas.toDataURL('image/jpeg', quality / 100));
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }, [quality]);

    const download = () => {
        const a = document.createElement('a');
        a.href = result;
        a.download = `${fileName}.jpg`;
        a.click();
    };

    return (
        <ToolLayout toolSlug="png-to-jpg">
            <div className="space-y-6">
                <FileUploader accept="image/png" onFilesSelected={handleFile} label="Drop a PNG image to convert to JPG" />
                <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Quality: {quality}%</label>
                    <input type="range" min="10" max="100" value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-full accent-primary-500" />
                </div>
                {result && (
                    <>
                        <div className="text-center">
                            <p className="text-sm text-green-600 dark:text-green-400 font-medium mb-2">✅ Converted to JPG (white background applied)</p>
                            <img src={result} alt="Converted" className="max-h-72 mx-auto rounded-xl" />
                        </div>
                        <button onClick={download} className="btn-primary w-full">⬇️ Download JPG</button>
                    </>
                )}
            </div>
        </ToolLayout>
    );
}
