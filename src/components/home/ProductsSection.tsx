import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Mock data since we don't have the real Supabase setup active
const categories = ["Tous", "Moquette", "PVC", "Faux Plafonds"];

const mockProducts = [
  { id: 1, name: "Moquette Dalle Interface", category: "Moquette", image: "https://images.unsplash.com/photo-1621293954908-d81149c0dd07?auto=format&fit=crop&q=80&w=600" },
  { id: 2, name: "Revêtement PVC Tarkett", category: "PVC", image: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?auto=format&fit=crop&q=80&w=600" },
  { id: 3, name: "Plafond Acoustique Rockfon", category: "Faux Plafonds", image: "https://images.unsplash.com/photo-1541123437800-1c0c053f5b72?auto=format&fit=crop&q=80&w=600" },
  { id: 4, name: "Dalle Moquette Desso", category: "Moquette", image: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&q=80&w=600" },
  { id: 5, name: "Sol LVT Click", category: "PVC", image: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&q=80&w=600" },
  { id: 6, name: "Wood Lines Plafon", category: "Faux Plafonds", image: "https://images.unsplash.com/photo-1449156001499-47399479fb48?auto=format&fit=crop&q=80&w=600" },
  { id: 7, name: "Broadloom Carpet", category: "Moquette", image: "https://images.unsplash.com/photo-1533630801152-2da60bb3bc74?auto=format&fit=crop&q=80&w=600" },
  { id: 8, name: "Gerflor Mipolam", category: "PVC", image: "https://images.unsplash.com/photo-1581093450021-4a7360e9a6ad?auto=format&fit=crop&q=80&w=600" }
];

export default function ProductsSection() {
  const [activeTab, setActiveTab] = useState("Tous");

  const filteredProducts = activeTab === "Tous" 
    ? mockProducts 
    : mockProducts.filter(p => p.category === activeTab);

  return (
    <section className="py-24 bg-white">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4 text-navy">Nos Collections de Produits</h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg mb-8">
            Découvrez une sélection de nos meilleurs revêtements adaptés à vos espaces.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${
                  activeTab === cat 
                  ? 'bg-gold text-white' 
                  : 'bg-section-alt text-navy hover:bg-gold/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {filteredProducts.map((product) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={product.id}
              className="group bg-white rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-section-alt">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-white/90 backdrop-blur text-navy text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                    {product.category}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-heading font-bold text-lg text-navy mb-4 line-clamp-2">{product.name}</h3>
                <Button render={<Link to={`/catalogue/${product.id}`} />} variant="outline" className="w-full border-border text-navy hover:bg-navy hover:text-white transition-colors">
                  Voir détails
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 text-center">
          <Button render={<Link to="/catalogue" />} className="bg-navy hover:bg-navy-light text-white px-8 py-6 text-base shadow-md">
            Voir tout le catalogue
          </Button>
        </div>
      </div>
    </section>
  );
}
