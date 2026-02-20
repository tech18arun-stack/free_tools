import { useState } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';

export default function CurrencyConverter() {
    const [amount, setAmount] = useState(100);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [result, setResult] = useState(null);

    const rates = {
        USD: 1,
        EUR: 0.92,
        GBP: 0.79,
        JPY: 149.50,
        CAD: 1.36,
        AUD: 1.53,
        CHF: 0.88,
        CNY: 7.19,
        INR: 83.12,
        MXN: 17.15,
        BRL: 4.97,
        ZAR: 18.92,
        SGD: 1.34,
        HKD: 7.82,
        NZD: 1.63,
        SEK: 10.42,
        NOK: 10.68,
        KRW: 1320.50,
        TRY: 30.85,
        RUB: 91.50
    };

    const convert = () => {
        const fromRate = rates[fromCurrency];
        const toRate = rates[toCurrency];
        const converted = (amount / fromRate) * toRate;
        setResult(converted);
    };

    const currencies = Object.keys(rates);

    return (
        <ToolLayout toolSlug="currency-converter">
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Amount</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">From</label>
                        <select
                            value={fromCurrency}
                            onChange={(e) => setFromCurrency(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900"
                        >
                            {currencies.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">To</label>
                        <select
                            value={toCurrency}
                            onChange={(e) => setToCurrency(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900"
                        >
                            {currencies.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <div className="flex items-end">
                        <button onClick={convert} className="btn-primary w-full">
                            💱 Convert
                        </button>
                    </div>
                </div>

                {result && (
                    <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800 text-center">
                        <div className="text-sm text-green-600 dark:text-green-400 mb-2">
                            {amount} {fromCurrency} =
                        </div>
                        <div className="text-4xl font-bold text-green-700 dark:text-green-300">
                            {result.toFixed(2)} {toCurrency}
                        </div>
                        <div className="text-sm text-green-600 dark:text-green-400 mt-2">
                            1 {fromCurrency} = {(rates[toCurrency] / rates[fromCurrency]).toFixed(4)} {toCurrency}
                        </div>
                    </div>
                )}

                <div className="mt-8">
                    <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">Supported Currencies</h3>
                    <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                        {currencies.map(currency => (
                            <div key={currency} className="p-2 bg-surface-50 dark:bg-surface-800 rounded-lg text-center text-sm font-medium">
                                {currency}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
