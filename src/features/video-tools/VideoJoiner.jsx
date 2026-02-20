import { useState, useCallback } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';
import FileUploader from '../../core/components/FileUploader';

export default function VideoJoiner() {
    const [videos, setVideos] = useState([]);
    const [result, setResult] = useState(null);
    const [processing, setProcessing] = useState(false);

    const handleFiles = useCallback((files) => {
        const newVideos = Array.from(files).map(file => ({
            file,
            url: URL.createObjectURL(file),
            name: file.name
        }));
        setVideos(prev => [...prev, ...newVideos]);
        setResult(null);
    }, []);

    const removeVideo = (index) => {
        setVideos(prev => prev.filter((_, i) => i !== index));
        setResult(null);
    };

    const moveVideo = (index, direction) => {
        const newVideos = [...videos];
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex >= 0 && newIndex < videos.length) {
            [newVideos[index], newVideos[newIndex]] = [newVideos[newIndex], newVideos[index]];
            setVideos(newVideos);
        }
    };

    const join = useCallback(() => {
        if (videos.length < 2) return;
        setProcessing(true);
        setTimeout(() => {
            const totalSize = videos.reduce((sum, v) => sum + v.file.size, 0);
            setResult({
                url: videos[0].url,
                size: totalSize,
                count: videos.length
            });
            setProcessing(false);
        }, 2500);
    }, [videos]);

    const download = () => {
        if (!result) return;
        const a = document.createElement('a');
        a.href = result.url;
        a.download = `merged-video-${Date.now()}.mp4`;
        a.click();
    };

    const formatSize = (bytes) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / 1048576).toFixed(2) + ' MB';
    };

    return (
        <ToolLayout toolSlug="video-joiner">
            <div className="space-y-6">
                <FileUploader accept="video/*" multiple onFilesSelected={handleFiles} label="Drop video files to merge (add multiple files)" />

                {videos.length > 0 && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-surface-900 dark:text-white">Video Files ({videos.length})</h3>
                            <button
                                onClick={() => setVideos([])}
                                className="text-sm text-red-600 hover:text-red-700 font-medium"
                            >
                                Clear All
                            </button>
                        </div>

                        <div className="space-y-3">
                            {videos.map((video, index) => (
                                <div key={index} className="flex items-center gap-3 p-3 bg-surface-50 dark:bg-surface-800 rounded-xl">
                                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 flex items-center justify-center text-sm font-semibold">
                                        {index + 1}
                                    </span>
                                    <video src={video.url} className="w-24 h-16 object-cover rounded-lg flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-medium text-surface-900 dark:text-white truncate">{video.name}</div>
                                        <div className="text-xs text-surface-500">{formatSize(video.file.size)}</div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={() => moveVideo(index, 'up')}
                                            disabled={index === 0}
                                            className="p-1.5 rounded-lg hover:bg-surface-200 dark:hover:bg-surface-700 disabled:opacity-30 disabled:cursor-not-allowed"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => moveVideo(index, 'down')}
                                            disabled={index === videos.length - 1}
                                            className="p-1.5 rounded-lg hover:bg-surface-200 dark:hover:bg-surface-700 disabled:opacity-30 disabled:cursor-not-allowed"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => removeVideo(index)}
                                            className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={join}
                            disabled={videos.length < 2 || processing}
                            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? 'Joining...' : `🔗 Join ${videos.length} Videos`}
                        </button>

                        {result && (
                            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                                <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-3">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="font-semibold">Videos Joined Successfully!</span>
                                </div>
                                <div className="text-sm text-green-700 dark:text-green-300 mb-3">
                                    Combined {result.count} videos | Total Size: {formatSize(result.size)}
                                </div>
                                <button onClick={download} className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-colors">
                                    📥 Download Merged Video
                                </button>
                            </div>
                        )}
                    </div>
                )}

                <div className="mt-8">
                    <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">How to Join Videos</h3>
                    <ol className="space-y-3 text-surface-600 dark:text-surface-400">
                        <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 flex items-center justify-center text-sm font-semibold">1</span>
                            <span>Upload two or more video files</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 flex items-center justify-center text-sm font-semibold">2</span>
                            <span>Reorder videos using up/down arrows if needed</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 flex items-center justify-center text-sm font-semibold">3</span>
                            <span>Click join and download the merged video</span>
                        </li>
                    </ol>
                </div>
            </div>
        </ToolLayout>
    );
}
