import { useState } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';

export default function HeartRateCalculator() {
    const [age, setAge] = useState(30);
    const [restingHR, setRestingHR] = useState(70);
    const [result, setResult] = useState(null);

    const calculate = () => {
        const maxHR = 220 - age;
        const hrr = maxHR - restingHR; // Heart Rate Reserve
        
        setResult({
            maxHR,
            zones: [
                { name: 'Very Light', min: Math.round(maxHR * 0.5), max: Math.round(maxHR * 0.6), color: 'text-blue-500', desc: 'Warm up & recovery' },
                { name: 'Light', min: Math.round(maxHR * 0.6), max: Math.round(maxHR * 0.7), color: 'text-green-500', desc: 'Fat burning, endurance' },
                { name: 'Moderate', min: Math.round(maxHR * 0.7), max: Math.round(maxHR * 0.8), color: 'text-yellow-500', desc: 'Cardio, aerobic' },
                { name: 'Hard', min: Math.round(maxHR * 0.8), max: Math.round(maxHR * 0.9), color: 'text-orange-500', desc: 'Anaerobic, performance' },
                { name: 'Maximum', min: Math.round(maxHR * 0.9), max: maxHR, color: 'text-red-500', desc: 'Max effort, short bursts' },
            ]
        });
    };

    return (
        <ToolLayout toolSlug="heart-rate-calculator">
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Age (years)</label>
                        <input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(Number(e.target.value))}
                            className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Resting Heart Rate (bpm)</label>
                        <input
                            type="number"
                            value={restingHR}
                            onChange={(e) => setRestingHR(Number(e.target.value))}
                            className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900"
                        />
                    </div>
                </div>

                <button onClick={calculate} className="btn-primary w-full">
                    ❤️ Calculate Heart Rate Zones
                </button>

                {result && (
                    <div className="space-y-4">
                        <div className="p-6 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl text-white text-center">
                            <div className="text-sm opacity-90 mb-1">Maximum Heart Rate</div>
                            <div className="text-5xl font-bold">{result.maxHR} <span className="text-2xl">bpm</span></div>
                        </div>

                        <div className="space-y-3">
                            <h3 className="font-semibold text-surface-900 dark:text-white">Training Zones</h3>
                            {result.zones.map((zone, index) => (
                                <div key={index} className="p-4 bg-surface-50 dark:bg-surface-800 rounded-xl">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className={`font-semibold ${zone.color}`}>{zone.name}</span>
                                        <span className="text-lg font-bold">{zone.min}-{zone.max} bpm</span>
                                    </div>
                                    <div className="text-sm text-surface-500">{zone.desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
}
