import React, { useMemo, useState } from 'react';
import { Dumbbell, Search, Filter } from 'lucide-react';

const EXERCISES = [
  {
    id: 'pushup',
    name: 'Push-Up',
    muscle: 'Chest',
    difficulty: 'Beginner',
    equipment: 'Bodyweight',
    image: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=1600&auto=format&fit=crop',
    instructions: [
      'Place hands slightly wider than shoulder-width on the floor.',
      'Keep a straight line from head to heels, core engaged.',
      'Lower chest toward floor until elbows are ~90°.',
      'Press back up while keeping elbows at a 45° angle.'
    ]
  },
  {
    id: 'squat',
    name: 'Bodyweight Squat',
    muscle: 'Legs',
    difficulty: 'Beginner',
    equipment: 'Bodyweight',
    image: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=1600&auto=format&fit=crop',
    instructions: [
      'Stand with feet shoulder-width apart.',
      'Sit back and down as if into a chair, chest up.',
      'Knees track over toes, weight in mid-foot/heels.',
      'Drive through heels to stand back up.'
    ]
  },
  {
    id: 'row',
    name: 'Dumbbell Row',
    muscle: 'Back',
    difficulty: 'Intermediate',
    equipment: 'Dumbbells',
    image: 'https://images.unsplash.com/photo-1734630341082-0fec0e10126c?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxEdW1iYmVsbCUyMFJvd3xlbnwwfDB8fHwxNzYyMzQzODU0fDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
    instructions: [
      'Hinge at hips with a flat back, dumbbell in one hand.',
      'Pull elbow toward hip, squeezing shoulder blade.',
      'Lower with control; avoid shrugging shoulder.'
    ]
  },
  {
    id: 'plank',
    name: 'Forearm Plank',
    muscle: 'Core',
    difficulty: 'Beginner',
    equipment: 'Bodyweight',
    image: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=1600&auto=format&fit=crop#plank',
    instructions: [
      'Elbows under shoulders, forearms on floor.',
      'Body in straight line, squeeze glutes and abs.',
      'Hold without letting hips sag or pike.'
    ]
  }
];

const MUSCLES = ['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core'];

export default function ExerciseLibrary() {
  const [query, setQuery] = useState('');
  const [muscle, setMuscle] = useState('All');

  const filtered = useMemo(() => {
    return EXERCISES.filter((ex) => {
      const matchesQuery = ex.name.toLowerCase().includes(query.toLowerCase());
      const matchesMuscle = muscle === 'All' || ex.muscle === muscle;
      return matchesQuery && matchesMuscle;
    });
  }, [query, muscle]);

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-indigo-100 text-indigo-600"><Dumbbell size={20} /></div>
        <h2 className="text-xl font-semibold">Exercise Library</h2>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2 flex-1 px-3 py-2 rounded-lg border bg-white">
          <Search size={18} className="text-gray-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search exercises..."
            className="w-full outline-none"
          />
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg border bg-white">
          <Filter size={18} className="text-gray-500" />
          <select
            value={muscle}
            onChange={(e) => setMuscle(e.target.value)}
            className="bg-transparent outline-none"
          >
            {MUSCLES.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((ex) => (
          <article key={ex.id} className="rounded-2xl overflow-hidden border bg-white shadow-sm hover:shadow-md transition">
            <div className="h-40 w-full overflow-hidden">
              <img src={ex.image} alt={ex.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{ex.name}</h3>
                <span className="text-xs px-2 py-1 rounded-full bg-indigo-50 text-indigo-600">{ex.difficulty}</span>
              </div>
              <p className="text-sm text-gray-600">Target: {ex.muscle} • Equipment: {ex.equipment}</p>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {ex.instructions.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center text-gray-500">No exercises found. Try a different search.</div>
      )}
    </section>
  );
}
