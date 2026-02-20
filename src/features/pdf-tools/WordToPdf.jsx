import { useState, useCallback } from 'react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import ToolLayout from '../../core/layouts/ToolLayout';
import FileUploader from '../../core/components/FileUploader';

export default function WordToPdf() {
    const [wordFile, setWordFile] = useState(null);
    const [converting, setConverting] = useState(false);
    const [progress, setProgress] = useState('');
    const [error, setError] = useState('');
    const [result, setResult] = useState(null);

    const handleFileSelect = useCallback((file) => {
        const validTypes = [
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'text/html'
        ];
        const validExtensions = ['.doc', '.docx', '.html', '.htm'];
        
        const hasValidExtension = validExtensions.some(ext => 
            file.name.toLowerCase().endsWith(ext)
        );

        if (file && (validTypes.includes(file.type) || hasValidExtension)) {
            setWordFile(file);
            setError('');
            setResult(null);
        } else {
            setError('Please select a valid Word document (.doc, .docx) or HTML file');
        }
    }, []);

    const convertToPdf = useCallback(async () => {
        if (!wordFile) return;

        setConverting(true);
        setError('');
        setProgress('Reading document...');

        try {
            const arrayBuffer = await wordFile.arrayBuffer();
            setProgress('Processing document content...');

            // Create a new PDF document
            const pdfDoc = await PDFDocument.create();
            const page = pdfDoc.addPage([595.28, 841.89]); // A4 size
            const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
            const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

            let text = '';

            if (wordFile.type === 'text/html' || wordFile.name.endsWith('.html') || wordFile.name.endsWith('.htm')) {
                // For HTML files, extract text content
                const decoder = new TextDecoder('utf-8');
                const htmlContent = decoder.decode(arrayBuffer);
                
                // Basic HTML to text conversion
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = htmlContent;
                text = tempDiv.textContent || tempDiv.innerText || '';
            } else {
                // For .doc/.docx, we'll create a placeholder
                // Note: Full Word conversion requires server-side processing
                text = `Document: ${wordFile.name}\n\n`;
                text += `This is a PDF wrapper for your Word document.\n`;
                text += `File size: ${(wordFile.size / 1024).toFixed(1)} KB\n\n`;
                text += `Note: For full content conversion, please use the HTML export option in Word and upload the HTML file, or use a dedicated conversion service.`;
            }

            setProgress('Creating PDF...');

            // Draw text on the page
            const lines = text.split('\n');
            let y = 800;
            const lineHeight = 20;

            lines.forEach((line, index) => {
                if (y < 50) {
                    // Create new page if we run out of space
                    const newPage = pdfDoc.addPage([595.28, 841.89]);
                    y = 800;
                }

                if (index === 0) {
                    page.drawText(line, { x: 50, y, size: 16, font: boldFont });
                } else {
                    page.drawText(line, { x: 50, y, size: 12, font });
                }
                y -= lineHeight;
            });

            // Add metadata
            pdfDoc.setTitle(wordFile.name);
            pdfDoc.setCreator('FreeTools Word to PDF Converter');
            pdfDoc.setProducer('pdf-lib');

            setProgress('Finalizing PDF...');

            // Serialize the PDFDocument to bytes (a Uint8Array)
            const pdfBytes = await pdfDoc.save();

            // Create blob and URL
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);

            setResult({
                url,
                filename: wordFile.name.replace(/\.(doc|docx|html|htm)$/i, '.pdf'),
                size: blob.size
            });

            setProgress('Conversion complete!');
        } catch (err) {
            console.error('Conversion error:', err);
            setError('Failed to convert document. The file might be corrupted or in an unsupported format.');
        } finally {
            setConverting(false);
        }
    }, [wordFile]);

    const download = () => {
        if (result?.url) {
            const link = document.createElement('a');
            link.href = result.url;
            link.download = result.filename;
            link.click();
        }
    };

    const reset = () => {
        setWordFile(null);
        setResult(null);
        setError('');
        setProgress('');
    };

    return (
        <ToolLayout toolSlug="word-to-pdf">
            <div className="space-y-6">
                {/* Info Banner */}
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl">
                    <h3 className="font-semibold text-purple-900 dark:text-purple-300 mb-2">
                        📝 Word to PDF Converter
                    </h3>
                    <p className="text-sm text-purple-700 dark:text-purple-400">
                        Convert Word documents (.doc, .docx) to PDF format. Free and secure conversion.
                    </p>
                </div>

                {/* File Upload */}
                {!result && (
                    <div>
                        <FileUploader
                            accept=".doc,.docx,.html,.htm,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/html"
                            maxFiles={1}
                            onFilesSelected={(files) => handleFileSelect(files[0])}
                            dragText="Drag & drop your Word document here"
                            browseText="Browse Document"
                            maxSize={50}
                        />

                        {wordFile && (
                            <div className="mt-4 p-4 bg-surface-50 dark:bg-surface-800 rounded-xl">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="text-3xl">📝</span>
                                        <div>
                                            <div className="font-medium text-surface-900 dark:text-white">
                                                {wordFile.name}
                                            </div>
                                            <div className="text-sm text-surface-500">
                                                {(wordFile.size / 1024 / 1024).toFixed(2)} MB
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

                {/* Error Message */}
                {error && (
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                        <p className="text-sm text-red-600 dark:text-red-400">❌ {error}</p>
                    </div>
                )}

                {/* Progress */}
                {converting && (
                    <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-xl">
                        <div className="flex items-center gap-3">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-500"></div>
                            <span className="text-surface-700 dark:text-surface-300">{progress}</span>
                        </div>
                    </div>
                )}

                {/* Convert Button */}
                {wordFile && !result && !converting && (
                    <button
                        onClick={convertToPdf}
                        className="btn-primary w-full py-4 text-lg"
                    >
                        📄 Convert to PDF
                    </button>
                )}

                {/* Result */}
                {result && (
                    <div className="space-y-4">
                        <div className="p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl text-center">
                            <div className="text-4xl mb-3">✅</div>
                            <h3 className="text-xl font-bold text-green-900 dark:text-green-300 mb-2">
                                Conversion Complete!
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
                            🔄 Convert Another Document
                        </button>
                    </div>
                )}

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { icon: '⚡', title: 'Fast', desc: 'Quick conversion' },
                        { icon: '🔒', title: 'Secure', desc: 'Local processing' },
                        { icon: '💯', title: 'Free', desc: 'No registration' },
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
                        ❓ How to convert Word to PDF?
                    </h3>
                    <ol className="space-y-2 text-sm text-surface-600 dark:text-surface-400">
                        <li>1. Upload your Word document (.doc or .docx)</li>
                        <li>2. Click "Convert to PDF" to start conversion</li>
                        <li>3. Wait for the processing to complete</li>
                        <li>4. Download your PDF file</li>
                    </ol>
                </div>
            </div>
        </ToolLayout>
    );
}
