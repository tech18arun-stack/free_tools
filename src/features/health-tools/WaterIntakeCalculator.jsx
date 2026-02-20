import { useState } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';

export default function WaterIntakeCalculator() {
    const [weight, setWeight] = useState(70);
    const [activity, setActivity] = useState(30);
    const [weather, setWeather] = useState('normal');
    const [result, setResult] = useState(null);

    const calculate = () => {
        // Base: 35ml per kg of body weight
        let intake = weight * 0.035;
        
        // Add for exercise (12ml per minute)
        intake += activity * 0.012;
        
        // Add for hot weather
        if (weather === 'hot') {
            intake *= 1.2;
        }
        
        setResult(intake.toFixed(2));
    };

    return (
        <ToolLayout toolSlug="water-intake-calculator">
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Weight (kg)</label>
                    <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(Number(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                        Daily Exercise (minutes)
                    </label>
                    <input
                        type="number"
                        value={activity}
                        onChange={(e) => setActivity(Number(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Weather</label>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setWeather('normal')}
                            className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
                                weather === 'normal'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300'
                            }`}
                        >
                            ☀️ Normal
                        </button>
                        <button
                            onClick={() => setWeather('hot')}
                            className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
                                weather === 'hot'
                                    ? 'bg-orange-600 text-white'
                                    : 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300'
                            }`}
                        >
                            🌡️ Hot/Humid
                        </button>
                    </div>
                </div>

                <button onClick={calculate} className="btn-primary w-full">
                    💧 Calculate Water Intake
                </button>

                {result && (
                    <div className="space-y-4">
                        <div className="p-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl text-white text-center">
                            <div className="text-sm opacity-90 mb-1">Daily Water Intake</div>
                            <div className="text-5xl font-bold">{result} L</div>
                            <div className="text-sm opacity-90 mt-2">≈ {Math.round(result * 4)} glasses</div>
                        </div>

                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                            <div className="text-blue-700 dark:text-blue-300 text-sm">
                                💡 <strong>Tip:</strong> Drink water throughout the day. Don't wait until you're thirsty!
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
}
