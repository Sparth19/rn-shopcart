import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import FavoriteList from '../../components/Shop/FavoriteList';

const FavoritesScreen = props => {
    const favoriteProduct = useSelector(state => state.products.favoriteProduct);

    const { navigation } = props;

    useEffect(() => {
        navigation.setOptions({
            title: 'Your Favorites',
            headerLeft: () => (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item
                        title='Menu'
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
                        title='cart'
                        iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                        onPress={() => {
                            props.navigation.navigate('CartScreen');
                        }}
                    />
                </HeaderButtons>
            )
        });
    }, [navigation]);


    if (favoriteProduct.length === 0 || !favoriteProduct) {
        return (
            <View style={styles.content}>
                <Text>No Favorites Product Found. Start adding Some!</Text>
            </View>
        );
    }
    return (
        <FavoriteList listData={favoriteProduct} navigation={props.navigation} />
    );
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default FavoritesScreen;