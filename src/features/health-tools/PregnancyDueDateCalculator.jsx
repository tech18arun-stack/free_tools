import { useState } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';

export default function PregnancyDueDateCalculator() {
    const [lastPeriod, setLastPeriod] = useState('');
    const [cycleLength, setCycleLength] = useState(28);
    const [result, setResult] = useState(null);

    const calculate = () => {
        if (!lastPeriod) return;
        
        const lastPeriodDate = new Date(lastPeriod);
        // Naegele's rule: Add 280 days (40 weeks) from last period
        const dueDate = new Date(lastPeriodDate);
        dueDate.setDate(dueDate.getDate() + 280 + (cycleLength - 28));
        
        const conceptionDate = new Date(lastPeriodDate);
        conceptionDate.setDate(conceptionDate.getDate() + 14 + (cycleLength - 28));
        
        const today = new Date();
        const daysPregnant = Math.floor((today - lastPeriodDate) / (1000 * 60 * 60 * 24));
        const weeksPregnant = Math.floor(daysPregnant / 7);
        const daysRemaining = daysPregnant % 7;
        
        setResult({
            dueDate: dueDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
            conceptionDate: conceptionDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            weeksPregnant,
            daysRemaining,
            trimester: weeksPregnant < 13 ? 'First' : weeksPregnant < 27 ? 'Second' : 'Third'
        });
    };

    return (
        <ToolLayout toolSlug="pregnancy-due-date-calculator">
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                        First Day of Last Period
                    </label>
                    <input
                        type="date"
                        value={lastPeriod}
                        onChange={(e) => setLastPeriod(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                        Cycle Length (days)
                    </label>
                    <input
                        type="number"
                        value={cycleLength}
                        onChange={(e) => setCycleLength(Number(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900"
                    />
                    <div className="text-xs text-surface-500 mt-1">Average is 28 days</div>
                </div>

                <button onClick={calculate} className="btn-primary w-full">
                    🤰 Calculate Due Date
                </button>

                {result && (
                    <div className="space-y-4">
                        <div className="p-6 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl text-white text-center">
                            <div className="text-sm opacity-90 mb-1">Estimated Due Date</div>
                            <div className="text-2xl font-bold">{result.dueDate}</div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-xl border border-pink-200 dark:border-pink-800">
                                <div className="text-sm text-pink-600 dark:text-pink-400 mb-1">Current Progress</div>
                                <div className="text-xl font-bold text-pink-700 dark:text-pink-300">
                                    Week {result.weeksPregnant}, Day {result.daysRemaining}
                                </div>
                                <div className="text-sm text-pink-600 dark:text-pink-400">{result.trimester} Trimester</div>
                            </div>
                            <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-xl">
                                <div className="text-sm text-surface-600 dark:text-surface-400 mb-1">Estimated Conception</div>
                                <div className="text-lg font-bold text-surface-900 dark:text-white">{result.conceptionDate}</div>
                            </div>
                        </div>

                        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                            <div className="text-purple-700 dark:text-purple-300 text-sm">
                                💡 <strong>Note:</strong> This is an estimate. Only about 5% of babies are born on their due date. 
                                Always consult with your healthcare provider for accurate dating.
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
}
