import { useState, useCallback } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';

export default function JsonFormatter() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const [indent, setIndent] = useState(2);
    const [copied, setCopied] = useState(false);

    const format = useCallback(() => {
        setError('');
        try {
            const parsed = JSON.parse(input);
            setOutput(JSON.stringify(parsed, null, indent));
        } catch (e) {
            setError(e.message);
            setOutput('');
        }
    }, [input, indent]);

    const minify = useCallback(() => {
        setError('');
        try {
            const parsed = JSON.parse(input);
            setOutput(JSON.stringify(parsed));
        } catch (e) {
            setError(e.message);
            setOutput('');
        }
    }, [input]);

    const copy = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const sample = () => {
        setInput(JSON.stringify({ name: "FreeTools", version: "1.0.0", features: ["image-tools", "pdf-tools", "dev-tools"], config: { theme: "dark", lang: "en" }, users: 50000 }, null, 2));
    };

    return (
        <ToolLayout toolSlug="json-formatter">
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-surface-700 dark:text-surface-300">JSON Input</label>
                    <div className="flex gap-2">
                        <button onClick={sample} className="text-xs btn-secondary px-3 py-1">Sample</button>
                        <select value={indent} onChange={(e) => setIndent(Number(e.target.value))} className="text-xs bg-surface-100 dark:bg-surface-800 rounded-lg px-2 py-1 text-surface-600 dark:text-surface-400">
                            <option value={2}>2 spaces</option>
                            <option value={4}>4 spaces</option>
                            <option value={8}>Tab (8)</option>
                        </select>
                    </div>
                </div>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder='{"key": "value"}'
                    className="input-field font-mono text-sm h-48 resize-y"
                />
                {error && <p className="text-sm text-red-500">❌ {error}</p>}
                <div className="flex gap-3">
                    <button onClick={format} className="btn-primary flex-1">✨ Format JSON</button>
                    <button onClick={minify} className="btn-secondary flex-1">🗜️ Minify</button>
                </div>
                {output && (
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-sm font-medium text-surface-700 dark:text-surface-300">Output</label>
                            <button onClick={copy} className="text-xs btn-secondary px-3 py-1">{copied ? '✅ Copied!' : '📋 Copy'}</button>
                        </div>
                        <pre className="tool-result">{output}</pre>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
}
