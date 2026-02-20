import { useState, useMemo } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';

export default function MetaTagGenerator() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [keywords, setKeywords] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');
    const [copied, setCopied] = useState(false);

    const output = useMemo(() => {
        const tags = [];
        if (title) {
            tags.push(`<title>${title}</title>`);
            tags.push(`<meta property="og:title" content="${title}" />`);
            tags.push(`<meta name="twitter:title" content="${title}" />`);
        }
        if (description) {
            tags.push(`<meta name="description" content="${description}" />`);
            tags.push(`<meta property="og:description" content="${description}" />`);
            tags.push(`<meta name="twitter:description" content="${description}" />`);
        }
        if (keywords) tags.push(`<meta name="keywords" content="${keywords}" />`);
        if (author) tags.push(`<meta name="author" content="${author}" />`);
        if (url) tags.push(`<meta property="og:url" content="${url}" />`);
        tags.push(`<meta property="og:type" content="website" />`);
        tags.push(`<meta name="twitter:card" content="summary_large_image" />`);
        tags.push(`<meta name="viewport" content="width=device-width, initial-scale=1.0" />`);
        return tags.join('\n');
    }, [title, description, keywords, author, url]);

    const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); };

    return (
        <ToolLayout toolSlug="meta-tag-generator">
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Page Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="My Awesome Website" className="input-field text-sm" />
                    {title && <p className="text-xs mt-1 text-surface-400">{title.length}/60 characters</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Description</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="A brief description of your page..." className="input-field text-sm h-20 resize-y" />
                    {description && <p className="text-xs mt-1 text-surface-400">{description.length}/160 characters</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Keywords</label>
                    <input type="text" value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="keyword1, keyword2, keyword3" className="input-field text-sm" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Author</label>
                        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author name" className="input-field text-sm" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">URL</label>
                        <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com" className="input-field text-sm" />
                    </div>
                </div>
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-medium text-surface-700 dark:text-surface-300">Generated Meta Tags</label>
                        <button onClick={copy} className="text-xs btn-secondary px-3 py-1">{copied ? '✅ Copied!' : '📋 Copy'}</button>
                    </div>
                    <pre className="tool-result text-xs">{output}</pre>
                </div>
            </div>
        </ToolLayout>
    );
}
