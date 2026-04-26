import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { useSettingsStore } from '@/store/useSettingsStore';

export default function Navbar() {
  const settings = useSettingsStore(state => state.settings);

  return (
    <header className="sticky top-0 z-[100] h-[60px] md:h-[72px] bg-white shadow-sm px-4 md:px-[60px] flex items-center justify-between transition-colors">
      <Link to="/" className="flex items-center">
        {settings?.logoUrl ? (
          <img src={settings.logoUrl} alt="Logo NEGOCIMO" className="h-8 md:h-10 w-auto" />
        ) : (
          <span className="text-2xl md:text-3xl font-black tracking-[4px] md:tracking-[6px] font-heading">
            <span className="text-navy">NEGOCI</span>
            <span className="text-gold">MO</span>
          </span>
        )}
      </Link>

      <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-medium">
        <Link to="/" className="hover:text-gold transition-colors">Accueil</Link>
        <Link to="/catalogue" className="hover:text-gold transition-colors">Catalogue</Link>
        <Link to="/secteurs/bureaux" className="hover:text-gold transition-colors">Secteurs</Link>
        <Link to="/realisations" className="hover:text-gold transition-colors">Réalisations</Link>
        <Link to="/a-propos" className="hover:text-gold transition-colors">À propos</Link>
      </nav>

      <div className="hidden md:flex items-center gap-4">
        {/* Languages could go here */}
        <Button render={<Link to="/admin" />} variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white flex items-center gap-2">
          <User className="w-4 h-4" />
          Espace Pro
        </Button>
        <Button className="bg-gold hover:bg-gold/90 text-white shadow-md">
          <Link to="/contact">Demander un devis</Link>
        </Button>
      </div>

      <div className="md:hidden flex items-center">
        <Sheet>
          <SheetTrigger render={<Button variant="ghost" size="icon" />}>
            <Menu className="w-6 h-6 text-navy" />
            <span className="sr-only">Toggle menu</span>
          </SheetTrigger>
          <SheetContent side="right" className="bg-white">
            <SheetTitle className="text-left font-heading text-xl mb-6">
              <span className="text-navy">NEGOCI</span>
              <span className="text-gold">MO</span>
            </SheetTitle>
            <nav className="flex flex-col gap-4 text-lg">
              <Link to="/" className="hover:text-gold transition-colors">Accueil</Link>
              <Link to="/catalogue" className="hover:text-gold transition-colors">Catalogue</Link>
              <Link to="/secteurs/bureaux" className="hover:text-gold transition-colors">Secteurs</Link>
              <Link to="/realisations" className="hover:text-gold transition-colors">Réalisations</Link>
              <Link to="/a-propos" className="hover:text-gold transition-colors">À propos</Link>
              <Link to="/contact" className="hover:text-gold transition-colors mt-4 font-bold">Demander un devis</Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
