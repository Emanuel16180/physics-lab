import { useState, useEffect } from 'react';
import { useLabContext } from '@/context/LabContext';
import { RefreshCw } from 'lucide-react';

export default function TubeWithOilAndSphere() {
  const { oilDensity } = useLabContext();
  const [isReversed, setIsReversed] = useState(false);
  const [hasFlippedOnce, setHasFlippedOnce] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const tubeHeight = 600;
  const sphereSize = 20;
  const bottomPadding = 16;
  const maxTravel = tubeHeight - sphereSize - bottomPadding;

  const durationS = 4 + ((oilDensity - 800) / (950 - 800)) * (12 - 4);
  const durationMs = durationS * 1000;
  
  // Caída automática independiente del cronómetro
  useEffect(() => {
    if (!hasFlippedOnce) return;

    let startTime = performance.now();
    let animationFrameId: number;

    const animate = (time: number) => {
      let elapsed = time - startTime;
      let p = elapsed / durationMs;
      if (p >= 1) p = 1;
      setProgress(p);

      if (p < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isReversed, hasFlippedOnce, durationMs]);

  useEffect(() => {
    // Si la densidad se modifica en cualquier momento, se cancela la caída
    // y el tubo vuelve a su estado inicial: bolita asentada al fondo sin moverse.
    setIsReversed(false);
    setHasFlippedOnce(false);
    setProgress(0);
  }, [oilDensity]);

  // Al inicio (!hasFlippedOnce), forzamos que esté en el fondo (maxTravel).
  // Después del primer giro, la física respeta la dirección correspondiente propulsada por la animación local.
  const currentY = !hasFlippedOnce
    ? maxTravel
    : isReversed 
      ? maxTravel - (progress * maxTravel)
      : progress * maxTravel;

  const handleRotate = () => {
    if (!hasFlippedOnce) setHasFlippedOnce(true);
    setIsReversed((prev) => !prev);
  };

  return (
    <div className="relative flex flex-col items-center w-32 pb-4 group">
      
      {/* Botón para girar el tubo */}
      <button 
        onClick={handleRotate}
        className="absolute -right-6 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg border border-slate-200 text-slate-500 hover:text-blue-600 hover:scale-110 transition-all duration-300 z-30 opacity-0 group-hover:opacity-100"
        title="Girar Tubo 180°"
        data-no-drag="true"
      >
        <RefreshCw size={20} className={`transition-transform duration-700 ${isReversed ? 'rotate-180' : ''}`} />
      </button>

      <div className={`transition-transform duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform z-10 ${isReversed ? 'rotate-180' : ''}`}>
        
        {/* Tubo de Cristal (Estética limpia y elegante) */}
        <div 
          className="relative w-16 border-[3px] border-slate-400/60 rounded-full bg-white/30 backdrop-blur-md overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.15),inset_0_0_15px_rgba(255,255,255,0.4)]"
          style={{ height: tubeHeight }}
        >
          {/* Marcas de Medición */}
          <div className="absolute top-[120px] left-0 w-full flex justify-between px-[2px] z-20">
             <div className="w-3 h-[2px] bg-slate-600/70 rounded-full" />
             <div className="w-3 h-[2px] bg-slate-600/70 rounded-full" />
          </div>
          <div className="absolute bottom-[120px] left-0 w-full flex justify-between px-[2px] z-20">
             <div className="w-3 h-[2px] bg-slate-600/70 rounded-full" />
             <div className="w-3 h-[2px] bg-slate-600/70 rounded-full" />
          </div>

          {/* Fluido (Aceite sutil) */}
          <div className="absolute inset-0 bg-yellow-400/20 mix-blend-multiply rounded-full">
            {/* Esfera con sombras para profundidad limpia */}
            <div 
              className="absolute left-1/2 -translate-x-1/2 rounded-full border border-slate-500 z-10 transition-none shadow-[inset_-3px_-3px_6px_rgba(0,0,0,0.4),0_6px_8px_rgba(0,0,0,0.3)] bg-gradient-to-br from-slate-100 via-slate-400 to-slate-800"
              style={{ 
                width: sphereSize, 
                height: sphereSize,
                top: currentY + 8 
              }}
            />
          </div>

          {/* Brillo suave cristalino */}
          <div className="absolute inset-y-1 left-[15%] w-[12%] bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none rounded-full blur-[1px] z-30" />
        </div>
      </div>
    </div>
  );
}