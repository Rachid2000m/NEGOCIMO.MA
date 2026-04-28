import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useSettingsStore } from '@/store/useSettingsStore';

export default function HeroSection() {
  const settings = useSettingsStore(state => state.settings);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-start bg-navy text-white overflow-hidden">
      {/* Background image fallback (could be video) */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url("${settings?.heroImage || 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop'}")` }}
      />
      
      {/* Overlay gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-transparent z-10" />
      
      <div className="container relative z-20 px-4 sm:px-6 lg:px-8 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <span className="inline-block py-1 px-3 border border-gold/30 bg-gold/10 text-gold font-bold tracking-widest text-xs uppercase mb-6 rounded-full">
            Expert B2B en Aménagement
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold whitespace-pre-line mb-6 leading-[1.1] font-heading">
            {settings?.heroTitle || "Transformez vos espaces professionnels en environnements d'exception"}
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl mb-10 opacity-90 text-gray-200 font-light max-w-2xl leading-relaxed">
            {settings?.heroSubtitle || "NEGOCIMO vous accompagne dans tous vos projets d'aménagement — revêtements, faux plafonds, mobilier sur-mesure."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button render={<Link to="/contact" />} className="bg-gold hover:bg-gold-light text-white font-bold px-8 py-7 text-base rounded-md shadow-lg transition-all" size="lg">
              Demander un devis
            </Button>
            <Button render={<Link to="/realisations" />} variant="outline" className="border-white text-navy hover:bg-white hover:text-navy px-8 py-7 text-base font-bold rounded-md transition-all bg-white/10 backdrop-blur-sm" size="lg">
              Voir nos réalisations
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
