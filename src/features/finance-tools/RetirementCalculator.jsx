import { useState } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';

export default function RetirementCalculator() {
    const [currentAge, setCurrentAge] = useState(30);
    const [retirementAge, setRetirementAge] = useState(65);
    const [currentSavings, setCurrentSavings] = useState(50000);
    const [monthlyContribution, setMonthlyContribution] = useState(500);
    const [annualReturn, setAnnualReturn] = useState(7);
    const [result, setResult] = useState(null);

    const calculate = () => {
        const monthlyRate = annualReturn / 100 / 12;
        const months = (retirementAge - currentAge) * 12;
        
        let balance = currentSavings;
        let totalContributions = currentSavings;
        
        for (let i = 0; i < months; i++) {
            balance += balance * monthlyRate;
            balance += monthlyContribution;
            totalContributions += monthlyContribution;
        }
        
        const totalInterest = balance - totalContributions;
        const monthlyIncome = balance * 0.04 / 12; // 4% withdrawal rule

        setResult({
            finalBalance: balance,
            totalContributions,
            totalInterest,
            monthlyIncome
        });
    };

    const formatCurrency = (num) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
    };

    return (
        <ToolLayout toolSlug="retirement-calculator">
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Current Age</label>
                        <input
                            type="number"
                            value={currentAge}
                            onChange={(e) => setCurrentAge(Number(e.target.value))}
                            className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Retirement Age</label>
                        <input
                            type="number"
                            value={retirementAge}
                            onChange={(e) => setRetirementAge(Number(e.target.value))}
                            className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Current Savings ($)</label>
                        <input
                            type="number"
                            value={currentSavings}
                            onChange={(e) => setCurrentSavings(Number(e.target.value))}
                            className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Monthly Contribution ($)</label>
                        <input
                            type="number"
                            value={monthlyContribution}
                            onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                            className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Expected Annual Return (%)</label>
                        <input
                            type="number"
                            step="0.1"
                            value={annualReturn}
                            onChange={(e) => setAnnualReturn(Number(e.target.value))}
                            className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900"
                        />
                    </div>
                </div>

                <button onClick={calculate} className="btn-primary w-full">
                    👴 Calculate Retirement
                </button>

                {result && (
                    <div className="space-y-4">
                        <div className="p-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl text-white text-center">
                            <div className="text-sm opacity-90 mb-1">Retirement Balance at {retirementAge}</div>
                            <div className="text-4xl font-bold">{formatCurrency(result.finalBalance)}</div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-xl">
                                <div className="text-sm text-surface-600 dark:text-surface-400 mb-1">Total Contributions</div>
                                <div className="text-lg font-bold text-surface-900 dark:text-white">{formatCurrency(result.totalContributions)}</div>
                            </div>
                            <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-xl">
                                <div className="text-sm text-surface-600 dark:text-surface-400 mb-1">Interest Earned</div>
                                <div className="text-lg font-bold text-green-600">{formatCurrency(result.totalInterest)}</div>
                            </div>
                        </div>

                        <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
                            <div className="text-amber-700 dark:text-amber-300">
                                <div className="font-semibold mb-1">💡 Estimated Monthly Income (4% rule)</div>
                                <div className="text-2xl font-bold">{formatCurrency(result.monthlyIncome)}</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
}
