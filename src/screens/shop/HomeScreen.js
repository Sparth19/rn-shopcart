import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import CategoryGridTile from '../../components/UI/CategoryGridTile';

const HomeScreen = (props) => {
  const categories = useSelector((state) => state.products.availableCategories);

  const { navigation } = props;

  useEffect(() => {
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
          {/* <Item
            title="heart"
            iconName={Platform.OS === 'android' ? 'md-heart' : 'ios-heart'}
            onPress={() => {
              props.navigation.navigate('FavoritesScreen');
            }}
          /> */}
          <Item
            title="cart"
            iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
            onPress={() => {
              props.navigation.navigate('CartScreen');
            }}
          />
        </HeaderButtons>
      )
    });
  }, [navigation]);

  return (
    <FlatList
      data={categories}
      renderItem={(itemData) => (
        <CategoryGridTile
          title={itemData.item.title}
          color={itemData.item.color}
          onSelect={() => {
            props.navigation.navigate('CategoryProductsScreen', {
              category: itemData.item.title,
            });
          }}
        />
      )}
      numColumns={2}
    />
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
