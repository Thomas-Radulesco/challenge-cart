import { useEffect, useState } from 'react';
import type { Product } from '../types/product';
const API_URL = import.meta.env.VITE_API_URL + '/products';

let cachedProducts: Product[] | null = null;

export function useProducts() {
  const [products, setProducts] = useState<Product[] | null>(cachedProducts);
  const [loading, setLoading] = useState(!cachedProducts);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cachedProducts) return; // already loaded

    async function load() {
      try {
        setLoading(true);
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        cachedProducts = data;
        setProducts(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { products, loading, error };
}
