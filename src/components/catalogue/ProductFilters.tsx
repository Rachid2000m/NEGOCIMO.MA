import { Search } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";

export default function ProductFilters() {
  const categoriesList = [
    { name: "Revêtements PVC", count: 24 },
    { name: "Moquette Pro", count: 18 },
    { name: "Faux Plafonds", count: 12 },
    { name: "Façades", count: 8 },
    { name: "Isolation", count: 15 },
    { name: "Mobilier B2B", count: 32 }
  ];

  const sectorsList = [
    { name: "Bureaux", count: 45 },
    { name: "Hôtellerie", count: 28 },
    { name: "Santé", count: 14 },
    { name: "Enseignement", count: 22 },
    { name: "Commerce", count: 36 }
  ];

  const certsList = [
    { name: "ISO 9001", count: 50 },
    { name: "HQE", count: 15 },
    { name: "Cradle to Cradle", count: 8 }
  ];

  return (
    <div className="w-full">
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
        <Input 
          type="text" 
          placeholder="Rechercher un produit..." 
          className="pl-9 bg-white"
        />
      </div>

      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-bold text-navy">Filtres</h3>
        <button className="text-xs text-gold hover:underline font-semibold">Réinitialiser</button>
      </div>

      <Accordion type="multiple" defaultValue={["categories", "secteurs"]} className="w-full">
        <AccordionItem value="categories" className="border-border">
          <AccordionTrigger className="text-sm font-bold text-navy hover:text-gold hover:no-underline">Catégories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {categoriesList.map((c, i) => (
                <label key={i} className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input type="checkbox" className="peer appearance-none w-4 h-4 border border-gray-300 rounded-sm checked:bg-gold checked:border-gold transition-colors" />
                    <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <span className="text-sm text-text-secondary group-hover:text-navy transition-colors flex-1">{c.name}</span>
                  <span className="text-xs text-gray-400">({c.count})</span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="secteurs" className="border-border">
          <AccordionTrigger className="text-sm font-bold text-navy hover:text-gold hover:no-underline">Secteurs d'activité</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {sectorsList.map((c, i) => (
                <label key={i} className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input type="checkbox" className="peer appearance-none w-4 h-4 border border-gray-300 rounded-sm checked:bg-gold checked:border-gold transition-colors" />
                    <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <span className="text-sm text-text-secondary group-hover:text-navy transition-colors flex-1">{c.name}</span>
                  <span className="text-xs text-gray-400">({c.count})</span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="certs" className="border-border">
          <AccordionTrigger className="text-sm font-bold text-navy hover:text-gold hover:no-underline">Certifications</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {certsList.map((c, i) => (
                <label key={i} className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input type="checkbox" className="peer appearance-none w-4 h-4 border border-gray-300 rounded-sm checked:bg-gold checked:border-gold transition-colors" />
                    <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <span className="text-sm text-text-secondary group-hover:text-navy transition-colors flex-1">{c.name}</span>
                  <span className="text-xs text-gray-400">({c.count})</span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
