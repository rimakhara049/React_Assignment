import { useCart } from '../context/CartContext';

export default function Navbar({ onToggleCart }) {
  const { cart } = useCart();
  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="shop-header">
      <div className="nav-brand">
        <h1>Tech<span>Vault</span></h1>
        <span className="brand-badge">Official Store</span>
      </div>

      <button className="cart-badge-button" onClick={onToggleCart}>
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <span>View Cart</span>
        <span className="cart-counter-pill">{totalItemCount}</span>
      </button>
    </header>
  );
}