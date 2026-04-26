import { useParams, Link } from 'react-router-dom';
import SectorsSection from '@/components/home/SectorsSection';
import { ArrowLeft } from 'lucide-react';

export default function Sectors() { 
  const { slug } = useParams();
  
  return (
    <div className="bg-background min-h-screen pb-24">
      {/* Banner */}
      <div className="bg-navy py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-white">
            <Link to="/" className="inline-flex items-center text-sm text-gold hover:text-white mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> Retour à l'accueil
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold font-heading mb-2 capitalize">
              Aménagement pour {slug?.replace('-', ' ')}
            </h1>
            <p className="text-gray-300 text-sm md:text-base">Secteurs &gt; {slug}</p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <SectorsSection />
      </div>
    </div>
  ); 
}
