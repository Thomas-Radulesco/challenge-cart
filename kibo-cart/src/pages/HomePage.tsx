import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../contexts/CartContext';
import { useParams } from 'react-router-dom';
import { AllProductsCategory, capitalizeCategory } from '../hooks/useCategories';

export default function HomePage() {
    const { products, loading, error } = useProducts();
    const { user } = useUser();
    const { add } = useCart();
    const { name: category } = useParams();
    const normalizedCategory = category?.toLowerCase();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const q = params.get('q');
    const cat = params.get('cat');

    if (loading) return <p>Loading products...</p>;
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
            <Link to="/login">Go to Login</Link>
            </>
        )}

        <div>
        <h1>Products</h1>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {filtered.map((p) => (
            <div key={p.id} style={{ border: '1px solid #ccc', padding: '1rem' }}>
                <img src={p.image} alt={p.title} width={150} />
                <h3>{p.title}</h3>
                <p>${p.price.toFixed(2)}</p>
                <button onClick={() => add({ ...p, quantity: 1 })}
                >
                    Add to Cart
                </button>
            </div>
            ))}
        </div>
        </div>

        </div>
    );
}
