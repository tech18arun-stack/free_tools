import { useState } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';

export default function CgpaCalculator() {
    const [semesters, setSemesters] = useState([{ gpa: '', credits: '' }, { gpa: '', credits: '' }]);
    const [result, setResult] = useState(null);

    const addSemester = () => setSemesters([...semesters, { gpa: '', credits: '' }]);
    const removeSemester = (i) => setSemesters(semesters.filter((_, idx) => idx !== i));
    const update = (i, field, val) => {
        const updated = [...semesters];
        updated[i][field] = val;
        setSemesters(updated);
    };

    const calculate = () => {
        let totalPoints = 0, totalCredits = 0;
        for (const sem of semesters) {
            const gpa = parseFloat(sem.gpa);
            const credits = parseFloat(sem.credits);
            if (!isNaN(gpa) && !isNaN(credits) && credits > 0) {
                totalPoints += gpa * credits;
                totalCredits += credits;
            }
        }
        if (totalCredits === 0) { setResult(null); return; }
        setResult({
            cgpa: (totalPoints / totalCredits).toFixed(4),
            totalCredits,
            percentage: ((totalPoints / totalCredits) * 9.5).toFixed(2),
        });
    };

    return (
        <ToolLayout toolSlug="cgpa-calculator">
            <div className="space-y-4">
                <p className="text-sm text-surface-500">Enter your GPA and credits for each semester to calculate your CGPA.</p>
                {semesters.map((sem, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <span className="text-sm font-medium text-surface-400 w-16">Sem {i + 1}</span>
                        <input type="number" step="0.01" min="0" max="10" value={sem.gpa} onChange={(e) => update(i, 'gpa', e.target.value)} placeholder="GPA" className="input-field text-sm flex-1" />
                        <input type="number" min="0" value={sem.credits} onChange={(e) => update(i, 'credits', e.target.value)} placeholder="Credits" className="input-field text-sm flex-1" />
                        {semesters.length > 2 && (
                            <button onClick={() => removeSemester(i)} className="text-red-500 hover:text-red-600 text-lg">✕</button>
                        )}
                    </div>
                ))}
                <button onClick={addSemester} className="btn-secondary w-full text-sm">+ Add Semester</button>
                <button onClick={calculate} className="btn-primary w-full">🎓 Calculate CGPA</button>
                {result && (
                    <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl text-center">
                            <div className="text-2xl font-bold text-primary-700 dark:text-primary-300">{result.cgpa}</div>
                            <div className="text-xs text-surface-500 mt-1">CGPA</div>
                        </div>
                        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl text-center">
                            <div className="text-2xl font-bold text-green-700 dark:text-green-300">{result.percentage}%</div>
                            <div className="text-xs text-surface-500 mt-1">Percentage (×9.5)</div>
                        </div>
                        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl text-center">
                            <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">{result.totalCredits}</div>
                            <div className="text-xs text-surface-500 mt-1">Total Credits</div>
                        </div>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
}
