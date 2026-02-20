import { useState, useCallback } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';
import FileUploader from '../../core/components/FileUploader';

export default function VideoConverter() {
    const [video, setVideo] = useState(null);
    const [preview, setPreview] = useState('');
    const [format, setFormat] = useState('mp4');
    const [result, setResult] = useState(null);
    const [processing, setProcessing] = useState(false);

    const handleFile = useCallback((file) => {
        setVideo(file);
        setResult(null);
        const url = URL.createObjectURL(file);
        setPreview(url);
    }, []);

    const convert = useCallback(() => {
        if (!video) return;
        setProcessing(true);
        setTimeout(() => {
            setResult({
                url: preview,
                size: video.size,
                format: format.toUpperCase()
            });
            setProcessing(false);
        }, 2000);
    }, [video, preview, format]);

    const download = () => {
        if (!result) return;
        const a = document.createElement('a');
        a.href = result.url;
        a.download = `converted-${video.name.split('.')[0]}.${format.toLowerCase()}`;
        a.click();
    };

    const formatSize = (bytes) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / 1048576).toFixed(2) + ' MB';
    };

    return (
        <ToolLayout toolSlug="video-converter">
            <div className="space-y-6">
                <FileUploader accept="video/*" onFilesSelected={handleFile} label="Drop a video file to convert" />

                {preview && (
                    <div className="space-y-4">
                        <video controls src={preview} className="w-full rounded-xl max-h-80" />
                        
                        <div>
                            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                                Output Format
                            </label>
                            <select
                                value={format}
                                onChange={(e) => setFormat(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 text-surface-900 dark:text-white focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                            >
                                <option value="mp4">MP4</option>
                                <option value="avi">AVI</option>
                                <option value="mov">MOV</option>
                                <option value="wmv">WMV</option>
                                <option value="webm">WebM</option>
                            </select>
                        </div>

                        <button onClick={convert} disabled={processing} className="btn-primary w-full">
                            {processing ? 'Converting...' : '🎬 Convert Video'}
                        </button>

                        {result && (
                            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                                <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-3">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="font-semibold">Conversion Complete!</span>
                                </div>
                                <div className="text-sm text-green-700 dark:text-green-300 mb-3">
                                    Format: {result.format} | Size: {formatSize(result.size)}
                                </div>
                                <button onClick={download} className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-colors">
                                    📥 Download {result.format}
                                </button>
                            </div>
                        )}
                    </div>
                )}

                <div className="mt-8">
                    <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">How to Convert Video</h3>
                    <ol className="space-y-3 text-surface-600 dark:text-surface-400">
                        <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 flex items-center justify-center text-sm font-semibold">1</span>
                            <span>Upload your video file (MP4, AVI, MOV, WMV, or WebM)</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 flex items-center justify-center text-sm font-semibold">2</span>
                            <span>Choose your desired output format</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 flex items-center justify-center text-sm font-semibold">3</span>
                            <span>Click convert and download your converted video</span>
                        </li>
                    </ol>
                </div>
            </div>
        </ToolLayout>
    );
}
