import { useCart } from '../context/CartContext';

export default function CartItem({ item }) {
  const { dispatch } = useCart();

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="cart-item-img" />
      <div className="cart-item-details">
        <h4>{item.name}</h4>
        <div className="cart-item-price">₹{item.price.toLocaleString('en-IN')} each</div>

        <div className="quantity-controls">
          <button
            className="qty-btn"
            onClick={() =>
              dispatch({
                type: 'UPDATE_QUANTITY',
                payload: { id: item.id, quantity: item.quantity - 1 }
              })
            }
          >
            -
          </button>
          <span className="qty-number">{item.quantity}</span>
          <button
            className="qty-btn"
            onClick={() =>
              dispatch({
                type: 'UPDATE_QUANTITY',
                payload: { id: item.id, quantity: item.quantity + 1 }
              })
            }
          >
            +
          </button>
        </div>
      </div>

      <div className="cart-item-end">
        <span className="item-total-price">
          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
        </span>
        <button
          className="btn-remove"
          onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}
        >
          Remove
        </button>
      </div>
    </div>
  );
}