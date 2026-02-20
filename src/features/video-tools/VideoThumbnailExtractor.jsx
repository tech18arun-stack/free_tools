import { useState, useCallback, useRef } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';
import FileUploader from '../../core/components/FileUploader';

export default function VideoThumbnailExtractor() {
    const [video, setVideo] = useState(null);
    const [preview, setPreview] = useState('');
    const [timestamp, setTimestamp] = useState(0);
    const [duration, setDuration] = useState(0);
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnails, setThumbnails] = useState([]);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const handleFile = useCallback((file) => {
        setVideo(file);
        setThumbnail(null);
        setThumbnails([]);
        const url = URL.createObjectURL(file);
        setPreview(url);
        setTimestamp(0);
        setDuration(0);
    }, []);

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
        }
    };

    const extractThumbnail = useCallback(() => {
        if (!videoRef.current || !canvasRef.current) return;
        
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        video.currentTime = timestamp;
        
        const handleSeeked = () => {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const thumbnailUrl = canvas.toDataURL('image/jpeg', 0.9);
            setThumbnail({
                url: thumbnailUrl,
                timestamp
            });
            video.removeEventListener('seeked', handleSeeked);
        };
        
        video.addEventListener('seeked', handleSeeked);
    }, [timestamp]);

    const extractMultiple = useCallback(() => {
        if (!videoRef.current || !canvasRef.current) return;
        
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        const intervals = [0.25, 0.5, 0.75];
        const newThumbnails = [];
        let completed = 0;
        
        intervals.forEach((ratio, index) => {
            const time = duration * ratio;
            video.currentTime = time;
            
            const handleSeeked = () => {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                const url = canvas.toDataURL('image/jpeg', 0.9);
                newThumbnails[index] = { url, timestamp: time };
                completed++;
                
                if (completed === intervals.length) {
                    setThumbnails(newThumbnails.filter(Boolean));
                }
                video.removeEventListener('seeked', handleSeeked);
            };
            
            video.addEventListener('seeked', handleSeeked);
        });
    }, [duration]);

    const downloadThumbnail = (thumb, index = '') => {
        const a = document.createElement('a');
        a.href = thumb.url;
        a.download = `thumbnail-${video.name.split('.')[0]}${index ? `-${index}` : ''}.jpg`;
        a.click();
    };

    const downloadAll = () => {
        thumbnails.forEach((thumb, index) => {
            setTimeout(() => downloadThumbnail(thumb, index + 1), index * 200);
        });
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <ToolLayout toolSlug="video-thumbnail-extractor">
            <div className="space-y-6">
                <canvas ref={canvasRef} className="hidden" />
                
                <FileUploader accept="video/*" onFilesSelected={handleFile} label="Drop a video to extract thumbnails" />

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
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                                        Timestamp: {formatTime(timestamp)}
                                    </label>
                                    <input
                                        type="range"
                                        min="0"
                                        max={duration}
                                        step="0.1"
                                        value={timestamp}
                                        onChange={(e) => setTimestamp(parseFloat(e.target.value))}
                                        className="w-full accent-primary-500"
                                    />
                                    <div className="flex justify-between text-xs text-surface-400 mt-1">
                                        <span>0:00</span>
                                        <span>Total: {formatTime(duration)}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <button onClick={extractThumbnail} className="btn-primary">
                                        🖼️ Extract Single Thumbnail
                                    </button>
                                    <button onClick={extractMultiple} className="px-6 py-3 bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 text-surface-900 dark:text-white rounded-xl font-semibold transition-colors">
                                        📸 Extract 3 Thumbnails
                                    </button>
                                </div>

                                {thumbnail && (
                                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                                        <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-3">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="font-semibold">Thumbnail Extracted!</span>
                                        </div>
                                        <img src={thumbnail.url} alt="Thumbnail" className="w-full rounded-lg mb-3" />
                                        <div className="text-sm text-green-700 dark:text-green-300 mb-3">
                                            Timestamp: {formatTime(thumbnail.timestamp)}
                                        </div>
                                        <button onClick={() => downloadThumbnail(thumbnail)} className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-colors">
                                            📥 Download Thumbnail
                                        </button>
                                    </div>
                                )}

                                {thumbnails.length > 0 && (
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-semibold text-surface-900 dark:text-white">
                                                Extracted Thumbnails ({thumbnails.length})
                                            </h3>
                                            <button
                                                onClick={downloadAll}
                                                className="text-sm font-medium text-accent-600 hover:text-accent-700"
                                            >
                                                Download All
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-3 gap-3">
                                            {thumbnails.map((thumb, index) => (
                                                <div key={index} className="space-y-2">
                                                    <img src={thumb.url} alt={`Thumbnail ${index + 1}`} className="w-full rounded-lg" />
                                                    <div className="text-xs text-center text-surface-500">
                                                        {formatTime(thumb.timestamp)}
                                                    </div>
                                                    <button
                                                        onClick={() => downloadThumbnail(thumb, index + 1)}
                                                        className="w-full py-2 text-sm bg-accent-600 hover:bg-accent-700 text-white rounded-lg transition-colors"
                                                    >
                                                        Download
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}

                <div className="mt-8">
                    <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">How to Extract Thumbnails</h3>
                    <ol className="space-y-3 text-surface-600 dark:text-surface-400">
                        <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 flex items-center justify-center text-sm font-semibold">1</span>
                            <span>Upload your video file</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 flex items-center justify-center text-sm font-semibold">2</span>
                            <span>Use the slider to select a timestamp or extract multiple thumbnails</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 flex items-center justify-center text-sm font-semibold">3</span>
                            <span>Download the extracted thumbnail images</span>
                        </li>
                    </ol>
                </div>
            </div>
        </ToolLayout>
    );
}
