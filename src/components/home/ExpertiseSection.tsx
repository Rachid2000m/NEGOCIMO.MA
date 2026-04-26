import { motion } from 'motion/react';
import { Layers, Grid, Square, Zap, Shield, Armchair } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  { icon: Layers, title: 'Revêtements PVC', desc: 'Solutions durables et esthétiques pour fort trafic.' },
  { icon: Grid, title: 'Moquette Pro', desc: 'Dalles et rouleaux pour une acoustique optimale.' },
  { icon: Square, title: 'Faux Plafonds', desc: 'Confort acoustique et design contemporain.' },
  { icon: LayoutPanelTop, title: 'Façades', desc: 'Habillage extérieur résistant et innovant.' }, // Changed to something reasonable
  { icon: Shield, title: 'Isolation', desc: 'Performance thermique et phonique certifiée.' },
  { icon: Armchair, title: 'Mobilier B2B', desc: 'Aménagement ergonomique et sur-mesure.' },
];

import { LayoutPanelTop } from 'lucide-react';

export default function ExpertiseSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4 text-navy">Nos Domaines d'Expertise</h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg">
            Des matériaux de premier choix et un savoir-faire reconnu pour chaque aspect de votre aménagement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Link to={`/catalogue?categorie=${cat.title.toLowerCase().replace(' ', '-')}`} className="block group">
                  <div className="bg-white p-8 rounded-xl border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-gold/50 transition-all duration-300 h-full flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-section-alt flex items-center justify-center mb-6 group-hover:bg-gold/10 group-hover:text-gold transition-colors text-navy">
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold font-heading mb-3 text-navy group-hover:text-gold transition-colors">{cat.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{cat.desc}</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
