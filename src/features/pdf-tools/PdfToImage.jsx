import { useState, useCallback } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';
import FileUploader from '../../core/components/FileUploader';

export default function PdfToImage() {
    const [images, setImages] = useState([]);
    const [processing, setProcessing] = useState(false);

    const handleFile = useCallback(async (file) => {
        setImages([]);
        setProcessing(true);
        try {
            const pdfjsLib = await import('pdfjs-dist');
            pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
            const bytes = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
            const results = [];
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale: 2 });
                const canvas = document.createElement('canvas');
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                const ctx = canvas.getContext('2d');
                await page.render({ canvasContext: ctx, viewport }).promise;
                results.push(canvas.toDataURL('image/png'));
            }
            setImages(results);
        } catch (e) {
            alert('Error converting PDF: ' + e.message);
        }
        setProcessing(false);
    }, []);

    const downloadImage = (dataUrl, i) => {
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = `page-${i + 1}.png`;
        a.click();
    };

    return (
        <ToolLayout toolSlug="pdf-to-image">
            <div className="space-y-6">
                <FileUploader accept=".pdf" onFilesSelected={handleFile} label="Drop a PDF to convert to images" />
                {processing && <p className="text-center text-primary-600 dark:text-primary-400 font-medium">Converting pages...</p>}
                {images.length > 0 && (
                    <div className="space-y-4">
                        <p className="text-sm font-medium text-surface-700 dark:text-surface-300">{images.length} pages converted</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {images.map((img, i) => (
                                <div key={i} className="text-center">
                                    <img src={img} alt={`Page ${i + 1}`} className="rounded-xl border border-surface-200 dark:border-surface-700 mb-2" />
                                    <button onClick={() => downloadImage(img, i)} className="btn-secondary text-sm">⬇️ Page {i + 1}</button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
}
