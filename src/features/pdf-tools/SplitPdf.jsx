import { useState, useCallback } from 'react';
import { PDFDocument } from 'pdf-lib';
import ToolLayout from '../../core/layouts/ToolLayout';
import FileUploader from '../../core/components/FileUploader';

export default function SplitPdf() {
    const [file, setFile] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [from, setFrom] = useState(1);
    const [to, setTo] = useState(1);
    const [result, setResult] = useState(null);
    const [processing, setProcessing] = useState(false);

    const handleFile = useCallback(async (f) => {
        setFile(f);
        setResult(null);
        const bytes = await f.arrayBuffer();
        const pdf = await PDFDocument.load(bytes);
        const count = pdf.getPageCount();
        setPageCount(count);
        setFrom(1);
        setTo(count);
    }, []);

    const split = async () => {
        if (!file) return;
        setProcessing(true);
        try {
            const bytes = await file.arrayBuffer();
            const srcPdf = await PDFDocument.load(bytes);
            const newPdf = await PDFDocument.create();
            const indices = [];
            for (let i = from - 1; i < Math.min(to, pageCount); i++) indices.push(i);
            const pages = await newPdf.copyPages(srcPdf, indices);
            pages.forEach(p => newPdf.addPage(p));
            const blob = new Blob([await newPdf.save()], { type: 'application/pdf' });
            setResult(URL.createObjectURL(blob));
        } catch (e) {
            alert('Error splitting PDF: ' + e.message);
        }
        setProcessing(false);
    };

    const download = () => {
        const a = document.createElement('a');
        a.href = result;
        a.download = `split-pages-${from}-${to}.pdf`;
        a.click();
    };

    return (
        <ToolLayout toolSlug="split-pdf">
            <div className="space-y-6">
                <FileUploader accept=".pdf" onFilesSelected={handleFile} label="Drop a PDF to split" />
                {file && (
                    <>
                        <p className="text-sm text-surface-500">Total pages: <strong className="text-surface-900 dark:text-white">{pageCount}</strong></p>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">From Page</label>
                                <input type="number" min={1} max={pageCount} value={from} onChange={(e) => setFrom(Number(e.target.value))} className="input-field" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">To Page</label>
                                <input type="number" min={from} max={pageCount} value={to} onChange={(e) => setTo(Number(e.target.value))} className="input-field" />
                            </div>
                        </div>
                        <button onClick={split} disabled={processing} className="btn-primary w-full">{processing ? 'Splitting...' : '✂️ Split PDF'}</button>
                        {result && <button onClick={download} className="btn-primary w-full">⬇️ Download Split PDF</button>}
                    </>
                )}
            </div>
        </ToolLayout>
    );
}
