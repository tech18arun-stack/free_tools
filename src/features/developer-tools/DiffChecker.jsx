import { useState, useCallback, useMemo } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';

export default function DiffChecker() {
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [diffMode, setDiffMode] = useState('words'); // 'words' or 'chars'

    const computeDiff = useCallback((original, modified, mode = 'words') => {
        const originalTokens = mode === 'words' ? original.split(/(\s+)/) : original.split('');
        const modifiedTokens = mode === 'words' ? modified.split(/(\s+)/) : modified.split('');

        const diff = [];
        let i = 0, j = 0;

        while (i < originalTokens.length || j < modifiedTokens.length) {
            if (i < originalTokens.length && j < modifiedTokens.length && originalTokens[i] === modifiedTokens[j]) {
                diff.push({ type: 'same', value: originalTokens[i] });
                i++;
                j++;
            } else {
                // Find matching token ahead
                let foundMatch = false;
                for (let lookAhead = 1; lookAhead <= 5 && !foundMatch; lookAhead++) {
                    if (j + lookAhead < modifiedTokens.length && originalTokens[i] === modifiedTokens[j + lookAhead]) {
                        // Insertions
                        for (let k = j; k < j + lookAhead; k++) {
                            diff.push({ type: 'insert', value: modifiedTokens[k] });
                        }
                        j = j + lookAhead;
                        foundMatch = true;
                    } else if (i + lookAhead < originalTokens.length && modifiedTokens[j] === originalTokens[i + lookAhead]) {
                        // Deletions
                        for (let k = i; k < i + lookAhead; k++) {
                            diff.push({ type: 'delete', value: originalTokens[k] });
                        }
                        i = i + lookAhead;
                        foundMatch = true;
                    }
                }

                if (!foundMatch) {
                    if (i < originalTokens.length && j < modifiedTokens.length) {
                        diff.push({ type: 'delete', value: originalTokens[i] });
                        diff.push({ type: 'insert', value: modifiedTokens[j] });
                        i++;
                        j++;
                    } else if (i < originalTokens.length) {
                        diff.push({ type: 'delete', value: originalTokens[i] });
                        i++;
                    } else if (j < modifiedTokens.length) {
                        diff.push({ type: 'insert', value: modifiedTokens[j] });
                        j++;
                    }
                }
            }
        }

        return diff;
    }, []);

    const diff = useMemo(() => computeDiff(text1, text2, diffMode), [text1, text2, diffMode, computeDiff]);

    const stats = useMemo(() => {
        const additions = diff.filter(d => d.type === 'insert').length;
        const deletions = diff.filter(d => d.type === 'delete').length;
        const unchanged = diff.filter(d => d.type === 'same').length;
        return { additions, deletions, unchanged, total: diff.length };
    }, [diff]);

    const clear = () => {
        setText1('');
        setText2('');
    };

    const loadSample = () => {
        setText1(`function hello() {
    console.log("Hello World");
    return true;
}`);
        setText2(`function hello(name) {
    console.log(\`Hello \${name}!\`);
    return false;
}`);
    };

    return (
        <ToolLayout toolSlug="diff-checker">
            <div className="space-y-4">
                {/* Toolbar */}
                <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2">
                        <label className="text-sm font-medium text-surface-700 dark:text-surface-300">Mode:</label>
                        <select
                            value={diffMode}
                            onChange={(e) => setDiffMode(e.target.value)}
                            className="input-field text-sm py-1.5"
                        >
                            <option value="words">Words</option>
                            <option value="chars">Characters</option>
                        </select>
                    </div>
                    <div className="flex-1"></div>
                    <button onClick={loadSample} className="btn-secondary text-sm px-4 py-2">📄 Load Sample</button>
                    <button onClick={clear} className="btn-secondary text-sm px-4 py-2">🗑️ Clear</button>
                </div>

                {/* Input Areas */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-medium text-surface-700 dark:text-surface-300">Original Text</label>
                            <span className="text-xs text-surface-500">{text1.length} chars</span>
                        </div>
                        <textarea
                            value={text1}
                            onChange={(e) => setText1(e.target.value)}
                            placeholder="Paste original text here..."
                            className="input-field font-mono text-sm h-48 lg:h-64 resize-y"
                        />
                    </div>
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-medium text-surface-700 dark:text-surface-300">Modified Text</label>
                            <span className="text-xs text-surface-500">{text2.length} chars</span>
                        </div>
                        <textarea
                            value={text2}
                            onChange={(e) => setText2(e.target.value)}
                            placeholder="Paste modified text here..."
                            className="input-field font-mono text-sm h-48 lg:h-64 resize-y"
                        />
                    </div>
                </div>

                {/* Stats */}
                {text1 && text2 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                            <div className="text-sm text-green-600 dark:text-green-400 font-medium">Additions</div>
                            <div className="text-2xl font-bold text-green-700 dark:text-green-300">+{stats.additions}</div>
                        </div>
                        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                            <div className="text-sm text-red-600 dark:text-red-400 font-medium">Deletions</div>
                            <div className="text-2xl font-bold text-red-700 dark:text-red-300">-{stats.deletions}</div>
                        </div>
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
                            <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">Unchanged</div>
                            <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">{stats.unchanged}</div>
                        </div>
                        <div className="p-3 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl">
                            <div className="text-sm text-surface-600 dark:text-surface-400 font-medium">Total Tokens</div>
                            <div className="text-2xl font-bold text-surface-700 dark:text-surface-300">{stats.total}</div>
                        </div>
                    </div>
                )}

                {/* Diff Output */}
                {text1 && text2 && (
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-medium text-surface-700 dark:text-surface-300">Difference Output</label>
                            <div className="flex gap-4 text-xs">
                                <span className="flex items-center gap-1">
                                    <span className="w-3 h-3 bg-green-200 dark:bg-green-900 rounded"></span> Added
                                </span>
                                <span className="flex items-center gap-1">
                                    <span className="w-3 h-3 bg-red-200 dark:bg-red-900 rounded"></span> Removed
                                </span>
                            </div>
                        </div>
                        <div className="p-4 bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-xl min-h-32 font-mono text-sm leading-relaxed whitespace-pre-wrap break-words">
                            {diff.map((item, index) => {
                                if (item.type === 'insert') {
                                    return (
                                        <span
                                            key={index}
                                            className="bg-green-200 dark:bg-green-900 text-green-900 dark:text-green-100 px-0.5 rounded"
                                        >
                                            {item.value}
                                        </span>
                                    );
                                } else if (item.type === 'delete') {
                                    return (
                                        <span
                                            key={index}
                                            className="bg-red-200 dark:bg-red-900 text-red-900 dark:text-red-100 px-0.5 line-through opacity-70"
                                        >
                                            {item.value}
                                        </span>
                                    );
                                }
                                return <span key={index}>{item.value}</span>;
                            })}
                        </div>
                    </div>
                )}

                {/* Side by Side View */}
                {text1 && text2 && (
                    <div>
                        <h3 className="text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Side-by-Side Comparison</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-xl min-h-32">
                                <h4 className="text-xs font-semibold text-red-600 dark:text-red-400 mb-2">ORIGINAL (Removed)</h4>
                                <div className="font-mono text-sm whitespace-pre-wrap break-words">
                                    {diff.filter(d => d.type === 'delete').map((d, i) => (
                                        <span key={i} className="bg-red-200 dark:bg-red-900 px-0.5 rounded">{d.value}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="p-4 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-xl min-h-32">
                                <h4 className="text-xs font-semibold text-green-600 dark:text-green-400 mb-2">MODIFIED (Added)</h4>
                                <div className="font-mono text-sm whitespace-pre-wrap break-words">
                                    {diff.filter(d => d.type === 'insert').map((d, i) => (
                                        <span key={i} className="bg-green-200 dark:bg-green-900 px-0.5 rounded">{d.value}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Info */}
                <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-xl">
                    <h3 className="font-semibold text-surface-900 dark:text-white mb-2">💡 How to Use</h3>
                    <ul className="space-y-1 text-sm text-surface-600 dark:text-surface-400">
                        <li>• Paste the original text in the left box and modified text in the right box</li>
                        <li>• Differences will be highlighted automatically</li>
                        <li>• <span className="text-green-600 dark:text-green-400">Green</span> = Added content</li>
                        <li>• <span className="text-red-600 dark:text-red-400">Red</span> = Removed content</li>
                        <li>• Switch between Words and Characters mode for different granularity</li>
                    </ul>
                </div>
            </div>
        </ToolLayout>
    );
}
