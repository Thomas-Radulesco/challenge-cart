import { useEffect, useState } from 'react';
import { fetchCategories } from "../api/products";

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

        setLoading(true);
        setError(null);
        
        fetchCategories()
            .then((data) => {
                cachedCategories = data;
                setCategories(data);
            })
            .catch((err) => {
                setError(err instanceof Error ? err.message : "API error");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return { categories, loading, error };
}
