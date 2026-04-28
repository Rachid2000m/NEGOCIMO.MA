import { useState, useRef, useEffect, ChangeEvent, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Save, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSettingsStore } from '@/store/useSettingsStore';

export default function Settings() {
  const { settings, updateSettings } = useSettingsStore();
  const [loading, setLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const heroImageInputRef = useRef<HTMLInputElement>(null);
  const aboutImageInputRef = useRef<HTMLInputElement>(null);

  const [formColors, setFormColors] = useState({
    primaryColor: settings?.primaryColor || '#1C2B4A',
    secondaryColor: settings?.secondaryColor || '#B5902A',
    backgroundColor: settings?.backgroundColor || '#F9F7F4',
    textColor: settings?.textColor || '#1A1A1A',
    headingColor: settings?.headingColor || '#1C2B4A',
  });

  const [heroText, setHeroText] = useState({
    title: settings?.heroTitle || '',
    subtitle: settings?.heroSubtitle || '',
    heroImage: settings?.heroImage || '',
  });

  const [aboutText, setAboutText] = useState({
    title: settings?.aboutTitle || '',
    text: settings?.aboutText || '',
    image: settings?.aboutImage || '',
  });

  const [ctaText, setCtaText] = useState({
    title: settings?.ctaTitle || '',
    text: settings?.ctaText || '',
  });

  const [photosState, setPhotosState] = useState({
    whyUsImage: settings?.whyUsImage || '',
    sectorsImages: settings?.sectorsImages || {},
    realisationsImages: settings?.realisationsImages || {}
  });

  const [partnerLogos, setPartnerLogos] = useState<string[]>(settings?.partnerLogos || []);

  const [visibility, setVisibility] = useState({
    showStats: settings?.showStats ?? true,
    showTestimonials: settings?.showTestimonials ?? true,
    showClients: settings?.showClients ?? true,
  });

  useEffect(() => {
    if (settings?.logoUrl) {
      setLogoPreview(settings.logoUrl);
    }
  }, [settings?.logoUrl]);

  useEffect(() => {
    if (settings) {
      setFormColors({
        primaryColor: settings.primaryColor || '#1C2B4A',
        secondaryColor: settings.secondaryColor || '#B5902A',
        backgroundColor: settings.backgroundColor || '#F9F7F4',
        textColor: settings.textColor || '#1A1A1A',
        headingColor: settings.headingColor || '#1C2B4A',
      });
      setHeroText({
        title: settings.heroTitle || '',
        subtitle: settings.heroSubtitle || '',
        heroImage: settings.heroImage || '',
      });
      setAboutText({
        title: settings.aboutTitle || '',
        text: settings.aboutText || '',
        image: settings.aboutImage || '',
      });
      setCtaText({
        title: settings.ctaTitle || '',
        text: settings.ctaText || '',
      });
      setPhotosState({
        whyUsImage: settings.whyUsImage || '',
        sectorsImages: settings.sectorsImages || {},
        realisationsImages: settings.realisationsImages || {}
      });
      setPartnerLogos(settings.partnerLogos || []);
      setVisibility({
        showStats: settings.showStats ?? true,
        showTestimonials: settings.showTestimonials ?? true,
        showClients: settings.showClients ?? true,
      });
    }
  }, [settings]);

  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 300000) {
        alert("Fichier trop grand. Maximum 300 KB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setLogoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleHeroImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 300000) {
        alert("Fichier trop grand. Maximum 300 KB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setHeroText(prev => ({ ...prev, heroImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAboutImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 300000) {
        alert("Fichier trop grand. Maximum 300 KB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAboutText(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoUpload = async (e: ChangeEvent<HTMLInputElement>, path: 'whyUs' | { type: 'sector', id: string } | { type: 'realisation', id: string }) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5000000) {
        alert("Fichier trop grand. Maximum 5 MB."); // Using bigger limit for sections photos
        return;
      }
      try {
        const { compressImage } = await import('@/lib/imageResizer');
        const result = await compressImage(file, 600, 0.4); // Compress to max 600px width and quality 0.4
        setPhotosState(prev => {
          if (path === 'whyUs') return { ...prev, whyUsImage: result };
          if (path.type === 'sector') return { ...prev, sectorsImages: { ...prev.sectorsImages, [path.id]: result } };
          if (path.type === 'realisation') return { ...prev, realisationsImages: { ...prev.realisationsImages, [path.id]: result } };
          return prev;
        });
      } catch (error) {
        console.error("Erreur de compression d'image:", error);
        alert("Erreur lors de la compression de l'image.");
      }
    }
  };

  const handlePartnerLogoUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2000000) {
        alert("Fichier trop grand. Maximum 2 MB.");
        return;
      }
      try {
        const { compressImage } = await import('@/lib/imageResizer');
        const result = await compressImage(file, 300, 0.5); // Smaller resolution for logos
        setPartnerLogos(prev => [...prev, result]);
      } catch (error) {
        console.error("Erreur de compression de logo:", error);
        alert("Erreur lors de la compression du logo.");
      }
    }
  };

  const removePartnerLogo = (index: number) => {
    setPartnerLogos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      await updateSettings({
        companyName: (formData.get('companyName') as string) || '',
        email: (formData.get('email') as string) || '',
        phone: (formData.get('phone') as string) || '',
        address: (formData.get('address') as string) || '',
        heroTitle: heroText.title || '',
        heroSubtitle: heroText.subtitle || '',
        heroImage: heroText.heroImage || '',
        aboutTitle: aboutText.title || '',
        aboutText: aboutText.text || '',
        aboutImage: aboutText.image || '',
        ctaTitle: ctaText.title || '',
        ctaText: ctaText.text || '',
        logoUrl: logoPreview || '',
        primaryColor: (formData.get('primaryColor') as string) || '',
        secondaryColor: (formData.get('secondaryColor') as string) || '',
        backgroundColor: (formData.get('backgroundColor') as string) || '',
        textColor: (formData.get('textColor') as string) || '',
        headingColor: (formData.get('headingColor') as string) || '',
        whatsappNumber: (formData.get('whatsappNumber') as string) || '',
        showStats: visibility.showStats,
        showTestimonials: visibility.showTestimonials,
        showClients: visibility.showClients,
        whyUsImage: photosState.whyUsImage,
        sectorsImages: photosState.sectorsImages,
        realisationsImages: photosState.realisationsImages,
        partnerLogos: partnerLogos,
      });
      alert('Paramètres enregistrés avec succès !');
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la sauvegarde');
    } finally {
      setLoading(false);
    }
  };

  if (!settings) return <div>Chargement...</div>;

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold font-heading text-navy">Paramètres du site</h1>
        <p className="text-gray-500 mt-2">Gérez les informations globales, l'apparence et le contenu des différentes sections.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8 h-auto">
            <TabsTrigger value="general" className="py-3">Général & Couleurs</TabsTrigger>
            <TabsTrigger value="hero" className="py-3">Accueil & Hero</TabsTrigger>
            <TabsTrigger value="about" className="py-3">À Propos</TabsTrigger>
            <TabsTrigger value="modules" className="py-3">Modules & CTA</TabsTrigger>
            <TabsTrigger value="photos" className="py-3">Photos & Logos</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-8">
            {/* Logo Section */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold font-heading text-navy mb-6 pb-2 border-b border-gray-100">Identité Visuelle</h2>
              <div className="space-y-4">
                <label className="text-sm font-semibold text-navy block">Logo du site</label>
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="w-40 h-40 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center bg-gray-50 relative overflow-hidden group">
                    {logoPreview ? (
                      <>
                        <img src={logoPreview} alt="Logo Preview" className="max-w-full max-h-full object-contain p-2" />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button type="button" variant="ghost" size="icon" className="text-white hover:text-red-400 hover:bg-transparent" onClick={handleRemoveLogo}>
                            <X className="w-6 h-6" />
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className="text-gray-400 flex flex-col items-center">
                        <Upload className="w-8 h-8 mb-2" />
                        <span className="text-xs">Aucun logo</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-4 text-center sm:text-left">
                    <p className="text-sm text-gray-500">
                      Format recommandé : PNG, SVG ou JPG avec fond transparent.<br />
                      Taille maximale : 300 KB. Dimensions idéales : 200x50px.
                    </p>
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleLogoChange}
                        id="logo-upload"
                      />
                      <Button type="button" variant="outline" className="border-gray-200 text-navy hover:bg-gray-50" onClick={() => fileInputRef.current?.click()}>
                        <Upload className="w-4 h-4 mr-2" />
                        Parcourir les fichiers
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Colors Section */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              <style>
                {`
                  :root {
                    --primary-custom: ${formColors.primaryColor} !important;
                    --secondary-custom: ${formColors.secondaryColor} !important;
                    --background-custom: ${formColors.backgroundColor} !important;
                    --text-custom: ${formColors.textColor} !important;
                    --heading-custom: ${formColors.headingColor} !important;
                  }
                `}
              </style>
              <h2 className="text-xl font-bold font-heading text-navy mb-6 pb-2 border-b border-gray-100">Couleurs du Site</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-navy">Couleur Primaire</label>
                  <Input type="color" name="primaryColor" value={formColors.primaryColor} onChange={(e) => setFormColors({ ...formColors, primaryColor: e.target.value })} className="w-full h-10 cursor-pointer" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-navy">Couleur Secondaire (Accent / Boutons)</label>
                  <Input type="color" name="secondaryColor" value={formColors.secondaryColor} onChange={(e) => setFormColors({ ...formColors, secondaryColor: e.target.value })} className="w-full h-10 cursor-pointer" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-navy">Couleur de Fond</label>
                  <Input type="color" name="backgroundColor" value={formColors.backgroundColor} onChange={(e) => setFormColors({ ...formColors, backgroundColor: e.target.value })} className="w-full h-10 cursor-pointer" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-navy">Couleur du Texte principal</label>
                  <Input type="color" name="textColor" value={formColors.textColor} onChange={(e) => setFormColors({ ...formColors, textColor: e.target.value })} className="w-full h-10 cursor-pointer" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-navy">Couleur des Titres</label>
                  <Input type="color" name="headingColor" value={formColors.headingColor} onChange={(e) => setFormColors({ ...formColors, headingColor: e.target.value })} className="w-full h-10 cursor-pointer" />
                </div>
              </div>
            </div>

            {/* Contact Info Section */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold font-heading text-navy mb-6 pb-2 border-b border-gray-100">Identité & Coordonnées</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-navy">Nom de l'entreprise</label>
                  <Input name="companyName" defaultValue={settings.companyName || ''} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-navy">Adresse Email Principale</label>
                  <Input name="email" defaultValue={settings.email || ''} type="email" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-navy">Numéro de téléphone</label>
                  <Input name="phone" defaultValue={settings.phone || ''} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-navy">Adresse Physique</label>
                  <Input name="address" defaultValue={settings.address || ''} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold text-navy">Numéro WhatsApp (Format: 212...)</label>
                  <Input name="whatsappNumber" defaultValue={settings.whatsappNumber || ''} placeholder="Ex: 212600000000" />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="hero" className="space-y-8">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold font-heading text-navy mb-6 pb-2 border-b border-gray-100">Section Hero (Accueil)</h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-navy">Photo de fond (URL ou Fichier)</label>
                  <div className="flex gap-4">
                    <Input 
                      value={heroText.heroImage} 
                      onChange={(e) => setHeroText({ ...heroText, heroImage: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className="flex-1"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={heroImageInputRef}
                      onChange={handleHeroImageChange}
                    />
                    <Button type="button" variant="outline" onClick={() => heroImageInputRef.current?.click()} className="whitespace-nowrap">
                      <Upload className="w-4 h-4 mr-2" />
                      Importer
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">Collez une URL ou importez une image (Max 300 KB).</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-navy">Titre Principal</label>
                  <Input 
                    value={heroText.title} 
                    onChange={(e) => setHeroText({ ...heroText, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-navy">Sous-titre / Description</label>
                  <Textarea 
                    className="h-24"
                    value={heroText.subtitle}
                    onChange={(e) => setHeroText({ ...heroText, subtitle: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Live Preview Section */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <h2 className="text-xl font-bold font-heading text-navy mb-6 pb-2 border-b border-gray-100 italic">
                Prévisualisation du Hero
              </h2>
              <div 
                className="rounded-xl overflow-hidden border border-gray-200 relative min-h-[300px] flex flex-col"
                style={{ 
                  backgroundColor: formColors.backgroundColor,
                  color: formColors.textColor
                }}
              >
                {heroText.heroImage && (
                  <div className="absolute inset-0 z-0">
                    <img src={heroText.heroImage} alt="Background" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-navy/80 mix-blend-multiply"></div>
                  </div>
                )}
                
                {/* Header Mockup */}
                <div className="z-10 p-4 border-b border-gray-100/20 flex items-center justify-between bg-white/10 backdrop-blur-sm">
                  <div className="h-8 w-24 bg-gray-200/50 rounded animate-pulse">
                    {logoPreview && <img src={logoPreview} alt="Logo" className="h-full w-full object-contain" />}
                  </div>
                </div>

                {/* Hero Mockup */}
                <div className="z-10 p-12 text-center space-y-6 flex-1 flex flex-col justify-center">
                  <h3 
                    className="text-4xl font-bold font-heading text-white"
                  >
                    {heroText.title || "Titre de votre Hero"}
                  </h3>
                  <p className="max-w-xl mx-auto text-lg text-white/90">
                    {heroText.subtitle || "Ceci est la description de votre entreprise qui apparaîtra sur la page d'accueil."}
                  </p>
                  <div className="pt-4 flex justify-center gap-4">
                    <div 
                      className="px-6 py-3 rounded-lg text-white font-medium text-sm shadow-lg"
                      style={{ backgroundColor: formColors.secondaryColor }}
                    >
                      Découvrir nos solutions
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="about" className="space-y-8">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold font-heading text-navy mb-6 pb-2 border-b border-gray-100">Contenu de la page : À Propos</h2>
              <div className="space-y-6">
                 <div className="space-y-2">
                  <label className="text-sm font-semibold text-navy">Titre de l'histoire</label>
                  <Input 
                    value={aboutText.title} 
                    onChange={(e) => setAboutText({ ...aboutText, title: e.target.value })}
                    placeholder="Ex: Notre Histoire"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-navy">Texte descriptif</label>
                  <Textarea 
                    className="h-48"
                    value={aboutText.text}
                    onChange={(e) => setAboutText({ ...aboutText, text: e.target.value })}
                    placeholder="Écrivez l'histoire de l'entreprise..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-navy">Image d'illustration (URL ou Fichier)</label>
                  <div className="flex gap-4">
                    <Input 
                      value={aboutText.image} 
                      onChange={(e) => setAboutText({ ...aboutText, image: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className="flex-1"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={aboutImageInputRef}
                      onChange={handleAboutImageChange}
                    />
                    <Button type="button" variant="outline" onClick={() => aboutImageInputRef.current?.click()} className="whitespace-nowrap">
                      <Upload className="w-4 h-4 mr-2" />
                      Importer
                    </Button>
                  </div>
                  {aboutText.image && (
                    <div className="mt-4 h-48 rounded-xl overflow-hidden border">
                      <img src={aboutText.image} alt="About preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="modules" className="space-y-8">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold font-heading text-navy mb-6 pb-2 border-b border-gray-100">Section Call To Action (Contactez-nous)</h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-navy">Titre Accrocheur</label>
                  <Input 
                    value={ctaText.title} 
                    onChange={(e) => setCtaText({ ...ctaText, title: e.target.value })}
                    placeholder="Ex: Prêt à transformer vos espaces ?"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-navy">Texte / Sous-titre</label>
                  <Textarea 
                    className="h-24"
                    value={ctaText.text}
                    onChange={(e) => setCtaText({ ...ctaText, text: e.target.value })}
                    placeholder="Contactez notre équipe d'experts..."
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold font-heading text-navy mb-6 pb-2 border-b border-gray-100">Visibilité des Modules</h2>
              <p className="text-sm text-gray-500 mb-6">Activez ou désactivez les différentes sections pour personnaliser la page d'accueil.</p>
              
              <div className="space-y-4">
                <label className="flex items-center p-4 border rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 rounded border-gray-300 text-gold focus:ring-gold"
                    checked={visibility.showStats}
                    onChange={(e) => setVisibility({ ...visibility, showStats: e.target.checked })}
                  />
                  <div className="ml-4">
                    <span className="block text-sm font-semibold text-navy">Afficher les Statistiques</span>
                    <span className="text-xs text-gray-500">Chiffres clés de l'entreprise</span>
                  </div>
                </label>

                <label className="flex items-center p-4 border rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 rounded border-gray-300 text-gold focus:ring-gold"
                    checked={visibility.showTestimonials}
                    onChange={(e) => setVisibility({ ...visibility, showTestimonials: e.target.checked })}
                  />
                  <div className="ml-4">
                    <span className="block text-sm font-semibold text-navy">Afficher les Témoignages</span>
                    <span className="text-xs text-gray-500">Avis clients satisfaits</span>
                  </div>
                </label>

                <label className="flex items-center p-4 border rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 rounded border-gray-300 text-gold focus:ring-gold"
                    checked={visibility.showClients}
                    onChange={(e) => setVisibility({ ...visibility, showClients: e.target.checked })}
                  />
                  <div className="ml-4">
                    <span className="block text-sm font-semibold text-navy">Afficher les Logos Clients</span>
                    <span className="text-xs text-gray-500">Bandeau défilant des partenaires</span>
                  </div>
                </label>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="photos" className="space-y-8">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold font-heading text-navy mb-6 pb-2 border-b border-gray-100">Logos Partenaires / Clients</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                  {partnerLogos.map((logo, idx) => (
                    <div key={idx} className="relative group rounded border flex items-center justify-center p-4 bg-gray-50 h-24">
                      <img src={logo} alt={`Logo ${idx}`} className="max-w-full max-h-full object-contain" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded">
                        <Button type="button" variant="ghost" size="icon" className="text-white hover:text-red-400" onClick={() => removePartnerLogo(idx)}>
                          <X className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <div className="rounded border border-dashed flex items-center justify-center bg-gray-50 h-24 hover:bg-gray-100 transition-colors">
                    <input
                      id="partner-logo-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePartnerLogoUpload}
                    />
                    <Button type="button" variant="ghost" className="w-full h-full text-gray-500" onClick={() => document.getElementById('partner-logo-upload')?.click()}>
                      <Upload className="w-5 h-5 mr-2" /> Ajouter
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-gray-500">Ajoutez les logos de vos partenaires. Format recommandé : avec fond transparent, max 2MB.</p>
              </div>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold font-heading text-navy mb-6 pb-2 border-b border-gray-100">Image "Pourquoi Nous Choisir" (Accueil)</h2>
              <div className="space-y-4">
                <Input 
                  value={photosState.whyUsImage} 
                  onChange={(e) => setPhotosState({ ...photosState, whyUsImage: e.target.value })}
                  placeholder="URL de l'image"
                />
                <input
                  id="why-us-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handlePhotoUpload(e, 'whyUs')}
                />
                <Button type="button" variant="outline" onClick={() => document.getElementById('why-us-upload')?.click()}>
                  <Upload className="w-4 h-4 mr-2" />
                  Importer l'image
                </Button>
                {photosState.whyUsImage && (
                  <img src={photosState.whyUsImage} alt="Why Us Preview" className="max-h-64 object-cover mt-4 rounded-xl shadow-sm border" />
                )}
              </div>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold font-heading text-navy mb-6 pb-2 border-b border-gray-100">Images des Secteurs (Accueil)</h2>
              <div className="space-y-8">
                {['bureaux', 'hotellerie', 'sante', 'enseignement', 'commerce', 'transport'].map((sectorId) => (
                  <div key={sectorId} className="space-y-4 border-b pb-6 last:border-0 last:pb-0">
                    <label className="font-semibold capitalize text-navy block text-lg">Secteur: {sectorId}</label>
                    <div className="flex gap-4 items-center">
                      <Input 
                        value={photosState.sectorsImages[sectorId] || ''} 
                        onChange={(e) => setPhotosState(prev => ({ ...prev, sectorsImages: { ...prev.sectorsImages, [sectorId]: e.target.value } }))}
                        placeholder="URL de l'image"
                        className="flex-1"
                      />
                      <input
                        id={`sector-upload-${sectorId}`}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handlePhotoUpload(e, { type: 'sector', id: sectorId })}
                      />
                      <Button type="button" variant="outline" onClick={() => document.getElementById(`sector-upload-${sectorId}`)?.click()} className="shrink-0">
                        <Upload className="w-4 h-4 mr-2" />
                        Importer
                      </Button>
                    </div>
                    {(photosState.sectorsImages[sectorId]) && (
                      <img src={photosState.sectorsImages[sectorId]} alt={`${sectorId} Preview`} className="mt-2 h-32 w-full max-w-sm rounded-lg object-cover shadow border" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold font-heading text-navy mb-6 pb-2 border-b border-gray-100">Images des Réalisations (Accueil)</h2>
              <div className="space-y-8">
                {['1', '2', '3', '4', '5'].map((realId) => (
                  <div key={realId} className="space-y-4 border-b pb-6 last:border-0 last:pb-0">
                    <label className="font-semibold text-navy block text-lg">Réalisation {realId}</label>
                    <div className="flex gap-4 items-center">
                      <Input 
                        value={photosState.realisationsImages[realId] || ''} 
                        onChange={(e) => setPhotosState(prev => ({ ...prev, realisationsImages: { ...prev.realisationsImages, [realId]: e.target.value } }))}
                        placeholder="URL de l'image"
                        className="flex-1"
                      />
                      <input
                        id={`real-upload-${realId}`}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handlePhotoUpload(e, { type: 'realisation', id: realId })}
                      />
                      <Button type="button" variant="outline" onClick={() => document.getElementById(`real-upload-${realId}`)?.click()} className="shrink-0">
                        <Upload className="w-4 h-4 mr-2" />
                        Importer
                      </Button>
                    </div>
                    {photosState.realisationsImages[realId] && (
                      <img src={photosState.realisationsImages[realId]} alt={`Realisations ${realId} Preview`} className="mt-2 h-32 w-full max-w-sm rounded-lg object-cover shadow border" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4 bg-white p-4 border-t sticky bottom-0 z-50">
          <Button type="button" variant="outline" className="px-6">Annuler</Button>
          <Button type="submit" disabled={loading} className="bg-gold hover:bg-gold-light text-white px-8 shadow-md">
            {loading ? 'Enregistrement...' : (
              <>
                <Save className="w-5 h-5 mr-2" />
                Enregistrer les modifications
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
