import { useState } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';

export default function CalorieCalculator() {
    const [gender, setGender] = useState('male');
    const [age, setAge] = useState(30);
    const [height, setHeight] = useState(170);
    const [weight, setWeight] = useState(70);
    const [activity, setActivity] = useState(1.375);
    const [goal, setGoal] = useState('maintain');
    const [result, setResult] = useState(null);

    const calculate = () => {
        // Mifflin-St Jeor Equation
        let bmr;
        if (gender === 'male') {
            bmr = 10 * weight + 6.25 * height - 5 * age + 5;
        } else {
            bmr = 10 * weight + 6.25 * height - 5 * age - 161;
        }
        
        const tdee = bmr * activity;
        
        let calories;
        if (goal === 'lose') {
            calories = tdee - 500;
        } else if (goal === 'gain') {
            calories = tdee + 500;
        } else {
            calories = tdee;
        }

        setResult({
            bmr: Math.round(bmr),
            tdee: Math.round(tdee),
            calories: Math.round(calories)
        });
    };

    const activityLevels = [
        { value: 1.2, label: 'Sedentary (little or no exercise)' },
        { value: 1.375, label: 'Lightly active (1-3 days/week)' },
        { value: 1.55, label: 'Moderately active (3-5 days/week)' },
        { value: 1.725, label: 'Very active (6-7 days/week)' },
        { value: 1.9, label: 'Extra active (very hard exercise)' },
    ];

    return (
        <ToolLayout toolSlug="calorie-calculator">
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Gender</label>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setGender('male')}
                            className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
                                gender === 'male'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300'
                            }`}
                        >
                            Male
                        </button>
                        <button
                            onClick={() => setGender('female')}
                            className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
                                gender === 'female'
                                    ? 'bg-pink-600 text-white'
                                    : 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300'
                            }`}
                        >
                            Female
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Height (cm)</label>
                        <input
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(Number(e.target.value))}
                            className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Weight (kg)</label>
                        <input
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(Number(e.target.value))}
                            className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Activity Level</label>
                    <select
                        value={activity}
                        onChange={(e) => setActivity(Number(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900"
                    >
                        {activityLevels.map(level => (
                            <option key={level.value} value={level.value}>{level.label}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Goal</label>
                    <div className="grid grid-cols-3 gap-3">
                        <button
                            onClick={() => setGoal('lose')}
                            className={`py-3 rounded-xl font-medium transition-colors ${
                                goal === 'lose'
                                    ? 'bg-red-600 text-white'
                                    : 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300'
                            }`}
                        >
                            Lose Weight
                        </button>
                        <button
                            onClick={() => setGoal('maintain')}
                            className={`py-3 rounded-xl font-medium transition-colors ${
                                goal === 'maintain'
                                    ? 'bg-green-600 text-white'
                                    : 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300'
                            }`}
                        >
                            Maintain
                        </button>
                        <button
                            onClick={() => setGoal('gain')}
                            className={`py-3 rounded-xl font-medium transition-colors ${
                                goal === 'gain'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300'
                            }`}
                        >
                            Gain Weight
                        </button>
                    </div>
                </div>

                <button onClick={calculate} className="btn-primary w-full">
                    🔥 Calculate Calories
                </button>

                {result && (
                    <div className="space-y-4">
                        <div className="p-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl text-white text-center">
                            <div className="text-sm opacity-90 mb-1">Daily Calories</div>
                            <div className="text-4xl font-bold">{result.calories} kcal</div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-xl">
                                <div className="text-sm text-surface-600 dark:text-surface-400 mb-1">BMR</div>
                                <div className="text-xl font-bold text-surface-900 dark:text-white">{result.bmr} kcal</div>
                            </div>
                            <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-xl">
                                <div className="text-sm text-surface-600 dark:text-surface-400 mb-1">TDEE</div>
                                <div className="text-xl font-bold text-surface-900 dark:text-white">{result.tdee} kcal</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
}
