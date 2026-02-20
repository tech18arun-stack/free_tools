import { useState } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';

export default function CodeBeautifier() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [lang, setLang] = useState('html');
    const [copied, setCopied] = useState(false);

    const beautify = async () => {
        try {
            const jsb = await import('js-beautify');
            let result;
            if (lang === 'html') result = jsb.html(input);
            else if (lang === 'css') result = jsb.css(input);
            else result = jsb.js(input);
            setOutput(result);
        } catch (e) {
            setOutput('Error: ' + e.message);
        }
    };

    const copy = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <ToolLayout toolSlug="code-beautifier">
            <div className="space-y-4">
                <div className="flex gap-2">
                    {['html', 'css', 'javascript'].map(l => (
                        <button key={l} onClick={() => setLang(l)} className={lang === l ? 'btn-primary px-4 py-2 text-sm' : 'btn-secondary px-4 py-2 text-sm'}>
                            {l.toUpperCase()}
                        </button>
                    ))}
                </div>
                <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={`Paste your ${lang.toUpperCase()} code here...`} className="input-field font-mono text-sm h-48 resize-y" />
                <button onClick={beautify} className="btn-primary w-full">✨ Beautify {lang.toUpperCase()}</button>
                {output && (
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-sm font-medium text-surface-700 dark:text-surface-300">Beautified Output</label>
                            <button onClick={copy} className="text-xs btn-secondary px-3 py-1">{copied ? '✅ Copied!' : '📋 Copy'}</button>
                        </div>
                        <pre className="tool-result">{output}</pre>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
}
