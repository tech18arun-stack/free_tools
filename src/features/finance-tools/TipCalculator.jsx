import { useState } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';

export default function TipCalculator() {
    const [bill, setBill] = useState(50);
    const [tipPercent, setTipPercent] = useState(15);
    const [people, setPeople] = useState(1);
    const [result, setResult] = useState(null);

    const calculate = () => {
        const tipAmount = bill * (tipPercent / 100);
        const total = bill + tipAmount;
        const perPerson = total / people;

        setResult({
            tipAmount,
            total,
            perPerson
        });
    };

    const tipPresets = [10, 15, 18, 20, 25];

    const formatCurrency = (num) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
    };

    return (
        <ToolLayout toolSlug="tip-calculator">
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Bill Amount ($)</label>
                        <input
                            type="number"
                            value={bill}
                            onChange={(e) => setBill(Number(e.target.value))}
                            className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Number of People</label>
                        <input
                            type="number"
                            min="1"
                            value={people}
                            onChange={(e) => setPeople(Number(e.target.value))}
                            className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Tip Percentage</label>
                    <div className="flex flex-wrap gap-2 mb-3">
                        {tipPresets.map(percent => (
                            <button
                                key={percent}
                                onClick={() => setTipPercent(percent)}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                    tipPercent === percent
                                        ? 'bg-accent-600 text-white'
                                        : 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700'
                                }`}
                            >
                                {percent}%
                            </button>
                        ))}
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="30"
                        value={tipPercent}
                        onChange={(e) => setTipPercent(Number(e.target.value))}
                        className="w-full accent-primary-500"
                    />
                    <div className="text-center text-2xl font-bold text-accent-600 mt-2">{tipPercent}%</div>
                </div>

                <button onClick={calculate} className="btn-primary w-full">
                    💵 Calculate Tip
                </button>

                {result && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-xl text-center">
                                <div className="text-sm text-surface-600 dark:text-surface-400 mb-1">Tip Amount</div>
                                <div className="text-xl font-bold text-surface-900 dark:text-white">{formatCurrency(result.tipAmount)}</div>
                            </div>
                            <div className="p-4 bg-accent-50 dark:bg-accent-900/20 rounded-xl text-center">
                                <div className="text-sm text-accent-600 dark:text-accent-400 mb-1">Total</div>
                                <div className="text-xl font-bold text-accent-700 dark:text-accent-300">{formatCurrency(result.total)}</div>
                            </div>
                            <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-xl text-center">
                                <div className="text-sm text-surface-600 dark:text-surface-400 mb-1">Per Person</div>
                                <div className="text-xl font-bold text-surface-900 dark:text-white">{formatCurrency(result.perPerson)}</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
}
