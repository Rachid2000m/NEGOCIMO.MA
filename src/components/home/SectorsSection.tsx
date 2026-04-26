import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const sectors = [
  { id: 'bureaux', name: 'Bureaux & Administratif', desc: 'Solutions acoustiques et esthétiques pour des environnements de travail productifs.', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800', size: 'large' },
  { id: 'hotellerie', name: 'Hôtellerie', desc: 'Confort et design premium.', img: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=800', size: 'small' },
  { id: 'sante', name: 'Santé', desc: 'Hygiène totale et normes strictes.', img: 'https://images.unsplash.com/photo-1519494026892-d98c25dbce17?auto=format&fit=crop&q=80&w=800', size: 'small' },
  { id: 'enseignement', name: 'Enseignement', desc: 'Résistance et sécurité.', img: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800', size: 'small' },
  { id: 'commerce', name: 'Commerce & Retail', desc: 'Mettez vos espaces en valeur.', img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800', size: 'small' },
  { id: 'transport', name: 'Transport & Industrie', desc: 'Trafic intense et durabilité extrême.', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800', size: 'large' }
];

export default function SectorsSection() {
  return (
    <section className="py-24 bg-section-alt">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4 text-navy">Solutions pour Chaque Secteur</h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg">
            Nous adaptons nos matériaux et notre expertise aux contraintes spécifiques de votre domaine d'activité.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectors.map((sector, i) => (
            <motion.div
              key={sector.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={`group relative overflow-hidden rounded-2xl shadow-lg ${sector.size === 'large' ? 'md:col-span-2 lg:col-span-2 aspect-[16/9] lg:aspect-auto' : 'aspect-square md:aspect-auto'} min-h-[300px]`}
            >
              <img 
                src={sector.img} 
                alt={sector.name} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <h3 className="text-white text-2xl font-bold font-heading mb-2 group-hover:text-gold transition-colors">{sector.name}</h3>
                <p className="text-gray-300 text-sm mb-6 max-w-md line-clamp-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  {sector.desc}
                </p>
                <Link to={`/secteurs/${sector.id}`} className="inline-flex items-center text-white border border-white/30 w-fit px-4 py-2 rounded-full hover:bg-gold hover:border-gold hover:text-white transition-all text-sm font-semibold">
                  En savoir plus <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
