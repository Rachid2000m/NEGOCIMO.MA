import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useProductsStore } from '@/store/useProductsStore';

// Fallback categories if store is empty
const defaultCategories = ["Tous", "Moquette", "PVC", "Faux Plafonds"];

export default function ProductsSection() {
  const [activeTab, setActiveTab] = useState("Tous");
  const { products } = useProductsStore();

  // If we have products, extract unique categories
  const dynamicCategories = products.length > 0 
    ? ["Tous", ...Array.from(new Set(products.map(p => p.category)))]
    : defaultCategories;

  const categoriesToUse = products.length > 0 ? dynamicCategories : defaultCategories;

  const filteredProducts = activeTab === "Tous" 
    ? products 
    : products.filter(p => p.category === activeTab);

  return (
    <section className="py-24 bg-white">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4 text-navy">Nos Collections de Produits</h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg mb-8">
            Découvrez une sélection de nos meilleurs revêtements adaptés à vos espaces.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categoriesToUse.map(cat => (
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
                  src={product.image || 'https://images.unsplash.com/photo-1621293954908-d81149c0dd07?auto=format&fit=crop&q=80&w=600'} 
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
