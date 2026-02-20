import { useState, useMemo } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';

export default function SlugGenerator() {
    const [text, setText] = useState('');
    const [separator, setSeparator] = useState('-');
    const [copied, setCopied] = useState(false);

    const slug = useMemo(() => {
        return text
            .toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, separator)
            .replace(new RegExp(`[${separator}]+`, 'g'), separator)
            .replace(new RegExp(`^${separator}|${separator}$`, 'g'), '');
    }, [text, separator]);

    const copy = () => { navigator.clipboard.writeText(slug); setCopied(true); setTimeout(() => setCopied(false), 2000); };

    return (
        <ToolLayout toolSlug="slug-generator">
            <div className="space-y-4">
                <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter your title or text here..." className="input-field text-sm h-28 resize-y" />
                <div className="flex items-center gap-4">
                    <label className="text-sm font-medium text-surface-700 dark:text-surface-300">Separator:</label>
                    <div className="flex gap-2">
                        {['-', '_', '.'].map(s => (
                            <button key={s} onClick={() => setSeparator(s)} className={separator === s ? 'btn-primary px-4 py-1 text-sm' : 'btn-secondary px-4 py-1 text-sm'}>
                                {s === '-' ? 'Hyphen (-)' : s === '_' ? 'Underscore (_)' : 'Dot (.)'}
                            </button>
                        ))}
                    </div>
                </div>
                {slug && (
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Generated Slug</label>
                        <div className="flex items-center gap-2">
                            <code className="flex-1 p-3 bg-surface-50 dark:bg-surface-900 rounded-xl text-primary-600 dark:text-primary-400 font-mono text-sm">{slug}</code>
                            <button onClick={copy} className="btn-secondary px-3 py-3 text-sm">{copied ? '✅' : '📋'}</button>
                        </div>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
}
