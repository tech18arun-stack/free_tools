import { useState } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';

export default function TextCaseConverter() {
    const [text, setText] = useState('');
    const [copied, setCopied] = useState(false);

    const convert = (type) => {
        switch (type) {
            case 'upper': return text.toUpperCase();
            case 'lower': return text.toLowerCase();
            case 'title': return text.replace(/\w\S*/g, t => t.charAt(0).toUpperCase() + t.substr(1).toLowerCase());
            case 'sentence': return text.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g, c => c.toUpperCase());
            case 'toggle': return text.split('').map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join('');
            case 'camel': return text.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase());
            case 'snake': return text.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
            case 'kebab': return text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            default: return text;
        }
    };

    const apply = (type) => setText(convert(type));
    const copy = () => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); };

    const buttons = [
        { type: 'upper', label: 'UPPERCASE' },
        { type: 'lower', label: 'lowercase' },
        { type: 'title', label: 'Title Case' },
        { type: 'sentence', label: 'Sentence case' },
        { type: 'toggle', label: 'tOGGLE cASE' },
        { type: 'camel', label: 'camelCase' },
        { type: 'snake', label: 'snake_case' },
        { type: 'kebab', label: 'kebab-case' },
    ];

    return (
        <ToolLayout toolSlug="text-case-converter">
            <div className="space-y-4">
                <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Type or paste text here..." className="input-field text-sm h-40 resize-y" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {buttons.map(b => (
                        <button key={b.type} onClick={() => apply(b.type)} className="btn-secondary text-sm py-2">{b.label}</button>
                    ))}
                </div>
                <button onClick={copy} className="btn-primary w-full">{copied ? '✅ Copied!' : '📋 Copy Result'}</button>
            </div>
        </ToolLayout>
    );
}
