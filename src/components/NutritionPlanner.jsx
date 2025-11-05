import React, { useMemo, useState } from 'react';
import { UtensilsCrossed, Flame, Plus, Trash2 } from 'lucide-react';

function kcal(total) {
  return `${total.toLocaleString()} kcal`;
}

export default function NutritionPlanner() {
  const [goal, setGoal] = useState('Maintain');
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(175);
  const [age, setAge] = useState(28);
  const [sex, setSex] = useState('Male');
  const [meals, setMeals] = useState([
    { id: 1, name: 'Breakfast — Oats & Eggs', calories: 420 },
    { id: 2, name: 'Lunch — Chicken Salad', calories: 560 }
  ]);

  const bmr = useMemo(() => {
    // Mifflin-St Jeor estimate
    const s = sex === 'Male' ? 5 : -161;
    return Math.round(10 * weight + 6.25 * height - 5 * age + s);
  }, [weight, height, age, sex]);

  const targetCalories = useMemo(() => {
    const maintenance = Math.round(bmr * 1.4);
    if (goal === 'Lose') return maintenance - 300;
    if (goal === 'Gain') return maintenance + 300;
    return maintenance;
  }, [bmr, goal]);

  const consumed = meals.reduce((sum, m) => sum + (Number(m.calories) || 0), 0);
  const remaining = Math.max(targetCalories - consumed, 0);

  const addMeal = () => {
    setMeals((m) => [
      ...m,
      { id: Date.now(), name: 'New Meal', calories: 0 }
    ]);
  };

  const updateMeal = (id, key, value) => {
    setMeals((m) => m.map((it) => (it.id === id ? { ...it, [key]: value } : it)));
  };

  const removeMeal = (id) => setMeals((m) => m.filter((it) => it.id !== id));

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-emerald-100 text-emerald-600"><UtensilsCrossed size={20} /></div>
        <h2 className="text-xl font-semibold">Nutrition Planner</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-3 p-4 rounded-xl border bg-white">
          <h3 className="font-medium">Your Profile</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <label className="space-y-1">
              <span className="text-gray-600">Weight (kg)</span>
              <input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border" />
            </label>
            <label className="space-y-1">
              <span className="text-gray-600">Height (cm)</span>
              <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border" />
            </label>
            <label className="space-y-1">
              <span className="text-gray-600">Age</span>
              <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border" />
            </label>
            <label className="space-y-1">
              <span className="text-gray-600">Sex</span>
              <select value={sex} onChange={(e) => setSex(e.target.value)} className="w-full px-3 py-2 rounded-lg border">
                <option>Male</option>
                <option>Female</option>
              </select>
            </label>
            <label className="col-span-2 space-y-1">
              <span className="text-gray-600">Goal</span>
              <select value={goal} onChange={(e) => setGoal(e.target.value)} className="w-full px-3 py-2 rounded-lg border">
                <option>Lose</option>
                <option>Maintain</option>
                <option>Gain</option>
              </select>
            </label>
          </div>
        </div>

        <div className="space-y-3 p-4 rounded-xl border bg-white">
          <h3 className="font-medium flex items-center gap-2"><Flame size={18} className="text-orange-500" /> Calories</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="p-3 rounded-lg bg-gray-50 border">
              <div className="text-gray-600">BMR</div>
              <div className="text-lg font-semibold">{kcal(bmr)}</div>
            </div>
            <div className="p-3 rounded-lg bg-gray-50 border">
              <div className="text-gray-600">Daily Target</div>
              <div className="text-lg font-semibold">{kcal(targetCalories)}</div>
            </div>
            <div className="p-3 rounded-lg bg-gray-50 border">
              <div className="text-gray-600">Consumed</div>
              <div className="text-lg font-semibold">{kcal(consumed)}</div>
            </div>
            <div className="p-3 rounded-lg bg-gray-50 border">
              <div className="text-gray-600">Remaining</div>
              <div className="text-lg font-semibold">{kcal(remaining)}</div>
            </div>
          </div>
        </div>

        <div className="space-y-3 p-4 rounded-xl border bg-white">
          <h3 className="font-medium">Tips</h3>
          <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
            <li>Prioritize protein at each meal to support recovery.</li>
            <li>Plan snacks ahead to avoid impulsive choices.</li>
            <li>Stay hydrated: aim for 30–35 ml/kg bodyweight/day.</li>
            <li>Eat 80% whole foods, 20% flexibility for sustainability.</li>
          </ul>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Your Meals</h3>
          <button onClick={addMeal} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700">
            <Plus size={16} /> Add meal
          </button>
        </div>

        <div className="space-y-3">
          {meals.map((m) => (
            <div key={m.id} className="flex items-center gap-3 p-3 rounded-xl border bg-white">
              <input
                className="flex-1 px-3 py-2 rounded-lg border"
                value={m.name}
                onChange={(e) => updateMeal(m.id, 'name', e.target.value)}
              />
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  className="w-28 px-3 py-2 rounded-lg border"
                  value={m.calories}
                  onChange={(e) => updateMeal(m.id, 'calories', Number(e.target.value))}
                />
                <span className="text-sm text-gray-600">kcal</span>
              </div>
              <button onClick={() => removeMeal(m.id)} className="p-2 rounded-lg border hover:bg-gray-50 text-gray-600">
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
