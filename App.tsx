import React from 'react';
import { SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import ShoppingScreen from './src/screens/ShoppingScreen';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <ShoppingScreen />
      </SafeAreaView>
    </Provider>
  );
}
