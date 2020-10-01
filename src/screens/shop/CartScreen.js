import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';
import CartItem from '../../components/Shop/CardItem';
import Card from '../../components/UI/Card';
import * as cartActions from '../../store/actions/cart';
import * as ordersActions from '../../store/actions/orders';

const CartScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const {navigation} = props;
  useEffect(() => {
    navigation.setOptions({
      title: 'Your Cart',
      // headerLeft: () => (
      //   <HeaderButtons HeaderButtonComponent={HeaderButton}>
      //     <Item
      //       title="Menu"
      //       iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
      //       onPress={() => {
      //         props.navigation.toggleDrawer();
      //       }}
      //     />
      //   </HeaderButtons>
      // ),
    });
  }, [navigation]);

  const dispatch = useDispatch();

  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        productImage: state.cart.items[key].productImage,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1,
    );
  });
  const sendOrderHandler = useCallback(async () => {
    //console.log(cartItems);
    setIsLoading(true);
    try {
      //await props.navigation.navigate('PlaceOrderScreen');

      await dispatch(ordersActions.addOrder(cartItems, cartTotalAmount));

      props.navigation.navigate('HomeScreen');
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occured!', error, [{text: 'Okay'}]);
    }
  }, [error]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{' '}
          <Text style={styles.amount}>
            ${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}
          </Text>
        </Text>
        {isLoading ? (
          <ActivityIndicator size="small" color={Colors.primary} />
        ) : (
          <Button
            color={Colors.accent}
            title="Order Now"
            disabled={cartItems.length === 0}
            onPress={sendOrderHandler}
          />
        )}
      </Card>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            image={itemData.item.productImage}
            amount={itemData.item.sum}
            deletable
            onRemove={() => {
              dispatch(cartActions.removeFromCart(itemData.item.productId));
            }}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
  },
  summaryText: {
    //fontFamily: 'open-sans-bold',
    fontSize: 18,
  },
  amount: {
    color: Colors.primary,
  },
});

export default CartScreen;
