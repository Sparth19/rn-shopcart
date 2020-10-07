import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions, SafeAreaView} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import CategoryGridTile from '../../components/UI/CategoryGridTile';
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
      <FlatList
        data={categories}
        renderItem={(itemData) => (
          <CategoryGridTile
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
        numColumns={2}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
