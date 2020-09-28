import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import CategoryGridTile from '../../components/UI/CategoryGridTile';

const HomeScreen = props => {
    const categories = useSelector(state => state.products.availableCategories);
    return (
        <FlatList
            data={categories}
            renderItem={itemData => (
                <CategoryGridTile
                    title={itemData.item.title}
                    color={itemData.item.color}
                    onSelect={() => {
                        props.navigation.navigate('CategoryProductsScreen', {
                            categoryId: itemData.item.id
                        })
                    }}
                />
            )}
            numColumns={2}
        />
    );
};

const styles = StyleSheet.create({
});

export default HomeScreen;