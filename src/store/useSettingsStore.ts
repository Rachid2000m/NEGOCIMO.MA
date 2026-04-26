import { create } from 'zustand';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';

interface Settings {
  companyName: string;
  email: string;
  phone: string;
  address: string;
  heroTitle: string;
  heroSubtitle: string;
  logoUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;
  backgroundColor?: string;
  textColor?: string;
  updatedAt: string;
}

interface SettingsStore {
  settings: Settings | null;
  loading: boolean;
  init: () => (() => void);
  updateSettings: (newSettings: Partial<Settings>) => Promise<void>;
}

export const useSettingsStore = create<SettingsStore>((set, get) => ({
  settings: null,
  loading: true,
  init: () => {
    const docRef = doc(db, 'settings', 'global');
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        set({ settings: docSnap.data() as Settings, loading: false });
      } else {
        set({
          settings: {
            companyName: 'NEGOCIMO',
            email: 'contact@negocimo.ma',
            phone: '+212 600 000 000',
            address: '123 Quartier Industriel, Casablanca',
            heroTitle: "L'Expertise en Aménagement d'Espaces Professionnels",
            heroSubtitle: "NEGOCIMO vous accompagne dans tous vos projets d'aménagement — revêtements, faux plafonds, mobilier sur-mesure.",
            primaryColor: "#1C2B4A",
            secondaryColor: "#B5902A",
            backgroundColor: "#F9F7F4",
            textColor: "#1A1A1A",
            updatedAt: new Date().toISOString(),
          },
          loading: false,
        });
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'settings/global');
    });
    
    return unsubscribe;
  },
  updateSettings: async (newSettings) => {
    try {
      const current = get().settings;
      const updated = { ...current, ...newSettings, updatedAt: new Date().toISOString() };
      const docRef = doc(db, 'settings', 'global');
      await setDoc(docRef, updated);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'settings/global');
    }
  }
}));
