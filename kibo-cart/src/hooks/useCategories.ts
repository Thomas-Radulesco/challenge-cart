import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL + '/products/categories';

let cachedCategories: string[] | null = null;

export const AllProductsCategory = 'All products';

export function capitalizeCategory(cat: string) {
    return cat.charAt(0).toUpperCase() + cat.slice(1);
}

export function useCategories() {
    const [categories, setCategories] = useState<string[] | null>(cachedCategories);
    const [loading, setLoading] = useState(!cachedCategories);
    const [error, setError] = useState<string | null>(null);    

    useEffect(() => {
        if (cachedCategories) return;

        async function load() {
        try {
            setLoading(true);
            const res = await fetch(API_URL);
            if (!res.ok) throw new Error('Failed to fetch categories');
            const data = await res.json();
            // Capitalize each category
            const formatted = data.map(capitalizeCategory);
            cachedCategories = [AllProductsCategory, ...formatted];
            setCategories(cachedCategories);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
        }
        load();
    }, []);

    return { categories, loading, error };
}
