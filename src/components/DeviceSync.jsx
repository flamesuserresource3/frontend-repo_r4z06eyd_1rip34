import React, { useMemo, useState } from 'react';
import { Watch, Activity, RefreshCcw } from 'lucide-react';

const BRANDS = ['Fitbit', 'Garmin', 'Apple Watch', 'Samsung Galaxy Watch'];

export default function DeviceSync() {
  const [brand, setBrand] = useState('Fitbit');
  const [connected, setConnected] = useState(false);
  const [steps, setSteps] = useState(6500);
  const [avgHr, setAvgHr] = useState(92);
  const [duration, setDuration] = useState(45); // minutes of activity

  const calories = useMemo(() => {
    // A very rough estimate for demo purposes using MET-like approximation
    // kcal ≈ (0.035*W + (V^2/height)*0.029*W + 0.0053*W*speed) * time
    // Here we fake with steps + HR
    const intensity = Math.min(Math.max((avgHr - 60) / 100, 0.2), 1.5); // 0.2 to 1.5
    const stepFactor = steps / 12000; // normalized to 12k steps
    const base = 180; // base session burn
    return Math.round(base + 300 * intensity + 220 * stepFactor + (duration - 30) * 6);
  }, [steps, avgHr, duration]);

  const handleConnect = () => {
    // Simulate connection flow
    setConnected(true);
  };

  const handleDisconnect = () => {
    setConnected(false);
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-sky-100 text-sky-600"><Watch size={20} /></div>
        <h2 className="text-xl font-semibold">Fitness Band Sync</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl border bg-white space-y-3">
          <h3 className="font-medium">Device</h3>
          <div className="flex items-center gap-3">
            <select value={brand} onChange={(e) => setBrand(e.target.value)} className="px-3 py-2 rounded-lg border">
              {BRANDS.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
            {!connected ? (
              <button onClick={handleConnect} className="px-3 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700">Connect</button>
            ) : (
              <button onClick={handleDisconnect} className="px-3 py-2 rounded-lg border">Disconnect</button>
            )}
          </div>
          <p className="text-sm text-gray-600">Connect to your wearable to import steps, heart rate, and workouts. This demo simulates a connection for preview.</p>
        </div>

        <div className="p-4 rounded-xl border bg-white space-y-3">
          <h3 className="font-medium flex items-center gap-2"><Activity size={18} className="text-red-500" /> Session Summary</h3>
          <div className="grid grid-cols-3 gap-3 text-sm">
            <label className="space-y-1">
              <span className="text-gray-600">Steps</span>
              <input type="number" value={steps} onChange={(e) => setSteps(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border" />
            </label>
            <label className="space-y-1">
              <span className="text-gray-600">Avg HR</span>
              <input type="number" value={avgHr} onChange={(e) => setAvgHr(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border" />
            </label>
            <label className="space-y-1">
              <span className="text-gray-600">Duration (min)</span>
              <input type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border" />
            </label>
          </div>

          <div className="p-3 rounded-lg bg-gray-50 border flex items-center justify-between">
            <div>
              <div className="text-gray-600 text-sm">Estimated Burn</div>
              <div className="text-lg font-semibold">{calories.toLocaleString()} kcal</div>
            </div>
            <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border bg-white hover:bg-gray-50">
              <RefreshCcw size={16} /> Recalculate
            </button>
          </div>

          <p className="text-xs text-gray-500">Estimates are for guidance only. Actual burn varies by physiology and device algorithms.</p>
        </div>
      </div>
    </section>
  );
}
