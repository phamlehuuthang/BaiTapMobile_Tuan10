import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  applyDiscount,
  clearCart,
  selectCartTotal,
  selectDiscount,
  selectSubtotal,
  selectTax,
  setShippingCost,
} from '../redux/cartSlice';
import { RootState } from '../redux/store';

export default function OrderSummary() {
  const dispatch = useDispatch();
  const discountCode = useSelector((state: RootState) => state.cart.discountCode);
  const shippingCost = useSelector((state: RootState) => state.cart.shippingCost);
  const subtotal = useSelector(selectSubtotal);
  const discount = useSelector(selectDiscount);
  const tax = useSelector(selectTax);
  const total = useSelector(selectCartTotal);

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>3. Khuyến mãi & Vận chuyển</Text>

      <Text style={styles.label}>Chọn mã giảm giá:</Text>
      <View style={styles.btnGroup}>
        <Pressable
          style={[
            styles.optionBtn,
            discountCode === 'SUMMER10' && styles.optionActive,
          ]}
          onPress={() => dispatch(applyDiscount('SUMMER10'))}
        >
          <Text>SUMMER10 (-10%)</Text>
        </Pressable>
        <Pressable
          style={[
            styles.optionBtn,
            discountCode === 'SPECIAL20' && styles.optionActive,
          ]}
          onPress={() => dispatch(applyDiscount('SPECIAL20'))}
        >
          <Text>SPECIAL20 (-20%)</Text>
        </Pressable>
      </View>

      <Text style={styles.label}>Chọn phí giao hàng:</Text>
      <View style={styles.btnGroup}>
        <Pressable
          style={[styles.optionBtn, shippingCost === 0 && styles.optionActive]}
          onPress={() => dispatch(setShippingCost(0))}
        >
          <Text>Miễn phí ($0)</Text>
        </Pressable>
        <Pressable
          style={[styles.optionBtn, shippingCost === 10 && styles.optionActive]}
          onPress={() => dispatch(setShippingCost(10))}
        >
          <Text>Thường ($10)</Text>
        </Pressable>
        <Pressable
          style={[styles.optionBtn, shippingCost === 25 && styles.optionActive]}
          onPress={() => dispatch(setShippingCost(25))}
        >
          <Text>Nhanh ($25)</Text>
        </Pressable>
      </View>

      <View style={styles.billBox}>
        <Text style={styles.billTitle}>TÓM TẮT ĐƠN HÀNG</Text>
        <View style={styles.line}>
          <Text>Tạm tính:</Text>
          <Text>${subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.line}>
          <Text>Giảm giá:</Text>
          <Text style={{ color: 'green' }}>-${discount.toFixed(2)}</Text>
        </View>
        <View style={styles.line}>
          <Text>Thuế (10%):</Text>
          <Text>${tax.toFixed(2)}</Text>
        </View>
        <View style={styles.line}>
          <Text>Phí vận chuyển:</Text>
          <Text>${shippingCost.toFixed(2)}</Text>
        </View>
        <View style={[styles.line, styles.totalLine]}>
          <Text style={styles.totalLabel}>Thành tiền:</Text>
          <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
        </View>

        <Pressable
          style={styles.payBtn}
          onPress={() => {
            alert(`Thanh toán thành công: $${total.toFixed(2)}`);
            dispatch(clearCart());
          }}
        >
          <Text style={styles.payBtnText}>THANH TOÁN ĐƠN HÀNG</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
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
  label: {
    fontWeight: 'bold',
    marginBottom: 6,
  },
  btnGroup: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  optionBtn: {
    flex: 1,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#999',
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  optionActive: {
    backgroundColor: '#e8f5e9',
    borderColor: 'green',
  },
  billBox: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#999',
    backgroundColor: '#f9f9f9',
    gap: 6,
  },
  billTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 4,
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalLine: {
    borderTopWidth: 1,
    borderColor: '#999',
    paddingTop: 8,
    marginTop: 4,
  },
  totalLabel: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  totalValue: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'darkred',
  },
  payBtn: {
    marginTop: 10,
    backgroundColor: 'green',
    paddingVertical: 10,
    alignItems: 'center',
  },
  payBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

