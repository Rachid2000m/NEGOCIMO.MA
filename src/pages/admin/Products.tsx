import { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { products } from '../Catalog'; 

// A mock array for now
const adminProducts = [
  { id: 1, name: 'Moquette Dalle Tarkett', category: 'Revêtement de Sol', price: '45 DH / m²', stock: 1200, status: 'Actif' },
  { id: 2, name: 'Faux Plafond Armstrong', category: 'Faux Plafonds', price: '85 DH / m²', stock: 800, status: 'Actif' },
  { id: 3, name: 'Store Enrouleur Screen', category: 'Stores', price: '250 DH / u', stock: 150, status: 'Rupture' },
  { id: 4, name: 'Bureau Direction Elba', category: 'Mobilier', price: '3400 DH / u', stock: 12, status: 'Actif' },
  { id: 5, name: 'Cloison Amovible Vitrée', category: 'Cloisons', price: 'Sur devis', stock: 0, status: 'Actif' },
];

export default function Products() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = adminProducts.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading text-navy">Catalogue</h1>
          <p className="text-gray-500 mt-2">Gérez les produits affichés sur le site web.</p>
        </div>
        <Button className="bg-gold hover:bg-gold-light text-white shadow-md">
          <Plus className="w-5 h-5 mr-2" />
          Ajouter un produit
        </Button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input 
              type="text" 
              placeholder="Rechercher un produit..." 
              className="pl-10 bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="text-sm text-gray-500">
            {filteredProducts.length} produits trouvés
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Nom du produit</th>
                <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Catégorie</th>
                <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Prix Indicatif</th>
                <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Stock Dispo.</th>
                <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Statut</th>
                <th className="px-6 py-4 text-right font-semibold text-gray-600 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-semibold text-navy">{product.name}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{product.category}</td>
                  <td className="px-6 py-4 text-gray-600">{product.price}</td>
                  <td className="px-6 py-4">
                    <span className="text-gray-600">{product.stock > 0 ? product.stock : '-'}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      product.status === 'Actif' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="outline" size="icon" className="w-8 h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="w-8 h-8 text-red-600 hover:text-red-700 hover:bg-red-50">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
