import { useState, useCallback } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';
import FileUploader from '../../core/components/FileUploader';

export default function PdfPreview() {
    const [pages, setPages] = useState([]);
    const [processing, setProcessing] = useState(false);
    const [info, setInfo] = useState(null);

    const handleFile = useCallback(async (file) => {
        setPages([]);
        setProcessing(true);
        try {
            const pdfjsLib = await import('pdfjs-dist');
            pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
            const bytes = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
            setInfo({ name: file.name, pages: pdf.numPages, size: (file.size / 1024).toFixed(1) + ' KB' });
            const imgs = [];
            for (let i = 1; i <= Math.min(pdf.numPages, 20); i++) {
                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale: 1.5 });
                const canvas = document.createElement('canvas');
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
                imgs.push(canvas.toDataURL('image/png'));
            }
            setPages(imgs);
        } catch (e) {
            alert('Error previewing PDF: ' + e.message);
        }
        setProcessing(false);
    }, []);

    return (
        <ToolLayout toolSlug="pdf-preview">
            <div className="space-y-6">
                <FileUploader accept=".pdf" onFilesSelected={handleFile} label="Drop a PDF to preview" />
                {processing && <p className="text-center text-primary-600 dark:text-primary-400 font-medium">Loading preview...</p>}
                {info && (
                    <div className="flex items-center gap-4 p-4 bg-surface-50 dark:bg-surface-800 rounded-xl text-sm">
                        <span>📄 <strong>{info.name}</strong></span>
                        <span>{info.pages} pages</span>
                        <span>{info.size}</span>
                    </div>
                )}
                {pages.length > 0 && (
                    <div className="space-y-4">
                        {pages.map((img, i) => (
                            <div key={i} className="text-center">
                                <p className="text-xs text-surface-400 mb-1">Page {i + 1}</p>
                                <img src={img} alt={`Page ${i + 1}`} className="mx-auto rounded-xl border border-surface-200 dark:border-surface-700 shadow-sm" />
                            </div>
                        ))}
                        {info && info.pages > 20 && <p className="text-center text-sm text-surface-400">Showing first 20 of {info.pages} pages</p>}
                    </div>
                )}
            </div>
        </ToolLayout>
    );
}
