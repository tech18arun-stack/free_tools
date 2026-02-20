import { useState } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';

export default function BudgetPlanner() {
    const [income, setIncome] = useState(5000);
    const [expenses, setExpenses] = useState([
        { name: 'Rent/Mortgage', amount: 1500, category: 'housing' },
        { name: 'Groceries', amount: 400, category: 'food' },
        { name: 'Utilities', amount: 200, category: 'utilities' },
    ]);
    const [newExpense, setNewExpense] = useState({ name: '', amount: '', category: 'other' });

    const addExpense = () => {
        if (!newExpense.name || !newExpense.amount) return;
        setExpenses([...expenses, { ...newExpense, amount: Number(newExpense.amount) }]);
        setNewExpense({ name: '', amount: '', category: 'other' });
    };

    const removeExpense = (index) => {
        setExpenses(expenses.filter((_, i) => i !== index));
    };

    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const remaining = income - totalExpenses;
    const savingsRate = ((remaining / income) * 100).toFixed(1);

    const categories = {
        housing: '🏠 Housing',
        food: '🍔 Food',
        transportation: '🚗 Transportation',
        utilities: '💡 Utilities',
        entertainment: '🎬 Entertainment',
        healthcare: '🏥 Healthcare',
        shopping: '🛍️ Shopping',
        other: '📦 Other'
    };

    return (
        <ToolLayout toolSlug="budget-planner">
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Monthly Income ($)</label>
                    <input
                        type="number"
                        value={income}
                        onChange={(e) => setIncome(Number(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900"
                    />
                </div>

                <div className="space-y-3">
                    <h3 className="font-semibold text-surface-900 dark:text-white">Expenses</h3>
                    {expenses.map((expense, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-surface-50 dark:bg-surface-800 rounded-xl">
                            <span className="text-xl">{categories[expense.category]}</span>
                            <div className="flex-1">
                                <div className="font-medium">{expense.name}</div>
                                <div className="text-sm text-surface-500">{categories[expense.category]}</div>
                            </div>
                            <div className="font-semibold">${expense.amount.toFixed(2)}</div>
                            <button
                                onClick={() => removeExpense(index)}
                                className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>

                <div className="flex gap-3">
                    <input
                        type="text"
                        placeholder="Expense name"
                        value={newExpense.name}
                        onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
                        className="flex-1 px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900"
                    />
                    <input
                        type="number"
                        placeholder="Amount"
                        value={newExpense.amount}
                        onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                        className="w-32 px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900"
                    />
                    <select
                        value={newExpense.category}
                        onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                        className="px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900"
                    >
                        {Object.entries(categories).map(([key, label]) => (
                            <option key={key} value={key}>{label}</option>
                        ))}
                    </select>
                    <button onClick={addExpense} className="btn-primary">Add</button>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-surface-200 dark:border-surface-700">
                    <div className="text-center">
                        <div className="text-sm text-surface-600 dark:text-surface-400 mb-1">Income</div>
                        <div className="text-2xl font-bold text-green-600">${income.toFixed(2)}</div>
                    </div>
                    <div className="text-center">
                        <div className="text-sm text-surface-600 dark:text-surface-400 mb-1">Expenses</div>
                        <div className="text-2xl font-bold text-red-600">${totalExpenses.toFixed(2)}</div>
                    </div>
                    <div className="text-center">
                        <div className="text-sm text-surface-600 dark:text-surface-400 mb-1">Remaining</div>
                        <div className={`text-2xl font-bold ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            ${remaining.toFixed(2)}
                        </div>
                    </div>
                </div>

                {remaining >= 0 && (
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                        <div className="text-center text-green-700 dark:text-green-300">
                            You can save <span className="font-bold">{savingsRate}%</span> of your income
                        </div>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
}
