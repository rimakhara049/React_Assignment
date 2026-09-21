import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { dispatch, cart } = useCart();
  const itemInCart = cart.find((i) => i.id === product.id);

  return (
    <div className="product-card">
      <div className="product-image-box">
        <img src={product.image} alt={product.name} />
        <span className="product-category">{product.category}</span>
      </div>
      
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="product-description">{product.description}</p>
        
        <div className="product-price-row">
          <span className="price-tag">₹{product.price.toLocaleString('en-IN')}</span>
          <button
            className="btn btn-add"
            onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}
          >
            {itemInCart ? `Add More (${itemInCart.quantity})` : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}