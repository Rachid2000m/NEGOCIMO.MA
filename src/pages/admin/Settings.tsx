import { useState, useRef, useEffect, ChangeEvent, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Save, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useSettingsStore } from '@/store/useSettingsStore';

export default function Settings() {
  const { settings, updateSettings } = useSettingsStore();
  const [loading, setLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formColors, setFormColors] = useState({
    primaryColor: settings?.primaryColor || '#1C2B4A',
    secondaryColor: settings?.secondaryColor || '#B5902A',
    backgroundColor: settings?.backgroundColor || '#F9F7F4',
    textColor: settings?.textColor || '#1A1A1A',
  });

  const [heroText, setHeroText] = useState({
    title: settings?.heroTitle || '',
    subtitle: settings?.heroSubtitle || '',
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
      });
      setHeroText({
        title: settings.heroTitle || '',
        subtitle: settings.heroSubtitle || '',
      });
    }
  }, [settings]);

  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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
        logoUrl: logoPreview || '',
        primaryColor: (formData.get('primaryColor') as string) || '',
        secondaryColor: (formData.get('secondaryColor') as string) || '',
        backgroundColor: (formData.get('backgroundColor') as string) || '',
        textColor: (formData.get('textColor') as string) || '',
        whatsappNumber: (formData.get('whatsappNumber') as string) || '',
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
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold font-heading text-navy">Paramètres du site</h1>
        <p className="text-gray-500 mt-2">Gérez les informations globales, le logo, le texte d'accueil et les coordonnées.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
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
                  Taille maximale : 2 MB. Dimensions idéales : 200x50px.
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

        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
          <style>
            {`
              :root {
                --primary-custom: ${formColors.primaryColor} !important;
                --secondary-custom: ${formColors.secondaryColor} !important;
                --background-custom: ${formColors.backgroundColor} !important;
                --text-custom: ${formColors.textColor} !important;
              }
            `}
          </style>
          <h2 className="text-xl font-bold font-heading text-navy mb-6 pb-2 border-b border-gray-100">Couleurs du Site</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-navy">Couleur Primaire</label>
              <div className="flex gap-2">
                <Input 
                  type="color" 
                  name="primaryColor" 
                  value={formColors.primaryColor} 
                  onChange={(e) => setFormColors({ ...formColors, primaryColor: e.target.value })}
                  className="w-full h-10 cursor-pointer" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-navy">Couleur Secondaire (Accent / Boutons)</label>
              <div className="flex gap-2">
                <Input 
                  type="color" 
                  name="secondaryColor" 
                  value={formColors.secondaryColor} 
                  onChange={(e) => setFormColors({ ...formColors, secondaryColor: e.target.value })}
                  className="w-full h-10 cursor-pointer" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-navy">Couleur de Fond</label>
              <div className="flex gap-2">
                <Input 
                  type="color" 
                  name="backgroundColor" 
                  value={formColors.backgroundColor} 
                  onChange={(e) => setFormColors({ ...formColors, backgroundColor: e.target.value })}
                  className="w-full h-10 cursor-pointer" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-navy">Couleur du Texte principal</label>
              <div className="flex gap-2">
                <Input 
                  type="color" 
                  name="textColor" 
                  value={formColors.textColor} 
                  onChange={(e) => setFormColors({ ...formColors, textColor: e.target.value })}
                  className="w-full h-10 cursor-pointer" 
                />
              </div>
            </div>
          </div>
        </div>

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
            <div className="space-y-2">
              <label className="text-sm font-semibold text-navy">Numéro WhatsApp (Format: 212...)</label>
              <Input name="whatsappNumber" defaultValue={settings.whatsappNumber || ''} placeholder="Ex: 212600000000" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold font-heading text-navy mb-6 pb-2 border-b border-gray-100">Section Hero (Accueil)</h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-navy">Titre Principal</label>
              <Input 
                name="heroTitle" 
                value={heroText.title} 
                onChange={(e) => setHeroText({ ...heroText, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-navy">Sous-titre / Description</label>
              <Textarea 
                name="heroSubtitle"
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
            Prévisualisation en direct
          </h2>
          <div 
            className="rounded-xl overflow-hidden border border-gray-200"
            style={{ 
              backgroundColor: formColors.backgroundColor,
              color: formColors.textColor
            }}
          >
            {/* Header Mockup */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white/50 backdrop-blur-sm">
              <div className="h-8 w-24 bg-gray-200 rounded animate-pulse">
                {logoPreview && <img src={logoPreview} alt="Logo" className="h-full w-full object-contain" />}
              </div>
              <div className="flex gap-4">
                <div className="h-2 w-12 bg-gray-200 rounded"></div>
                <div className="h-2 w-12 bg-gray-200 rounded"></div>
              </div>
            </div>

            {/* Hero Mockup */}
            <div className="p-12 text-center space-y-6">
              <h3 
                className="text-4xl font-bold font-heading"
                style={{ color: formColors.primaryColor }}
              >
                {heroText.title || "Titre de votre Hero"}
              </h3>
              <p className="max-w-xl mx-auto text-lg opacity-80">
                {heroText.subtitle || "Ceci est la description de votre entreprise qui apparaîtra sur la page d'accueil."}
              </p>
              <div className="pt-4 flex justify-center gap-4">
                <div 
                  className="px-6 py-3 rounded-lg text-white font-medium text-sm shadow-lg"
                  style={{ backgroundColor: formColors.secondaryColor }}
                >
                  Découvrir nos solutions
                </div>
                <div 
                  className="px-6 py-3 rounded-lg border font-medium text-sm"
                  style={{ borderColor: formColors.secondaryColor, color: formColors.secondaryColor }}
                >
                  Contactez-nous
                </div>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-4 text-center">
            * Ceci est une version simplifiée pour illustrer les changements de couleurs et de texte.
          </p>
        </div>

        <div className="flex justify-end gap-4">
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
