import { useState } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';

export default function BodyFatCalculator() {
    const [gender, setGender] = useState('male');
    const [age, setAge] = useState(30);
    const [height, setHeight] = useState(170);
    const [weight, setWeight] = useState(70);
    const [neck, setNeck] = useState(38);
    const [waist, setWaist] = useState(85);
    const [hip, setHip] = useState(95);
    const [result, setResult] = useState(null);

    const calculate = () => {
        let bodyFat;
        
        if (gender === 'male') {
            // US Navy Method for men
            bodyFat = 86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76;
        } else {
            // US Navy Method for women
            bodyFat = 163.205 * Math.log10(waist + hip - neck) - 97.684 * Math.log10(height) - 78.387;
        }
        
        let category, color;
        if (gender === 'male') {
            if (bodyFat < 8) { category = 'Essential fat'; color = 'text-blue-600'; }
            else if (bodyFat < 20) { category = 'Athletic'; color = 'text-green-600'; }
            else if (bodyFat < 25) { category = 'Average'; color = 'text-yellow-600'; }
            else { category = 'Obese'; color = 'text-red-600'; }
        } else {
            if (bodyFat < 14) { category = 'Essential fat'; color = 'text-blue-600'; }
            else if (bodyFat < 25) { category = 'Athletic'; color = 'text-green-600'; }
            else if (bodyFat < 32) { category = 'Average'; color = 'text-yellow-600'; }
            else { category = 'Obese'; color = 'text-red-600'; }
        }
        
        const fatMass = (bodyFat / 100) * weight;
        const leanMass = weight - fatMass;

        setResult({
            bodyFat: bodyFat.toFixed(1),
            category,
            color,
            fatMass: fatMass.toFixed(1),
            leanMass: leanMass.toFixed(1)
        });
    };

    return (
        <ToolLayout toolSlug="body-fat-calculator">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Age (years)</label>
                        <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Height (cm)</label>
                        <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Weight (kg)</label>
                        <input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Neck (cm)</label>
                        <input type="number" value={neck} onChange={(e) => setNeck(Number(e.target.value))} className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Waist (cm)</label>
                        <input type="number" value={waist} onChange={(e) => setWaist(Number(e.target.value))} className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900" />
                    </div>
                    {gender === 'female' && (
                        <div>
                            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Hip (cm)</label>
                            <input type="number" value={hip} onChange={(e) => setHip(Number(e.target.value))} className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900" />
                        </div>
                    )}
                </div>

                <button onClick={calculate} className="btn-primary w-full">
                    📏 Calculate Body Fat
                </button>

                {result && (
                    <div className="space-y-4">
                        <div className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white text-center">
                            <div className="text-sm opacity-90 mb-1">Body Fat Percentage</div>
                            <div className="text-5xl font-bold">{result.bodyFat}%</div>
                            <div className={`text-lg mt-2 ${result.color.replace('text', 'text-white')}`}>{result.category}</div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-xl">
                                <div className="text-sm text-surface-600 dark:text-surface-400 mb-1">Fat Mass</div>
                                <div className="text-xl font-bold text-surface-900 dark:text-white">{result.fatMass} kg</div>
                            </div>
                            <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-xl">
                                <div className="text-sm text-surface-600 dark:text-surface-400 mb-1">Lean Mass</div>
                                <div className="text-xl font-bold text-surface-900 dark:text-white">{result.leanMass} kg</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
}
