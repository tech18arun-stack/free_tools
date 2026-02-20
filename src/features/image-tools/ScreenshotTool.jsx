import { useState, useRef, useCallback } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';

export default function ScreenshotTool() {
    const [captured, setCaptured] = useState(null);
    const [format, setFormat] = useState('image/png');
    const [quality, setQuality] = useState(0.92);
    const [countdown, setCountdown] = useState(0);
    const [isCapturing, setIsCapturing] = useState(false);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);

    const startCamera = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: { 
                    displaySurface: 'monitor',
                    cursor: 'always'
                },
                audio: false
            });
            
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                streamRef.current = stream;
                
                // Wait for video to be ready
                await new Promise((resolve) => {
                    videoRef.current.onloadedmetadata = () => {
                        videoRef.current.play();
                        resolve();
                    };
                });
            }
        } catch (err) {
            console.error('Error accessing screen:', err);
            alert('Failed to access screen. Please try again.');
        }
    }, []);

    const capture = useCallback(() => {
        if (!videoRef.current || !canvasRef.current) return;

        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const dataUrl = canvas.toDataURL(format, quality);
        setCaptured(dataUrl);

        // Stop the stream
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
        }
    }, [format, quality]);

    const captureWithCountdown = async (seconds) => {
        setCountdown(seconds);
        for (let i = seconds; i > 0; i--) {
            setCountdown(i);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        setCountdown(0);
        capture();
    };

    const download = () => {
        if (!captured) return;
        const link = document.createElement('a');
        link.download = `screenshot-${Date.now()}.${format === 'image/png' ? 'png' : 'jpg'}`;
        link.href = captured;
        link.click();
    };

    const copyToClipboard = async () => {
        if (!captured) return;
        try {
            const blob = await (await fetch(captured)).blob();
            await navigator.clipboard.write([
                new ClipboardItem({
                    [format]: blob
                })
            ]);
            alert('Screenshot copied to clipboard!');
        } catch (err) {
            alert('Failed to copy to clipboard. Try downloading instead.');
        }
    };

    const reset = () => {
        setCaptured(null);
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
        }
    };

    return (
        <ToolLayout toolSlug="screenshot-tool">
            <div className="space-y-6">
                {/* Instructions */}
                <div className="p-4 bg-accent-50 dark:bg-accent-900/20 border border-accent-200 dark:border-accent-800 rounded-xl">
                    <h3 className="font-semibold text-accent-900 dark:text-accent-300 mb-2">📸 How to Take a Screenshot</h3>
                    <ol className="space-y-1 text-sm text-accent-700 dark:text-accent-400">
                        <li>1. Click "Start Screen Capture" to select a screen or window</li>
                        <li>2. Choose a countdown timer (optional)</li>
                        <li>3. Click "Capture" to take the screenshot</li>
                        <li>4. Download or copy to clipboard</li>
                    </ol>
                </div>

                {/* Controls */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                        onClick={startCamera}
                        className="btn-primary py-4 text-lg"
                    >
                        🖥️ Start Screen Capture
                    </button>
                    <div className="flex items-center gap-2">
                        <label className="text-sm font-medium text-surface-700 dark:text-surface-300">Countdown:</label>
                        <select
                            value={countdown > 0 ? countdown : 0}
                            onChange={(e) => captureWithCountdown(Number(e.target.value))}
                            className="input-field flex-1"
                            disabled={!streamRef.current}
                        >
                            <option value={0}>No delay</option>
                            <option value={3}>3 seconds</option>
                            <option value={5}>5 seconds</option>
                            <option value={10}>10 seconds</option>
                        </select>
                    </div>
                    <button
                        onClick={capture}
                        className="btn-primary py-4 text-lg bg-green-600 hover:bg-green-700"
                        disabled={!streamRef.current}
                    >
                        📷 Capture {countdown > 0 ? `(${countdown}s)` : ''}
                    </button>
                </div>

                {/* Format Settings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                            Format
                        </label>
                        <select
                            value={format}
                            onChange={(e) => setFormat(e.target.value)}
                            className="input-field w-full"
                        >
                            <option value="image/png">PNG (Best quality)</option>
                            <option value="image/jpeg">JPEG (Smaller size)</option>
                            <option value="image/webp">WebP (Modern format)</option>
                        </select>
                    </div>
                    {format !== 'image/png' && (
                        <div>
                            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                                Quality: {Math.round(quality * 100)}%
                            </label>
                            <input
                                type="range"
                                min="0.1"
                                max="1"
                                step="0.05"
                                value={quality}
                                onChange={(e) => setQuality(Number(e.target.value))}
                                className="w-full accent-primary-500"
                            />
                        </div>
                    )}
                </div>

                {/* Video Preview (hidden but functional) */}
                <div className="relative">
                    <video
                        ref={videoRef}
                        className="w-full max-w-2xl mx-auto rounded-xl border border-surface-200 dark:border-surface-700 bg-surface-100 dark:bg-surface-800"
                        muted
                        playsInline
                    />
                    {countdown > 0 && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl">
                            <div className="text-8xl font-bold text-white animate-pulse">
                                {countdown}
                            </div>
                        </div>
                    )}
                </div>

                {/* Hidden Canvas */}
                <canvas ref={canvasRef} className="hidden" />

                {/* Captured Image */}
                {captured && (
                    <div className="space-y-4">
                        <div className="text-center">
                            <h3 className="font-semibold text-surface-900 dark:text-white mb-4">
                                📸 Screenshot Captured!
                            </h3>
                            <img
                                src={captured}
                                alt="Screenshot"
                                className="max-w-full mx-auto rounded-xl border border-surface-200 dark:border-surface-700 shadow-lg"
                            />
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <button onClick={download} className="btn-primary flex-1 py-4 text-lg">
                                📥 Download {format === 'image/png' ? 'PNG' : format === 'image/jpeg' ? 'JPG' : 'WebP'}
                            </button>
                            <button onClick={copyToClipboard} className="btn-secondary flex-1 py-4 text-lg">
                                📋 Copy to Clipboard
                            </button>
                            <button onClick={reset} className="btn-secondary px-6 py-4">
                                🔄 New Screenshot
                            </button>
                        </div>
                    </div>
                )}

                {/* Tips */}
                <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-xl">
                    <h3 className="font-semibold text-surface-900 dark:text-white mb-2">💡 Tips</h3>
                    <ul className="space-y-1 text-sm text-surface-600 dark:text-surface-400">
                        <li>• You can select an entire screen, specific window, or browser tab</li>
                        <li>• Use countdown timer to arrange your screen before capture</li>
                        <li>• PNG format provides best quality with larger file size</li>
                        <li>• JPEG format creates smaller files, good for sharing</li>
                        <li>• Your screen content never leaves your device - 100% private</li>
                    </ul>
                </div>
            </div>
        </ToolLayout>
    );
}
