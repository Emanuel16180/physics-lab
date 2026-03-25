"use client";

import React, { useState, useRef, useEffect } from 'react';

interface DraggableWrapperProps {
  children: React.ReactNode;
  initialX?: number;
  initialY?: number;
  onPositionChange?: (x: number, y: number) => void;
  className?: string;
}

export default function DraggableWrapper({ 
  children, 
  initialX = 0, 
  initialY = 0,
  onPositionChange,
  className = ""
}: DraggableWrapperProps) {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Sync with initial position if needed (useful for controlled components)
  useEffect(() => {
    setPosition({ x: initialX, y: initialY });
  }, [initialX, initialY]);

  const handlePointerDown = (e: React.PointerEvent) => {
    // Si estuviéramos interactuando con botones/inputs dentro no arrastramos
    if ((e.target as HTMLElement).closest('button, input, [data-no-drag="true"]')) {
      return;
    }
    
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    dragStartPos.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    
    // Evitar que el texto se seleccione accidentalmente
    e.preventDefault();

    const newX = e.clientX - dragStartPos.current.x;
    const newY = e.clientY - dragStartPos.current.y;
    
    setPosition({ x: newX, y: newY });
    if (onPositionChange) {
      onPositionChange(newX, newY);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <div
      ref={wrapperRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{
        position: 'absolute',
        transform: `translate(${position.x}px, ${position.y}px)`,
        touchAction: 'none' // Evita scroll natural en móviles
      }}
      className={`
        ${isDragging ? 'cursor-grabbing z-50' : 'cursor-grab z-10'}
        select-none transition-shadow
        ${className}
      `}
    >
      {children}
    </div>
  );
}
