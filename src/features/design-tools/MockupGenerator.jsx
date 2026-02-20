import { useState, useRef } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';
import FileUploader from '../../core/components/FileUploader';

export default function MockupGenerator() {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState('');
    const [device, setDevice] = useState('iphone');
    const canvasRef = useRef(null);

    const handleFile = (file) => {
        setImage(file);
        const url = URL.createObjectURL(file);
        setPreview(url);
    };

    const devices = {
        iphone: { name: 'iPhone', width: 300, height: 600 },
        ipad: { name: 'iPad', width: 500, height: 650 },
        laptop: { name: 'Laptop', width: 600, height: 400 },
        desktop: { name: 'Desktop', width: 700, height: 450 },
    };

    const download = () => {
        if (!canvasRef.current || !preview) return;
        const link = document.createElement('a');
        link.download = `mockup-${device}-${Date.now()}.png`;
        link.href = canvasRef.current.toDataURL();
        link.click();
    };

    return (
        <ToolLayout toolSlug="mockup-generator">
            <div className="space-y-6">
                <FileUploader accept="image/*" onFilesSelected={handleFile} label="Upload your screenshot/design" />

                {preview && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Device Frame</label>
                            <div className="grid grid-cols-4 gap-3">
                                {Object.entries(devices).map(([key, device]) => (
                                    <button
                                        key={key}
                                        onClick={() => setDevice(key)}
                                        className={`p-4 rounded-xl border-2 transition-colors ${
                                            device === key
                                                ? 'border-accent-600 bg-accent-50 dark:bg-accent-900/20'
                                                : 'border-surface-200 dark:border-surface-700 hover:border-accent-300'
                                        }`}
                                    >
                                        <div className="text-2xl mb-1">
                                            {key === 'iphone' && '📱'}
                                            {key === 'ipad' && '📲'}
                                            {key === 'laptop' && '💻'}
                                            {key === 'desktop' && '🖥️'}
                                        </div>
                                        <div className="text-sm font-medium">{device.name}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center justify-center p-8 bg-surface-50 dark:bg-surface-800 rounded-xl">
                            <canvas ref={canvasRef} className="max-w-full" />
                        </div>

                        <button onClick={download} className="btn-primary w-full">
                            📥 Download Mockup
                        </button>
                    </div>
                )}

                <div className="mt-8">
                    <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">How to Create Mockups</h3>
                    <ol className="space-y-3 text-surface-600 dark:text-surface-400">
                        <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 flex items-center justify-center text-sm font-semibold">1</span>
                            <span>Upload your screenshot or design</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 flex items-center justify-center text-sm font-semibold">2</span>
                            <span>Choose a device frame (iPhone, iPad, Laptop, Desktop)</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 flex items-center justify-center text-sm font-semibold">3</span>
                            <span>Download your professional mockup</span>
                        </li>
                    </ol>
                </div>
            </div>
        </ToolLayout>
    );
}
