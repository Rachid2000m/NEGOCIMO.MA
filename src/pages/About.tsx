import { motion } from 'motion/react';
import WhyUsSection from '@/components/home/WhyUsSection';
import { useSettingsStore } from '@/store/useSettingsStore';

export default function About() {
  const { settings } = useSettingsStore();

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
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto mt-16 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <h2 className="text-2xl md:text-4xl font-bold font-heading text-navy mb-6">
              {settings?.aboutTitle || "Notre Histoire"}
            </h2>
            <div className="text-lg text-text-secondary leading-relaxed space-y-4 whitespace-pre-wrap">
              {settings?.aboutText || "NEGOCIMO est né d'une vision claire : transformer les espaces professionnels en environnements d'exception.\n\nForte de plus de 10 ans d'expérience, notre équipe accompagne les entreprises, hôtels, hôpitaux et institutions dans le choix et la mise en place de revêtements, faux plafonds et mobiliers adaptés à leurs exigences les plus strictes.\n\nNous sélectionnons rigoureusement nos partenaires et matériaux pour garantir une durabilité et une esthétique irréprochables, tout en respectant les normes acoustiques et d'hygiène de chaque secteur."}
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[400px]">
             <img 
               src={settings?.aboutImage || "https://images.unsplash.com/photo-1549692443-43e93a77f37f?auto=format&fit=crop&q=80&w=800"} 
               alt="About us" 
               className="w-full h-full object-cover"
             />
          </div>
        </div>
      </div>

      <WhyUsSection />
    </div>
  );
}
