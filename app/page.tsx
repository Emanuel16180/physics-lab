import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-bold text-slate-800">Simulador de Laboratorios de Física</h1>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Barra Lateral: Temas */}
          <div className="md:col-span-1 space-y-4">
            <h2 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-wider">Temas</h2>

            <div className="bg-blue-600 text-white rounded-xl p-4 shadow-sm font-medium cursor-pointer transition-transform hover:scale-105">
              Teoría de Errores
            </div>
          </div>

          {/* Contenido Principal: Laboratorios Disponibles */}
          <div className="md:col-span-3">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Laboratorios Disponibles</h2>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 transform group">
              <div className="flex flex-col sm:flex-row">
                {/* Ilustración SVG Minimalista */}
                <div className="w-full sm:w-1/3 bg-slate-50 flex items-center justify-center p-8 border-r border-slate-100 group-hover:bg-blue-50 transition-colors">
                  <svg width="140" height="140" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform group-hover:scale-110 transition-transform duration-500">
                    <rect x="30" y="10" width="40" height="80" rx="6" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="3" />
                    <rect x="33" y="30" width="34" height="57" fill="#38BDF8" opacity="0.3" />
                    <circle cx="50" cy="50" r="10" fill="#475569" />
                    <line x1="15" y1="20" x2="30" y2="20" stroke="#94A3B8" strokeWidth="2" strokeDasharray="2 2" />
                    <line x1="15" y1="80" x2="30" y2="80" stroke="#94A3B8" strokeWidth="2" strokeDasharray="2 2" />
                    <path d="M50 50 L50 70 M45 65 L50 70 L55 65" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                {/* Detalles y Call to Action */}
                <div className="w-full sm:w-2/3 p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-bold uppercase tracking-wider">Teoría de Errores</span>
                      <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded font-bold uppercase tracking-wider">Medición de Magnitudes</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-3">Medición del Tiempo de caída de una esfera en un medio viscoso</h3>
                    <p className="text-slate-600 leading-relaxed mb-6">
                      Simula la caída de una esfera metálica en un tubo lleno de aceite bajo gravedad terrestre. Estudia y registra el efecto de la viscosidad y la densidad en el tiempo de caída libre hasta el fondo.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <Link href="/lab/prueba1" className="inline-flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-md hover:shadow-blue-500/30">
                      Entrar al Laboratorio
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
