import { useState } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';

export default function UrlEncoderDecoder() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState('encode');
    const [copied, setCopied] = useState(false);

    const process = () => {
        try {
            setOutput(mode === 'encode' ? encodeURIComponent(input) : decodeURIComponent(input));
        } catch {
            setOutput('Invalid input');
        }
    };

    const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); };

    return (
        <ToolLayout toolSlug="url-encoder-decoder">
            <div className="space-y-4">
                <div className="flex gap-2">
                    <button onClick={() => setMode('encode')} className={mode === 'encode' ? 'btn-primary flex-1' : 'btn-secondary flex-1'}>Encode</button>
                    <button onClick={() => setMode('decode')} className={mode === 'decode' ? 'btn-primary flex-1' : 'btn-secondary flex-1'}>Decode</button>
                </div>
                <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={mode === 'encode' ? 'Enter URL or text to encode...' : 'Enter encoded URL to decode...'} className="input-field text-sm font-mono h-28 resize-y" />
                <button onClick={process} className="btn-primary w-full">🌐 {mode === 'encode' ? 'Encode' : 'Decode'} URL</button>
                {output && (
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-sm font-medium text-surface-700 dark:text-surface-300">Result</label>
                            <button onClick={copy} className="text-xs btn-secondary px-3 py-1">{copied ? '✅ Copied!' : '📋 Copy'}</button>
                        </div>
                        <pre className="tool-result">{output}</pre>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
}
