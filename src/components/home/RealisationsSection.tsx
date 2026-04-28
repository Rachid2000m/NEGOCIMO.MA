import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useSettingsStore } from '@/store/useSettingsStore';

const projects = [
  { id: 1, title: 'Siège Social Banque Alpha', sector: 'Bureaux', surface: '2500 m²', isLarge: true },
  { id: 2, title: 'Hôtel Le Prestige', sector: 'Hôtellerie', surface: '1200 m²', isLarge: false },
  { id: 3, title: 'Clinique Internationale', sector: 'Santé', surface: '4800 m²', isLarge: false },
  { id: 4, title: 'Boutique Flagship', sector: 'Commerce', surface: '450 m²', isLarge: false },
  { id: 5, title: 'Université des Sciences', sector: 'Enseignement', surface: '8000 m²', isLarge: false },
];

export default function RealisationsSection() {
  const { settings } = useSettingsStore();
  const defaultImages: Record<number, string> = {
    1: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200',
    2: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800',
    3: 'https://images.unsplash.com/photo-1519494026892-d98c25dbce17?auto=format&fit=crop&q=80&w=800',
    4: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&q=80&w=800',
    5: 'https://images.unsplash.com/photo-1541339907198-e087563ef3f5?auto=format&fit=crop&q=80&w=800'
  };

  return (
    <section className="py-24 bg-white">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4 text-navy">Réalisations Récentes</h2>
            <p className="text-text-secondary text-lg">
              Découvrez la qualité de nos finitions à travers nos derniers chantiers achevés.
            </p>
          </div>
          <Button render={<Link to="/realisations" />} variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white shrink-0">
            Toutes nos réalisations
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`group relative overflow-hidden rounded-xl bg-section-alt ${project.isLarge ? 'md:col-span-2 md:row-span-2' : 'md:col-span-2 xl:col-span-1 xl:row-span-1 md:row-span-1'}`}
            >
              <img 
                src={settings?.realisationsImages?.[project.id] || defaultImages[project.id]} 
                alt={project.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
              />
              <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 p-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className="bg-gold text-white text-xs font-bold px-2 py-1 rounded mb-2 inline-block">
                  {project.sector}
                </span>
                <h3 className="text-white font-bold font-heading text-lg leading-tight mb-1">{project.title}</h3>
                <p className="text-gray-300 text-sm font-semibold">{project.surface}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
