import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import FavoriteList from '../../components/Shop/FavoriteList';

const FavoritesScreen = props => {
    const favoriteProduct = useSelector(state => state.products.favoriteProduct);

    if (favoriteProduct.length === 0 || !favoriteProduct) {
        return (
            <View style={styles.content}>
                <Text>No Favorites Product Found. Start adding Some!</Text>
            </View>
        );
    }

    // props.navigation.setOptions({
    //     title: 'Your Favorites',
    //     headerLeft: () => (
    //         <HeaderButtons HeaderButtonComponent={HeaderButton}>
    //             <Item
    //                 title='Menu'
    //                 iconName='ios-menu'
    //                 onPress={() => {
    //                     props.navigation.toggleDrawer();
    //                 }}
    //             />
    //         </HeaderButtons>
    //     )
    // });

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