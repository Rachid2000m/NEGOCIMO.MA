import { motion } from 'motion/react';
import RealisationsSection from '@/components/home/RealisationsSection';

export default function Projects() {
  return (
    <div className="bg-background min-h-screen pb-24">
      {/* Banner */}
      <div className="bg-navy py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-white">
            <h1 className="text-3xl md:text-4xl font-bold font-heading mb-2">Nos Réalisations</h1>
            <p className="text-gray-300 text-sm md:text-base">Accueil &gt; Réalisations</p>
          </div>
        </div>
      </div>

      {/* Realisations content */}
      <div className="mt-8">
        <RealisationsSection />
      </div>
    </div>
  );
}
