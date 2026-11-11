import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface Product {
  id: number;
  name: string;
  price: number;
}

interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const FALLBACK_PRODUCTS: Product[] = [
  { id: 1, name: 'Balo Laptop Chống Nước', price: 45 },
  { id: 2, name: 'Áo Thun Thể Thao Nam', price: 22 },
  { id: 3, name: 'Áo Khoác Kaki Mùa Thu', price: 55 },
  { id: 4, name: 'Đồng Hồ Đeo Tay Thời Trang', price: 110 },
  { id: 5, name: 'Ổ Cứng Di Động SSD 512GB', price: 85 },
];

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products?limit=5');
      if (!response.ok) throw new Error('Lỗi tải sản phẩm');
      const data = await response.json();

      return data.map((item: any) => ({
        id: Number(item.id),
        name: String(item.title),
        price: Number(item.price),
      })) as Product[];
    } catch {
      return FALLBACK_PRODUCTS;
    }
  }
);

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Lỗi không xác định';
      });
  },
});

export default productSlice.reducer;

