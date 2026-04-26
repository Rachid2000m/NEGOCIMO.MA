import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy text-white pt-16 pb-8 border-t-4 border-gold">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        {/* Contact info */}
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-black tracking-[4px] font-heading m-0">
              <span className="text-white">NEGOCI</span>
              <span className="text-gold">MO</span>
            </h2>
            <p className="text-gold-light text-xs tracking-[2px] uppercase mt-1">
              Des solutions d'expert
            </p>
          </div>
          <p className="text-sm text-gray-300 mb-6 max-w-xs leading-relaxed">
            NEGOCIMO vous accompagne dans tous vos projets d'aménagement d'espaces professionnels, avec exigence et savoir-faire.
          </p>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
              <span>Quartier Industriel, Casablanca, Maroc</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gold shrink-0" />
              <span>+212 600 000 000</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gold shrink-0" />
              <span>contact@negocimo.ma</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-heading text-lg font-bold mb-6 text-white border-l-4 border-gold pl-3">Liens Rapides</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li><Link to="/catalogue" className="hover:text-gold transition-colors">Catalogue Produits</Link></li>
            <li><Link to="/secteurs/bureaux" className="hover:text-gold transition-colors">Aménagement Bureaux</Link></li>
            <li><Link to="/realisations" className="hover:text-gold transition-colors">Nos Réalisations</Link></li>
            <li><Link to="/a-propos" className="hover:text-gold transition-colors">À propos de NEGOCIMO</Link></li>
            <li><Link to="/configurateur" className="hover:text-gold transition-colors">Configurateur de projet</Link></li>
          </ul>
        </div>

        {/* Newsletter & Socials */}
        <div>
          <h3 className="font-heading text-lg font-bold mb-6 text-white border-l-4 border-gold pl-3">Restez Informé</h3>
          <p className="text-sm text-gray-300 mb-4">Inscrivez-vous à notre newsletter pour recevoir nos dernières actualités B2B.</p>
          <form className="flex gap-2 mb-8" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Votre email professionnel" 
              className="bg-navy-light border border-gray-600 text-white px-4 py-2 rounded focus:outline-none focus:border-gold flex-1 text-sm"
            />
            <button type="submit" className="bg-gold hover:bg-gold/90 text-white px-4 py-2 rounded text-sm font-semibold transition-colors">
              OK
            </button>
          </form>

          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-navy-light flex items-center justify-center hover:bg-gold transition-colors text-white">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-navy-light flex items-center justify-center hover:bg-gold transition-colors text-white">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-navy-light flex items-center justify-center hover:bg-gold transition-colors text-white">
              <Facebook className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 mx-auto border-t border-gray-700 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400">
        <p>© {new Date().getFullYear()} NEGOCIMO. Tous droits réservés.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Mentions Légales</a>
          <a href="#" className="hover:text-white transition-colors">Politique de Confidentialité</a>
        </div>
      </div>
    </footer>
  );
}
