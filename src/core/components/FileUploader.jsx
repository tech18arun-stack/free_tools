import { useCallback, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function FileUploader({ accept, multiple = false, onFilesSelected, label, maxSizeMB = 50 }) {
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState('');
    const inputRef = useRef(null);

    const handleFiles = useCallback((files) => {
        setError('');
        const fileList = Array.from(files);
        const oversized = fileList.find(f => f.size > maxSizeMB * 1024 * 1024);
        if (oversized) {
            setError(`File "${oversized.name}" exceeds ${maxSizeMB}MB limit`);
            return;
        }
        onFilesSelected(multiple ? fileList : fileList[0]);
    }, [onFilesSelected, multiple, maxSizeMB]);

    const onDrop = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files);
    }, [handleFiles]);

    return (
        <div>
            <motion.div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={onDrop}
                onClick={() => inputRef.current?.click()}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`relative cursor-pointer border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300
          ${isDragging
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-surface-300 dark:border-surface-600 hover:border-primary-400 hover:bg-surface-50 dark:hover:bg-surface-800/50'
                    }`}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    onChange={(e) => e.target.files.length && handleFiles(e.target.files)}
                    className="hidden"
                />
                <div className="flex flex-col items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center">
                        <svg className="w-7 h-7 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                    </div>
                    <div>
                        <p className="font-medium text-surface-700 dark:text-surface-300">
                            {label || 'Drop files here or click to browse'}
                        </p>
                        <p className="text-sm text-surface-400 mt-1">
                            {accept ? `Accepted: ${accept}` : 'All file types'} • Max {maxSizeMB}MB
                        </p>
                    </div>
                </div>
            </motion.div>
            {error && (
                <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                    {error}
                </p>
            )}
        </div>
    );
}
