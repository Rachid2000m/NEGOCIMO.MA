import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Download, Heart, Linkedin, Link as LinkIcon, ChevronRight } from 'lucide-react';

const mockProduct = { 
  id: '1', 
  name: "Moquette Dalle Interface Composure", 
  category: "Moquette Pro", 
  tags: ["Bureaux", "Hôtellerie"], 
  images: [
    "https://images.unsplash.com/photo-1588188185590-bba75ee70d1e?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1558223687-0b1a0300405c?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1629236714652-f54fdf1bf340?auto=format&fit=crop&q=80&w=1200"
  ],
  description: "La collection Composure trouve son inspiration dans les formations rocheuses naturelles et crée un sol apaisant pour les espaces de travail contemporains. Ses teintes douces et sa texture organique s'intègrent parfaitement.",
  certs: ["Cradle to Cradle Certified® Bronze", "ISO 14001", "GUT"],
  specs: {
    "Classe d'usage": "33 - Commercial intense",
    "Format": "50 x 50 cm",
    "Épaisseur totale": "6.2 mm",
    "Poids total": "3900 g/m²",
    "Isolation acoustique": "25 dB"
  }
};

export default function ProductDetail() { 
  const { slug } = useParams();
  
  return (
    <div className="bg-background min-h-screen pb-24">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-border py-4">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto flex items-center text-sm text-text-secondary">
          <Link to="/" className="hover:text-gold transition-colors">Accueil</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link to="/catalogue" className="hover:text-gold transition-colors">Catalogue</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-navy font-semibold">{mockProduct.name}</span>
        </div>
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 mx-auto mt-12 flex flex-col md:flex-row gap-12">
        {/* Gallery */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-section-alt border border-border">
            <img src={mockProduct.images[0]} alt={mockProduct.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {mockProduct.images.slice(1).map((img, i) => (
              <div key={i} className="aspect-square rounded-lg overflow-hidden border-2 border-transparent hover:border-gold cursor-pointer transition-colors">
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-navy-light text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">{mockProduct.category}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black font-heading text-navy leading-tight mb-4">{mockProduct.name}</h1>
            <p className="text-lg text-text-secondary leading-relaxed">{mockProduct.description}</p>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {mockProduct.certs.map(cert => (
              <span key={cert} className="px-3 py-1 bg-gold/10 text-gold border border-gold/30 rounded-md text-xs font-bold">
                {cert}
              </span>
            ))}
          </div>

          {/* Specs */}
          <div className="mb-8">
            <h3 className="font-heading font-bold text-navy text-xl mb-4 border-l-4 border-gold pl-3">Spécifications Techniques</h3>
            <div className="bg-white rounded-xl border border-border overflow-hidden">
              {Object.entries(mockProduct.specs).map(([key, val], i) => (
                <div key={key} className={`flex justify-between p-4 ${i !== Object.keys(mockProduct.specs).length - 1 ? 'border-b border-border' : ''} ${i % 2 === 0 ? 'bg-white' : 'bg-section-alt/20'}`}>
                  <span className="text-text-secondary font-medium">{key}</span>
                  <span className="text-navy font-bold">{val}</span>
                </div>
              ))}
            </div>
          </div>

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
            <button className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center text-navy hover:bg-gold hover:text-white transition-colors">
              <LinkIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  ); 
}
