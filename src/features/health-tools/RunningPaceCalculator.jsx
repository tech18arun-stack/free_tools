import { useState } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';

export default function RunningPaceCalculator() {
    const [distance, setDistance] = useState(10);
    const [time, setTime] = useState('01:00:00');
    const [result, setResult] = useState(null);

    const calculate = () => {
        const [hours, minutes, seconds] = time.split(':').map(Number);
        const totalMinutes = hours * 60 + minutes + seconds / 60;
        
        const pace = totalMinutes / distance;
        const paceMinutes = Math.floor(pace);
        const paceSeconds = Math.round((pace - paceMinutes) * 60);
        
        const speed = distance / (totalMinutes / 60);
        
        const marathonTime = pace * 42.195;
        const halfMarathonTime = pace * 21.0975;
        const tenKTime = pace * 10;

        const formatTime = (totalMinutes) => {
            const h = Math.floor(totalMinutes / 60);
            const m = Math.floor(totalMinutes % 60);
            const s = Math.round((totalMinutes % 1) * 60);
            return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        };

        setResult({
            pace: `${paceMinutes}:${paceSeconds.toString().padStart(2, '0')}`,
            speed: speed.toFixed(2),
            marathon: formatTime(marathonTime),
            halfMarathon: formatTime(halfMarathonTime),
            tenK: formatTime(tenKTime)
        });
    };

    const distances = [
        { name: '5K', value: 5 },
        { name: '10K', value: 10 },
        { name: 'Half Marathon', value: 21.0975 },
        { name: 'Marathon', value: 42.195 },
    ];

    return (
        <ToolLayout toolSlug="running-pace-calculator">
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Distance</label>
                    <div className="flex flex-wrap gap-2 mb-3">
                        {distances.map(d => (
                            <button
                                key={d.value}
                                onClick={() => setDistance(d.value)}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                    distance === d.value
                                        ? 'bg-accent-600 text-white'
                                        : 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300'
                                }`}
                            >
                                {d.name}
                            </button>
                        ))}
                    </div>
                    <input
                        type="number"
                        value={distance}
                        onChange={(e) => setDistance(Number(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900"
                    />
                    <div className="text-xs text-surface-500 mt-1">Distance in kilometers</div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Time (HH:MM:SS)</label>
                    <input
                        type="time"
                        value={time.substring(0, 5)}
                        onChange={(e) => setTime(e.target.value + ':00')}
                        className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900"
                    />
                </div>

                <button onClick={calculate} className="btn-primary w-full">
                    🏃 Calculate Pace
                </button>

                {result && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl text-white text-center">
                                <div className="text-sm opacity-90 mb-1">Pace</div>
                                <div className="text-3xl font-bold">{result.pace} <span className="text-lg">/km</span></div>
                            </div>
                            <div className="p-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl text-white text-center">
                                <div className="text-sm opacity-90 mb-1">Speed</div>
                                <div className="text-3xl font-bold">{result.speed} <span className="text-lg">km/h</span></div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h3 className="font-semibold text-surface-900 dark:text-white">Projected Times</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between p-3 bg-surface-50 dark:bg-surface-800 rounded-xl">
                                    <span className="text-surface-600 dark:text-surface-400">10K</span>
                                    <span className="font-bold">{result.tenK}</span>
                                </div>
                                <div className="flex justify-between p-3 bg-surface-50 dark:bg-surface-800 rounded-xl">
                                    <span className="text-surface-600 dark:text-surface-400">Half Marathon</span>
                                    <span className="font-bold">{result.halfMarathon}</span>
                                </div>
                                <div className="flex justify-between p-3 bg-surface-50 dark:bg-surface-800 rounded-xl">
                                    <span className="text-surface-600 dark:text-surface-400">Marathon</span>
                                    <span className="font-bold">{result.marathon}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
}
