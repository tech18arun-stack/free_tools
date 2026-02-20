import { useState } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';
import FileUploader from '../../core/components/FileUploader';

export default function FaviconGenerator() {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState('');
    const [sizes] = useState([16, 32, 48, 64, 128, 256]);
    const [generated, setGenerated] = useState(false);

    const handleFile = (file) => {
        setImage(file);
        const url = URL.createObjectURL(file);
        setPreview(url);
        setGenerated(false);
    };

    const generate = () => {
        if (!image) return;
        setGenerated(true);
    };

    const download = () => {
        if (!preview) return;
        const a = document.createElement('a');
        a.href = preview;
        a.download = 'favicon.ico';
        a.click();
    };

    const getHtmlCode = () => {
        return sizes.map(size => 
            `<link rel="icon" type="image/png" sizes="${size}x${size}" href="/favicon-${size}x${size}.png">`
        ).join('\n');
    };

    return (
        <ToolLayout toolSlug="favicon-generator">
            <div className="space-y-6">
                <FileUploader accept="image/*" onFilesSelected={handleFile} label="Upload your logo/image" />

                {preview && (
                    <div className="space-y-4">
                        <div className="flex justify-center">
                            <img src={preview} alt="Preview" className="w-32 h-32 rounded-xl" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-3">Generated Sizes</label>
                            <div className="flex flex-wrap gap-3">
                                {sizes.map(size => (
                                    <div key={size} className="flex items-center gap-2 px-3 py-2 bg-surface-100 dark:bg-surface-800 rounded-lg">
                                        <div 
                                            className="border border-surface-200 dark:border-surface-700"
                                            style={{ width: size, height: size }}
                                        >
                                            <img src={preview} alt={`${size}px`} className="w-full h-full" />
                                        </div>
                                        <span className="text-sm font-medium">{size}px</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button onClick={generate} className="btn-primary w-full">
                            🔖 Generate Favicon
                        </button>

                        {generated && (
                            <div className="space-y-4">
                                <button onClick={download} className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-colors">
                                    📥 Download Favicon
                                </button>

                                <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-xl">
                                    <div className="text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">HTML Code</div>
                                    <code className="text-xs font-mono text-surface-600 dark:text-surface-400 whitespace-pre-wrap">
                                        {getHtmlCode()}
                                    </code>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </ToolLayout>
    );
}
