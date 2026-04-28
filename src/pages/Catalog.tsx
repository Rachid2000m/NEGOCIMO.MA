import { useState, useEffect } from 'react';
import ProductFilters from '@/components/catalogue/ProductFilters';
import ProductCard from '@/components/catalogue/ProductCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { useProductsStore } from '@/store/useProductsStore';

export default function Catalog() {
  const [sortBy, setSortBy] = useState("new");
  const { products, loading } = useProductsStore();

  return (
    <div className="bg-background min-h-screen pb-24">
      {/* Banner */}
      <div className="bg-navy py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-white">
            <h1 className="text-3xl md:text-4xl font-bold font-heading mb-2">Catalogue Produits</h1>
            <p className="text-gray-300 text-sm md:text-base">Accueil &gt; Catalogue</p>
          </div>
        </div>
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 mx-auto mt-8 flex flex-col md:flex-row gap-8 relative items-start">
        {/* Mobile Filters */}
        <div className="md:hidden w-full flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
          <Sheet>
            <SheetTrigger className="flex items-center gap-2 text-navy font-bold">
              <Filter className="w-5 h-5" />
              Filtrer (0)
            </SheetTrigger>
            <SheetContent side="left" className="bg-white overflow-y-auto">
              <SheetTitle className="text-left font-heading text-xl mb-6 text-navy border-b pb-4">
                Filtres Avancés
              </SheetTitle>
              <ProductFilters />
            </SheetContent>
          </Sheet>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[160px] bg-white border-border">
              <SelectValue placeholder="Trier par" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">Nouveautés</SelectItem>
              <SelectItem value="asc">A - Z</SelectItem>
              <SelectItem value="desc">Z - A</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 shrink-0 top-24">
          <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
            <ProductFilters />
          </div>
        </aside>

        {/* Main Grid */}
        <div className="flex-1">
          <div className="hidden md:flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-navy">
              {products.length} produits trouvés
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-sm text-text-secondary">Trier par:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] bg-white border-border">
                  <SelectValue placeholder="Sélectionner..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">Nouveautés</SelectItem>
                  <SelectItem value="asc">Disponibilité</SelectItem>
                  <SelectItem value="desc">Promotions</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination skeleton */}
          <div className="flex justify-center mt-12">
            <button className="px-6 py-3 border-2 border-navy text-navy font-bold rounded hover:bg-navy hover:text-white transition-colors">
              Charger plus de produits
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
