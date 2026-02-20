import { useState, useCallback } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';

export default function PasswordGenerator() {
    const [length, setLength] = useState(16);
    const [uppercase, setUppercase] = useState(true);
    const [lowercase, setLowercase] = useState(true);
    const [numbers, setNumbers] = useState(true);
    const [symbols, setSymbols] = useState(true);
    const [password, setPassword] = useState('');
    const [copied, setCopied] = useState(false);

    const generate = useCallback(() => {
        let chars = '';
        if (uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
        if (numbers) chars += '0123456789';
        if (symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
        if (!chars) { setPassword('Select at least one option'); return; }
        let result = '';
        const array = new Uint32Array(length);
        crypto.getRandomValues(array);
        for (let i = 0; i < length; i++) {
            result += chars[array[i] % chars.length];
        }
        setPassword(result);
    }, [length, uppercase, lowercase, numbers, symbols]);

    const copy = () => {
        navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const strength = (() => {
        let score = 0;
        if (length >= 12) score++;
        if (length >= 16) score++;
        if (uppercase) score++;
        if (lowercase) score++;
        if (numbers) score++;
        if (symbols) score++;
        if (score <= 2) return { label: 'Weak', color: 'bg-red-500', width: '25%' };
        if (score <= 4) return { label: 'Medium', color: 'bg-yellow-500', width: '50%' };
        if (score <= 5) return { label: 'Strong', color: 'bg-blue-500', width: '75%' };
        return { label: 'Very Strong', color: 'bg-green-500', width: '100%' };
    })();

    return (
        <ToolLayout toolSlug="password-generator">
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Length: <strong>{length}</strong>
                    </label>
                    <input type="range" min="6" max="64" value={length} onChange={(e) => setLength(Number(e.target.value))} className="w-full accent-primary-500" />
                    <div className="flex justify-between text-xs text-surface-400 mt-1"><span>6</span><span>64</span></div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    {[
                        { label: 'Uppercase (A-Z)', state: uppercase, set: setUppercase },
                        { label: 'Lowercase (a-z)', state: lowercase, set: setLowercase },
                        { label: 'Numbers (0-9)', state: numbers, set: setNumbers },
                        { label: 'Symbols (!@#$)', state: symbols, set: setSymbols },
                    ].map(opt => (
                        <label key={opt.label} className="flex items-center gap-2 p-3 bg-surface-50 dark:bg-surface-800 rounded-xl cursor-pointer hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors">
                            <input type="checkbox" checked={opt.state} onChange={(e) => opt.set(e.target.checked)} className="accent-primary-500 w-4 h-4" />
                            <span className="text-sm text-surface-700 dark:text-surface-300">{opt.label}</span>
                        </label>
                    ))}
                </div>
                <div className="flex items-center gap-2">
                    <div className="text-xs text-surface-500">Strength:</div>
                    <div className="flex-1 h-2 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
                        <div className={`h-full ${strength.color} rounded-full transition-all duration-300`} style={{ width: strength.width }} />
                    </div>
                    <span className={`text-xs font-medium ${strength.color.replace('bg-', 'text-')}`}>{strength.label}</span>
                </div>
                <button onClick={generate} className="btn-primary w-full text-lg py-4">🔒 Generate Password</button>
                {password && (
                    <div className="flex items-center gap-2">
                        <code className="flex-1 p-4 bg-surface-900 dark:bg-surface-800 text-green-400 font-mono text-lg rounded-xl break-all select-all">{password}</code>
                        <button onClick={copy} className="btn-secondary px-4 py-4">{copied ? '✅' : '📋'}</button>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
}
