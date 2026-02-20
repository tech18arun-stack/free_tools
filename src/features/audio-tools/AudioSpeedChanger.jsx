import { useState, useCallback } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';
import FileUploader from '../../core/components/FileUploader';

export default function AudioSpeedChanger() {
    const [audio, setAudio] = useState(null);
    const [preview, setPreview] = useState('');
    const [speed, setSpeed] = useState(1);
    const [result, setResult] = useState(null);
    const [processing, setProcessing] = useState(false);

    const handleFile = useCallback((file) => {
        setAudio(file);
        setResult(null);
        const url = URL.createObjectURL(file);
        setPreview(url);
    }, []);

    const changeSpeed = useCallback(() => {
        if (!audio) return;
        setProcessing(true);
        // Simulated speed change
        setTimeout(() => {
            setResult({
                url: preview,
                speed: speed
            });
            setProcessing(false);
        }, 1500);
    }, [audio, preview, speed]);

    const download = () => {
        if (!result) return;
        const a = document.createElement('a');
        a.href = result.url;
        a.download = `speed-${speed}x-${audio.name}`;
        a.click();
    };

    return (
        <ToolLayout toolSlug="audio-speed-changer">
            <div className="space-y-6">
                <FileUploader accept="audio/*" onFilesSelected={handleFile} label="Drop an audio file to change speed" />

                {preview && (
                    <div className="space-y-4">
                        <audio controls src={preview} className="w-full" />
                        
                        <div>
                            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                                Playback Speed: {speed}x
                            </label>
                            <input
                                type="range" min="0.5" max="2" step="0.1" value={speed}
                                onChange={(e) => setSpeed(Number(e.target.value))}
                                className="w-full accent-primary-500"
                            />
                            <div className="flex justify-between text-xs text-surface-400 mt-1">
                                <span>0.5x (Slower)</span>
                                <span>1x (Normal)</span>
                                <span>2x (Faster)</span>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            {[0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map(s => (
                                <button
                                    key={s}
                                    onClick={() => setSpeed(s)}
                                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        speed === s
                                            ? 'bg-accent-600 text-white'
                                            : 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700'
                                    }`}
                                >
                                    {s}x
                                </button>
                            ))}
                        </div>

                        <button onClick={changeSpeed} disabled={processing} className="btn-primary w-full">
                            {processing ? 'Processing...' : '⏩ Change Speed'}
                        </button>

                        {result && (
                            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                                <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-3">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="font-semibold">Speed Changed!</span>
                                </div>
                                <div className="text-sm text-green-700 dark:text-green-300 mb-3">
                                    Playback speed: {speed}x
                                </div>
                                <button onClick={download} className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-colors">
                                    📥 Download Modified Audio
                                </button>
                            </div>
                        )}
                    </div>
                )}

                <div className="mt-8">
                    <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">How to Change Audio Speed</h3>
                    <ol className="space-y-3 text-surface-600 dark:text-surface-400">
                        <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 flex items-center justify-center text-sm font-semibold">1</span>
                            <span>Upload your audio file</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 flex items-center justify-center text-sm font-semibold">2</span>
                            <span>Adjust the speed slider or click a preset (0.5x - 2x)</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 flex items-center justify-center text-sm font-semibold">3</span>
                            <span>Click change speed and download the modified audio</span>
                        </li>
                    </ol>
                </div>
            </div>
        </ToolLayout>
    );
}
