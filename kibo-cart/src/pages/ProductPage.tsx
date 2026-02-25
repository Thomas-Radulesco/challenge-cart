import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Product } from '../types/product';
import { fetchProductById } from "@/api/products";
import { PrimaryButton } from '../components/common/Buttons';
import styled from 'styled-components';
import { useCart } from '../contexts/CartContext';
import { SecondaryButton } from '../components/common/Buttons';
import { Link } from 'react-router-dom';
import { AddShoppingCart } from "@mui/icons-material";
import { formatPrice } from "../utils/formatPrice";
import { QuantityControls } from "../components/common/QuantityControls";


const StyledAddIcon = styled(AddShoppingCart)`
    margin-left: 25px;
`;

const ProductTitle = styled.h1`
    margin-top: 3rem;
`;

const ProductWrapper = styled.div`
    display: flex;
    flex-direction: column; 
`;

const ProductCard = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    alignItems: flex-start;
    margin-top: 3rem;
     & img {
        margin: auto;
     }
    @media (min-width: 670px) {
        flex-direction: row;
    }
`;

const ProductDataWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const ProductDetails = styled.div`

`;

const ProductInteraction = styled.div`
    align-self: flex-end;
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 2rem;
    margin-bottom: 5rem;
`;

export const ProductPage = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const { items, add } = useCart();
    const quantity = items.find((i) => i.id === product?.id)?.quantity || 0;  

    useEffect(() => {
        if (!id) return;

        setLoading(true);
        fetchProductById(Number(id))
        .then((data: Product | null) => setProduct(data))
        .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return <div>Loading product...</div>;
    }

    if (!product) {
        return <div>Product not found.</div>;
    }

    return (
        <ProductWrapper>
            <ProductTitle>{product.title}</ProductTitle>
            <ProductCard>
                <img
                src={product.image}
                alt={product.title}
                style={{ maxWidth: '300px', objectFit: 'contain' }}
                />
                <ProductDataWrapper>
                    <ProductDetails>
                        <p><strong>Price:</strong> ${formatPrice(product.price)}</p>
                        <p><strong>Category:</strong> {product.category}</p>
                        {product.rating && (
                            <p>
                                <strong>Rating:</strong> {product.rating.rate} ({product.rating.count} reviews)
                            </p>
                        )}
                        <p style={{ marginTop: '1rem' }}>{product.description}</p>
                    </ProductDetails>
                    <ProductInteraction>
                        <SecondaryButton as={Link} to="/">
                            Back to Shop
                        </SecondaryButton>
                        {/* <PrimaryButton onClick={() => add({...product, quantity: 1})}>
                            Add to Cart  <StyledAddIcon />
                        </PrimaryButton> */}

                        {quantity === 0 ? (
                            <PrimaryButton
                                onClick={() => add({...product, quantity: 1})}
                            >
                                Add to Cart <StyledAddIcon />
                            </PrimaryButton>
                            ) : (
                                <div style={{marginTop: "-26px",}}>
                                    <QuantityControls id={product.id} quantity={quantity} />
                                </div>
                        )}



                    </ProductInteraction>
                </ProductDataWrapper>
            </ProductCard>
        </ProductWrapper>
    );
};
