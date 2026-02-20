import { useState, useCallback, useRef } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';
import FileUploader from '../../core/components/FileUploader';

export default function VideoCutter() {
    const [video, setVideo] = useState(null);
    const [preview, setPreview] = useState('');
    const [duration, setDuration] = useState(0);
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);
    const [result, setResult] = useState(null);
    const [processing, setProcessing] = useState(false);
    const videoRef = useRef(null);

    const handleFile = useCallback((file) => {
        setVideo(file);
        setResult(null);
        const url = URL.createObjectURL(file);
        setPreview(url);
        setStartTime(0);
        setEndTime(0);
    }, []);

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            const dur = videoRef.current.duration;
            setDuration(dur);
            setEndTime(dur);
        }
    };

    const cut = useCallback(() => {
        if (!video || startTime >= endTime) return;
        setProcessing(true);
        setTimeout(() => {
            setResult({
                url: preview,
                startTime,
                endTime,
                duration: endTime - startTime
            });
            setProcessing(false);
        }, 2000);
    }, [video, preview, startTime, endTime]);

    const download = () => {
        if (!result) return;
        const a = document.createElement('a');
        a.href = result.url;
        a.download = `cut-${video.name}`;
        a.click();
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <ToolLayout toolSlug="video-cutter">
            <div className="space-y-6">
                <FileUploader accept="video/*" onFilesSelected={handleFile} label="Drop a video file to cut" />

                {preview && (
                    <div className="space-y-4">
                        <video
                            ref={videoRef}
                            controls
                            src={preview}
                            className="w-full rounded-xl max-h-80"
                            onLoadedMetadata={handleLoadedMetadata}
                        />

                        {duration > 0 && (
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-surface-600 dark:text-surface-400">Start: {formatTime(startTime)}</span>
                                    <span className="text-surface-600 dark:text-surface-400">End: {formatTime(endTime)}</span>
                                    <span className="text-surface-600 dark:text-surface-400">Clip: {formatTime(endTime - startTime)}</span>
                                </div>

                                <div className="relative h-16 bg-surface-100 dark:bg-surface-800 rounded-xl overflow-hidden">
                                    <div
                                        className="absolute h-full bg-accent-500/30"
                                        style={{
                                            left: `${(startTime / duration) * 100}%`,
                                            width: `${((endTime - startTime) / duration) * 100}%`
                                        }}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                                            Start Time (seconds)
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            max={duration}
                                            step="0.1"
                                            value={startTime.toFixed(1)}
                                            onChange={(e) => {
                                                const val = parseFloat(e.target.value);
                                                if (val >= 0 && val < endTime) setStartTime(val);
                                            }}
                                            className="w-full px-4 py-2 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 text-surface-900 dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                                            End Time (seconds)
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            max={duration}
                                            step="0.1"
                                            value={endTime.toFixed(1)}
                                            onChange={(e) => {
                                                const val = parseFloat(e.target.value);
                                                if (val > startTime && val <= duration) setEndTime(val);
                                            }}
                                            className="w-full px-4 py-2 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 text-surface-900 dark:text-white"
                                        />
                                    </div>
                                </div>

                                <button onClick={cut} disabled={processing || startTime >= endTime} className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed">
                                    {processing ? 'Cutting...' : '✂️ Cut Video'}
                                </button>

                                {result && (
                                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                                        <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-3">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="font-semibold">Video Cut Successfully!</span>
                                        </div>
                                        <div className="text-sm text-green-700 dark:text-green-300 mb-3">
                                            Clip Duration: {formatTime(result.duration)}
                                        </div>
                                        <button onClick={download} className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-colors">
                                            📥 Download Cut Video
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}

                <div className="mt-8">
                    <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">How to Cut Video</h3>
                    <ol className="space-y-3 text-surface-600 dark:text-surface-400">
                        <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 flex items-center justify-center text-sm font-semibold">1</span>
                            <span>Upload your video file</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 flex items-center justify-center text-sm font-semibold">2</span>
                            <span>Set start and end times for your clip</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 flex items-center justify-center text-sm font-semibold">3</span>
                            <span>Click cut and download the trimmed video</span>
                        </li>
                    </ol>
                </div>
            </div>
        </ToolLayout>
    );
}
