import { CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useSettingsStore } from '@/store/useSettingsStore';

export default function WhyUsSection() {
  const { settings } = useSettingsStore();
  const defaultImage = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000";
  const points = [
    "Expertise terrain & conseil personnalisé à chaque étape",
    "Matériaux certifiés de qualité supérieure (normes ISO/CE)",
    "Respect strict des délais d'exécution et du budget initial"
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6 text-navy leading-tight">
              Pourquoi choisir NEGOCI<span className="text-gold">MO</span> pour vos projets ?
            </h2>
            <p className="text-text-secondary text-lg mb-8 leading-relaxed">
              Nous ne sommes pas de simples fournisseurs. Nous sommes vos partenaires pour la conception et l'exécution d'espaces professionnels qui reflètent l'excellence de votre marque.
            </p>
            
            <ul className="space-y-6 mb-10">
              {points.map((point, i) => (
                <li key={i} className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-gold shrink-0 mt-1" />
                  <span className="text-navy font-semibold text-lg">{point}</span>
                </li>
              ))}
            </ul>
            
          <Button render={<Link to="/a-propos" />} className="bg-navy hover:bg-navy-light text-white px-8 py-6 text-base">
            En savoir plus sur NEGOCIMO
          </Button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 relative"
          >
            {/* Geometric golden shape background */}
            <div className="absolute -inset-4 bg-gold/10 rounded-3xl transform rotate-3 scale-105 -z-10" />
            
            <img 
              src={settings?.whyUsImage || defaultImage} 
              alt="Équipe NEGOCIMO sur le terrain" 
              className="rounded-3xl shadow-2xl object-cover aspect-[4/3] w-full"
            />
            
            {/* Floating badge */}
            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl border border-border hidden md:flex items-center gap-4">
              <div className="bg-gold/20 text-gold p-3 rounded-full">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <p className="font-heading font-black text-2xl text-navy">500+</p>
                <p className="text-sm font-semibold text-text-secondary uppercase tracking-wider">Chantiers livrés</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
