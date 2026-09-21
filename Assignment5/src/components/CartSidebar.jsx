import { useState } from 'react';
import { useCart } from '../context/CartContext';
import CartItem from './CartItem';

export default function CartSidebar({ isOpen, onClose }) {
  const [couponInput, setCouponInput] = useState('');
  const {
    cart,
    coupon,
    couponError,
    subtotal,
    discountAmount,
    gstAmount,
    grandTotal,
    dispatch
  } = useCart();

  if (!isOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput) return;
    dispatch({ type: 'APPLY_COUPON', payload: couponInput });
    setCouponInput('');
  };

  return (
    <div className="sidebar-backdrop" onClick={onClose}>
      <aside className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
        <div className="sidebar-header">
          <h3>Shopping Cart ({cart.length})</h3>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="sidebar-body">
          {cart.length === 0 ? (
            <div className="cart-empty-message">
              <p>Your shopping cart is empty.</p>
              <span>Explore the products and add items to checkout.</span>
            </div>
          ) : (
            <div className="cart-items-container">
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="sidebar-footer">
            {/* Coupon Section */}
            <div className="coupon-box">
              {coupon.applied ? (
                <div className="active-coupon-pill">
                  <span>Coupon: <strong>{coupon.code}</strong> (-{coupon.discountPercent}%)</span>
                  <button
                    className="remove-coupon-btn"
                    onClick={() => dispatch({ type: 'REMOVE_COUPON' })}
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="coupon-form">
                  <input
                    type="text"
                    placeholder="Coupon: SAVE10, SUPER20, FESTIVE50"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                  />
                  <button type="submit" className="btn btn-apply">Apply</button>
                </form>
              )}
              {couponError && <p className="coupon-error-text">{couponError}</p>}
            </div>

            {/* Calculations Breakdown */}
            <div className="invoice-summary">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>₹{subtotal.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
              </div>

              {coupon.applied && (
                <div className="summary-row discount">
                  <span>Discount ({coupon.discountPercent}%):</span>
                  <span>- ₹{discountAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                </div>
              )}

              <div className="summary-row">
                <span>GST (18% Slab):</span>
                <span>₹{gstAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
              </div>

              <div className="summary-row grand-total">
                <span>Grand Total:</span>
                <span>₹{grandTotal.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
              </div>
            </div>

            <button
              className="btn btn-checkout"
              onClick={() => alert(`Payment Gateway Mock: Proceeding with ₹${grandTotal.toFixed(2)}`)}
            >
              Checkout Now
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}