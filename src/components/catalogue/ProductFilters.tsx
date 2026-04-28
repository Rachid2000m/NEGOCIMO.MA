import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { useProductsStore } from '@/store/useProductsStore';

export default function ProductFilters() {
  const { products } = useProductsStore();

  // Extract unique categories and their counts from actual products
  const categoriesList = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach(p => {
      const cat = p.category || 'Non classé';
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
  }, [products]);

  // If we had sectors or certifications in the product model, we would extract them here.
  // For now, we'll keep them empty to reflect existing products, or you can map from tags if they exist.
  const sectorsList = useMemo(() => {
    const counts: Record<string, number> = {};
    let foundAny = false;
    products.forEach(p => {
      if (p.tags && Array.isArray(p.tags)) {
        p.tags.forEach(tag => {
          foundAny = true;
          counts[tag] = (counts[tag] || 0) + 1;
        });
      }
    });
    if (!foundAny) return [];
    return Object.entries(counts).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
  }, [products]);

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
        {categoriesList.length > 0 && (
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
        )}

        {sectorsList.length > 0 && (
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
        )}
      </Accordion>
    </div>
  );
}
