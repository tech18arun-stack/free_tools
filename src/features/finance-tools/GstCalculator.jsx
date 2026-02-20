import { useState } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';

export default function GstCalculator() {
    const [amount, setAmount] = useState(1000);
    const [gstRate, setGstRate] = useState(18);
    const [calculationType, setCalculationType] = useState('add');
    const [result, setResult] = useState(null);

    const calculate = () => {
        let gstAmount, totalAmount, originalAmount;
        
        if (calculationType === 'add') {
            originalAmount = amount;
            gstAmount = amount * (gstRate / 100);
            totalAmount = originalAmount + gstAmount;
        } else {
            totalAmount = amount;
            originalAmount = amount / (1 + gstRate / 100);
            gstAmount = totalAmount - originalAmount;
        }

        setResult({
            originalAmount,
            gstAmount,
            totalAmount
        });
    };

    const gstRates = [5, 12, 18, 28];

    const formatCurrency = (num) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
    };

    return (
        <ToolLayout toolSlug="gst-calculator">
            <div className="space-y-6">
                <div className="flex gap-3">
                    <button
                        onClick={() => setCalculationType('add')}
                        className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
                            calculationType === 'add'
                                ? 'bg-accent-600 text-white'
                                : 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300'
                        }`}
                    >
                        Add GST
                    </button>
                    <button
                        onClick={() => setCalculationType('remove')}
                        className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
                            calculationType === 'remove'
                                ? 'bg-accent-600 text-white'
                                : 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300'
                        }`}
                    >
                        Remove GST
                    </button>
                </div>

                <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                        {calculationType === 'add' ? 'Original Amount ($)' : 'Total Amount (incl. GST) ($)'}
                    </label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">GST Rate (%)</label>
                    <div className="flex flex-wrap gap-2 mb-3">
                        {gstRates.map(rate => (
                            <button
                                key={rate}
                                onClick={() => setGstRate(rate)}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                    gstRate === rate
                                        ? 'bg-accent-600 text-white'
                                        : 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300'
                                }`}
                            >
                                {rate}%
                            </button>
                        ))}
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="30"
                        value={gstRate}
                        onChange={(e) => setGstRate(Number(e.target.value))}
                        className="w-full accent-primary-500"
                    />
                    <div className="text-center text-2xl font-bold text-accent-600 mt-2">{gstRate}%</div>
                </div>

                <button onClick={calculate} className="btn-primary w-full">
                    🧾 Calculate GST
                </button>

                {result && (
                    <div className="space-y-3">
                        <div className="flex justify-between p-3 bg-surface-50 dark:bg-surface-800 rounded-xl">
                            <span className="text-surface-600 dark:text-surface-400">Original Amount</span>
                            <span className="font-semibold">{formatCurrency(result.originalAmount)}</span>
                        </div>
                        <div className="flex justify-between p-3 bg-surface-50 dark:bg-surface-800 rounded-xl">
                            <span className="text-surface-600 dark:text-surface-400">GST Amount</span>
                            <span className="font-semibold text-accent-600">{formatCurrency(result.gstAmount)}</span>
                        </div>
                        <div className="flex justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                            <span className="text-green-700 dark:text-green-300 font-medium">Total Amount</span>
                            <span className="text-xl font-bold text-green-700 dark:text-green-300">{formatCurrency(result.totalAmount)}</span>
                        </div>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
}
