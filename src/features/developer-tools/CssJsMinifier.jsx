import { useState } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';

export default function CssJsMinifier() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [lang, setLang] = useState('css');
    const [copied, setCopied] = useState(false);
    const [stats, setStats] = useState(null);

    const minify = () => {
        let result = input;
        if (lang === 'css') {
            result = result.replace(/\/\*[\s\S]*?\*\//g, '');
            result = result.replace(/\s*([{}:;,])\s*/g, '$1');
            result = result.replace(/;\}/g, '}');
            result = result.replace(/\s+/g, ' ').trim();
        } else {
            result = result.replace(/\/\/.*$/gm, '');
            result = result.replace(/\/\*[\s\S]*?\*\//g, '');
            result = result.replace(/\s+/g, ' ');
            result = result.replace(/\s*([{}();,=+\-*/<>!&|?:])\s*/g, '$1');
            result = result.trim();
        }
        setOutput(result);
        setStats({
            original: input.length,
            minified: result.length,
            saved: ((1 - result.length / input.length) * 100).toFixed(1),
        });
    };

    const copy = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <ToolLayout toolSlug="css-js-minifier">
            <div className="space-y-4">
                <div className="flex gap-2">
                    <button onClick={() => setLang('css')} className={lang === 'css' ? 'btn-primary flex-1' : 'btn-secondary flex-1'}>CSS</button>
                    <button onClick={() => setLang('js')} className={lang === 'js' ? 'btn-primary flex-1' : 'btn-secondary flex-1'}>JavaScript</button>
                </div>
                <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={`Paste your ${lang.toUpperCase()} code here...`} className="input-field font-mono text-sm h-48 resize-y" />
                <button onClick={minify} className="btn-primary w-full">🗜️ Minify {lang.toUpperCase()}</button>
                {stats && (
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl text-center text-sm text-green-700 dark:text-green-400">
                        {stats.original} → {stats.minified} chars ({stats.saved}% reduction)
                    </div>
                )}
                {output && (
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-sm font-medium text-surface-700 dark:text-surface-300">Minified Output</label>
                            <button onClick={copy} className="text-xs btn-secondary px-3 py-1">{copied ? '✅ Copied!' : '📋 Copy'}</button>
                        </div>
                        <pre className="tool-result">{output}</pre>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
}
