import { useState, useCallback } from 'react';
import { PDFDocument } from 'pdf-lib';
import ToolLayout from '../../core/layouts/ToolLayout';
import FileUploader from '../../core/components/FileUploader';

export default function CompressPdf() {
    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);
    const [processing, setProcessing] = useState(false);

    const handleFile = useCallback((f) => { setFile(f); setResult(null); }, []);

    const compress = async () => {
        if (!file) return;
        setProcessing(true);
        try {
            const bytes = await file.arrayBuffer();
            const pdf = await PDFDocument.load(bytes);
            const compressed = await pdf.save({ useObjectStreams: false });
            const blob = new Blob([compressed], { type: 'application/pdf' });
            setResult({ url: URL.createObjectURL(blob), size: blob.size, originalSize: file.size });
        } catch (e) {
            alert('Error compressing PDF: ' + e.message);
        }
        setProcessing(false);
    };

    const download = () => {
        const a = document.createElement('a');
        a.href = result.url;
        a.download = `compressed-${file.name}`;
        a.click();
    };

    const fmt = (b) => b < 1048576 ? (b / 1024).toFixed(1) + ' KB' : (b / 1048576).toFixed(2) + ' MB';

    return (
        <ToolLayout toolSlug="compress-pdf">
            <div className="space-y-6">
                <FileUploader accept=".pdf" onFilesSelected={handleFile} label="Drop a PDF to compress" />
                {file && (
                    <>
                        <p className="text-sm text-surface-500">File: <strong>{file.name}</strong> ({fmt(file.size)})</p>
                        <button onClick={compress} disabled={processing} className="btn-primary w-full">{processing ? 'Compressing...' : '📦 Compress PDF'}</button>
                    </>
                )}
                {result && (
                    <div className="space-y-4">
                        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl text-center">
                            <p className="text-green-700 dark:text-green-400 font-medium">
                                ✅ {fmt(result.originalSize)} → {fmt(result.size)} ({((1 - result.size / result.originalSize) * 100).toFixed(1)}% reduction)
                            </p>
                        </div>
                        <button onClick={download} className="btn-primary w-full">⬇️ Download Compressed PDF</button>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
}
