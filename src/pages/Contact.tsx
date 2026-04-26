import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Contact() {
  const [formType, setFormType] = useState('devis');

  return (
    <div className="bg-background min-h-screen">
      {/* Banner */}
      <div className="bg-navy py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gold/5 skew-x-12 transform origin-top-right" />
        <div className="container mx-auto relative z-10">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl font-black font-heading mb-4">Contact & Devis</h1>
            <p className="text-lg text-gray-300">
              Discutez avec nos experts de votre projet d'aménagement professionnel. Nous nous engageons à vous répondre sous 24h ouvrées.
            </p>
          </div>
        </div>
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 mx-auto mt-12 mb-24 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Info Side */}
        <div className="lg:col-span-1 flex flex-col gap-8">
          <div className="bg-white p-8 rounded-2xl border border-border shadow-sm">
            <h3 className="font-heading font-bold text-2xl text-navy mb-6">Nos Coordonnées</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-section-alt text-gold rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-navy mb-1">Siège Social</h4>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    123 Quartier Industriel,<br />20000 Casablanca, Maroc
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-section-alt text-gold rounded-full flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-navy mb-1">Téléphone</h4>
                  <p className="text-text-secondary text-sm">
                    +212 600 000 000<br />
                    <span className="text-xs text-gray-400">Lun-Ven, 9h-18h</span>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-section-alt text-gold rounded-full flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-navy mb-1">Email</h4>
                  <p className="text-text-secondary text-sm">
                    contact@negocimo.ma<br />
                    devis@negocimo.ma
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Map Placeholder */}
          <div className="bg-section-alt rounded-2xl overflow-hidden aspect-square border border-border flex items-center justify-center">
            <p className="text-text-secondary font-semibold text-sm">Google Maps Embed</p>
          </div>
        </div>

        {/* Form Side */}
        <div className="lg:col-span-2">
          <div className="bg-white p-8 md:p-12 rounded-2xl border border-border shadow-xl">
            <div className="flex flex-wrap gap-4 mb-8">
              <button 
                onClick={() => setFormType('devis')}
                className={`flex-1 py-3 px-6 rounded-lg font-bold text-sm transition-all ${formType === 'devis' ? 'bg-navy text-white shadow-md' : 'bg-section-alt text-text-secondary hover:bg-gray-200'}`}
              >
                Demande de Devis
              </button>
              <button 
                onClick={() => setFormType('contact')}
                className={`flex-1 py-3 px-6 rounded-lg font-bold text-sm transition-all ${formType === 'contact' ? 'bg-navy text-white shadow-md' : 'bg-section-alt text-text-secondary hover:bg-gray-200'}`}
              >
                Message Général
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); alert('Formulaire simulé soumis avec succès !'); }} className="space-y-6">
              {formType === 'devis' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <h3 className="font-heading font-bold text-xl text-navy mb-4 border-l-4 border-gold pl-3">Étape 1 : Votre projet</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-navy">Secteur d'activité *</label>
                      <Select>
                        <SelectTrigger className="bg-background">
                          <SelectValue placeholder="Sélectionner un secteur" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bureaux">Bureaux & Administratif</SelectItem>
                          <SelectItem value="hotellerie">Hôtellerie</SelectItem>
                          <SelectItem value="sante">Santé</SelectItem>
                          <SelectItem value="enseignement">Enseignement</SelectItem>
                          <SelectItem value="commerce">Commerce</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-navy">Type de projet *</label>
                      <Select>
                        <SelectTrigger className="bg-background">
                          <SelectValue placeholder="Sélectionner le type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="renovation">Rénovation</SelectItem>
                          <SelectItem value="neuf">Construction neuve</SelectItem>
                          <SelectItem value="extension">Extension</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-navy">Surface estimée (m²) *</label>
                      <Input type="number" placeholder="ex: 500" className="bg-background" required />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-navy">Délai souhaité *</label>
                      <Select>
                        <SelectTrigger className="bg-background">
                          <SelectValue placeholder="Sélectionner le délai" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="urgent">Urgent</SelectItem>
                          <SelectItem value="normal">1 à 3 mois</SelectItem>
                          <SelectItem value="plan">En planification</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <h3 className="font-heading font-bold text-xl text-navy mb-4 border-l-4 border-gold pl-3 mt-10">Étape 2 : Vos coordonnées</h3>
                </motion.div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-navy">Nom complet *</label>
                  <Input type="text" placeholder="Karim Alaoui" className="bg-background" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-navy">Email professionnel *</label>
                  <Input type="email" placeholder="karim@entreprise.ma" className="bg-background" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-navy">Société *</label>
                  <Input type="text" placeholder="Nom de la société" className="bg-background" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-navy">Téléphone *</label>
                  <Input type="tel" placeholder="+212 600..." className="bg-background" required />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-semibold text-navy">Message complémentaire</label>
                  <Textarea placeholder="Précisez votre demande..." className="bg-background min-h-[120px]" />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4">
                <input type="checkbox" id="cgu" className="w-5 h-5 accent-navy rounded border-gray-300" required />
                <label htmlFor="cgu" className="text-sm text-text-secondary">
                  J'accepte la <a href="#" className="text-navy font-bold underline">politique de confidentialité</a> de NEGOCIMO.
                </label>
              </div>

              <Button type="submit" className="w-full bg-gold hover:bg-gold-light text-white font-bold h-14 text-lg mt-4 shadow-lg shadow-gold/20">
                {formType === 'devis' ? 'Envoyer ma demande de devis' : 'Envoyer mon message'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
