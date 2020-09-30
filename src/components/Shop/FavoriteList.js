import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import FavoriteItem from '../../models/FavoriteItem';

const FavoriteList = props => {

    const renderMealItem = itemData => {
        return (
            <FavoriteItem
                title={itemData.item.title}
                image={itemData.item.imageUrl}
                price={itemData.item.price}
                onSelectMeal={() => {
                    props.navigation.navigate('FavoritesScreen', {
                        productId: itemData.item.id
                    })
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
        padding: 15
    }
});

export default FavoriteList;