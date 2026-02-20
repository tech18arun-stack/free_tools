import { useState } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';

export default function AgeCalculator() {
    const [dob, setDob] = useState('');
    const [result, setResult] = useState(null);

    const calculate = () => {
        if (!dob) return;
        const birth = new Date(dob);
        const now = new Date();
        if (birth > now) { setResult(null); return; }

        let years = now.getFullYear() - birth.getFullYear();
        let months = now.getMonth() - birth.getMonth();
        let days = now.getDate() - birth.getDate();

        if (days < 0) {
            months--;
            const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
            days += lastMonth.getDate();
        }
        if (months < 0) {
            years--;
            months += 12;
        }

        const totalDays = Math.floor((now - birth) / (1000 * 60 * 60 * 24));
        const totalWeeks = Math.floor(totalDays / 7);
        const totalMonths = years * 12 + months;
        const totalHours = totalDays * 24;

        const nextBirthday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
        if (nextBirthday <= now) nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
        const daysToNext = Math.ceil((nextBirthday - now) / (1000 * 60 * 60 * 24));

        setResult({ years, months, days, totalDays, totalWeeks, totalMonths, totalHours, daysToNext });
    };

    return (
        <ToolLayout toolSlug="age-calculator">
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Date of Birth</label>
                    <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="input-field" />
                </div>
                <button onClick={calculate} className="btn-primary w-full">🎂 Calculate Age</button>
                {result && (
                    <>
                        <div className="p-6 bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 rounded-2xl text-center">
                            <div className="text-4xl font-bold text-primary-700 dark:text-primary-300">
                                {result.years} <span className="text-lg font-normal text-surface-500">years</span>{' '}
                                {result.months} <span className="text-lg font-normal text-surface-500">months</span>{' '}
                                {result.days} <span className="text-lg font-normal text-surface-500">days</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { label: 'Total Months', value: result.totalMonths.toLocaleString(), color: 'text-blue-600 dark:text-blue-400' },
                                { label: 'Total Weeks', value: result.totalWeeks.toLocaleString(), color: 'text-green-600 dark:text-green-400' },
                                { label: 'Total Days', value: result.totalDays.toLocaleString(), color: 'text-orange-600 dark:text-orange-400' },
                                { label: 'Total Hours', value: result.totalHours.toLocaleString(), color: 'text-purple-600 dark:text-purple-400' },
                            ].map(s => (
                                <div key={s.label} className="p-4 bg-surface-50 dark:bg-surface-800 rounded-xl text-center">
                                    <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
                                    <div className="text-xs text-surface-500 mt-1">{s.label}</div>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl text-center">
                            <p className="text-yellow-700 dark:text-yellow-300 font-medium">🎉 {result.daysToNext} days until your next birthday!</p>
                        </div>
                    </>
                )}
            </div>
        </ToolLayout>
    );
}
