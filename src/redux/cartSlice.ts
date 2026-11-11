import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  discountCode: string | null;
  taxRate: number;
  shippingCost: number;
}

const initialState: CartState = {
  items: [],
  discountCode: null,
  taxRate: 0.1,
  shippingCost: 10,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    loadCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const found = state.items.find((item) => item.id === action.payload.id);
      if (found) {
        found.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.quantity += 1;
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
      state.discountCode = null;
    },
    applyDiscount: (state, action: PayloadAction<string>) => {
      state.discountCode = action.payload;
    },
    setShippingCost: (state, action: PayloadAction<number>) => {
      state.shippingCost = action.payload;
    },
  },
});

export default cartSlice.reducer;
export const {
  loadCart,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
  applyDiscount,
  setShippingCost,
} = cartSlice.actions;

export const selectSubtotal = (state: RootState) =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

export const selectDiscount = (state: RootState) => {
  const subtotal = selectSubtotal(state);
  const rates: Record<string, number> = {
    SUMMER10: 0.1,
    SPECIAL20: 0.2,
  };
  const rate = rates[state.cart.discountCode || ''] || 0;
  return subtotal * rate;
};

export const selectTax = (state: RootState) =>
  selectSubtotal(state) * state.cart.taxRate;

export const selectCartTotal = (state: RootState) => {
  const subtotal = selectSubtotal(state);
  if (subtotal === 0) return 0;
  return subtotal - selectDiscount(state) + selectTax(state) + state.cart.shippingCost;
};

export const selectCartItemCount = (state: RootState) =>
  state.cart.items.reduce((count, item) => count + item.quantity, 0);

