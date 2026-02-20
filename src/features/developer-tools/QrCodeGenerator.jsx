import { useState, useCallback } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';

export default function QrCodeGenerator() {
    const [text, setText] = useState('https://freetools.com');
    const [size, setSize] = useState(300);
    const [fgColor, setFgColor] = useState('#000000');
    const [bgColor, setBgColor] = useState('#ffffff');
    const [qrUrl, setQrUrl] = useState('');

    const generate = useCallback(() => {
        if (!text.trim()) return;
        const encoded = encodeURIComponent(text.trim());
        setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&color=${fgColor.replace('#', '')}&bgcolor=${bgColor.replace('#', '')}&data=${encoded}`);
    }, [text, size, fgColor, bgColor]);

    const download = () => {
        if (!qrUrl) return;
        fetch(qrUrl)
            .then(res => res.blob())
            .then(blob => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `qrcode-${Date.now()}.png`;
                a.click();
                URL.revokeObjectURL(url);
            });
    };

    return (
        <ToolLayout toolSlug="qr-code-generator">
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Content / URL
                    </label>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Enter URL, text, email, phone number, etc."
                        className="input-field font-mono text-sm h-24"
                    />
                    <p className="text-xs text-surface-500 mt-1">Supports: URLs, plain text, email addresses, phone numbers, WiFi credentials</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                            Size: {size}px
                        </label>
                        <input
                            type="range"
                            min="100"
                            max="1000"
                            step="50"
                            value={size}
                            onChange={(e) => setSize(Number(e.target.value))}
                            className="w-full accent-primary-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                            Foreground Color
                        </label>
                        <div className="flex items-center gap-2">
                            <input
                                type="color"
                                value={fgColor}
                                onChange={(e) => setFgColor(e.target.value)}
                                className="w-12 h-10 rounded-lg cursor-pointer border border-surface-300 dark:border-surface-600"
                            />
                            <input
                                type="text"
                                value={fgColor}
                                onChange={(e) => setFgColor(e.target.value)}
                                className="input-field flex-1 font-mono text-sm"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                            Background Color
                        </label>
                        <div className="flex items-center gap-2">
                            <input
                                type="color"
                                value={bgColor}
                                onChange={(e) => setBgColor(e.target.value)}
                                className="w-12 h-10 rounded-lg cursor-pointer border border-surface-300 dark:border-surface-600"
                            />
                            <input
                                type="text"
                                value={bgColor}
                                onChange={(e) => setBgColor(e.target.value)}
                                className="input-field flex-1 font-mono text-sm"
                            />
                        </div>
                    </div>
                </div>

                <button onClick={generate} className="btn-primary w-full text-lg py-4">
                    🔲 Generate QR Code
                </button>

                {qrUrl && (
                    <div className="space-y-4">
                        <div className="flex flex-col items-center p-8 bg-white dark:bg-surface-800 rounded-2xl border border-surface-200 dark:border-surface-700">
                            <img src={qrUrl} alt="QR Code" className="max-w-full h-auto" style={{ maxWidth: size }} />
                        </div>
                        <div className="flex gap-3">
                            <button onClick={download} className="btn-primary flex-1">
                                📥 Download PNG
                            </button>
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(qrUrl);
                                }}
                                className="btn-secondary flex-1"
                            >
                                📋 Copy Image URL
                            </button>
                        </div>
                    </div>
                )}

                <div className="mt-8 p-6 bg-surface-50 dark:bg-surface-800 rounded-xl">
                    <h3 className="font-semibold text-surface-900 dark:text-white mb-3">💡 QR Code Tips</h3>
                    <ul className="space-y-2 text-sm text-surface-600 dark:text-surface-400">
                        <li>• <strong>URLs:</strong> Enter full URL with https://</li>
                        <li>• <strong>Email:</strong> Use format: mailto:email@example.com</li>
                        <li>• <strong>Phone:</strong> Use format: tel:+1234567890</li>
                        <li>• <strong>WiFi:</strong> Use format: WIFI:T:WPA;S:NetworkName;P:Password;;</li>
                        <li>• <strong>Text:</strong> Just type your message</li>
                    </ul>
                </div>
            </div>
        </ToolLayout>
    );
}
