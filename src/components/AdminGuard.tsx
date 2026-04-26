import { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';

export default function AdminGuard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) {
        // Simple client-side check for the primary admin email
        // The real security happens in Firestore Rules
        const isAuthorized = u.email === 'rachiddmachmacha@gmail.com' || u.email === 'souhailaetrachid@gmail.com';
        setUser(isAuthorized ? u : null);
        if (!isAuthorized && u) {
          console.warn('User logged in but not authorized as admin');
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const handleLogin = async () => {
    if (isLoggingIn) return;
    setIsLoggingIn(true);

    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      // Ignore errors caused by user closing popup or redundant requests
      if (err.code !== 'auth/popup-closed-by-user' && err.code !== 'auth/cancelled-popup-request') {
        console.error('Login error:', err);
        alert('Erreur lors de la connexion. Veuillez réessayer.');
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  if (loading) {
    return <div className="h-screen w-screen flex items-center justify-center bg-gray-50">Chargement...</div>;
  }

  if (!user) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-sm w-full text-center">
          <h1 className="text-2xl font-bold font-heading text-navy mb-2">Accès Restreint</h1>
          <p className="text-gray-500 mb-6">Connectez-vous pour accéder au panneau d'administration de NEGOCIMO.</p>
          <Button 
            onClick={handleLogin} 
            disabled={isLoggingIn}
            className="w-full bg-gold hover:bg-gold-light text-white"
          >
            <LogIn className="w-5 h-5 mr-2" />
            {isLoggingIn ? 'Connexion...' : 'Se connecter avec Google'}
          </Button>
        </div>
      </div>
    );
  }

  return <Outlet />;
}
