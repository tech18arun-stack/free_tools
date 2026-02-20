import { useState } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';

export default function LoanCalculator() {
    const [principal, setPrincipal] = useState(100000);
    const [rate, setRate] = useState(5);
    const [years, setYears] = useState(30);
    const [result, setResult] = useState(null);

    const calculate = () => {
        const monthlyRate = rate / 100 / 12;
        const numPayments = years * 12;
        const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
        const totalPayment = monthlyPayment * numPayments;
        const totalInterest = totalPayment - principal;

        setResult({
            monthlyPayment,
            totalPayment,
            totalInterest
        });
    };

    const formatCurrency = (num) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
    };

    return (
        <ToolLayout toolSlug="loan-calculator">
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Loan Amount ($)</label>
                        <input
                            type="number"
                            value={principal}
                            onChange={(e) => setPrincipal(Number(e.target.value))}
                            className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Interest Rate (%)</label>
                        <input
                            type="number"
                            step="0.1"
                            value={rate}
                            onChange={(e) => setRate(Number(e.target.value))}
                            className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Loan Term (Years)</label>
                        <input
                            type="number"
                            value={years}
                            onChange={(e) => setYears(Number(e.target.value))}
                            className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900"
                        />
                    </div>
                </div>

                <button onClick={calculate} className="btn-primary w-full">
                    💰 Calculate Loan
                </button>

                {result && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-6 bg-accent-50 dark:bg-accent-900/20 rounded-xl border border-accent-200 dark:border-accent-800">
                            <div className="text-sm text-accent-600 dark:text-accent-400 mb-1">Monthly Payment</div>
                            <div className="text-2xl font-bold text-accent-700 dark:text-accent-300">{formatCurrency(result.monthlyPayment)}</div>
                        </div>
                        <div className="p-6 bg-surface-50 dark:bg-surface-800 rounded-xl">
                            <div className="text-sm text-surface-600 dark:text-surface-400 mb-1">Total Payment</div>
                            <div className="text-2xl font-bold text-surface-900 dark:text-white">{formatCurrency(result.totalPayment)}</div>
                        </div>
                        <div className="p-6 bg-surface-50 dark:bg-surface-800 rounded-xl">
                            <div className="text-sm text-surface-600 dark:text-surface-400 mb-1">Total Interest</div>
                            <div className="text-2xl font-bold text-surface-900 dark:text-white">{formatCurrency(result.totalInterest)}</div>
                        </div>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
}
