import { useState } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';

export default function SavingsCalculator() {
    const [initial, setInitial] = useState(10000);
    const [monthly, setMonthly] = useState(500);
    const [rate, setRate] = useState(5);
    const [years, setYears] = useState(10);
    const [result, setResult] = useState(null);

    const calculate = () => {
        const monthlyRate = rate / 100 / 12;
        const months = years * 12;
        
        let balance = initial;
        let totalContributions = initial;
        
        for (let i = 0; i < months; i++) {
            balance += balance * monthlyRate;
            balance += monthly;
            totalContributions += monthly;
        }
        
        const totalInterest = balance - totalContributions;

        setResult({
            finalBalance: balance,
            totalContributions,
            totalInterest
        });
    };

    const formatCurrency = (num) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
    };

    return (
        <ToolLayout toolSlug="savings-calculator">
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Initial Deposit ($)</label>
                        <input
                            type="number"
                            value={initial}
                            onChange={(e) => setInitial(Number(e.target.value))}
                            className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Monthly Contribution ($)</label>
                        <input
                            type="number"
                            value={monthly}
                            onChange={(e) => setMonthly(Number(e.target.value))}
                            className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Annual Interest Rate (%)</label>
                        <input
                            type="number"
                            step="0.1"
                            value={rate}
                            onChange={(e) => setRate(Number(e.target.value))}
                            className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Time Period (Years)</label>
                        <input
                            type="number"
                            value={years}
                            onChange={(e) => setYears(Number(e.target.value))}
                            className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900"
                        />
                    </div>
                </div>

                <button onClick={calculate} className="btn-primary w-full">
                    🏦 Calculate Savings
                </button>

                {result && (
                    <div className="space-y-4">
                        <div className="p-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl text-white text-center">
                            <div className="text-sm opacity-90 mb-1">Final Balance</div>
                            <div className="text-4xl font-bold">{formatCurrency(result.finalBalance)}</div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-xl">
                                <div className="text-sm text-surface-600 dark:text-surface-400 mb-1">Total Contributions</div>
                                <div className="text-xl font-bold text-surface-900 dark:text-white">{formatCurrency(result.totalContributions)}</div>
                            </div>
                            <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-xl">
                                <div className="text-sm text-surface-600 dark:text-surface-400 mb-1">Interest Earned</div>
                                <div className="text-xl font-bold text-green-600">{formatCurrency(result.totalInterest)}</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
}
