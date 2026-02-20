import { useState, useCallback } from 'react';
import { PDFDocument, degrees } from 'pdf-lib';
import ToolLayout from '../../core/layouts/ToolLayout';
import FileUploader from '../../core/components/FileUploader';

export default function RotatePdf() {
    const [pdfFile, setPdfFile] = useState(null);
    const [rotation, setRotation] = useState(90);
    const [processing, setProcessing] = useState(false);
    const [progress, setProgress] = useState('');
    const [error, setError] = useState('');
    const [result, setResult] = useState(null);

    const handleFileSelect = useCallback((file) => {
        if (file && file.type === 'application/pdf') {
            setPdfFile(file);
            setError('');
            setResult(null);
        } else {
            setError('Please select a valid PDF file');
        }
    }, []);

    const rotatePdf = useCallback(async () => {
        if (!pdfFile) return;

        setProcessing(true);
        setError('');
        setProgress('Loading PDF...');

        try {
            const arrayBuffer = await pdfFile.arrayBuffer();
            setProgress('Rotating pages...');

            // Load the PDF
            const pdfDoc = await PDFDocument.load(arrayBuffer);
            const pages = pdfDoc.getPageCount();

            // Rotate each page
            for (let i = 0; i < pages; i++) {
                const page = pdfDoc.getPage(i);
                const currentRotation = page.getRotation().angle;
                page.setRotation(degrees(currentRotation + rotation));
            }

            setProgress('Saving PDF...');

            // Save the modified PDF
            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);

            setResult({
                url,
                filename: `rotated-${rotation}-${pdfFile.name}`,
                size: blob.size
            });

            setProgress('Rotation complete!');
        } catch (err) {
            console.error('Rotation error:', err);
            setError('Failed to rotate PDF. The file might be corrupted or password-protected.');
        } finally {
            setProcessing(false);
        }
    }, [pdfFile, rotation]);

    const download = () => {
        if (result?.url) {
            const link = document.createElement('a');
            link.href = result.url;
            link.download = result.filename;
            link.click();
        }
    };

    const reset = () => {
        setPdfFile(null);
        setResult(null);
        setError('');
        setProgress('');
    };

    return (
        <ToolLayout toolSlug="rotate-pdf">
            <div className="space-y-6">
                {/* Info Banner */}
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
                    <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                        🔄 PDF Rotator
                    </h3>
                    <p className="text-sm text-blue-700 dark:text-blue-400">
                        Rotate PDF pages by 90°, 180°, or 270°. Fix orientation of scanned documents instantly.
                    </p>
                </div>

                {/* File Upload */}
                {!result && (
                    <div>
                        <FileUploader
                            accept=".pdf,application/pdf"
                            maxFiles={1}
                            onFilesSelected={(files) => handleFileSelect(files[0])}
                            dragText="Drag & drop your PDF here"
                            browseText="Browse PDF"
                            maxSize={50}
                        />

                        {pdfFile && (
                            <div className="mt-4 p-4 bg-surface-50 dark:bg-surface-800 rounded-xl">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="text-3xl">📄</span>
                                        <div>
                                            <div className="font-medium text-surface-900 dark:text-white">
                                                {pdfFile.name}
                                            </div>
                                            <div className="text-sm text-surface-500">
                                                {(pdfFile.size / 1024 / 1024).toFixed(2)} MB
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={reset}
                                        className="text-sm text-red-500 hover:text-red-600"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Rotation Options */}
                {pdfFile && !result && (
                    <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-xl">
                        <h3 className="font-semibold text-surface-900 dark:text-white mb-3">
                            Rotation Angle
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {[
                                { value: 90, label: '90° Clockwise', icon: '↻' },
                                { value: 180, label: '180° Flip', icon: '⇄' },
                                { value: 270, label: '90° Counter-Clockwise', icon: '↺' },
                                { value: -90, label: '90° Left', icon: '↶' },
                            ].map(option => (
                                <button
                                    key={option.value}
                                    onClick={() => setRotation(option.value)}
                                    className={`p-4 rounded-xl border-2 transition-all ${
                                        rotation === option.value
                                            ? 'border-accent-500 bg-accent-50 dark:bg-accent-900/20'
                                            : 'border-surface-200 dark:border-surface-700 hover:border-accent-300'
                                    }`}
                                >
                                    <div className="text-3xl mb-2">{option.icon}</div>
                                    <div className="text-sm font-medium text-surface-900 dark:text-white">
                                        {option.label}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                        <p className="text-sm text-red-600 dark:text-red-400">❌ {error}</p>
                    </div>
                )}

                {/* Progress */}
                {processing && (
                    <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-xl">
                        <div className="flex items-center gap-3">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-accent-500"></div>
                            <span className="text-surface-700 dark:text-surface-300">{progress}</span>
                        </div>
                    </div>
                )}

                {/* Rotate Button */}
                {pdfFile && !result && !processing && (
                    <button
                        onClick={rotatePdf}
                        className="btn-primary w-full py-4 text-lg"
                    >
                        🔄 Rotate PDF ({rotation}°)
                    </button>
                )}

                {/* Result */}
                {result && (
                    <div className="space-y-4">
                        <div className="p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl text-center">
                            <div className="text-4xl mb-3">✅</div>
                            <h3 className="text-xl font-bold text-green-900 dark:text-green-300 mb-2">
                                Rotation Complete!
                            </h3>
                            <p className="text-sm text-green-700 dark:text-green-400 mb-4">
                                Rotated by {rotation}° - {result.filename}
                            </p>
                            <button
                                onClick={download}
                                className="btn-primary px-8 py-3"
                            >
                                📥 Download Rotated PDF
                            </button>
                        </div>
                        <button
                            onClick={reset}
                            className="btn-secondary w-full"
                        >
                            🔄 Rotate Another PDF
                        </button>
                    </div>
                )}

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { icon: '⚡', title: 'Fast', desc: 'Instant rotation' },
                        { icon: '🔒', title: 'Secure', desc: 'Local processing' },
                        { icon: '💯', title: 'Free', desc: 'No limits' },
                    ].map(feature => (
                        <div
                            key={feature.title}
                            className="p-4 bg-surface-50 dark:bg-surface-800 rounded-xl text-center"
                        >
                            <div className="text-2xl mb-2">{feature.icon}</div>
                            <div className="font-semibold text-surface-900 dark:text-white">
                                {feature.title}
                            </div>
                            <div className="text-sm text-surface-500">{feature.desc}</div>
                        </div>
                    ))}
                </div>

                {/* FAQ */}
                <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-xl">
                    <h3 className="font-semibold text-surface-900 dark:text-white mb-3">
                        ❓ How to rotate a PDF?
                    </h3>
                    <ol className="space-y-2 text-sm text-surface-600 dark:text-surface-400">
                        <li>1. Upload your PDF file</li>
                        <li>2. Select the rotation angle (90°, 180°, 270°)</li>
                        <li>3. Click "Rotate PDF" to apply the rotation</li>
                        <li>4. Download your rotated PDF</li>
                    </ol>
                </div>
            </div>
        </ToolLayout>
    );
}
