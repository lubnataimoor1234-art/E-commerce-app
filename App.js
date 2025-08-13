import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Basket from './screens/Basket';
import ProductList from './screens/ProductList';
import ProductDetail from './screens/ProductDetails';

import { BasketProvider } from './context/BasketContext';
import { Button } from 'react-native';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
   
    <BasketProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ProductList" component={ProductList} options={{ title: 'Products' }} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ title: 'Details' }} />
        <Stack.Screen name="Basket" component={Basket} options={{ title: 'Basket' }} />
      

        
      </Stack.Navigator>
    </NavigationContainer>
    </BasketProvider>
    
  );
}



