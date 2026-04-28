import { useState, useEffect, FormEvent } from 'react';
import { Outlet } from 'react-router-dom';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LogIn } from 'lucide-react';

export default function AdminGuard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) {
        const isAuthorized = u.email === 'rachiddmachmacha@gmail.com' || u.email === 'souhailaetrachid@gmail.com' || u.email === 'admin@negocimo.com';
        setUser(isAuthorized ? u : null);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    
    if (login !== 'NEGOCIMO' || password !== '123456') {
      setErrorMsg('Identifiants incorrects');
      return;
    }

    if (isLoggingIn) return;
    setIsLoggingIn(true);

    try {
      await signInWithEmailAndPassword(auth, 'admin@negocimo.com', '123456');
    } catch (err: any) {
      if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential' || err.code === 'auth/invalid-login-credentials') {
        try {
          await createUserWithEmailAndPassword(auth, 'admin@negocimo.com', '123456');
        } catch (createErr: any) {
          if (createErr.code === 'auth/operation-not-allowed') {
           setErrorMsg('Erreur: Veuillez activer l\'authentification par Email/Mot de passe dans la console Firebase.');
          } else {
           setErrorMsg('Erreur lors de la création du compte administrateur.');
          }
        }
      } else if (err.code === 'auth/operation-not-allowed') {
        setErrorMsg('Erreur: Veuillez activer l\'authentification par Email/Mot de passe dans la console Firebase.');
      } else {
        console.error('Login error:', err);
        setErrorMsg('Erreur lors de la connexion à Firebase.');
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
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2 text-left">
              <label className="text-sm font-medium text-gray-700">Identifiant</label>
              <Input 
                type="text" 
                placeholder="Ex: NEGOCIMO" 
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
            </div>
            <div className="space-y-2 text-left mb-6">
              <label className="text-sm font-medium text-gray-700">Mot de passe</label>
              <Input 
                type="password" 
                placeholder="••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {errorMsg && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">
                {errorMsg}
              </div>
            )}

            <Button 
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-gold hover:bg-gold-light text-white mt-4"
            >
              <LogIn className="w-5 h-5 mr-2" />
              {isLoggingIn ? 'Connexion en cours...' : 'Se connecter'}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return <Outlet />;
}
