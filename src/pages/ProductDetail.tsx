import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Download, Heart, Linkedin, Link as LinkIcon, ChevronRight, ArrowLeft } from 'lucide-react';
import { useProductsStore } from '@/store/useProductsStore';

export default function ProductDetail() { 
  const { slug } = useParams();
  const navigate = useNavigate();
  const { products } = useProductsStore();
  
  const product = products.find(p => p.slug === slug || p.id === slug);

  if (!product) {
    return (
      <div className="bg-background min-h-screen py-24 px-4 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-black font-heading text-navy mb-4">Produit introuvable</h2>
        <p className="text-text-secondary mb-8 text-center max-w-md">Le produit que vous recherchez n'existe pas ou n'est plus disponible.</p>
        <Button onClick={() => navigate('/catalogue')} className="bg-gold hover:bg-gold-light text-white font-bold h-12 px-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour au catalogue
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pb-24">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-border py-4">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto flex items-center text-sm text-text-secondary overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-gold transition-colors">Accueil</Link>
          <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
          <Link to="/catalogue" className="hover:text-gold transition-colors">Catalogue</Link>
          <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
          <span className="text-navy font-semibold truncate">{product.name}</span>
        </div>
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 mx-auto mt-12 flex flex-col md:flex-row gap-12">
        {/* Gallery */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-section-alt border border-border">
            <img 
              src={product.image || 'https://images.unsplash.com/photo-1621293954908-d81149c0dd07?auto=format&fit=crop&q=80&w=600'} 
              alt={product.name} 
              className="w-full h-full object-cover" 
            />
          </div>
          {/* We only have one image per product in the DB right now, but keeping the layout structure ready for multiple in the future */}
        </div>

        {/* Info */}
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-navy-light text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">{product.category || 'Non classé'}</span>
              {product.status === "Rupture" && (
                <span className="bg-red-100 text-red-600 border border-red-200 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">Rupture de stock</span>
              )}
            </div>
            <h1 className="text-3xl md:text-5xl font-black font-heading text-navy leading-tight mb-4">{product.name}</h1>
            <p className="text-lg text-gold font-bold mb-4">{product.price}</p>
            {product.description && (
              <div className="text-lg text-text-secondary leading-relaxed whitespace-pre-line">{product.description}</div>
            )}
          </div>

          {(product.tags && product.tags.length > 0) && (
            <div className="flex flex-wrap gap-2 mb-8">
              {product.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-gold/10 text-gold border border-gold/30 rounded-md text-xs font-bold uppercase">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Features */}
          {(product.features && product.features.length > 0) && (
            <div className="mb-8">
              <h3 className="font-heading font-bold text-navy text-xl mb-4 border-l-4 border-gold pl-3">Caractéristiques</h3>
              <ul className="space-y-2 list-inside list-disc text-text-secondary">
                {product.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          <Button variant="outline" className="w-fit mb-8 gap-2 border-navy text-navy hover:bg-navy hover:text-white">
            <Download className="w-4 h-4" />
            Télécharger la fiche technique (PDF)
          </Button>

          <hr className="border-border mb-8" />

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Button className="flex-1 bg-gold hover:bg-gold-light text-white font-bold h-14 text-lg">
              Demander un devis pour ce produit
            </Button>
            <Button variant="outline" className="h-14 px-6 border-border text-navy hover:bg-section-alt">
              <Heart className="w-5 h-5 mr-2" />
              Favoris
            </Button>
          </div>

          <div className="flex gap-4 items-center">
            <span className="text-sm font-semibold text-text-secondary">Partager :</span>
            <button className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center text-navy hover:bg-gold hover:text-white transition-colors">
              <Linkedin className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center text-navy hover:bg-gold hover:text-white transition-colors" onClick={() => navigator.clipboard.writeText(window.location.href)}>
              <LinkIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  ); 
}
