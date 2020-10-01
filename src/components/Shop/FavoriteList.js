import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useDispatch } from 'react-redux';

import FavoriteItem from '../../models/FavoriteItem';
import { toggleFavorite } from '../../store/actions/products';
import Icon from 'react-native-vector-icons/Ionicons';
import * as cartActions from '../../store/actions/cart';

const FavoriteList = props => {
    const dispatch = useDispatch();

    const renderMealItem = itemData => {
        return (
            <FavoriteItem
                title={itemData.item.title}
                image={itemData.item.imageUrl}
                price={itemData.item.price}
                onSelect={() => {
                    props.navigation.navigate('ProductDetailScreen', {
                        productId: itemData.item.id
                    })
                }}
                onSelectFavorite={() => {
                    dispatch(toggleFavorite(itemData.item.id));
                }}
                onAdd={() => {
                    dispatch(cartActions.addToCart(itemData.item));
                }}
            />
        );
    }

    return (
        <View style={styles.list}>
            <FlatList
                data={props.listData}
                renderItem={renderMealItem}
                style={{ width: '100%' }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    }
});

export default FavoriteList;