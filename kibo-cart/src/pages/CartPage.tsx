import { useCart } from '../contexts/CartContext';


export default function CartPage() {
  const { items, increment, decrement, remove, clear } = useCart();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div>
        <h1>Your Cart</h1>

        {(items.length === 0) && 
            <p>Your cart is empty.</p>
        }

        {(items.length > 0) &&
            <>
                <button onClick={clear} style={{ marginBottom: '1rem' }}>
                    Clear Cart
                </button>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {items.map((item) => (
                    <div
                        key={item.id}
                        style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        border: '1px solid #ccc',
                        padding: '1rem',
                        }}
                    >
                        <img src={item.image} alt={item.title} width={80} />

                        <div style={{ flex: 1 }}>
                        <h3>{item.title}</h3>
                        <p>${item.price.toFixed(2)}</p>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <button onClick={() => decrement(item.id)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => increment(item.id)}>+</button>
                        </div>

                        <button onClick={() => remove(item.id)}>Remove</button>
                    </div>
                    ))}
                </div>
                <h2 style={{ marginTop: '2rem' }}>Total: ${total.toFixed(2)}</h2>
            </>
        }
    </div>
  );
}
