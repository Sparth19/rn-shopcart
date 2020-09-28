import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import CartScreen from '../screens/shop/CartScreen';
import CategoryProductsScreen from '../screens/shop/CategoryProductsScreen';
import FavoritesScreen from '../screens/shop/FavoritesScreen';
import HomeScreen from '../screens/shop/HomeScreen';
import PlaceOrderScreen from '../screens/shop/PlaceOrderScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="CategoryProductsScreen" component={CategoryProductsScreen} />
      <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
};


const ShopNavigator = (props) => {
  return <NavigationContainer>
    <HomeNavigator />
  </NavigationContainer>;
};

export default ShopNavigator;
