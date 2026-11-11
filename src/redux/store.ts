import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import productReducer from './productSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
  },
});

store.subscribe(() => {
  const cartItems = store.getState().cart.items;
  AsyncStorage.setItem('cartItems', JSON.stringify(cartItems)).catch(
    console.error
  );
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

