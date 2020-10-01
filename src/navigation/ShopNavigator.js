import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import * as authActions from '../store/actions/auth';
import Colors from '../constants/Colors';

import CartScreen from '../screens/shop/CartScreen';
import CategoryProductsScreen from '../screens/shop/CategoryProductsScreen';
import FavoritesScreen from '../screens/shop/FavoritesScreen';
import HomeScreen from '../screens/shop/HomeScreen';
import PlaceOrderScreen from '../screens/shop/PlaceOrderScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import AuthScreen from '../screens/users/AuthScreen';
import StartupScreen from '../screens/StartupScreen';
import UserProductsScreen from '../screens/users/UserProductsScreen';
import EditProductsScreen from '../screens/users/EditProductsScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const defaultHeaderConfig = {
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white',
  },
};

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultHeaderConfig}>
      <Stack.Screen name="AuthScreen" component={AuthScreen} />
    </Stack.Navigator>
  );
};

const StartupNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultHeaderConfig}>
      <Stack.Screen name="StartupScreen" component={StartupScreen} />
    </Stack.Navigator>
  );
};

const FavoriteNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultHeaderConfig}>
      <Stack.Screen name="FavoritesScreen" component={FavoritesScreen} />
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
};

const HomeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultHeaderConfig}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen
        name="CategoryProductsScreen"
        component={CategoryProductsScreen}
      />
      <Stack.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
      />
      <Stack.Screen
        name="CartScreen"
        component={CartScreen}
      />
      <Stack.Screen
        name="PlaceOrderScreen"
        component={PlaceOrderScreen}
      />
    </Stack.Navigator>
  );
};

const OrderNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultHeaderConfig}>
      <Stack.Screen name="OrdersScreen" component={OrdersScreen} />
    </Stack.Navigator>
  );
};

const UserProductsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultHeaderConfig}>
      <Stack.Screen name="UserProductsScreen" component={UserProductsScreen} />
      <Stack.Screen name="EditProductsScreen" component={EditProductsScreen} />
    </Stack.Navigator>
  );
};

const DrawerNavigator = (props) => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    console.log('LOGOUT');
    dispatch(authActions.logout());
  };
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: Colors.accent,
        labelStyle: { fontSize: 16, fontWeight: 'bold' },
      }}
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
              label="Logout"
              labelStyle={{ fontSize: 16, fontWeight: 'bold' }}
              style={{ flex: 1 }}
              onPress={logoutHandler}
              icon={() => (
                <Icon color="red" size={25} name={'ios-close-outline'} />
              )}
            />
          </DrawerContentScrollView>
        );
      }}>
      <Drawer.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={{
          title: 'Home',
          drawerIcon: ({ color }) => (
            <Icon
              name={
                Platform.OS === 'android'
                  ? 'md-home-outline'
                  : 'ios-home-outline'
              }
              size={25}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="OrderNavigator"
        component={OrderNavigator}
        options={{
          title: 'My Orders',
          drawerIcon: ({ color }) => (
            <Icon
              name={
                Platform.OS === 'android'
                  ? 'file-tray-stacked-outline'
                  : 'file-tray-stacked-outline'
              }
              size={25}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="FavoriteNavigator"
        component={FavoriteNavigator}
        options={{
          title: 'My Favorites',
          drawerIcon: ({ color }) => (
            <Icon
              name={
                Platform.OS === 'android'
                  ? 'md-heart-outline'
                  : 'ios-heart-outline'
              }
              size={25}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="UserProductsNavigator"
        component={UserProductsNavigator}
        options={{
          title: 'Sell on Shopcart',
          drawerIcon: ({ color }) => (
            <Icon
              name={
                Platform.OS === 'android'
                  ? 'md-cloud-upload-outline'
                  : 'ios-cloud-upload-outline'
              }
              size={25}
              color={color}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const ShopNavigator = (props) => {
  const token = useSelector((state) => state.auth.token);
  const isLoading = useSelector((state) => state.auth.isLoading);
  // console.log('Token in navigator' + token);
  // console.log('isLoading in navigator' + isLoading);

  if (isLoading) {
    return (
      <NavigationContainer>
        <StartupNavigator />
      </NavigationContainer>
    );
  }
  if (token === null) {
    return (
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    );
  }
};

export default ShopNavigator;
