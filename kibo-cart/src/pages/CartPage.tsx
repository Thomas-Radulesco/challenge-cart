import { useCart } from '../contexts/CartContext';
import { DangerButton } from '../components/common/Buttons'; 
import styled from 'styled-components';
import DeleteIcon from '@mui/icons-material/Delete';
import { SecondaryButton } from '../components/common/Buttons';
import { Link } from 'react-router-dom';
import { QuantityControls } from '../components/common/QuantityControls';
import { secondary } from '../utils/colors';
import { formatPrice } from "../utils/formatPrice";

const StyledDeleteIcon = styled(DeleteIcon)`
    margin-left: 5px;
`;

const StyledDangerButton = styled(DangerButton)`
    && {
        margin-bottom: 2rem;
        margin-top: 2rem;
        position: static;
    }
`;

const Title = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 4rem;
    margin-bottom: 2rem;
`;

const StyledSecondaryButton = styled(SecondaryButton)`
    && {
        margin-bottom: 2rem;
    }
`;

const TotalCart = styled.h2`
    margin-bottom: 6rem;
    margin-top: 2rem;
`;

const ProductWrapper = styled.div`
    display: flex;
    alignItems: center;
    gap: 1rem;
    border: 1px solid ${secondary.border};
    padding: 1rem;
`;

const ProductDetails = styled.div`
    flex: 1;
`;

const ProductDetailsContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const QuantityControlsWrapper = styled.div`
    align-self: flex-end;
`;

export default function CartPage() {
  const { items, clear } = useCart();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div>
        <Title>
            <h1>Your Cart</h1>
            {(items.length > 0) && (<StyledDangerButton onClick={clear}>Clear cart<StyledDeleteIcon /></StyledDangerButton>)}
        </Title>
        {(items.length === 0) && 
            <p>Your cart is empty.</p>
        }
        <StyledSecondaryButton component={Link} to="/">
            Back to Shop
        </StyledSecondaryButton>

        {(items.length > 0) &&
            <>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {items.map((item) => (
                    <ProductWrapper key={item.id}>
                        <img src={item.image} alt={item.title} width={80} />

                        <ProductDetailsContainer>
                            <ProductDetails style={{ flex: 1 }}>
                                <h3>{item.title}</h3>
                                <p>${formatPrice(item.price)}</p>
                            </ProductDetails>
                            <QuantityControlsWrapper>
                                <QuantityControls id={item.id} quantity={item.quantity} />
                            </QuantityControlsWrapper>
                        </ProductDetailsContainer>

                    </ProductWrapper>
                    ))}
                </div>
                <TotalCart>Total: ${total.toFixed(2)}</TotalCart>
            </>
        }
    </div>
  );
}
