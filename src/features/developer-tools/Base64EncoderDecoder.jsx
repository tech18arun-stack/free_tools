import { useState } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';

export default function Base64EncoderDecoder() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState('encode');
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    const process = () => {
        setError('');
        try {
            if (mode === 'encode') {
                setOutput(btoa(unescape(encodeURIComponent(input))));
            } else {
                setOutput(decodeURIComponent(escape(atob(input))));
            }
        } catch (e) {
            setError('Invalid input for ' + mode + 'ing');
            setOutput('');
        }
    };

    const copy = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <ToolLayout toolSlug="base64-encoder-decoder">
            <div className="space-y-4">
                <div className="flex gap-2">
                    <button onClick={() => setMode('encode')} className={mode === 'encode' ? 'btn-primary flex-1' : 'btn-secondary flex-1'}>Encode</button>
                    <button onClick={() => setMode('decode')} className={mode === 'decode' ? 'btn-primary flex-1' : 'btn-secondary flex-1'}>Decode</button>
                </div>
                <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 to decode...'} className="input-field font-mono text-sm h-36 resize-y" />
                {error && <p className="text-sm text-red-500">❌ {error}</p>}
                <button onClick={process} className="btn-primary w-full">🔐 {mode === 'encode' ? 'Encode' : 'Decode'}</button>
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
