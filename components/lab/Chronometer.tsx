import { useLabContext } from '@/context/LabContext';
import { Play, Square, RotateCcw } from 'lucide-react';

export default function Chronometer() {
  const { isTimerRunning, currentTimeMs, startSimulation, stopSimulation, resetSimulation } = useLabContext();

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    const decimal = Math.floor(ms % 1000);

    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${decimal.toString().padStart(3, '0')}`;
  };

  return (
    <div className="bg-slate-900/40 backdrop-blur-md border border-slate-700/50 rounded-lg p-3 shadow-[0_8px_30px_rgb(0,0,0,0.12)] text-white w-48 flex flex-col items-center select-none cursor-move">
      <div className="text-[10px] font-bold mb-2 uppercase tracking-widest text-slate-400">Cronómetro</div>
      <div className="bg-slate-900/80 border border-slate-800 rounded-md px-3 py-1.5 w-full text-center mb-3 shadow-inner">
        <span className="font-mono text-xl font-bold text-cyan-400 font-tabular-nums tracking-wider drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">
          {formatTime(currentTimeMs)}
        </span>
      </div>
      <div className="flex gap-2 w-full">
        <button
          onClick={resetSimulation}
          className="w-10 bg-slate-800/50 hover:bg-slate-700/80 border border-slate-700/50 text-slate-300 hover:text-white rounded-md py-1.5 flex justify-center items-center transition-all shadow-sm"
          title="Reiniciar"
        >
          <RotateCcw size={16} />
        </button>
        <button
          onClick={isTimerRunning ? stopSimulation : startSimulation}
          className={`flex-1 rounded-md py-1.5 flex justify-center items-center font-bold text-sm transition-all shadow-md border ${isTimerRunning
            ? 'bg-rose-600 hover:bg-rose-500 text-white border-rose-500 shadow-[0_0_12px_rgba(225,29,72,0.4)]'
            : 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.4)]'
            }`}
        >
          {isTimerRunning ? (
            <><Square size={14} className="mr-2 fill-current" /> Pausa</>
          ) : (
            <><Play size={14} className="mr-2 fill-current" /> Inicio</>
          )}
        </button>
      </div>
    </div>
  );
}
