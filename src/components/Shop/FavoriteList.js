import React, { useState } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import { CommonActions } from '@react-navigation/native';

import Colors from '../../constants/Colors';
import FavoriteItem from './FavoriteItem';
import { toggleFavorite } from '../../store/actions/products';
import Icon from 'react-native-vector-icons/Ionicons';
import * as cartActions from '../../store/actions/cart';
import * as favoritesActions from '../../store/actions/favorites';

const FavoriteList = (props) => {
  const dispatch = useDispatch();

  const renderFavItem = (itemData) => {
    return (
      <FavoriteItem
        title={itemData.item.title}
        image={itemData.item.imageUrl}
        price={itemData.item.price}
        onSelect={() => {
          props.navigation.navigate('ProductDetailScreen', {
            productId: itemData.item.id,
            variable: 'true',
          });
        }}
        onSelectFavorite={() => {
          dispatch(favoritesActions.toggleFavoritesApi(itemData.item.id));
          props.navigation.replace('FavoritesScreen');
        }}
        onAdd={() => {
          dispatch(cartActions.addToCart(itemData.item));
        }}
        onToggle={props.onToggle}
      />
    );
  };

  return (
    <View style={styles.list}>
      <FlatList
        data={props.listData}
        renderItem={renderFavItem}
        style={{ width: '100%' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default FavoriteList;
