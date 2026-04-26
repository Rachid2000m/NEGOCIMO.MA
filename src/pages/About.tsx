import { motion } from 'motion/react';
import WhyUsSection from '@/components/home/WhyUsSection';

export default function About() {
  return (
    <div className="bg-background min-h-screen pb-24">
      {/* Banner */}
      <div className="bg-navy py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-white">
            <h1 className="text-3xl md:text-4xl font-bold font-heading mb-2">À propos de NEGOCIMO</h1>
            <p className="text-gray-300 text-sm md:text-base">Accueil &gt; À propos</p>
          </div>
        </div>
      </div>

      {/* About content */}
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto mt-16 max-w-4xl text-center">
        <h2 className="text-2xl md:text-4xl font-bold font-heading text-navy mb-6">Notre Histoire</h2>
        <p className="text-lg text-text-secondary leading-relaxed mb-12">
          NEGOCIMO est né d'une vision claire : transformer les espaces professionnels en environnements d'exception. Forte de plus de 10 ans d'expérience, notre équipe accompagne les entreprises, hôtels, hôpitaux et institutions dans le choix et la mise en place de revêtements, faux plafonds et mobiliers adaptés à leurs exigences les plus strictes.
        </p>
      </div>

      <WhyUsSection />
    </div>
  );
}
