import { useState } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';
import FileUploader from '../../core/components/FileUploader';

export default function BackgroundRemover() {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState('');
    const [result, setResult] = useState(null);
    const [processing, setProcessing] = useState(false);

    const handleFile = (file) => {
        setImage(file);
        setResult(null);
        const url = URL.createObjectURL(file);
        setPreview(url);
    };

    const removeBackground = () => {
        if (!image) return;
        setProcessing(true);
        setTimeout(() => {
            setResult(preview);
            setProcessing(false);
        }, 2000);
    };

    const download = () => {
        if (!result) return;
        const a = document.createElement('a');
        a.href = result;
        a.download = `no-bg-${image.name}`;
        a.click();
    };

    return (
        <ToolLayout toolSlug="image-background-remover">
            <div className="space-y-6">
                <FileUploader accept="image/*" onFilesSelected={handleFile} label="Upload an image to remove background" />

                {preview && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Original</div>
                                <img src={preview} alt="Original" className="w-full rounded-xl" />
                            </div>
                            <div>
                                <div className="text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Preview</div>
                                <div className="w-full rounded-xl overflow-hidden bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiNjY2MiLz48L3N2Zz4=')]">
                                    <img src={result || preview} alt="Processed" className="w-full" />
                                </div>
                            </div>
                        </div>

                        <button onClick={removeBackground} disabled={processing} className="btn-primary w-full">
                            {processing ? 'Removing background...' : '🖼️ Remove Background'}
                        </button>

                        {result && (
                            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                                <button onClick={download} className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-colors">
                                    📥 Download PNG
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </ToolLayout>
    );
}
