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
  headingColor?: string;
  whatsappNumber?: string;
  heroImage?: string;
  aboutTitle?: string;
  aboutText?: string;
  aboutImage?: string;
  whyUsImage?: string;
  sectorsImages?: { [key: string]: string };
  realisationsImages?: { [key: string]: string };
  partnerLogos?: string[];
  ctaTitle?: string;
  ctaText?: string;
  showStats?: boolean;
  showTestimonials?: boolean;
  showClients?: boolean;
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
            headingColor: "#1C2B4A",
            whyUsImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000",
            sectorsImages: {
              bureaux: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1200",
              hotellerie: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=800",
              sante: "https://images.unsplash.com/photo-1538108149393-fdfd816959d5?auto=format&fit=crop&q=80&w=800",
              enseignement: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800",
              commerce: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&q=80&w=800",
              transport: "https://images.unsplash.com/photo-1521330784833-ce9a10df3f90?auto=format&fit=crop&q=80&w=1200"
            },
            realisationsImages: {
              "1": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
              "2": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",
              "3": "https://images.unsplash.com/photo-1519494026892-d98c25dbce17?auto=format&fit=crop&q=80&w=800",
              "4": "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&q=80&w=800",
              "5": "https://images.unsplash.com/photo-1541339907198-e087563ef3f5?auto=format&fit=crop&q=80&w=800"
            },
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
