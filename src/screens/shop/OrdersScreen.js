import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, Platform, ActivityIndicator, View, Text, StyleSheet, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/Shop/OrderItem';
import Colors from '../../constants/Colors';
import * as ordersActions from '../../store/actions/orders';

const OrdersScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const orders = useSelector(state => state.orders.orders);
    console.log(orders);
    const dispatch = useDispatch();

    // const loadedOrders = useCallback(async () => {
    //     setError(null);
    //     setIsLoading(true);
    //     try {
    //         await dispatch(ordersActions.fetchOrders());
    //     } catch (err) {
    //         setError(err.message);
    //     }
    //     setIsLoading(false);
    // }, [dispatch, setError, setIsLoading]);

    // useEffect(() => {
    //     props.navigation.addListener('focus', loadedOrders);
    //     return () => {
    //         props.navigation.removeListener('focus', loadedOrders);
    //     };
    // }, [loadedOrders]);

    // useEffect(() => {
    //     setIsLoading(true);
    //     loadedOrders().then(() => {
    //         setIsLoading(false);
    //     });
    // }, [loadedOrders]);

    const { navigation } = props;
    useEffect(() => {
        navigation.setOptions({
            title: 'Your Orders',
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
            )
        });
    }, [navigation]);

    if (error) {
        return (
            <View style={styles.centered}>
                <Text>An Error occured!</Text>
                <Button
                    title='Handle Error'
                    onPress={loadedOrders}
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

    if (!isLoading && orders.length === 0) {
        return (
            <View style={styles.centered}>
                <Text>No Orders found. Maybe start ordering some!</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={orders}
            renderItem={itemData =>
                <OrderItem
                    amount={itemData.item.totalAmount}
                    date={itemData.item.readableDate}
                    items={itemData.item.items}
                />
            }
        />
    );
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default OrdersScreen;