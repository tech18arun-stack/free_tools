import { useState } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';

export default function FontPairing() {
    const [font1, setFont1] = useState('Inter');
    const [font2, setFont2] = useState('Merriweather');
    const [sampleText, setSampleText] = useState('The quick brown fox jumps over the lazy dog');

    const fonts = [
        'Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Poppins',
        'Merriweather', 'Playfair Display', 'Lora', 'Source Serif Pro',
        'Fira Sans', 'Work Sans', 'Nunito', 'Raleway'
    ];

    const pairings = [
        { heading: 'Inter', body: 'Merriweather', name: 'Modern Classic' },
        { heading: 'Playfair Display', body: 'Lato', name: 'Elegant' },
        { heading: 'Montserrat', body: 'Lora', name: 'Clean Professional' },
        { heading: 'Poppins', body: 'Source Serif Pro', name: 'Friendly' },
    ];

    const applyPairing = (pairing) => {
        setFont1(pairing.heading);
        setFont2(pairing.body);
    };

    return (
        <ToolLayout toolSlug="font-pairing">
            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Heading Font</label>
                        <select
                            value={font1}
                            onChange={(e) => setFont1(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900"
                        >
                            {fonts.map(f => <option key={f} value={f}>{f}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Body Font</label>
                        <select
                            value={font2}
                            onChange={(e) => setFont2(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900"
                        >
                            {fonts.map(f => <option key={f} value={f}>{f}</option>)}
                        </select>
                    </div>
                </div>

                <div className="p-6 bg-surface-50 dark:bg-surface-800 rounded-xl">
                    <h2 style={{ fontFamily: font1 }} className="text-3xl font-bold text-surface-900 dark:text-white mb-4">
                        {sampleText}
                    </h2>
                    <p style={{ fontFamily: font2 }} className="text-surface-600 dark:text-surface-400 leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                    </p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-3">Suggested Pairings</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {pairings.map((pairing) => (
                            <button
                                key={pairing.name}
                                onClick={() => applyPairing(pairing)}
                                className="p-4 text-left bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-xl hover:border-accent-300 dark:hover:border-accent-700 transition-colors"
                            >
                                <div className="font-semibold text-surface-900 dark:text-white">{pairing.name}</div>
                                <div className="text-sm text-surface-500">{pairing.heading} + {pairing.body}</div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-xl">
                    <code className="text-sm font-mono text-surface-700 dark:text-surface-300">
                        {`h1 { font-family: '${font1}', sans-serif; }\nbody { font-family: '${font2}', serif; }`}
                    </code>
                </div>
            </div>
        </ToolLayout>
    );
}
