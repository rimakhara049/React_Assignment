import { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const INITIAL_STATE = {
  cart: [],
  coupon: {
    code: '',
    discountPercent: 0,
    applied: false
  },
  couponError: ''
};

const VALID_COUPONS = {
  SAVE10: 10,
  SUPER20: 20,
  FESTIVE50: 50
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingIndex = state.cart.findIndex((item) => item.id === action.payload.id);
      if (existingIndex > -1) {
        const updatedCart = state.cart.map((item, idx) =>
          idx === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
        );
        return { ...state, cart: updatedCart };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }]
      };
    }

    case 'REMOVE_FROM_CART': {
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload)
      };
    }

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          cart: state.cart.filter((item) => item.id !== id)
        };
      }
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
      };
    }

    case 'APPLY_COUPON': {
      const codeUpper = action.payload.trim().toUpperCase();
      if (VALID_COUPONS[codeUpper]) {
        return {
          ...state,
          coupon: {
            code: codeUpper,
            discountPercent: VALID_COUPONS[codeUpper],
            applied: true
          },
          couponError: ''
        };
      }
      return {
        ...state,
        couponError: 'Invalid Coupon Code! Try SAVE10, SUPER20, or FESTIVE50.'
      };
    }

    case 'REMOVE_COUPON': {
      return {
        ...state,
        coupon: { code: '', discountPercent: 0, applied: false },
        couponError: ''
      };
    }

    case 'CLEAR_CART': {
      return INITIAL_STATE;
    }

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  // Calculations
  const subtotal = state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = state.coupon.applied
    ? (subtotal * state.coupon.discountPercent) / 100
    : 0;
  const taxableAmount = subtotal - discountAmount;
  const gstAmount = taxableAmount > 0 ? (taxableAmount * 0.18) : 0; // 18% GST
  const grandTotal = taxableAmount + gstAmount;

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        coupon: state.coupon,
        couponError: state.couponError,
        subtotal,
        discountAmount,
        gstAmount,
        grandTotal,
        dispatch
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}