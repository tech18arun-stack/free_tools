import { useState } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';

export default function SleepCalculator() {
    const [wakeTime, setWakeTime] = useState('07:00');
    const [sleepTime, setSleepTime] = useState('23:00');
    const [calculationType, setCalculationType] = useState('bedtime');
    const [result, setResult] = useState(null);

    const calculate = () => {
        const sleepCycles = [4.5, 6, 7.5, 9]; // hours (each cycle is ~90 min)
        const times = [];
        
        if (calculationType === 'bedtime') {
            const [wakeHours, wakeMinutes] = wakeTime.split(':').map(Number);
            const wakeMinutesTotal = wakeHours * 60 + wakeMinutes;
            
            sleepCycles.forEach(cycle => {
                const sleepMinutesTotal = wakeMinutesTotal - (cycle * 60) - 15; // 15 min to fall asleep
                let adjustedMinutes = sleepMinutesTotal;
                if (adjustedMinutes < 0) adjustedMinutes += 24 * 60;
                
                const hours = Math.floor(adjustedMinutes / 60);
                const minutes = adjustedMinutes % 60;
                times.push({
                    cycles: cycle / 1.5,
                    time: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
                });
            });
        } else {
            const [sleepHours, sleepMinutes] = sleepTime.split(':').map(Number);
            const sleepMinutesTotal = sleepHours * 60 + sleepMinutes + 15;
            
            sleepCycles.forEach(cycle => {
                const wakeMinutesTotal = sleepMinutesTotal + (cycle * 60);
                let adjustedMinutes = wakeMinutesTotal % (24 * 60);
                
                const hours = Math.floor(adjustedMinutes / 60);
                const minutes = adjustedMinutes % 60;
                times.push({
                    cycles: cycle / 1.5,
                    time: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
                });
            });
        }
        
        setResult(times);
    };

    return (
        <ToolLayout toolSlug="sleep-calculator">
            <div className="space-y-6">
                <div className="flex gap-3">
                    <button
                        onClick={() => setCalculationType('bedtime')}
                        className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
                            calculationType === 'bedtime'
                                ? 'bg-indigo-600 text-white'
                                : 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300'
                        }`}
                    >
                        Find Bedtime
                    </button>
                    <button
                        onClick={() => setCalculationType('waketime')}
                        className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
                            calculationType === 'waketime'
                                ? 'bg-indigo-600 text-white'
                                : 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300'
                        }`}
                    >
                        Find Wake Time
                    </button>
                </div>

                <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                        {calculationType === 'bedtime' ? 'Wake Up Time' : 'Bedtime'}
                    </label>
                    <input
                        type="time"
                        value={calculationType === 'bedtime' ? wakeTime : sleepTime}
                        onChange={(e) => calculationType === 'bedtime' ? setWakeTime(e.target.value) : setSleepTime(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900"
                    />
                </div>

                <button onClick={calculate} className="btn-primary w-full">
                    😴 Calculate Sleep Times
                </button>

                {result && (
                    <div className="space-y-3">
                        <h3 className="font-semibold text-surface-900 dark:text-white">
                            {calculationType === 'bedtime' ? 'Best Times to Fall Asleep' : 'Best Times to Wake Up'}
                        </h3>
                        {result.map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-4 bg-surface-50 dark:bg-surface-800 rounded-xl">
                                <div>
                                    <div className="font-semibold text-surface-900 dark:text-white">
                                        {Math.round(item.cycles)} sleep cycles ({item.cycles * 1.5} hours)
                                    </div>
                                    <div className="text-sm text-surface-500">
                                        {item.cycles >= 5 ? '⭐ Recommended' : 'Power nap'}
                                    </div>
                                </div>
                                <div className="text-2xl font-bold text-indigo-600">{item.time}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </ToolLayout>
    );
}
