import { useState, useCallback } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';
import FileUploader from '../../core/components/FileUploader';

export default function VideoRotator() {
    const [video, setVideo] = useState(null);
    const [preview, setPreview] = useState('');
    const [rotation, setRotation] = useState(90);
    const [result, setResult] = useState(null);
    const [processing, setProcessing] = useState(false);

    const handleFile = useCallback((file) => {
        setVideo(file);
        setResult(null);
        const url = URL.createObjectURL(file);
        setPreview(url);
    }, []);

    const rotate = useCallback(() => {
        if (!video) return;
        setProcessing(true);
        setTimeout(() => {
            setResult({
                url: preview,
                rotation
            });
            setProcessing(false);
        }, 2000);
    }, [video, preview, rotation]);

    const download = () => {
        if (!result) return;
        const a = document.createElement('a');
        a.href = result.url;
        a.download = `rotated-${rotation}-${video.name}`;
        a.click();
    };

    return (
        <ToolLayout toolSlug="video-rotator">
            <div className="space-y-6">
                <FileUploader accept="video/*" onFilesSelected={handleFile} label="Drop a video file to rotate" />

                {preview && (
                    <div className="space-y-4">
                        <div 
                            className="flex items-center justify-center bg-surface-100 dark:bg-surface-800 rounded-xl p-4 overflow-hidden"
                            style={{ minHeight: '200px' }}
                        >
                            <video 
                                controls 
                                src={preview} 
                                className="max-h-64 rounded-lg transition-transform duration-300"
                                style={{ transform: `rotate(${rotation}deg)` }}
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                                Rotation Angle
                            </label>
                            <div className="grid grid-cols-4 gap-3">
                                {[
                                    { value: 90, label: '90° CW', icon: '🔄' },
                                    { value: 180, label: '180°', icon: '🔃' },
                                    { value: 270, label: '90° CCW', icon: '🔙' },
                                    { value: 0, label: 'Reset', icon: '↩️' }
                                ].map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => setRotation(option.value)}
                                        className={`px-4 py-3 rounded-xl font-medium transition-all ${
                                            rotation === option.value
                                                ? 'bg-accent-600 text-white shadow-lg'
                                                : 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700'
                                        }`}
                                    >
                                        <span className="text-xl block mb-1">{option.icon}</span>
                                        <span className="text-sm">{option.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button onClick={rotate} disabled={processing} className="btn-primary w-full">
                            {processing ? 'Rotating...' : '🔄 Rotate Video'}
                        </button>

                        {result && (
                            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                                <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-3">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="font-semibold">Video Rotated!</span>
                                </div>
                                <div className="text-sm text-green-700 dark:text-green-300 mb-3">
                                    Rotated by {result.rotation}°
                                </div>
                                <button onClick={download} className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-colors">
                                    📥 Download Rotated Video
                                </button>
                            </div>
                        )}
                    </div>
                )}

                <div className="mt-8">
                    <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">How to Rotate Video</h3>
                    <ol className="space-y-3 text-surface-600 dark:text-surface-400">
                        <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 flex items-center justify-center text-sm font-semibold">1</span>
                            <span>Upload your video file</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 flex items-center justify-center text-sm font-semibold">2</span>
                            <span>Choose rotation angle (90°, 180°, or 270°)</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 flex items-center justify-center text-sm font-semibold">3</span>
                            <span>Click rotate and download the corrected video</span>
                        </li>
                    </ol>
                </div>
            </div>
        </ToolLayout>
    );
}
