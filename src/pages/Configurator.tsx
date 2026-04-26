import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Building2, Hotel, Stethoscope, GraduationCap, Store, Factory, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const spaces = [
  { id: 'bureaux', label: 'Bureaux', icon: Building2 },
  { id: 'hotel', label: 'Hôtel', icon: Hotel },
  { id: 'hopital', label: 'Hôpital / Clinique', icon: Stethoscope },
  { id: 'ecole', label: 'École / Université', icon: GraduationCap },
  { id: 'commerce', label: 'Commerce / Retail', icon: Store },
  { id: 'industrie', label: 'Industrie', icon: Factory },
];

export default function Configurator() {
  const [step, setStep] = useState(1);
  const [space, setSpace] = useState<string | null>(null);

  const handleNext = () => setStep(s => Math.min(s + 1, 4));
  const handlePrev = () => setStep(s => Math.max(s - 1, 1));

  return (
    <div className="bg-background min-h-screen pb-24">
      {/* Banner */}
      <div className="bg-navy py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center text-white">
          <h1 className="text-3xl md:text-4xl font-bold font-heading mb-2">Configurateur de Projet</h1>
          <p className="text-gray-300">Trouvez les solutions les plus adaptées en 3 étapes simples.</p>
        </div>
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 mx-auto mt-12 max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">
            <span className={step >= 1 ? 'text-navy' : ''}>1. Espace</span>
            <span className={step >= 2 ? 'text-navy' : ''}>2. Usage</span>
            <span className={step >= 3 ? 'text-navy' : ''}>3. Surface</span>
            <span className={step >= 4 ? 'text-navy' : ''}>4. Résultats</span>
          </div>
          <div className="h-2 bg-border rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gold"
              initial={{ width: 0 }}
              animate={{ width: `${(step / 4) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-border p-8 md:p-12 min-h-[400px] relative">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold font-heading text-navy mb-8 text-center">Quel type d'espace souhaitez-vous aménager ?</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {spaces.map(s => {
                    const Icon = s.icon;
                    const isSelected = space === s.id;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setSpace(s.id)}
                        className={`p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-4 ${isSelected ? 'border-gold bg-gold/5 text-navy' : 'border-border bg-white text-text-secondary hover:border-navy hover:text-navy'}`}
                      >
                        <Icon className={`w-8 h-8 ${isSelected ? 'text-gold' : ''}`} />
                        <span className="font-bold font-heading text-sm text-center">{s.label}</span>
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold font-heading text-navy mb-8 text-center">Quel est l'usage principal de cet espace ?</h2>
                <p className="text-center text-text-secondary mb-8">Sélectionnez les zones concernées par votre projet (choix multiple possible).</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Mock options based on space selection */}
                  {["Accueil / Hall d'entrée", "Espace de travail ouvert", "Salle de réunion", "Couloirs et circulations", "Espace de restauration"].map((usage, i) => (
                     <label key={i} className="flex items-center gap-4 p-4 border border-border rounded-xl cursor-pointer hover:border-gold transition-colors">
                       <input type="checkbox" className="w-5 h-5 text-gold rounded border-gray-300 focus:ring-gold" />
                       <span className="font-medium text-navy">{usage}</span>
                     </label>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-xl mx-auto"
              >
                <h2 className="text-2xl font-bold font-heading text-navy mb-8 text-center">Quelques détails sur votre projet</h2>
                
                <div className="space-y-8">
                  <div>
                    <label className="block text-sm font-bold text-navy mb-2">Surface estimée (m²)</label>
                    <input type="range" min="10" max="5000" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gold" />
                    <div className="flex justify-between mt-2 text-sm text-text-secondary">
                      <span>10 m²</span>
                      <span className="font-bold text-navy">+5000 m²</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-navy mb-3">Délai souhaité</label>
                    <div className="flex flex-col gap-3">
                      {["Urgent (< 1 mois)", "Normal (1 - 3 mois)", "En planification (> 3 mois)"].map((delai, i) => (
                        <label key={i} className="flex items-center gap-3 cursor-pointer">
                          <input type="radio" name="delai" className="w-4 h-4 text-gold border-gray-300 focus:ring-gold" />
                          <span className="text-text-secondary">{delai}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h2 className="text-3xl font-bold font-heading text-navy mb-4">Vos recommandations sont prêtes !</h2>
                <p className="text-text-secondary mb-8">Basé sur vos critères, voici les solutions les plus adaptées à votre projet.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 text-left">
                  {/* Mock recommended products */}
                  <div className="flex gap-4 p-4 border border-border rounded-xl">
                    <img src="https://images.unsplash.com/photo-1588188185590-bba75ee70d1e?auto=format&fit=crop&q=80&w=200" className="w-24 h-24 object-cover rounded-lg" alt="" />
                    <div>
                      <h4 className="font-bold text-navy line-clamp-2 mb-1">Moquette Dalle Interface</h4>
                      <p className="text-xs text-text-secondary mb-2">Excellente isolation acoustique pour {space}.</p>
                      <Link to="/catalogue/1" className="text-sm text-gold font-bold hover:underline">Voir produit</Link>
                    </div>
                  </div>
                  <div className="flex gap-4 p-4 border border-border rounded-xl">
                    <img src="https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?auto=format&fit=crop&q=80&w=200" className="w-24 h-24 object-cover rounded-lg" alt="" />
                    <div>
                      <h4 className="font-bold text-navy line-clamp-2 mb-1">LVT Click Gerflor</h4>
                      <p className="text-xs text-text-secondary mb-2">Résistance maximale au trafic intense.</p>
                      <Link to="/catalogue/4" className="text-sm text-gold font-bold hover:underline">Voir produit</Link>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center gap-4 mt-8">
                  <Button render={<Link to="/contact" />} className="bg-gold hover:bg-gold-light text-white font-bold h-12 px-8">
                    Demander un devis pour ces produits
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        {step < 4 && (
          <div className="flex justify-between items-center mt-8">
            <Button
              variant="ghost"
              onClick={handlePrev}
              disabled={step === 1}
              className="text-text-secondary hover:text-navy"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Retour
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={step === 1 && !space}
              className="bg-navy hover:bg-navy-light text-white font-bold px-8"
            >
              Étape suivante <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
