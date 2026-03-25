import { useLabContext } from '@/context/LabContext';

export default function DensityControl() {
  const { oilDensity, setOilDensity, isTimerRunning } = useLabContext();

  return (
    <div className="fixed bottom-6 left-6 bg-white p-5 rounded-xl shadow-xl border border-slate-200 w-80 z-40" data-no-drag="true">
      <h3 className="text-lg font-bold text-slate-700 mb-4">Propiedades del Fluido</h3>
      
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-semibold text-slate-600">Densidad (kg/m³)</label>
        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded font-mono text-sm font-bold">
          {oilDensity}
        </span>
      </div>
      
      <input 
        type="range"
        min="800"
        max="950"
        step="1"
        value={oilDensity}
        onChange={(e) => setOilDensity(Number(e.target.value))}
        className="w-full accent-blue-600 cursor-pointer"
      />
      <div className="flex justify-between text-xs text-slate-400 mt-1 font-mono">
        <span>800 min</span>
        <span>950 max</span>
      </div>
    </div>
  );
}
