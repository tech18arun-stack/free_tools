import { useState } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';

export default function JwtDecoder() {
    const [input, setInput] = useState('');
    const [header, setHeader] = useState(null);
    const [payload, setPayload] = useState(null);
    const [error, setError] = useState('');

    const decode = () => {
        setError('');
        setHeader(null);
        setPayload(null);
        try {
            const parts = input.trim().split('.');
            if (parts.length < 2) throw new Error('Invalid JWT format. Expected at least 2 parts separated by dots.');
            const decodeB64 = (s) => {
                const padded = s.replace(/-/g, '+').replace(/_/g, '/');
                return JSON.parse(decodeURIComponent(escape(atob(padded))));
            };
            setHeader(decodeB64(parts[0]));
            setPayload(decodeB64(parts[1]));
        } catch (e) {
            setError(e.message);
        }
    };

    const sample = () => {
        setInput('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
    };

    const formatDate = (ts) => {
        if (!ts) return null;
        return new Date(ts * 1000).toLocaleString();
    };

    return (
        <ToolLayout toolSlug="jwt-decoder">
            <div className="space-y-4">
                <div className="flex justify-between">
                    <label className="text-sm font-medium text-surface-700 dark:text-surface-300">JWT Token</label>
                    <button onClick={sample} className="text-xs btn-secondary px-3 py-1">Sample</button>
                </div>
                <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste your JWT token here..." className="input-field font-mono text-sm h-28 resize-y" />
                {error && <p className="text-sm text-red-500">❌ {error}</p>}
                <button onClick={decode} className="btn-primary w-full">🔑 Decode JWT</button>
                {header && (
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-sm font-semibold text-red-500 mb-1">Header</h3>
                            <pre className="tool-result text-red-600 dark:text-red-400">{JSON.stringify(header, null, 2)}</pre>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-purple-500 mb-1">Payload</h3>
                            <pre className="tool-result text-purple-600 dark:text-purple-400">{JSON.stringify(payload, null, 2)}</pre>
                            {payload?.iat && <p className="text-xs text-surface-400 mt-2">Issued: {formatDate(payload.iat)}</p>}
                            {payload?.exp && <p className="text-xs text-surface-400">Expires: {formatDate(payload.exp)}</p>}
                        </div>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
}
