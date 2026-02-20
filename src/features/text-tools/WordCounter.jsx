import { useState, useMemo } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';

export default function WordCounter() {
    const [text, setText] = useState('');

    const stats = useMemo(() => {
        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        const chars = text.length;
        const charsNoSpaces = text.replace(/\s/g, '').length;
        const sentences = text.trim() ? text.split(/[.!?]+/).filter(s => s.trim()).length : 0;
        const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter(p => p.trim()).length : 0;
        const readingTime = Math.max(1, Math.ceil(words / 200));
        return { words, chars, charsNoSpaces, sentences, paragraphs, readingTime };
    }, [text]);

    return (
        <ToolLayout toolSlug="word-counter">
            <div className="space-y-6">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Start typing or paste your text here..."
                    className="input-field text-sm h-48 resize-y"
                />
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                        { label: 'Words', value: stats.words, color: 'text-primary-600 dark:text-primary-400' },
                        { label: 'Characters', value: stats.chars, color: 'text-purple-600 dark:text-purple-400' },
                        { label: 'No Spaces', value: stats.charsNoSpaces, color: 'text-blue-600 dark:text-blue-400' },
                        { label: 'Sentences', value: stats.sentences, color: 'text-green-600 dark:text-green-400' },
                        { label: 'Paragraphs', value: stats.paragraphs, color: 'text-orange-600 dark:text-orange-400' },
                        { label: 'Reading Time', value: `${stats.readingTime} min`, color: 'text-rose-600 dark:text-rose-400' },
                    ].map(s => (
                        <div key={s.label} className="p-4 bg-surface-50 dark:bg-surface-800 rounded-xl text-center">
                            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
                            <div className="text-xs text-surface-500 mt-1">{s.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </ToolLayout>
    );
}
