import { useState } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';

export default function PercentageCalculator() {
    const [mode, setMode] = useState('basic');
    const [a, setA] = useState('');
    const [b, setB] = useState('');
    const [result, setResult] = useState(null);

    const calculate = () => {
        const numA = parseFloat(a);
        const numB = parseFloat(b);
        if (isNaN(numA) || isNaN(numB)) { setResult('Please enter valid numbers'); return; }

        switch (mode) {
            case 'basic': setResult(`${numA}% of ${numB} = ${(numA / 100 * numB).toFixed(4)}`); break;
            case 'whatPercent': setResult(`${numA} is ${((numA / numB) * 100).toFixed(4)}% of ${numB}`); break;
            case 'change': setResult(`Change from ${numA} to ${numB} = ${(((numB - numA) / numA) * 100).toFixed(4)}%`); break;
            case 'increase': setResult(`${numA} increased by ${numB}% = ${(numA * (1 + numB / 100)).toFixed(4)}`); break;
            case 'decrease': setResult(`${numA} decreased by ${numB}% = ${(numA * (1 - numB / 100)).toFixed(4)}`); break;
        }
    };

    const modes = [
        { id: 'basic', label: 'X% of Y', desc: 'What is X% of Y?' },
        { id: 'whatPercent', label: 'X is ?% of Y', desc: 'X is what percent of Y?' },
        { id: 'change', label: '% Change', desc: 'Percentage change from X to Y' },
        { id: 'increase', label: '% Increase', desc: 'X increased by Y%' },
        { id: 'decrease', label: '% Decrease', desc: 'X decreased by Y%' },
    ];

    const labels = {
        basic: ['Percentage (%)', 'Number'],
        whatPercent: ['Value', 'Total'],
        change: ['Old Value', 'New Value'],
        increase: ['Number', 'Increase (%)'],
        decrease: ['Number', 'Decrease (%)'],
    };

    return (
        <ToolLayout toolSlug="percentage-calculator">
            <div className="space-y-6">
                <div className="flex flex-wrap gap-2">
                    {modes.map(m => (
                        <button key={m.id} onClick={() => { setMode(m.id); setResult(null); }} className={mode === m.id ? 'btn-primary text-sm px-3 py-2' : 'btn-secondary text-sm px-3 py-2'}>
                            {m.label}
                        </button>
                    ))}
                </div>
                <p className="text-sm text-surface-500">{modes.find(m => m.id === mode)?.desc}</p>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">{labels[mode][0]}</label>
                        <input type="number" value={a} onChange={(e) => setA(e.target.value)} className="input-field" placeholder="Enter value" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">{labels[mode][1]}</label>
                        <input type="number" value={b} onChange={(e) => setB(e.target.value)} className="input-field" placeholder="Enter value" />
                    </div>
                </div>
                <button onClick={calculate} className="btn-primary w-full">📊 Calculate</button>
                {result && (
                    <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl text-center">
                        <p className="text-lg font-semibold text-primary-700 dark:text-primary-300">{result}</p>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
}
