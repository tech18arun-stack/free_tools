import { useState, useCallback } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';
import FileUploader from '../../core/components/FileUploader';

export default function JpgToPng() {
    const [preview, setPreview] = useState('');
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
                const canvas = document.createElement('canvas');
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                setResult(canvas.toDataURL('image/png'));
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }, []);

    const download = () => {
        const a = document.createElement('a');
        a.href = result;
        a.download = `${fileName}.png`;
        a.click();
    };

    return (
        <ToolLayout toolSlug="jpg-to-png">
            <div className="space-y-6">
                <FileUploader accept="image/jpeg,image/jpg" onFilesSelected={handleFile} label="Drop a JPG image to convert to PNG" />
                {result && (
                    <>
                        <div className="text-center">
                            <p className="text-sm text-green-600 dark:text-green-400 font-medium mb-2">✅ Converted to PNG</p>
                            <img src={result} alt="Converted" className="max-h-72 mx-auto rounded-xl" />
                        </div>
                        <button onClick={download} className="btn-primary w-full">⬇️ Download PNG</button>
                    </>
                )}
            </div>
        </ToolLayout>
    );
}
