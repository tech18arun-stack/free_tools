import { useState, useMemo } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';

const conversions = {
    length: { name: 'Length', units: { meter: 1, kilometer: 1000, centimeter: 0.01, millimeter: 0.001, mile: 1609.344, yard: 0.9144, foot: 0.3048, inch: 0.0254 } },
    weight: { name: 'Weight', units: { kilogram: 1, gram: 0.001, milligram: 0.000001, pound: 0.453592, ounce: 0.0283495, ton: 1000 } },
    temperature: { name: 'Temperature', units: { celsius: 'C', fahrenheit: 'F', kelvin: 'K' } },
    area: { name: 'Area', units: { 'sq meter': 1, 'sq kilometer': 1e6, 'sq foot': 0.092903, 'sq inch': 0.000645, acre: 4046.86, hectare: 10000 } },
    volume: { name: 'Volume', units: { liter: 1, milliliter: 0.001, gallon: 3.78541, quart: 0.946353, 'cubic meter': 1000 } },
    speed: { name: 'Speed', units: { 'm/s': 1, 'km/h': 0.277778, 'mi/h': 0.44704, knot: 0.514444 } },
};

export default function UnitConverter() {
    const [category, setCategory] = useState('length');
    const [value, setValue] = useState('');
    const [fromUnit, setFromUnit] = useState('');
    const [toUnit, setToUnit] = useState('');

    const cat = conversions[category];
    const units = Object.keys(cat.units);

    useMemo(() => {
        setFromUnit(units[0]);
        setToUnit(units[1] || units[0]);
    }, [category]);

    const result = useMemo(() => {
        const num = parseFloat(value);
        if (isNaN(num)) return '';
        if (category === 'temperature') {
            if (fromUnit === toUnit) return num;
            const toCelsius = { celsius: n => n, fahrenheit: n => (n - 32) * 5 / 9, kelvin: n => n - 273.15 };
            const fromCelsius = { celsius: n => n, fahrenheit: n => n * 9 / 5 + 32, kelvin: n => n + 273.15 };
            const c = toCelsius[fromUnit](num);
            return fromCelsius[toUnit](c).toFixed(6);
        }
        const baseValue = num * cat.units[fromUnit];
        return (baseValue / cat.units[toUnit]).toFixed(6);
    }, [value, fromUnit, toUnit, category]);

    return (
        <ToolLayout toolSlug="unit-converter">
            <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                    {Object.keys(conversions).map(key => (
                        <button key={key} onClick={() => setCategory(key)} className={category === key ? 'btn-primary text-sm px-3 py-2' : 'btn-secondary text-sm px-3 py-2'}>
                            {conversions[key].name}
                        </button>
                    ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Value</label>
                        <input type="number" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Enter value" className="input-field" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">From</label>
                        <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="input-field">
                            {units.map(u => <option key={u} value={u}>{u}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">To</label>
                        <select value={toUnit} onChange={(e) => setToUnit(e.target.value)} className="input-field">
                            {units.map(u => <option key={u} value={u}>{u}</option>)}
                        </select>
                    </div>
                </div>
                {result !== '' && (
                    <div className="p-6 bg-primary-50 dark:bg-primary-900/20 rounded-2xl text-center">
                        <p className="text-sm text-surface-500 mb-1">{value} {fromUnit} =</p>
                        <p className="text-3xl font-bold text-primary-700 dark:text-primary-300">{result} {toUnit}</p>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
}
