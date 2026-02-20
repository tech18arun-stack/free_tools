import { useState, useCallback } from 'react';
import { PDFDocument } from 'pdf-lib';
import ToolLayout from '../../core/layouts/ToolLayout';
import FileUploader from '../../core/components/FileUploader';

export default function PdfPageExtractor() {
    const [file, setFile] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [pagesInput, setPagesInput] = useState('');
    const [result, setResult] = useState(null);
    const [processing, setProcessing] = useState(false);

    const handleFile = useCallback(async (f) => {
        setFile(f);
        setResult(null);
        const bytes = await f.arrayBuffer();
        const pdf = await PDFDocument.load(bytes);
        setPageCount(pdf.getPageCount());
        setPagesInput('1');
    }, []);

    const extract = async () => {
        if (!file || !pagesInput.trim()) return;
        setProcessing(true);
        try {
            const bytes = await file.arrayBuffer();
            const srcPdf = await PDFDocument.load(bytes);
            const newPdf = await PDFDocument.create();
            const indices = pagesInput.split(',').map(s => parseInt(s.trim()) - 1).filter(n => n >= 0 && n < pageCount);
            if (indices.length === 0) { alert('No valid pages specified'); setProcessing(false); return; }
            const pages = await newPdf.copyPages(srcPdf, indices);
            pages.forEach(p => newPdf.addPage(p));
            const blob = new Blob([await newPdf.save()], { type: 'application/pdf' });
            setResult(URL.createObjectURL(blob));
        } catch (e) {
            alert('Error extracting pages: ' + e.message);
        }
        setProcessing(false);
    };

    const download = () => {
        const a = document.createElement('a');
        a.href = result;
        a.download = 'extracted-pages.pdf';
        a.click();
    };

    return (
        <ToolLayout toolSlug="pdf-page-extractor">
            <div className="space-y-6">
                <FileUploader accept=".pdf" onFilesSelected={handleFile} label="Drop a PDF to extract pages from" />
                {file && (
                    <>
                        <p className="text-sm text-surface-500">Total pages: <strong className="text-surface-900 dark:text-white">{pageCount}</strong></p>
                        <div>
                            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Pages to extract (comma separated)</label>
                            <input type="text" value={pagesInput} onChange={(e) => setPagesInput(e.target.value)} placeholder="e.g. 1, 3, 5, 7" className="input-field" />
                            <p className="text-xs text-surface-400 mt-1">Enter page numbers separated by commas</p>
                        </div>
                        <button onClick={extract} disabled={processing} className="btn-primary w-full">{processing ? 'Extracting...' : '📄 Extract Pages'}</button>
                        {result && <button onClick={download} className="btn-primary w-full">⬇️ Download Extracted PDF</button>}
                    </>
                )}
            </div>
        </ToolLayout>
    );
}
