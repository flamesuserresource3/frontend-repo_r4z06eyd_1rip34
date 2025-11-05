import React, { useState } from 'react';
import ExerciseLibrary from './components/ExerciseLibrary.jsx';
import NutritionPlanner from './components/NutritionPlanner.jsx';
import DeviceSync from './components/DeviceSync.jsx';
import GoalSetter from './components/GoalSetter.jsx';
import { Activity, UtensilsCrossed, Watch, Target } from 'lucide-react';

export default function App() {
  const tabs = [
    { id: 'exercises', label: 'Exercises', icon: Activity },
    { id: 'nutrition', label: 'Nutrition', icon: UtensilsCrossed },
    { id: 'device', label: 'Devices', icon: Watch },
    { id: 'goals', label: 'Goals', icon: Target }
  ];
  const [active, setActive] = useState('exercises');

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900">
      <header className="sticky top-0 z-10 backdrop-blur bg-white/70 border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-indigo-600 text-white grid place-items-center font-bold">FB</div>
            <div>
              <h1 className="font-semibold leading-tight">FitBuddy</h1>
              <p className="text-xs text-gray-500">Your all-in-one fitness companion</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-2">
            {tabs.map((t) => {
              const Icon = t.icon;
              const isActive = active === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActive(t.id)}
                  className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border ${isActive ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white hover:bg-gray-50'}`}
                >
                  <Icon size={16} /> {t.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <div className="md:hidden flex gap-2 overflow-auto pb-2">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = active === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg border ${isActive ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white'}`}
              >
                <Icon size={16} /> {t.label}
              </button>
            );
          })}
        </div>

        {active === 'exercises' && <ExerciseLibrary />}
        {active === 'nutrition' && <NutritionPlanner />}
        {active === 'device' && <DeviceSync />}
        {active === 'goals' && <GoalSetter />}

        <section className="p-4 rounded-2xl border bg-white">
          <h2 className="text-lg font-semibold mb-2">Learn & Grow</h2>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <article className="p-4 rounded-xl border bg-gray-50">
              <h3 className="font-medium">Strength Training Basics</h3>
              <p className="text-gray-600 mt-1">Focus on compound lifts, progressive overload, and proper recovery to build muscle and strength efficiently.</p>
            </article>
            <article className="p-4 rounded-xl border bg-gray-50">
              <h3 className="font-medium">Nutrition Foundations</h3>
              <p className="text-gray-600 mt-1">Balance protein, carbs, and fats. Choose minimally processed foods, eat enough fiber, and hydrate well.</p>
            </article>
            <article className="p-4 rounded-xl border bg-gray-50">
              <h3 className="font-medium">Habit Systems</h3>
              <p className="text-gray-600 mt-1">Start small, track consistently, and stack habits onto existing routines to make progress sustainable.</p>
            </article>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 text-center text-sm text-gray-600 bg-white/60">
        Built for your goals. Stay consistent and celebrate small wins.
      </footer>
    </div>
  );
}
