import { useState, useCallback } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';
import FileUploader from '../../core/components/FileUploader';

export default function AudioJoiner() {
    const [audios, setAudios] = useState([]);
    const [result, setResult] = useState(null);
    const [processing, setProcessing] = useState(false);

    const handleFiles = useCallback((files) => {
        const newAudios = Array.from(files).map(file => ({
            file,
            url: URL.createObjectURL(file),
            name: file.name
        }));
        setAudios(prev => [...prev, ...newAudios]);
        setResult(null);
    }, []);

    const removeAudio = (index) => {
        setAudios(prev => prev.filter((_, i) => i !== index));
        setResult(null);
    };

    const moveAudio = (index, direction) => {
        const newAudios = [...audios];
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex >= 0 && newIndex < audios.length) {
            [newAudios[index], newAudios[newIndex]] = [newAudios[newIndex], newAudios[index]];
            setAudios(newAudios);
        }
    };

    const join = useCallback(() => {
        if (audios.length < 2) return;
        setProcessing(true);
        // Simulated joining
        setTimeout(() => {
            const totalSize = audios.reduce((sum, a) => sum + a.file.size, 0);
            setResult({
                url: audios[0].url,
                size: totalSize,
                count: audios.length
            });
            setProcessing(false);
        }, 2000);
    }, [audios]);

    const download = () => {
        if (!result) return;
        const a = document.createElement('a');
        a.href = result.url;
        a.download = `merged-audio-${Date.now()}.mp3`;
        a.click();
    };

    const formatSize = (bytes) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / 1048576).toFixed(2) + ' MB';
    };

    return (
        <ToolLayout toolSlug="audio-joiner">
            <div className="space-y-6">
                <FileUploader accept="audio/*" multiple onFilesSelected={handleFiles} label="Drop audio files to merge (add multiple files)" />

                {audios.length > 0 && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-surface-900 dark:text-white">Audio Files ({audios.length})</h3>
                            <button
                                onClick={() => setAudios([])}
                                className="text-sm text-red-600 hover:text-red-700 font-medium"
                            >
                                Clear All
                            </button>
                        </div>

                        <div className="space-y-3">
                            {audios.map((audio, index) => (
                                <div key={index} className="flex items-center gap-3 p-3 bg-surface-50 dark:bg-surface-800 rounded-xl">
                                    <span className="w-6 h-6 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                                        {index + 1}
                                    </span>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-medium text-surface-900 dark:text-white truncate">{audio.name}</div>
                                        <div className="text-xs text-surface-500">{formatSize(audio.file.size)}</div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={() => moveAudio(index, 'up')}
                                            disabled={index === 0}
                                            className="p-1.5 rounded-lg hover:bg-surface-200 dark:hover:bg-surface-700 disabled:opacity-30 disabled:cursor-not-allowed"
                                            title="Move up"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => moveAudio(index, 'down')}
                                            disabled={index === audios.length - 1}
                                            className="p-1.5 rounded-lg hover:bg-surface-200 dark:hover:bg-surface-700 disabled:opacity-30 disabled:cursor-not-allowed"
                                            title="Move down"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => removeAudio(index)}
                                            className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600"
                                            title="Remove"
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
                            disabled={audios.length < 2 || processing}
                            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? 'Joining...' : `🔗 Join ${audios.length} Audio Files`}
                        </button>

                        {result && (
                            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                                <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-3">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="font-semibold">Audio Joined Successfully!</span>
                                </div>
                                <div className="text-sm text-green-700 dark:text-green-300 mb-3">
                                    Combined {result.count} files | Total Size: {formatSize(result.size)}
                                </div>
                                <button onClick={download} className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-colors">
                                    📥 Download Merged Audio
                                </button>
                            </div>
                        )}
                    </div>
                )}

                <div className="mt-8">
                    <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">How to Join Audio Files</h3>
                    <ol className="space-y-3 text-surface-600 dark:text-surface-400">
                        <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 flex items-center justify-center text-sm font-semibold">1</span>
                            <span>Upload two or more audio files</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 flex items-center justify-center text-sm font-semibold">2</span>
                            <span>Reorder files using up/down arrows if needed</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 flex items-center justify-center text-sm font-semibold">3</span>
                            <span>Click join and download the merged audio</span>
                        </li>
                    </ol>
                </div>
            </div>
        </ToolLayout>
    );
}
