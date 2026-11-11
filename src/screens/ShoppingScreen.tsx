import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CartItemList from '../components/CartItemList';
import OrderSummary from '../components/OrderSummary';
import ProductList from '../components/ProductList';
import { loadCart } from '../redux/cartSlice';
import { fetchProducts } from '../redux/productSlice';
import { RootState } from '../redux/store';

export default function ShoppingScreen() {
  const dispatch = useDispatch();
  const status = useSelector((state: RootState) => state.products.status);

  useEffect(() => {
    const init = async () => {
      const saved = await AsyncStorage.getItem('cartItems');
      if (saved) {
        dispatch(loadCart(JSON.parse(saved)));
      }
      if (status === 'idle') {
        dispatch(fetchProducts() as any);
      }
    };
    init();
  }, [dispatch, status]);

  if (status === 'loading') {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="navy" />
        <Text style={{ marginTop: 8 }}>Đang tải danh sách sản phẩm...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>GIỎ HÀNG REDUX TOOLKIT</Text>
      <ProductList />
      <CartItemList />
      <OrderSummary />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 14,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    backgroundColor: '#fff8dc',
    borderWidth: 1,
    borderColor: '#999',
    marginBottom: 14,
  },
});

