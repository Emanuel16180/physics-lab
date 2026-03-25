import { LabProvider } from '@/context/LabContext';
import ClientStage from './ClientStage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Laboratorio: Caída en Aceite | Simulador de Física',
  description: 'Simula y estudia la caída de una esfera metálica en aceite, analizando efectos de viscosidad y densidad.',
};

export default function LabPage() {
  return (
    <LabProvider>
      <ClientStage />
    </LabProvider>
  );
}
