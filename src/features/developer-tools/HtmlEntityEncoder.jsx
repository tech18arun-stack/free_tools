import { useState, useCallback } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';

export default function HtmlEntityEncoder() {
    const [input, setInput] = useState('');
    const [mode, setMode] = useState('encode'); // 'encode' or 'decode'
    const [output, setOutput] = useState('');
    const [copied, setCopied] = useState(false);

    const htmlEntities = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;',
        '`': '&#x60;',
        '=': '&#x3D;',
        '©': '&copy;',
        '®': '&reg;',
        '™': '&trade;',
        '€': '&euro;',
        '£': '&pound;',
        '¥': '&yen;',
        '¢': '&cent;',
        '°': '&deg;',
        '±': '&plusmn;',
        '×': '&times;',
        '÷': '&divide;',
        '½': '&frac12;',
        '¼': '&frac14;',
        '¾': '&frac34;',
        '…': '&hellip;',
        '–': '&ndash;',
        '—': '&mdash;',
        '•': '&bull;',
        '§': '&sect;',
        '¶': '&para;',
        '†': '&dagger;',
        '‡': '&Dagger;',
        '·': '&middot;',
        '¬': '&not;',
        'µ': '&micro;',
    };

    const reverseEntities = Object.entries(htmlEntities).reduce((acc, [key, value]) => {
        acc[value] = key;
        return acc;
    }, {});

    // Also add numeric entity support for decoding
    const numericEntities = {
        '&#39;': "'",
        '&#x27;': "'",
        '&#x60;': '`',
        '&#x3D;': '=',
    };

    const encode = useCallback((text) => {
        let result = text;
        for (const [char, entity] of Object.entries(htmlEntities)) {
            result = result.split(char).join(entity);
        }
        return result;
    }, []);

    const decode = useCallback((text) => {
        let result = text;
        
        // Decode named entities
        for (const [entity, char] of Object.entries(reverseEntities)) {
            result = result.split(entity).join(char);
        }
        
        // Decode numeric entities
        result = result.replace(/&#(\d+);/g, (match, dec) => {
            return String.fromCharCode(parseInt(dec, 10));
        });
        
        // Decode hex entities
        result = result.replace(/&#x([0-9a-fA-F]+);/g, (match, hex) => {
            return String.fromCharCode(parseInt(hex, 16));
        });
        
        return result;
    }, [reverseEntities]);

    const process = useCallback(() => {
        if (!input) {
            setOutput('');
            return;
        }
        if (mode === 'encode') {
            setOutput(encode(input));
        } else {
            setOutput(decode(input));
        }
    }, [input, mode, encode, decode]);

    useEffect(() => {
        process();
    }, [process]);

    const copy = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const clear = () => {
        setInput('');
        setOutput('');
    };

    const loadSample = () => {
        if (mode === 'encode') {
            setInput('<script>alert("XSS")</script>\nHello "World" & Friends © 2024');
        } else {
            setInput('&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;\nHello &quot;World&quot; &amp; Friends &copy; 2024');
        }
    };

    const stats = {
        inputLength: input.length,
        outputLength: output.length,
        difference: output.length - input.length,
    };

    return (
        <ToolLayout toolSlug="html-entity-encoder">
            <div className="space-y-4">
                {/* Toolbar */}
                <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2">
                        <label className="text-sm font-medium text-surface-700 dark:text-surface-300">Mode:</label>
                        <select
                            value={mode}
                            onChange={(e) => {
                                setMode(e.target.value);
                                setInput('');
                                setOutput('');
                            }}
                            className="input-field text-sm py-1.5"
                        >
                            <option value="encode">Encode (Text → HTML Entities)</option>
                            <option value="decode">Decode (HTML Entities → Text)</option>
                        </select>
                    </div>
                    <div className="flex-1"></div>
                    <button onClick={loadSample} className="btn-secondary text-sm px-4 py-2">📄 Sample</button>
                    <button onClick={clear} className="btn-secondary text-sm px-4 py-2">🗑️ Clear</button>
                </div>

                {/* Input */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-surface-700 dark:text-surface-300">
                            {mode === 'encode' ? 'Plain Text Input' : 'HTML Entity Input'}
                        </label>
                        <span className="text-xs text-surface-500">{stats.inputLength} characters</span>
                    </div>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter HTML entities to decode...'}
                        className="input-field font-mono text-sm h-40 resize-y"
                    />
                </div>

                {/* Output */}
                {output && (
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-medium text-surface-700 dark:text-surface-300">
                                {mode === 'encode' ? 'Encoded Output' : 'Decoded Output'}
                            </label>
                            <div className="flex items-center gap-3">
                                <span className="text-xs text-surface-500">
                                    {stats.outputLength} characters
                                    {stats.difference !== 0 && (
                                        <span className={stats.difference > 0 ? 'text-green-500' : 'text-red-500'}>
                                            {' '}({stats.difference > 0 ? '+' : ''}{stats.difference})
                                        </span>
                                    )}
                                </span>
                                <button onClick={copy} className="text-xs btn-secondary px-3 py-1">
                                    {copied ? '✅ Copied!' : '📋 Copy'}
                                </button>
                            </div>
                        </div>
                        <div className="p-4 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl min-h-32 font-mono text-sm whitespace-pre-wrap break-all">
                            {output}
                        </div>
                    </div>
                )}

                {/* Entity Reference Table */}
                <div>
                    <h3 className="font-semibold text-surface-900 dark:text-white mb-3">Common HTML Entities</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-surface-200 dark:border-surface-700">
                                    <th className="text-left py-2 px-3 font-medium text-surface-700 dark:text-surface-300">Character</th>
                                    <th className="text-left py-2 px-3 font-medium text-surface-700 dark:text-surface-300">Entity</th>
                                    <th className="text-left py-2 px-3 font-medium text-surface-700 dark:text-surface-300">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { char: '<', entity: '&lt;', desc: 'Less than' },
                                    { char: '>', entity: '&gt;', desc: 'Greater than' },
                                    { char: '&', entity: '&amp;', desc: 'Ampersand' },
                                    { char: '"', entity: '&quot;', desc: 'Double quote' },
                                    { char: "'", entity: '&#39;', desc: 'Single quote' },
                                    { char: '©', entity: '&copy;', desc: 'Copyright' },
                                    { char: '®', entity: '&reg;', desc: 'Registered trademark' },
                                    { char: '™', entity: '&trade;', desc: 'Trademark' },
                                    { char: '€', entity: '&euro;', desc: 'Euro sign' },
                                    { char: '£', entity: '&pound;', desc: 'Pound sterling' },
                                    { char: '¥', entity: '&yen;', desc: 'Yen' },
                                    { char: '°', entity: '&deg;', desc: 'Degree symbol' },
                                    { char: '±', entity: '&plusmn;', desc: 'Plus-minus' },
                                    { char: '×', entity: '&times;', desc: 'Multiplication' },
                                    { char: '÷', entity: '&divide;', desc: 'Division' },
                                    { char: '…', entity: '&hellip;', desc: 'Ellipsis' },
                                ].map(row => (
                                    <tr key={row.entity} className="border-b border-surface-100 dark:border-surface-800">
                                        <td className="py-2 px-3 font-mono">{row.char}</td>
                                        <td className="py-2 px-3 font-mono text-accent-600 dark:text-accent-400">{row.entity}</td>
                                        <td className="py-2 px-3 text-surface-600 dark:text-surface-400">{row.desc}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Info */}
                <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-xl">
                    <h3 className="font-semibold text-surface-900 dark:text-white mb-2">💡 Why Encode HTML Entities?</h3>
                    <ul className="space-y-2 text-sm text-surface-600 dark:text-surface-400">
                        <li>• <strong>Security:</strong> Prevent XSS (Cross-Site Scripting) attacks by escaping user input</li>
                        <li>• <strong>Display:</strong> Show HTML tags as text instead of rendering them</li>
                        <li>• <strong>Validation:</strong> Ensure special characters don't break HTML structure</li>
                        <li>• <strong>Compatibility:</strong> Handle special symbols across different encodings</li>
                    </ul>
                </div>
            </div>
        </ToolLayout>
    );
}
