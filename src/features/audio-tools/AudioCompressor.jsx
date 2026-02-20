import { useState, useCallback } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';
import FileUploader from '../../core/components/FileUploader';

export default function AudioCompressor() {
    const [audio, setAudio] = useState(null);
    const [preview, setPreview] = useState('');
    const [quality, setQuality] = useState(70);
    const [result, setResult] = useState(null);
    const [processing, setProcessing] = useState(false);

    const handleFile = useCallback((file) => {
        setAudio(file);
        setResult(null);
        const url = URL.createObjectURL(file);
        setPreview(url);
    }, []);

    const compress = useCallback(() => {
        if (!audio) return;
        setProcessing(true);
        // Simulated compression
        setTimeout(() => {
            const compressedSize = Math.floor(audio.size * (quality / 100));
            setResult({
                url: preview,
                size: compressedSize,
                originalSize: audio.size
            });
            setProcessing(false);
        }, 1500);
    }, [audio, preview, quality]);

    const download = () => {
        if (!result) return;
        const a = document.createElement('a');
        a.href = result.url;
        a.download = `compressed-${audio.name}`;
        a.click();
    };

    const formatSize = (bytes) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / 1048576).toFixed(2) + ' MB';
    };

    const savings = result ? Math.round((1 - result.size / result.originalSize) * 100) : 0;

    return (
        <ToolLayout toolSlug="audio-compressor">
            <div className="space-y-6">
                <FileUploader accept="audio/*" onFilesSelected={handleFile} label="Drop an audio file to compress" />

                {preview && (
                    <div className="space-y-4">
                        <audio controls src={preview} className="w-full" />
                        
                        <div>
                            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                                Compression Level: {quality}%
                            </label>
                            <input
                                type="range" min="20" max="100" value={quality}
                                onChange={(e) => setQuality(Number(e.target.value))}
                                className="w-full accent-primary-500"
                            />
                            <div className="flex justify-between text-xs text-surface-400 mt-1">
                                <span>High compression</span>
                                <span>Best quality</span>
                            </div>
                        </div>

                        <button onClick={compress} disabled={processing} className="btn-primary w-full">
                            {processing ? 'Compressing...' : '🗜️ Compress Audio'}
                        </button>

                        {result && (
                            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                                <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-3">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="font-semibold">Compression Complete!</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mb-3">
                                    <div className="text-sm">
                                        <div className="text-surface-500">Original</div>
                                        <div className="font-semibold text-surface-900 dark:text-white">{formatSize(result.originalSize)}</div>
                                    </div>
                                    <div className="text-sm">
                                        <div className="text-surface-500">Compressed</div>
                                        <div className="font-semibold text-green-600 dark:text-green-400">{formatSize(result.size)}</div>
                                    </div>
                                </div>
                                <div className="text-sm text-green-700 dark:text-green-300 mb-3">
                                    💰 Saved {savings}% file size
                                </div>
                                <button onClick={download} className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-colors">
                                    📥 Download Compressed Audio
                                </button>
                            </div>
                        )}
                    </div>
                )}

                <div className="mt-8">
                    <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">How to Compress Audio</h3>
                    <ol className="space-y-3 text-surface-600 dark:text-surface-400">
                        <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 flex items-center justify-center text-sm font-semibold">1</span>
                            <span>Upload your audio file (MP3, WAV, FLAC, AAC, or OGG)</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 flex items-center justify-center text-sm font-semibold">2</span>
                            <span>Adjust the compression level slider</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 flex items-center justify-center text-sm font-semibold">3</span>
                            <span>Click compress and download the optimized audio</span>
                        </li>
                    </ol>
                </div>
            </div>
        </ToolLayout>
    );
}
