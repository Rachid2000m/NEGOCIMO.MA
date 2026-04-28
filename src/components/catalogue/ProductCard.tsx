import { Link } from 'react-router-dom';
import { Heart, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Product {
  id: string;
  name: string;
  category: string;
  tags?: string[];
  image: string;
  slug?: string;
}

interface ProductCardProps {
  product: Product;
  key?: string | number;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group bg-white rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-gold/30 transition-all duration-300 flex flex-col h-full relative">
      {/* Category Badge */}
      <div className="absolute top-3 left-3 z-10 flex gap-2">
        <span className="bg-navy-light text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm">
          {product.category}
        </span>
      </div>

      {/* Floating Actions on Hover */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
        <button className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center text-text-secondary hover:text-gold hover:bg-gold/10 transition-colors" title="Ajouter aux favoris">
          <Heart className="w-4 h-4" />
        </button>
        <button className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center text-text-secondary hover:text-navy hover:bg-navy/10 transition-colors" title="Comparer">
          <Scale className="w-4 h-4" />
        </button>
      </div>

      <div className="relative aspect-[4/3] overflow-hidden bg-section-alt">
        <img 
          src={product.image || 'https://images.unsplash.com/photo-1621293954908-d81149c0dd07?auto=format&fit=crop&q=80&w=600'} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-heading font-bold text-lg text-navy mb-3 line-clamp-2">{product.name}</h3>
        
        {/* Sector Tags */}
        <div className="flex flex-wrap gap-1 mt-auto mb-5">
          {(product.tags || []).slice(0, 3).map((tag, i) => (
            <span key={i} className="text-[10px] bg-gold/10 text-gold border border-gold/30 px-2 py-0.5 rounded-full font-bold uppercase">
              {tag}
            </span>
          ))}
          {(product.tags || []).length > 3 && (
            <span className="text-[10px] bg-section-alt text-text-secondary border border-border px-2 py-0.5 rounded-full font-bold">
              +{(product.tags || []).length - 3}
            </span>
          )}
        </div>
        
        <Button render={<Link to={`/catalogue/${product.slug || product.id}`} />} className="w-full bg-navy hover:bg-gold text-white transition-colors duration-300">
          Voir détails
        </Button>
      </div>
    </div>
  );
}
