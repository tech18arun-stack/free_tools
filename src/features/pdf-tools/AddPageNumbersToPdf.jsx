import { useState, useCallback } from 'react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import ToolLayout from '../../core/layouts/ToolLayout';
import FileUploader from '../../core/components/FileUploader';

export default function AddPageNumbersToPdf() {
    const [pdfFile, setPdfFile] = useState(null);
    const [options, setOptions] = useState({
        position: 'bottom-center',
        fontSize: 12,
        startNumber: 1,
        format: '{n}',
        margin: 30,
    });
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

    const addPageNumbers = useCallback(async () => {
        if (!pdfFile) return;

        setProcessing(true);
        setError('');
        setProgress('Loading PDF...');

        try {
            const arrayBuffer = await pdfFile.arrayBuffer();
            setProgress('Adding page numbers...');

            // Load the PDF
            const pdfDoc = await PDFDocument.load(arrayBuffer);
            const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
            const pages = pdfDoc.getPageCount();

            const { position, fontSize, startNumber, format, margin } = options;

            // Replace placeholders in format
            const getPageNumberText = (pageNum) => {
                return format
                    .replace('{n}', pageNum.toString())
                    .replace('{N}', pages.toString())
                    .replace('{first}', (startNumber).toString())
                    .replace('{last}', (startNumber + pages - 1).toString());
            };

            for (let i = 0; i < pages; i++) {
                const page = pdfDoc.getPage(i);
                const { width, height } = page.getSize();
                const pageNum = startNumber + i;
                const text = getPageNumberText(pageNum);
                const textWidth = font.widthOfTextAtText(text, fontSize);

                let x, y;

                // Calculate position
                switch (position) {
                    case 'top-left':
                        x = margin;
                        y = height - margin;
                        break;
                    case 'top-center':
                        x = (width - textWidth) / 2;
                        y = height - margin;
                        break;
                    case 'top-right':
                        x = width - margin - textWidth;
                        y = height - margin;
                        break;
                    case 'bottom-left':
                        x = margin;
                        y = margin;
                        break;
                    case 'bottom-center':
                        x = (width - textWidth) / 2;
                        y = margin;
                        break;
                    case 'bottom-right':
                        x = width - margin - textWidth;
                        y = margin;
                        break;
                    default:
                        x = (width - textWidth) / 2;
                        y = margin;
                }

                page.drawText(text, {
                    x,
                    y,
                    size: fontSize,
                    font,
                    color: rgb(0, 0, 0),
                });
            }

            setProgress('Saving PDF...');

            // Save the modified PDF
            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);

            setResult({
                url,
                filename: `numbered-${pdfFile.name}`,
                size: blob.size
            });

            setProgress('Page numbers added!');
        } catch (err) {
            console.error('Error adding page numbers:', err);
            setError('Failed to add page numbers. The file might be corrupted.');
        } finally {
            setProcessing(false);
        }
    }, [pdfFile, options]);

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
        <ToolLayout toolSlug="add-page-numbers-to-pdf">
            <div className="space-y-6">
                {/* Info Banner */}
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-xl">
                    <h3 className="font-semibold text-indigo-900 dark:text-indigo-300 mb-2">
                        📄 PDF Page Numberer
                    </h3>
                    <p className="text-sm text-indigo-700 dark:text-indigo-400">
                        Add page numbers to your PDF documents. Customize position, format, and starting number.
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

                {/* Options */}
                {pdfFile && !result && (
                    <div className="space-y-4">
                        {/* Position */}
                        <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-xl">
                            <h3 className="font-semibold text-surface-900 dark:text-white mb-3">
                                Position
                            </h3>
                            <div className="grid grid-cols-3 gap-2">
                                {[
                                    { value: 'top-left', label: '↖ Top Left' },
                                    { value: 'top-center', label: '↑ Top Center' },
                                    { value: 'top-right', label: '↗ Top Right' },
                                    { value: 'bottom-left', label: '↙ Bottom Left' },
                                    { value: 'bottom-center', label: '↓ Bottom Center' },
                                    { value: 'bottom-right', label: '↘ Bottom Right' },
                                ].map(pos => (
                                    <button
                                        key={pos.value}
                                        onClick={() => setOptions({ ...options, position: pos.value })}
                                        className={`p-2 rounded-lg text-sm font-medium transition-all ${
                                            options.position === pos.value
                                                ? 'bg-accent-500 text-white'
                                                : 'bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 hover:bg-accent-100 dark:hover:bg-accent-900/30'
                                        }`}
                                    >
                                        {pos.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Format */}
                        <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-xl">
                            <h3 className="font-semibold text-surface-900 dark:text-white mb-3">
                                Number Format
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
                                {[
                                    { value: '{n}', label: '1, 2, 3...' },
                                    { value: 'Page {n}', label: 'Page 1, Page 2...' },
                                    { value: '{n} / {N}', label: '1 / 10, 2 / 10...' },
                                    { value: '- {n} -', label: '- 1 -, - 2 -' },
                                ].map(fmt => (
                                    <button
                                        key={fmt.value}
                                        onClick={() => setOptions({ ...options, format: fmt.value })}
                                        className={`p-2 rounded-lg text-sm transition-all ${
                                            options.format === fmt.value
                                                ? 'bg-accent-500 text-white'
                                                : 'bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 hover:bg-accent-100'
                                        }`}
                                    >
                                        {fmt.label}
                                    </button>
                                ))}
                            </div>
                            <input
                                type="text"
                                value={options.format}
                                onChange={(e) => setOptions({ ...options, format: e.target.value })}
                                placeholder="Custom format (use {n} for current, {N} for total)"
                                className="input-field text-sm"
                            />
                        </div>

                        {/* Start Number & Font Size */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-xl">
                                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                                    Start Number
                                </label>
                                <input
                                    type="number"
                                    value={options.startNumber}
                                    onChange={(e) => setOptions({ ...options, startNumber: parseInt(e.target.value) || 1 })}
                                    className="input-field"
                                    min="0"
                                />
                            </div>
                            <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-xl">
                                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                                    Font Size: {options.fontSize}px
                                </label>
                                <input
                                    type="range"
                                    min="8"
                                    max="24"
                                    value={options.fontSize}
                                    onChange={(e) => setOptions({ ...options, fontSize: parseInt(e.target.value) })}
                                    className="w-full accent-accent-500"
                                />
                            </div>
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

                {/* Add Numbers Button */}
                {pdfFile && !result && !processing && (
                    <button
                        onClick={addPageNumbers}
                        className="btn-primary w-full py-4 text-lg"
                    >
                        📄 Add Page Numbers
                    </button>
                )}

                {/* Result */}
                {result && (
                    <div className="space-y-4">
                        <div className="p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl text-center">
                            <div className="text-4xl mb-3">✅</div>
                            <h3 className="text-xl font-bold text-green-900 dark:text-green-300 mb-2">
                                Complete!
                            </h3>
                            <p className="text-sm text-green-700 dark:text-green-400 mb-4">
                                {result.filename} ({(result.size / 1024).toFixed(1)} KB)
                            </p>
                            <button
                                onClick={download}
                                className="btn-primary px-8 py-3"
                            >
                                📥 Download PDF
                            </button>
                        </div>
                        <button
                            onClick={reset}
                            className="btn-secondary w-full"
                        >
                            🔄 Process Another PDF
                        </button>
                    </div>
                )}

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { icon: '📍', title: 'Custom Position', desc: '6 positions' },
                        { icon: '🔢', title: 'Custom Format', desc: 'Flexible numbering' },
                        { icon: '🔒', title: 'Secure', desc: 'Local processing' },
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
            </div>
        </ToolLayout>
    );
}
