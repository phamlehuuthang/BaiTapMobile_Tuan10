import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { RootState } from '../redux/store';

export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.items);

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>1. Danh sách sản phẩm</Text>
      {products.slice(0, 5).map((item) => (
        <View key={item.id} style={styles.row}>
          <View style={styles.info}>
            <Text style={styles.name} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={styles.price}>Đơn giá: ${item.price.toFixed(2)}</Text>
          </View>
          <Pressable
            style={styles.addBtn}
            onPress={() => dispatch(addToCart(item))}
          >
            <Text style={styles.addBtnText}>+ Thêm</Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 16,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    backgroundColor: '#d9edf7',
    padding: 8,
    borderWidth: 1,
    borderColor: '#999',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    marginBottom: 6,
  },
  info: {
    flex: 1,
    paddingRight: 8,
  },
  name: {
    fontWeight: 'bold',
  },
  price: {
    color: 'darkred',
  },
  addBtn: {
    backgroundColor: 'navy',
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  addBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

