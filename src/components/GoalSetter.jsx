import React, { useMemo, useState } from 'react';
import { Target, CalendarCheck2, Trophy } from 'lucide-react';

export default function GoalSetter() {
  const [goalType, setGoalType] = useState('Fat Loss');
  const [currentWeight, setCurrentWeight] = useState(80);
  const [targetWeight, setTargetWeight] = useState(72);
  const [workoutsPerWeek, setWorkoutsPerWeek] = useState(4);
  const [weeklySteps, setWeeklySteps] = useState(60000);

  const timelineWeeks = useMemo(() => {
    if (goalType === 'Fat Loss') {
      const kgDelta = Math.max(currentWeight - targetWeight, 0);
      return Math.ceil((kgDelta / 0.5) * 2); // 0.5 kg per 2 weeks heuristic
    }
    if (goalType === 'Muscle Gain') {
      const kgDelta = Math.max(targetWeight - currentWeight, 0);
      return Math.ceil((kgDelta / 0.25) * 4); // 0.25 kg per 4 weeks heuristic
    }
    return 8;
  }, [goalType, currentWeight, targetWeight]);

  const guidance = useMemo(() => {
    const tips = [];
    if (goalType === 'Fat Loss') {
      tips.push('Aim for a moderate calorie deficit (250–400 kcal/day).');
      tips.push('Prioritize protein (1.6–2.2 g/kg) and resistance training.');
      tips.push('Accumulate 7–10k steps/day to support energy expenditure.');
    } else if (goalType === 'Muscle Gain') {
      tips.push('Small surplus (150–300 kcal/day) with progressive overload.');
      tips.push('Protein 1.8–2.4 g/kg and sleep 7–9 hours.');
      tips.push('Train each muscle 2x/week with compound lifts.');
    } else {
      tips.push('Balance training across strength, cardio, and mobility.');
      tips.push('Keep intensity varied (easy, moderate, hard sessions).');
      tips.push('Consistent sleep and stress management improve recovery.');
    }
    if (workoutsPerWeek < 3) tips.push('Consider adding 1 short session to boost progress.');
    if (weeklySteps < 70000) tips.push('Try 1–2 quick walks after meals for extra steps.');
    return tips;
  }, [goalType, workoutsPerWeek, weeklySteps]);

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-rose-100 text-rose-600"><Target size={20} /></div>
        <h2 className="text-xl font-semibold">Goal Setting</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border bg-white space-y-3">
          <h3 className="font-medium">Your Goal</h3>
          <label className="space-y-1 text-sm">
            <span className="text-gray-600">Type</span>
            <select value={goalType} onChange={(e) => setGoalType(e.target.value)} className="w-full px-3 py-2 rounded-lg border">
              <option>Fat Loss</option>
              <option>Muscle Gain</option>
              <option>General Fitness</option>
            </select>
          </label>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <label className="space-y-1">
              <span className="text-gray-600">Current Weight (kg)</span>
              <input type="number" value={currentWeight} onChange={(e) => setCurrentWeight(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border" />
            </label>
            <label className="space-y-1">
              <span className="text-gray-600">Target Weight (kg)</span>
              <input type="number" value={targetWeight} onChange={(e) => setTargetWeight(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border" />
            </label>
            <label className="space-y-1">
              <span className="text-gray-600">Workouts / week</span>
              <input type="number" value={workoutsPerWeek} onChange={(e) => setWorkoutsPerWeek(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border" />
            </label>
            <label className="space-y-1">
              <span className="text-gray-600">Weekly Steps</span>
              <input type="number" value={weeklySteps} onChange={(e) => setWeeklySteps(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border" />
            </label>
          </div>
        </div>

        <div className="p-4 rounded-xl border bg-white space-y-3">
          <h3 className="font-medium flex items-center gap-2"><CalendarCheck2 size={18} className="text-indigo-500" /> Suggested Timeline</h3>
          <div className="p-3 rounded-lg bg-gray-50 border">
            <div className="text-gray-600 text-sm">Estimated duration</div>
            <div className="text-2xl font-semibold">{timelineWeeks} weeks</div>
          </div>
          <p className="text-sm text-gray-600">This projection adapts based on your target and habits. Stay consistent and reassess every 4–6 weeks.</p>
        </div>

        <div className="p-4 rounded-xl border bg-white space-y-3">
          <h3 className="font-medium flex items-center gap-2"><Trophy size={18} className="text-amber-500" /> Guidance</h3>
          <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
            {guidance.map((g, i) => (
              <li key={i}>{g}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
