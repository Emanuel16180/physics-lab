"use client";

import React, { createContext, useContext, useState, useRef, ReactNode, useEffect } from 'react';

// Tipos
export interface RecordEntry {
  id: string;
  iteration: number;
  timeSeconds: number;
  x: number;
  y: number;
}

interface LabContextType {
  isTimerRunning: boolean;
  currentTimeMs: number;
  oilDensity: number;
  records: RecordEntry[];
  startSimulation: () => void;
  stopSimulation: () => void;
  resetSimulation: () => void;
  setOilDensity: (density: number) => void;
  updateRecordPosition: (id: string, x: number, y: number) => void;
  removeRecord: (id: string) => void;
}

const LabContext = createContext<LabContextType | undefined>(undefined);

export function LabProvider({ children }: { children: ReactNode }) {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [currentTimeMs, setCurrentTimeMs] = useState(0);
  const [oilDensity, setOilDensity] = useState(870);
  const [records, setRecords] = useState<RecordEntry[]>([]);
  
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const iterationCounter = useRef<number>(1);

  const startSimulation = () => {
    if (isTimerRunning) return;
    setIsTimerRunning(true);
    startTimeRef.current = performance.now() - currentTimeMs;
    
    const updateTimer = () => {
      setCurrentTimeMs(performance.now() - startTimeRef.current);
      timerRef.current = requestAnimationFrame(updateTimer);
    };
    
    timerRef.current = requestAnimationFrame(updateTimer);
  };

  const stopSimulation = () => {
    if (!isTimerRunning) return;
    setIsTimerRunning(false);
    if (timerRef.current !== null) {
      cancelAnimationFrame(timerRef.current);
      timerRef.current = null;
    }
    
    // Al parar, creamos un registro automáticamente
    const timeInSeconds = currentTimeMs / 1000;
    const newRecord: RecordEntry = {
      id: Math.random().toString(36).substring(7),
      iteration: iterationCounter.current++,
      timeSeconds: timeInSeconds,
      // Aparece en una posición segura de la pantalla para ser arrastrada
      x: 100 + (iterationCounter.current * 10) % 200, 
      y: 100 + (iterationCounter.current * 10) % 200,
    };
    setRecords((prev) => [...prev, newRecord]);
  };

  const resetSimulation = () => {
    setIsTimerRunning(false);
    if (timerRef.current !== null) {
      cancelAnimationFrame(timerRef.current);
      timerRef.current = null;
    }
    setCurrentTimeMs(0);
  };

  const updateRecordPosition = (id: string, x: number, y: number) => {
    setRecords(prev => prev.map(rec => rec.id === id ? { ...rec, x, y } : rec));
  };

  const removeRecord = (id: string) => {
    setRecords(prev => {
      const filtered = prev.filter(rec => rec.id !== id);
      // Re-indexar iteraciones
      filtered.forEach((rec, idx) => {
        rec.iteration = idx + 1;
      });
      iterationCounter.current = filtered.length + 1;
      return filtered;
    });
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        cancelAnimationFrame(timerRef.current);
      }
    };
  }, []);

  return (
    <LabContext.Provider value={{
      isTimerRunning,
      currentTimeMs,
      oilDensity,
      records,
      startSimulation,
      stopSimulation,
      resetSimulation,
      setOilDensity,
      updateRecordPosition,
      removeRecord
    }}>
      {children}
    </LabContext.Provider>
  );
}

export function useLabContext() {
  const context = useContext(LabContext);
  if (context === undefined) {
    throw new Error('useLabContext must be used within a LabProvider');
  }
  return context;
}
