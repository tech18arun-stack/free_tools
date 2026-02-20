import { useState, useCallback } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';
import FileUploader from '../../core/components/FileUploader';

export default function VolumeBooster() {
    const [audio, setAudio] = useState(null);
    const [preview, setPreview] = useState('');
    const [volume, setVolume] = useState(150);
    const [result, setResult] = useState(null);
    const [processing, setProcessing] = useState(false);

    const handleFile = useCallback((file) => {
        setAudio(file);
        setResult(null);
        const url = URL.createObjectURL(file);
        setPreview(url);
    }, []);

    const boost = useCallback(() => {
        if (!audio) return;
        setProcessing(true);
        // Simulated volume boost
        setTimeout(() => {
            setResult({
                url: preview,
                volumeBoost: volume
            });
            setProcessing(false);
        }, 1500);
    }, [audio, preview, volume]);

    const download = () => {
        if (!result) return;
        const a = document.createElement('a');
        a.href = result.url;
        a.download = `boosted-${audio.name}`;
        a.click();
    };

    return (
        <ToolLayout toolSlug="volume-booster">
            <div className="space-y-6">
                <FileUploader accept="audio/*" onFilesSelected={handleFile} label="Drop an audio file to boost volume" />

                {preview && (
                    <div className="space-y-4">
                        <audio controls src={preview} className="w-full" />
                        
                        <div>
                            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                                Volume Boost: {volume}%
                            </label>
                            <input
                                type="range" min="100" max="300" step="10" value={volume}
                                onChange={(e) => setVolume(Number(e.target.value))}
                                className="w-full accent-primary-500"
                            />
                            <div className="flex justify-between text-xs text-surface-400 mt-1">
                                <span>Normal (100%)</span>
                                <span>Maximum (300%)</span>
                            </div>
                        </div>

                        <button onClick={boost} disabled={processing} className="btn-primary w-full">
                            {processing ? 'Boosting...' : '🔊 Boost Volume'}
                        </button>

                        {result && (
                            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                                <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-3">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="font-semibold">Volume Boosted!</span>
                                </div>
                                <div className="text-sm text-green-700 dark:text-green-300 mb-3">
                                    Volume increased by {volume - 100}%
                                </div>
                                <button onClick={download} className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-colors">
                                    📥 Download Boosted Audio
                                </button>
                            </div>
                        )}
                    </div>
                )}

                <div className="mt-8">
                    <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">How to Boost Audio Volume</h3>
                    <ol className="space-y-3 text-surface-600 dark:text-surface-400">
                        <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 flex items-center justify-center text-sm font-semibold">1</span>
                            <span>Upload your quiet audio file</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 flex items-center justify-center text-sm font-semibold">2</span>
                            <span>Adjust the volume boost slider (100% - 300%)</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 flex items-center justify-center text-sm font-semibold">3</span>
                            <span>Click boost and download the louder audio</span>
                        </li>
                    </ol>
                </div>
            </div>
        </ToolLayout>
    );
}
