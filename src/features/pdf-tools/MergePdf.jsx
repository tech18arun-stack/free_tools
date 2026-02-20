import { useState, useCallback } from 'react';
import { PDFDocument } from 'pdf-lib';
import ToolLayout from '../../core/layouts/ToolLayout';
import FileUploader from '../../core/components/FileUploader';

export default function MergePdf() {
    const [files, setFiles] = useState([]);
    const [result, setResult] = useState(null);
    const [processing, setProcessing] = useState(false);

    const handleFiles = useCallback((fileList) => {
        setFiles(prev => [...prev, ...(Array.isArray(fileList) ? fileList : [fileList])]);
        setResult(null);
    }, []);

    const removeFile = (i) => setFiles(prev => prev.filter((_, idx) => idx !== i));

    const merge = async () => {
        if (files.length < 2) return;
        setProcessing(true);
        try {
            const merged = await PDFDocument.create();
            for (const file of files) {
                const bytes = await file.arrayBuffer();
                const pdf = await PDFDocument.load(bytes);
                const pages = await merged.copyPages(pdf, pdf.getPageIndices());
                pages.forEach(p => merged.addPage(p));
            }
            const blob = new Blob([await merged.save()], { type: 'application/pdf' });
            setResult(URL.createObjectURL(blob));
        } catch (e) {
            alert('Error merging PDFs: ' + e.message);
        }
        setProcessing(false);
    };

    const download = () => {
        const a = document.createElement('a');
        a.href = result;
        a.download = 'merged.pdf';
        a.click();
    };

    return (
        <ToolLayout toolSlug="merge-pdf">
            <div className="space-y-6">
                <FileUploader accept=".pdf" multiple onFilesSelected={handleFiles} label="Drop PDF files to merge (select multiple)" />
                {files.length > 0 && (
                    <div className="space-y-2">
                        <p className="text-sm font-medium text-surface-700 dark:text-surface-300">{files.length} file(s) selected:</p>
                        {files.map((f, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-surface-50 dark:bg-surface-800 rounded-xl">
                                <span className="text-sm text-surface-700 dark:text-surface-300 truncate">📄 {f.name}</span>
                                <button onClick={() => removeFile(i)} className="text-red-500 hover:text-red-600 text-sm ml-2">✕</button>
                            </div>
                        ))}
                    </div>
                )}
                <button onClick={merge} disabled={files.length < 2 || processing} className="btn-primary w-full disabled:opacity-50">
                    {processing ? 'Merging...' : `📑 Merge ${files.length} PDFs`}
                </button>
                {result && <button onClick={download} className="btn-primary w-full">⬇️ Download Merged PDF</button>}
            </div>
        </ToolLayout>
    );
}
