import { useState, useMemo } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';

const LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const PARAGRAPHS = [
    LOREM,
    'Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula.',
    'Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus. Phasellus ultrices nulla quis nibh. Quisque a lectus.',
    'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est.',
    'Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Nullam id dolor id nibh ultricies vehicula ut id elit.',
];

export default function LoremIpsumGenerator() {
    const [count, setCount] = useState(3);
    const [type, setType] = useState('paragraphs');
    const [startLorem, setStartLorem] = useState(true);
    const [copied, setCopied] = useState(false);

    const output = useMemo(() => {
        if (type === 'paragraphs') {
            const paras = [];
            for (let i = 0; i < count; i++) {
                paras.push(i === 0 && startLorem ? PARAGRAPHS[0] : PARAGRAPHS[(i + (startLorem ? 0 : 1)) % PARAGRAPHS.length]);
            }
            return paras.join('\n\n');
        } else if (type === 'sentences') {
            const allSentences = PARAGRAPHS.join(' ').split('. ').map(s => s.trim().replace(/\.$/, '') + '.');
            return allSentences.slice(0, count).join(' ');
        } else {
            const allWords = PARAGRAPHS.join(' ').split(' ');
            return allWords.slice(0, count).join(' ') + '.';
        }
    }, [count, type, startLorem]);

    const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); };

    return (
        <ToolLayout toolSlug="lorem-ipsum-generator">
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Count</label>
                        <input type="number" min={1} max={100} value={count} onChange={(e) => setCount(Math.max(1, Number(e.target.value)))} className="input-field text-sm" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Type</label>
                        <select value={type} onChange={(e) => setType(e.target.value)} className="input-field text-sm">
                            <option value="paragraphs">Paragraphs</option>
                            <option value="sentences">Sentences</option>
                            <option value="words">Words</option>
                        </select>
                    </div>
                    <div className="flex items-end">
                        <label className="flex items-center gap-2 text-sm text-surface-600 dark:text-surface-400 pb-3">
                            <input type="checkbox" checked={startLorem} onChange={(e) => setStartLorem(e.target.checked)} className="accent-primary-500" />
                            Start with "Lorem ipsum..."
                        </label>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-medium text-surface-700 dark:text-surface-300">Generated Text</label>
                        <button onClick={copy} className="text-xs btn-secondary px-3 py-1">{copied ? '✅ Copied!' : '📋 Copy'}</button>
                    </div>
                    <div className="tool-result whitespace-pre-wrap">{output}</div>
                </div>
            </div>
        </ToolLayout>
    );
}
