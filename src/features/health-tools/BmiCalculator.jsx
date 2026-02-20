import { useState } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';

export default function BmiCalculator() {
    const [height, setHeight] = useState(170);
    const [weight, setWeight] = useState(70);
    const [unit, setUnit] = useState('metric');
    const [result, setResult] = useState(null);

    const calculate = () => {
        let h = height, w = weight;
        
        if (unit === 'imperial') {
            h = height * 2.54; // feet/inches to cm
            w = weight * 0.453592; // lbs to kg
        }
        
        const heightInMeters = h / 100;
        const bmi = w / (heightInMeters * heightInMeters);
        
        let category, color;
        if (bmi < 18.5) {
            category = 'Underweight';
            color = 'text-blue-600';
        } else if (bmi < 25) {
            category = 'Normal weight';
            color = 'text-green-600';
        } else if (bmi < 30) {
            category = 'Overweight';
            color = 'text-yellow-600';
        } else {
            category = 'Obese';
            color = 'text-red-600';
        }
        
        setResult({ bmi: bmi.toFixed(1), category, color });
    };

    return (
        <ToolLayout toolSlug="bmi-calculator">
            <div className="space-y-6">
                <div className="flex gap-3">
                    <button
                        onClick={() => setUnit('metric')}
                        className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
                            unit === 'metric'
                                ? 'bg-accent-600 text-white'
                                : 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300'
                        }`}
                    >
                        Metric (cm/kg)
                    </button>
                    <button
                        onClick={() => setUnit('imperial')}
                        className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
                            unit === 'imperial'
                                ? 'bg-accent-600 text-white'
                                : 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300'
                        }`}
                    >
                        Imperial (ft/lbs)
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                            Height ({unit === 'metric' ? 'cm' : 'feet'})
                        </label>
                        <input
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(Number(e.target.value))}
                            className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                            Weight ({unit === 'metric' ? 'kg' : 'lbs'})
                        </label>
                        <input
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(Number(e.target.value))}
                            className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900"
                        />
                    </div>
                </div>

                <button onClick={calculate} className="btn-primary w-full">
                    ⚖️ Calculate BMI
                </button>

                {result && (
                    <div className="space-y-4">
                        <div className="p-6 bg-gradient-to-r from-accent-500 to-purple-500 rounded-xl text-white text-center">
                            <div className="text-sm opacity-90 mb-1">Your BMI</div>
                            <div className="text-5xl font-bold">{result.bmi}</div>
                        </div>
                        
                        <div className={`p-4 rounded-xl border-2 ${result.color.replace('text', 'border')} bg-surface-50 dark:bg-surface-800`}>
                            <div className={`text-2xl font-bold ${result.color}`}>{result.category}</div>
                        </div>

                        <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-xl">
                            <div className="text-sm font-medium text-surface-700 dark:text-surface-300 mb-3">BMI Categories</div>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-blue-600">Underweight</span>
                                    <span>&lt; 18.5</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-green-600">Normal weight</span>
                                    <span>18.5 - 24.9</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-yellow-600">Overweight</span>
                                    <span>25 - 29.9</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-red-600">Obese</span>
                                    <span>≥ 30</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
}
