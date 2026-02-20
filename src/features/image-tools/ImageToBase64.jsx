import { useState, useCallback } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';
import FileUploader from '../../core/components/FileUploader';

export default function ImageToBase64() {
    const [result, setResult] = useState('');
    const [preview, setPreview] = useState('');
    const [copied, setCopied] = useState(false);

    const handleFile = useCallback((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            setResult(e.target.result);
            setPreview(e.target.result);
        };
        reader.readAsDataURL(file);
    }, []);

    const copy = () => {
        navigator.clipboard.writeText(result);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <ToolLayout toolSlug="image-to-base64">
            <div className="space-y-6">
                <FileUploader accept="image/*" onFilesSelected={handleFile} label="Drop an image to convert to Base64" />
                {preview && <img src={preview} alt="Preview" className="max-h-48 mx-auto rounded-xl" />}
                {result && (
                    <>
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-sm font-medium text-surface-700 dark:text-surface-300">Base64 Output</label>
                                <button onClick={copy} className="text-xs btn-secondary px-3 py-1">{copied ? '✅ Copied!' : '📋 Copy'}</button>
                            </div>
                            <textarea value={result} readOnly className="tool-result h-40 resize-none" />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-surface-700 dark:text-surface-300 block mb-2">HTML Embed Code</label>
                            <textarea value={`<img src="${result}" alt="image" />`} readOnly className="tool-result h-16 resize-none text-xs" />
                        </div>
                    </>
                )}
            </div>
        </ToolLayout>
    );
}
