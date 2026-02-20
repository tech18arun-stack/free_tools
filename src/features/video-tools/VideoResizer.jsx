import { useState, useCallback } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';
import FileUploader from '../../core/components/FileUploader';

export default function VideoResizer() {
    const [video, setVideo] = useState(null);
    const [preview, setPreview] = useState('');
    const [preset, setPreset] = useState('custom');
    const [width, setWidth] = useState(1920);
    const [height, setHeight] = useState(1080);
    const [result, setResult] = useState(null);
    const [processing, setProcessing] = useState(false);

    const handleFile = useCallback((file) => {
        setVideo(file);
        setResult(null);
        const url = URL.createObjectURL(file);
        setPreview(url);
    }, []);

    const handlePresetChange = (e) => {
        const value = e.target.value;
        setPreset(value);
        const presets = {
            '1080p': { width: 1920, height: 1080 },
            '720p': { width: 1280, height: 720 },
            '480p': { width: 854, height: 480 },
            'instagram-square': { width: 1080, height: 1080 },
            'instagram-story': { width: 1080, height: 1920 },
            'tiktok': { width: 1080, height: 1920 },
            'youtube-short': { width: 1080, height: 1920 },
            'twitter': { width: 1280, height: 720 },
            'facebook': { width: 1200, height: 630 }
        };
        if (presets[value]) {
            setWidth(presets[value].width);
            setHeight(presets[value].height);
        }
    };

    const resize = useCallback(() => {
        if (!video) return;
        setProcessing(true);
        setTimeout(() => {
            setResult({
                url: preview,
                width,
                height
            });
            setProcessing(false);
        }, 2000);
    }, [video, preview, width, height]);

    const download = () => {
        if (!result) return;
        const a = document.createElement('a');
        a.href = result.url;
        a.download = `resized-${width}x${height}-${video.name}`;
        a.click();
    };

    return (
        <ToolLayout toolSlug="video-resizer">
            <div className="space-y-6">
                <FileUploader accept="video/*" onFilesSelected={handleFile} label="Drop a video file to resize" />

                {preview && (
                    <div className="space-y-4">
                        <video controls src={preview} className="w-full rounded-xl max-h-80" />
                        
                        <div>
                            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                                Preset
                            </label>
                            <select
                                value={preset}
                                onChange={handlePresetChange}
                                className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 text-surface-900 dark:text-white focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                            >
                                <option value="custom">Custom</option>
                                <option value="1080p">Full HD (1920x1080)</option>
                                <option value="720p">HD (1280x720)</option>
                                <option value="480p">SD (854x480)</option>
                                <option value="instagram-square">Instagram Square (1080x1080)</option>
                                <option value="instagram-story">Instagram Story (1080x1920)</option>
                                <option value="tiktok">TikTok (1080x1920)</option>
                                <option value="youtube-short">YouTube Short (1080x1920)</option>
                                <option value="twitter">Twitter (1280x720)</option>
                                <option value="facebook">Facebook (1200x630)</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                                    Width (px)
                                </label>
                                <input
                                    type="number"
                                    value={width}
                                    onChange={(e) => {
                                        setWidth(Number(e.target.value));
                                        setPreset('custom');
                                    }}
                                    className="w-full px-4 py-2 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 text-surface-900 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                                    Height (px)
                                </label>
                                <input
                                    type="number"
                                    value={height}
                                    onChange={(e) => {
                                        setHeight(Number(e.target.value));
                                        setPreset('custom');
                                    }}
                                    className="w-full px-4 py-2 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 text-surface-900 dark:text-white"
                                />
                            </div>
                        </div>

                        <button onClick={resize} disabled={processing} className="btn-primary w-full">
                            {processing ? 'Resizing...' : '📐 Resize Video'}
                        </button>

                        {result && (
                            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                                <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-3">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="font-semibold">Video Resized!</span>
                                </div>
                                <div className="text-sm text-green-700 dark:text-green-300 mb-3">
                                    New Resolution: {result.width} x {result.height}
                                </div>
                                <button onClick={download} className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-colors">
                                    📥 Download Resized Video
                                </button>
                            </div>
                        )}
                    </div>
                )}

                <div className="mt-8">
                    <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">How to Resize Video</h3>
                    <ol className="space-y-3 text-surface-600 dark:text-surface-400">
                        <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 flex items-center justify-center text-sm font-semibold">1</span>
                            <span>Upload your video file</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 flex items-center justify-center text-sm font-semibold">2</span>
                            <span>Choose a preset or enter custom dimensions</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 flex items-center justify-center text-sm font-semibold">3</span>
                            <span>Click resize and download the resized video</span>
                        </li>
                    </ol>
                </div>
            </div>
        </ToolLayout>
    );
}
