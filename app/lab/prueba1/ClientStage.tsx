"use client";

import Link from 'next/link';
import React, { useState, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import DraggableWrapper from '@/components/lab/DraggableWrapper';
import Chronometer from '@/components/lab/Chronometer';
import TubeWithOilAndSphere from '@/components/lab/TubeWithOilAndSphere';
import DensityControl from '@/components/lab/DensityControl';
import DataRecord from '@/components/lab/DataRecord';
import { useLabContext } from '@/context/LabContext';

export default function ClientStage() {
  const { records } = useLabContext();
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent) => {
    // Si presiona la tecla Ctrl/Cmd o usa el click central (ruedita)
    if (e.ctrlKey || e.metaKey || e.button === 1) {
      e.preventDefault();
      setIsPanning(true);
      dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
      e.currentTarget.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPanning) return;
    setPan({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isPanning) {
      setIsPanning(false);
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-slate-50">
      {/* Header Fijo */}
      <header className="bg-white border-b h-14 flex items-center px-4 shrink-0 z-50 shadow-sm relative">
        <Link href="/" className="flex items-center text-slate-500 hover:text-blue-600 font-medium transition-colors">
          <ArrowLeft size={18} className="mr-2" />
          Volver al Inicio
        </Link>
        <div className="mx-auto font-bold text-slate-800 tracking-tight">
          Laboratorio: <span className="text-blue-600">Caída de esfera en aceite</span>
        </div>
        <div className="w-32" /> {/* Spacer para centrar el título */}
      </header>

      {/* Pizarra / Main Stage */}
      <main 
        className={`flex-1 relative overflow-hidden shadow-inner touch-none ${isPanning ? 'cursor-grabbing' : 'cursor-crosshair'}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          backgroundColor: '#f8fafc',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 15 11 L 15 19 M 11 15 L 19 15' stroke='%23e2e8f0' stroke-width='1.75' stroke-linecap='round'/%3E%3Ccircle cx='45' cy='15' r='1.75' fill='%23e2e8f0'/%3E%3Ccircle cx='15' cy='45' r='1.75' fill='%23e2e8f0'/%3E%3Ccircle cx='45' cy='45' r='1.75' fill='%23e2e8f0'/%3E%3C/svg%3E")`,
          backgroundPosition: `${pan.x}px ${pan.y}px`
        }}
      >

        {/* Capa que se traslada con el paneo */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ transform: `translate(${pan.x}px, ${pan.y}px)` }}
        >
          {/* Reactivamos los pointer events solo en los contenidos arrastrables */}
          <div className="pointer-events-auto">
            <DraggableWrapper initialX={100} initialY={100}>
              <Chronometer />
            </DraggableWrapper>

            <DraggableWrapper initialX={500} initialY={100}>
              <TubeWithOilAndSphere />
            </DraggableWrapper>
          </div>
        </div>

        {/* UI Fija Inmune al Paneo (Cesta a la derecha) */}
        <div className="absolute right-6 top-6 flex flex-col gap-3 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2 pb-4 z-40 pointer-events-auto">
          {records.map(record => (
            <DataRecord key={record.id} record={record} />
          ))}
        </div>

        <div className="pointer-events-auto">
          <DensityControl />
        </div>
      </main>
    </div>
  );
}
