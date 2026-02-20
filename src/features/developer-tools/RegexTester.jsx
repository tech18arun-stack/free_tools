import { useState, useMemo } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';

export default function RegexTester() {
    const [pattern, setPattern] = useState('');
    const [flags, setFlags] = useState('g');
    const [testString, setTestString] = useState('');
    const [error, setError] = useState('');

    const matches = useMemo(() => {
        if (!pattern || !testString) return [];
        setError('');
        try {
            const regex = new RegExp(pattern, flags);
            const results = [];
            let match;
            if (flags.includes('g')) {
                while ((match = regex.exec(testString)) !== null) {
                    results.push({ value: match[0], index: match.index, groups: match.slice(1) });
                    if (!match[0]) break;
                }
            } else {
                match = regex.exec(testString);
                if (match) results.push({ value: match[0], index: match.index, groups: match.slice(1) });
            }
            return results;
        } catch (e) {
            setError(e.message);
            return [];
        }
    }, [pattern, flags, testString]);

    return (
        <ToolLayout toolSlug="regex-tester">
            <div className="space-y-4">
                <div className="flex gap-3">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Pattern</label>
                        <input type="text" value={pattern} onChange={(e) => setPattern(e.target.value)} placeholder="e.g. \d+" className="input-field font-mono text-sm" />
                    </div>
                    <div className="w-24">
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Flags</label>
                        <input type="text" value={flags} onChange={(e) => setFlags(e.target.value)} placeholder="gi" className="input-field font-mono text-sm" />
                    </div>
                </div>
                {error && <p className="text-sm text-red-500">❌ {error}</p>}
                <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Test String</label>
                    <textarea value={testString} onChange={(e) => setTestString(e.target.value)} placeholder="Enter text to test against..." className="input-field font-mono text-sm h-32 resize-y" />
                </div>
                <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-xl">
                    <h3 className="text-sm font-semibold text-surface-700 dark:text-surface-300 mb-2">
                        Matches ({matches.length})
                    </h3>
                    {matches.length > 0 ? (
                        <div className="space-y-2">
                            {matches.map((m, i) => (
                                <div key={i} className="flex items-start gap-3 p-2 bg-white dark:bg-surface-900 rounded-lg text-sm">
                                    <span className="text-xs bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 px-2 py-0.5 rounded font-mono">#{i + 1}</span>
                                    <div>
                                        <span className="font-mono text-green-600 dark:text-green-400">"{m.value}"</span>
                                        <span className="text-surface-400 ml-2">at index {m.index}</span>
                                        {m.groups.length > 0 && (
                                            <div className="text-xs text-surface-500 mt-1">Groups: {m.groups.map((g, j) => <span key={j} className="font-mono text-yellow-600 dark:text-yellow-400 mx-1">({g})</span>)}</div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-surface-400">{pattern ? 'No matches found' : 'Enter a pattern to start testing'}</p>
                    )}
                </div>
            </div>
        </ToolLayout>
    );
}
