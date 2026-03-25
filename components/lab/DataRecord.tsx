import { RecordEntry } from '@/context/LabContext';
import { useLabContext } from '@/context/LabContext';
import { X } from 'lucide-react';

export default function DataRecord({ record }: { record: RecordEntry }) {
  const { removeRecord } = useLabContext();
  
  return (
    <div className="bg-white border-2 border-slate-200 rounded-lg p-3 shadow-md flex items-center justify-between gap-4 w-48 group hover:border-blue-400 transition-colors">
      <div className="flex flex-col">
        <div className="text-slate-400 font-bold text-[10px] uppercase tracking-wider mb-1 select-none">
          Iteración {record.iteration}
        </div>
        <div className="font-mono text-cyan-600 font-bold text-lg leading-none select-none">
          {record.timeSeconds.toFixed(3)} s
        </div>
      </div>
      <button 
        onClick={() => removeRecord(record.id)}
        className="text-slate-300 hover:text-red-500 transition-colors p-1"
        title="Eliminar registro"
      >
        <X size={16} strokeWidth={3} />
      </button>
    </div>
  );
}
