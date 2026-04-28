import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Phone, ArrowRight } from 'lucide-react';
import { useSettingsStore } from '@/store/useSettingsStore';

export default function CTASection() {
  const { settings } = useSettingsStore();

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-navy to-[#111A2E] -z-10" />
      
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gold/10 mix-blend-overlay skew-x-12 transform origin-top-right -z-10" />
      <div className="absolute bottom-0 left-0 w-1/3 h-64 bg-white/5 rounded-tr-full mix-blend-overlay -z-10" />

      <div className="container px-4 sm:px-6 lg:px-8 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block py-1 px-3 bg-gold/20 text-gold font-bold tracking-widest text-xs uppercase mb-6 rounded-full border border-gold/30">
            Passez à l'action
          </span>
          <h2 className="text-3xl md:text-5xl font-black font-heading mb-6 text-white max-w-3xl mx-auto leading-tight">
            {settings?.ctaTitle || "Vous avez un projet d'aménagement à concrétiser ?"}
          </h2>
          <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light">
            {settings?.ctaText || "Notre équipe d'experts est prête à analyser vos besoins et à vous fournir un devis détaillé sous 24h ouvrées."}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button render={<Link to="/contact"><span className="flex items-center">Demander un devis<ArrowRight className="ml-2 w-5 h-5" /></span></Link>} className="bg-gold hover:bg-gold-light text-navy text-lg font-bold px-8 py-7 shadow-xl w-full sm:w-auto h-auto transition-transform hover:-translate-y-1">
              Demander un devis
            </Button>
            <Button render={<a href={`tel:${settings?.phone || "+212600000000"}`}><span className="flex items-center"><Phone className="mr-2 w-5 h-5" />Nous appeler</span></a>} variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-navy text-lg font-bold px-8 py-7 w-full sm:w-auto h-auto transition-transform hover:-translate-y-1">
              Nous appeler
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
