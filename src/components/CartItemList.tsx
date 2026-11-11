import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  selectCartItemCount,
} from '../redux/cartSlice';
import { RootState } from '../redux/store';

export default function CartItemList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const itemCount = useSelector(selectCartItemCount);

  return (
    <View style={styles.section}>
      <View style={styles.headerRow}>
        <Text style={styles.headingText}>2. Giỏ hàng ({itemCount} món)</Text>
        {cartItems.length > 0 && (
          <Pressable onPress={() => dispatch(clearCart())} style={styles.clearBtn}>
            <Text style={styles.clearText}>Xóa hết</Text>
          </Pressable>
        )}
      </View>

      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Chưa có sản phẩm nào trong giỏ.</Text>
      ) : (
        cartItems.map((item) => (
          <View key={item.id} style={styles.itemRow}>
            <Text style={styles.itemName} numberOfLines={1}>
              {item.name}
            </Text>

            <View style={styles.qtyGroup}>
              <Pressable
                style={styles.qtyBtn}
                onPress={() => dispatch(decreaseQuantity(item.id))}
              >
                <Text style={styles.qtyBtnText}>-</Text>
              </Pressable>
              <Text style={styles.qtyNum}>{item.quantity}</Text>
              <Pressable
                style={styles.qtyBtn}
                onPress={() => dispatch(increaseQuantity(item.id))}
              >
                <Text style={styles.qtyBtnText}>+</Text>
              </Pressable>
            </View>

            <Text style={styles.itemTotal}>
              ${(item.price * item.quantity).toFixed(2)}
            </Text>

            <Pressable
              style={styles.delBtn}
              onPress={() => dispatch(removeFromCart(item.id))}
            >
              <Text style={styles.delBtnText}>Xóa</Text>
            </Pressable>
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#d9edf7',
    padding: 8,
    borderWidth: 1,
    borderColor: '#999',
    marginBottom: 8,
  },
  headingText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  clearBtn: {
    backgroundColor: '#ffdddd',
    borderWidth: 1,
    borderColor: 'red',
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  clearText: {
    color: 'darkred',
    fontSize: 12,
  },
  emptyText: {
    padding: 8,
    color: '#666',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff8dc',
    marginBottom: 6,
    gap: 8,
  },
  itemName: {
    flex: 1,
  },
  qtyGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  qtyBtn: {
    borderWidth: 1,
    borderColor: '#666',
    backgroundColor: '#eee',
    width: 26,
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnText: {
    fontWeight: 'bold',
  },
  qtyNum: {
    minWidth: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  itemTotal: {
    width: 60,
    textAlign: 'right',
    fontWeight: 'bold',
  },
  delBtn: {
    backgroundColor: 'red',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  delBtnText: {
    color: '#fff',
    fontSize: 12,
  },
});

