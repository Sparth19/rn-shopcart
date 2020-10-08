import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {Searchbar, List} from 'react-native-paper';

import HeaderButton from '../../components/UI/HeaderButton';
import CategoryGridTiles from '../../components/UI/CategoryGridTile';
import * as authActions from '../../store/actions/auth';

const HomeScreen = (props) => {
  const categories = useSelector((state) => state.products.availableCategories);

  const {navigation} = props;
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token === null) {
      dispatch(authActions.logout());
    }

    navigation.setOptions({
      title: 'All Categories',
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="menu"
            iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
            onPress={() => {
              props.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      ),
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="search"
            iconName={Platform.OS === 'android' ? 'md-search' : 'ios-search'}
            onPress={() => {
              props.navigation.navigate('SearchScreen');
            }}
          />
          <Item
            title="cart"
            iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
            onPress={() => {
              props.navigation.navigate('CartScreen');
            }}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation, token]);

  return (
    <SafeAreaView>
      {/* main category */}
      <FlatList
        data={categories}
        numColumns={2}
        renderItem={(itemData) => (
          <CategoryGridTiles
            title={itemData.item.title}
            color={itemData.item.color}
            image={itemData.item.image}
            onSelect={() => {
              props.navigation.navigate('CategoryProductsScreen', {
                category: itemData.item.title,
              });
            }}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
