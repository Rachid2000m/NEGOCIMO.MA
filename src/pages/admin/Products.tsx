import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Plus, Search, Edit2, Trash2, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

import { useProductsStore } from '@/store/useProductsStore';

export default function Products() {
  const { products, addProduct, updateProduct, deleteProduct, loading } = useProductsStore();
  const [searchTerm, setSearchTerm] = useState('');
  const imageInputRef = useRef<HTMLInputElement>(null);
  
  // Modals state
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  
  // Current item state
  const [currentItem, setCurrentItem] = useState<any>(null);

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleOpenAdd = () => {
    setCurrentItem({ name: '', category: '', price: '', stock: 0, status: 'Actif', image: '', description: '', tags: '', features: '' });
    setIsAddEditOpen(true);
  };

  const handleOpenEdit = (product: any) => {
    setCurrentItem({ 
      ...product,
      tags: Array.isArray(product.tags) ? product.tags.join(', ') : '',
      features: Array.isArray(product.features) ? product.features.join('\n') : ''
    });
    setIsAddEditOpen(true);
  };

  const handleOpenDelete = (product: any) => {
    setCurrentItem(product);
    setIsDeleteOpen(true);
  };

  const handleSave = async () => {
    if (!currentItem.name) return;
    
    const parseArrayInput = (input: string | string[] | undefined, delimiter: string = ',') => {
        if (!input) return [];
        if (Array.isArray(input)) return input;
        return input.split(delimiter).map(s => s.trim()).filter(s => s.length > 0);
    };

    const productData = { 
        ...currentItem, 
        description: currentItem.description || '',
        tags: parseArrayInput(currentItem.tags),
        features: parseArrayInput(currentItem.features, '\n'),
    };
    
    if (currentItem.id) {
       await updateProduct(currentItem.id, productData);
    } else {
       await addProduct(productData);
    }
    
    setIsAddEditOpen(false);
  };

  const handleDelete = async () => {
    if (currentItem?.id) {
      await deleteProduct(currentItem.id);
    }
    setIsDeleteOpen(false);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5000000) {
        alert("Fichier trop grand. Maximum 5 MB.");
        return;
      }
      try {
        const { compressImage } = await import('@/lib/imageResizer');
        const compressedBase64 = await compressImage(file, 800, 0.6);
        setCurrentItem({ ...currentItem, image: compressedBase64 });
      } catch (error) {
        console.error("Erreur de compression:", error);
        alert("Erreur lors du traitement de l'image.");
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading text-navy">Catalogue</h1>
          <p className="text-gray-500 mt-2">Gérez les produits affichés sur le site web.</p>
        </div>
        <Button className="bg-gold hover:bg-gold-light text-white shadow-md" onClick={handleOpenAdd}>
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
                <th className="px-6 py-4 font-semibold text-gray-600 text-sm w-16">Image</th>
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
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="w-10 h-10 rounded object-cover border" />
                    ) : (
                      <div className="w-10 h-10 rounded bg-gray-100 border flex items-center justify-center text-gray-400 text-xs">
                        N/A
                      </div>
                    )}
                  </td>
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
                      <Button variant="outline" size="icon" className="w-8 h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50" onClick={() => handleOpenEdit(product)}>
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="w-8 h-8 text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => handleOpenDelete(product)}>
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

      {/* Add/Edit Modal */}
      <Dialog open={isAddEditOpen} onOpenChange={setIsAddEditOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto w-[90vw] p-0">
          <div className="p-6 h-full flex flex-col min-h-0">
            <DialogHeader className="mb-4">
              <DialogTitle>{currentItem?.id ? 'Modifier le produit' : 'Ajouter un produit'}</DialogTitle>
            </DialogHeader>
            {currentItem && (
              <div className="space-y-4 py-4 flex-1 overflow-y-auto pr-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Image (Optionnel)</label>
                  <div className="flex gap-4 items-center">
                    {currentItem.image ? (
                       <img src={currentItem.image} alt="Preview" className="w-16 h-16 rounded object-cover border" />
                    ) : (
                       <div className="w-16 h-16 rounded bg-gray-100 border flex items-center justify-center text-gray-400">
                         <Upload className="w-6 h-6" />
                       </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={imageInputRef}
                      onChange={handleImageChange}
                    />
                    <Button type="button" variant="outline" onClick={() => imageInputRef.current?.click()}>
                      <Upload className="w-4 h-4 mr-2" />
                      Importer
                    </Button>
                    {currentItem.image && (
                       <Button type="button" variant="ghost" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => setCurrentItem({ ...currentItem, image: '' })}>
                         Supprimer
                       </Button>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nom du produit</label>
                  <Input value={currentItem.name} onChange={e => setCurrentItem({...currentItem, name: e.target.value})} placeholder="Moquette Tarkett..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Catégorie</label>
                    <Input value={currentItem.category} onChange={e => setCurrentItem({...currentItem, category: e.target.value})} placeholder="Revêtement de Sol" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Prix Indicatif</label>
                    <Input value={currentItem.price} onChange={e => setCurrentItem({...currentItem, price: e.target.value})} placeholder="45 DH / m²" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <textarea 
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Description détaillée du produit..."
                    value={currentItem.description}
                    onChange={e => setCurrentItem({...currentItem, description: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tags (Séparés par des virgules)</label>
                  <Input value={currentItem.tags} onChange={e => setCurrentItem({...currentItem, tags: e.target.value})} placeholder="Bureaux, Hôtellerie, Nouveauté..." />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Caractéristiques (Une par ligne)</label>
                  <textarea 
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Format: 50 x 50 cm&#10;Épaisseur: 6.2 mm..."
                    value={currentItem.features}
                    onChange={e => setCurrentItem({...currentItem, features: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Stock</label>
                    <Input type="number" value={currentItem.stock} onChange={e => setCurrentItem({...currentItem, stock: parseInt(e.target.value) || 0})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Statut</label>
                    <select 
                      className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
                      value={currentItem.status} 
                      onChange={e => setCurrentItem({...currentItem, status: e.target.value})}
                    >
                      <option value="Actif">Actif</option>
                      <option value="Inactif">Inactif</option>
                      <option value="Rupture">Rupture</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter className="pt-4 border-t mt-4">
              <Button variant="outline" onClick={() => setIsAddEditOpen(false)}>Annuler</Button>
              <Button onClick={handleSave} className="bg-navy hover:bg-navy-light text-white">Enregistrer</Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer le produit</DialogTitle>
          </DialogHeader>
          <div className="py-4 text-gray-600">
            Êtes-vous sûr de vouloir supprimer <span className="font-semibold text-navy">{currentItem?.name}</span> ? Cette action est irréversible.
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>Annuler</Button>
            <Button variant="destructive" onClick={handleDelete}>Supprimer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
