import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, Settings as SettingsIcon, Home, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSettingsStore } from '@/store/useSettingsStore';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const settings = useSettingsStore(state => state.settings);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Tableau de bord', path: '/admin' },
    { icon: Package, label: 'Catalogue (Produits)', path: '/admin/products' },
    { icon: SettingsIcon, label: 'Paramètres du site', path: '/admin/settings' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-navy text-white flex flex-col h-full shrink-0">
        <div className="p-6">
          <Link to="/" className="inline-block">
            {settings?.logoUrl ? (
              <div>
                <img src={settings.logoUrl} alt="Logo" className="h-8 w-auto mb-2" />
                <span className="text-xs tracking-normal block text-gray-400 mt-1">ADMIN PANEL</span>
              </div>
            ) : (
              <div className="text-2xl font-black tracking-widest font-heading">
                <span className="text-white">NEGOCI</span>
                <span className="text-gold">MO</span>
                <span className="text-xs tracking-normal block text-gray-400 mt-1">ADMIN PANEL</span>
              </div>
            )}
          </Link>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-gold text-white font-semibold shadow-md' 
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 mt-auto">
          <Button render={<Link to="/" />} variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/10 mb-2">
            <Home className="w-5 h-5 mr-3" />
            Retour au site
          </Button>
          <Button variant="ghost" className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-400/10" onClick={handleLogout}>
            <LogOut className="w-5 h-5 mr-3" />
            Déconnexion
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gray-50 p-6 md:p-10">
        <Outlet />
      </main>
    </div>
  );
}
