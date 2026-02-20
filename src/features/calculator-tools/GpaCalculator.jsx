import { useState } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';

const gradePoints = { 'A+': 4.0, 'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7, 'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D+': 1.3, 'D': 1.0, 'F': 0.0 };

export default function GpaCalculator() {
    const [courses, setCourses] = useState([
        { name: '', grade: 'A', credits: '3' },
        { name: '', grade: 'B+', credits: '3' },
        { name: '', grade: 'A-', credits: '4' },
    ]);
    const [result, setResult] = useState(null);

    const addCourse = () => setCourses([...courses, { name: '', grade: 'A', credits: '3' }]);
    const removeCourse = (i) => setCourses(courses.filter((_, idx) => idx !== i));
    const update = (i, field, val) => {
        const updated = [...courses];
        updated[i][field] = val;
        setCourses(updated);
    };

    const calculate = () => {
        let totalPoints = 0, totalCredits = 0;
        for (const c of courses) {
            const credits = parseFloat(c.credits);
            if (isNaN(credits) || credits <= 0) continue;
            totalPoints += gradePoints[c.grade] * credits;
            totalCredits += credits;
        }
        if (totalCredits === 0) return;
        setResult({
            gpa: (totalPoints / totalCredits).toFixed(4),
            totalCredits,
            totalPoints: totalPoints.toFixed(2),
        });
    };

    return (
        <ToolLayout toolSlug="gpa-calculator">
            <div className="space-y-4">
                <div className="space-y-3">
                    {courses.map((course, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <input type="text" value={course.name} onChange={(e) => update(i, 'name', e.target.value)} placeholder={`Course ${i + 1}`} className="input-field text-sm flex-1" />
                            <select value={course.grade} onChange={(e) => update(i, 'grade', e.target.value)} className="input-field text-sm w-24">
                                {Object.keys(gradePoints).map(g => <option key={g} value={g}>{g}</option>)}
                            </select>
                            <input type="number" min="1" max="6" value={course.credits} onChange={(e) => update(i, 'credits', e.target.value)} placeholder="Cr" className="input-field text-sm w-20" />
                            {courses.length > 1 && <button onClick={() => removeCourse(i)} className="text-red-500 hover:text-red-600 text-lg">✕</button>}
                        </div>
                    ))}
                </div>
                <button onClick={addCourse} className="btn-secondary w-full text-sm">+ Add Course</button>
                <button onClick={calculate} className="btn-primary w-full">📈 Calculate GPA</button>
                {result && (
                    <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl text-center">
                            <div className="text-3xl font-bold text-primary-700 dark:text-primary-300">{result.gpa}</div>
                            <div className="text-xs text-surface-500 mt-1">GPA</div>
                        </div>
                        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl text-center">
                            <div className="text-2xl font-bold text-green-700 dark:text-green-300">{result.totalCredits}</div>
                            <div className="text-xs text-surface-500 mt-1">Total Credits</div>
                        </div>
                        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl text-center">
                            <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">{result.totalPoints}</div>
                            <div className="text-xs text-surface-500 mt-1">Quality Points</div>
                        </div>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
}
