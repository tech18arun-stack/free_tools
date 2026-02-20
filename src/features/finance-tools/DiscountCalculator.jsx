import { useState } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';

export default function DiscountCalculator() {
    const [originalPrice, setOriginalPrice] = useState(100);
    const [discountType, setDiscountType] = useState('percent');
    const [discountValue, setDiscountValue] = useState(20);
    const [result, setResult] = useState(null);

    const calculate = () => {
        let discountAmount, finalPrice;
        
        if (discountType === 'percent') {
            discountAmount = originalPrice * (discountValue / 100);
        } else {
            discountAmount = discountValue;
        }
        
        finalPrice = originalPrice - discountAmount;

        setResult({
            discountAmount,
            finalPrice,
            savingsPercent: discountType === 'percent' ? discountValue : (discountAmount / originalPrice) * 100
        });
    };

    const formatCurrency = (num) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
    };

    return (
        <ToolLayout toolSlug="discount-calculator">
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Original Price ($)</label>
                    <input
                        type="number"
                        value={originalPrice}
                        onChange={(e) => setOriginalPrice(Number(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Discount Type</label>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setDiscountType('percent')}
                            className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
                                discountType === 'percent'
                                    ? 'bg-accent-600 text-white'
                                    : 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300'
                            }`}
                        >
                            Percentage (%)
                        </button>
                        <button
                            onClick={() => setDiscountType('fixed')}
                            className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
                                discountType === 'fixed'
                                    ? 'bg-accent-600 text-white'
                                    : 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300'
                            }`}
                        >
                            Fixed Amount ($)
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                        Discount {discountType === 'percent' ? '(%)' : '($)'}
                    </label>
                    <input
                        type="number"
                        value={discountValue}
                        onChange={(e) => setDiscountValue(Number(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900"
                    />
                </div>

                <button onClick={calculate} className="btn-primary w-full">
                    🏷️ Calculate Discount
                </button>

                {result && (
                    <div className="space-y-3">
                        <div className="flex justify-between p-3 bg-surface-50 dark:bg-surface-800 rounded-xl">
                            <span className="text-surface-600 dark:text-surface-400">Original Price</span>
                            <span className="font-semibold">{formatCurrency(result.originalPrice)}</span>
                        </div>
                        <div className="flex justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-xl">
                            <span className="text-red-600 dark:text-red-400">You Save</span>
                            <span className="font-semibold text-red-600 dark:text-red-400">{formatCurrency(result.discountAmount)}</span>
                        </div>
                        <div className="flex justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                            <span className="text-green-700 dark:text-green-300 font-medium">Final Price</span>
                            <span className="text-xl font-bold text-green-700 dark:text-green-300">{formatCurrency(result.finalPrice)}</span>
                        </div>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
}
