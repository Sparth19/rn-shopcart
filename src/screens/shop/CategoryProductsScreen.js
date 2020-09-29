import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import ProductItem from '../../components/Shop/ProductItem';
import * as productsActions from '../../store/actions/products';
import CATEGORIES from '../../data/category-data';
import Colors from '../../constants/Colors';

const HomeScreen = props => {
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();

    const { category } = props.route.params;
    const selectedCategory = CATEGORIES.find(cat => cat.title === category);
    const { navigation } = props

    useEffect(() => {
        navigation.setOptions({
            title: selectedCategory.title
        })
    }, [navigation]);

    const products = useSelector(state => state.products.availableProducts);
    //console.log(products);

    const loadProducts = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            console.log('in try')
            await dispatch(productsActions.fetchProduct(category));
        } catch (err) {
            setError(err.message);
        }
        setIsRefreshing(false);
    }, [dispatch, setIsRefreshing, setError]);

    useEffect(() => {
        props.navigation.addListener('focus', loadProducts);
        return () => {
            props.navigation.removeListener('focus', loadProducts);
        };
    }, [loadProducts]);

    useEffect(() => {
        setIsLoading(true);
        loadProducts().then(() => {
            setIsLoading(false);
        });
    }, [dispatch, loadProducts]);

    if (error) {
        return (
            <View style={styles.centered}>
                <Text>An Error occured!</Text>
                <Button
                    title='Handle Error'
                    onPress={loadProducts}
                    color={Colors.primary}
                />
            </View>
        );
    }

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        );
    }

    if (!isLoading && products.length === 0) {
        return (
            <View style={styles.centered}>
                <Text>No Products found. Maybe start adding some!</Text>
            </View>
        );
    }

    return (
        <View>
            <FlatList
                onRefresh={loadProducts}
                refreshing={isRefreshing}
                data={products}
                renderItem={itemData => (
                    <ProductItem
                        image={itemData.item.imageUrl}
                        title={itemData.item.title}
                        price={itemData.item.price}
                        onSelect={() => {
                            props.navigation.navigate(
                                'ProductDetailScreen',
                                { productId: itemData.item.id }
                            );
                        }}
                    >
                        <Button
                            color={Colors.primary}
                            title='View Details'
                            onPress={() => { }}
                        />
                        <Button
                            color={Colors.primary}
                            title='To Cart'
                            onPress={() => { }}
                        />
                    </ProductItem>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default HomeScreen;