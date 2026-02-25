import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { useProducts } from '../hooks/useProducts';
import { useParams } from 'react-router-dom';
import { AllProductsCategory, capitalizeCategory } from '../hooks/useCategories';
import { ProductCard } from '../components/product/ProductCard';
import { SecondaryButton } from '../components/common/Buttons';
import { SkeletonCard } from '../components/product/SkeletonCard';

export default function HomePage() {
    const { products, loading, error } = useProducts();
    const { user } = useUser();
    const { name: category } = useParams();
    const normalizedCategory = category?.toLowerCase();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const q = params.get('q');
    const cat = params.get('cat');
    
    if (loading) {
        return (
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                    gap: "1rem",
                }}
                >
                {Array.from({ length: 8 }).map((_, i) => (
                    <SkeletonCard key={i} />
                ))}
            </div>
        );
    }

    if (error) return <p>Error: {error}</p>;
    if (!products) return <p>No products found.</p>;

    let filtered = products;

    // Category filtering
    if (normalizedCategory && normalizedCategory !== AllProductsCategory.toLowerCase()) {
    filtered = filtered.filter(
        (product) => product.category.toLowerCase() === normalizedCategory
    );
    }

    if (cat && cat !== AllProductsCategory) {
        filtered = filtered.filter((product) => product.category === cat);
    }

    if (q) {
    filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(q.toLowerCase())
    );
    }

    return (
        <div>
        <h1>Welcome to the shop</h1>
        <h2>{category && category !== AllProductsCategory ? `${capitalizeCategory(category)}` : AllProductsCategory}</h2>
        {user ? (
            <>
            <p>You are logged in as {user.name}</p>
            <Link to="/dashboard">Go to Dashboard</Link>
            </>
        ) : (
            <>
            <p>You are not logged in.</p>
                <SecondaryButton component={Link} to="/login" >
                    Login
                </SecondaryButton>
            </>
        )}

        <div>
        <h1>Products</h1>

        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "1rem",
            }}
        >
            {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
            ))}
        </div>
        </div>

        </div>
    );
}
