import { create } from 'zustand';
import { collection, doc, query, onSnapshot, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  status: string;
  image: string;
  description: string;
  slug: string;
  updatedAt: string;
  tags?: string[];
  features?: string[];
}

interface ProductsStore {
  products: Product[];
  loading: boolean;
  init: () => (() => void);
  addProduct: (product: Omit<Product, 'id' | 'updatedAt' | 'slug'>) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

const generateId = () => Math.random().toString(36).substring(2, 15);
const generateSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

export const useProductsStore = create<ProductsStore>((set, get) => ({
  products: [],
  loading: true,
  init: () => {
    const q = query(collection(db, 'products'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const productsData: Product[] = [];
      snapshot.forEach((doc) => {
        productsData.push({ id: doc.id, ...doc.data() } as Product);
      });
      set({ products: productsData, loading: false });
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'products');
    });
    
    return unsubscribe;
  },
  addProduct: async (productData) => {
    try {
      const id = generateId();
      const slug = generateSlug(productData.name);
      const product: Product = {
        ...productData,
        id,
        slug,
        updatedAt: new Date().toISOString(),
      };
      await setDoc(doc(db, 'products', id), product);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'products');
    }
  },
  updateProduct: async (id, productData) => {
    try {
      if (productData.name) {
          productData.slug = generateSlug(productData.name);
      }
      productData.updatedAt = new Date().toISOString();
      await updateDoc(doc(db, 'products', id), productData);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `products/${id}`);
    }
  },
  deleteProduct: async (id) => {
    try {
      await deleteDoc(doc(db, 'products', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `products/${id}`);
    }
  }
}));
