import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-native-paper';

import Colors from '../../constants/Colors';
import CartItem from '../../components/Shop/CartItem';
import Card from '../../components/UI/Card';
import * as cartActions from '../../store/actions/cart';
import * as ordersActions from '../../store/actions/orders';

const CartScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const { navigation } = props;
  useEffect(() => {
    navigation.setOptions({
      title: 'Your Cart',
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
    return transformedCartItems;
  });

  const buyNowHandler = () => {
    props.navigation.navigate('PlaceOrderScreen', {
      cartItems: cartItems,
      cartTotalAmount: cartTotalAmount,
    });
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{' '}
          <Text style={styles.amount}>
            ₹{Math.round(cartTotalAmount.toFixed(2) * 100) / 100}
          </Text>
        </Text>
        {isLoading ? (
          <ActivityIndicator size="small" color={Colors.primary} />
        ) : (
            <Button
              color={Colors.accent}
              title="Buy Now"
              uppercase={false}
              mode="contained"
              disabled={cartItems.length === 0}
              onPress={buyNowHandler}>
              Buy Now
            </Button>
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
            price={itemData.item.productPrice}
            amount={itemData.item.sum}
            deletable
            editable
            onRemove={() => {
              dispatch(cartActions.removeFromCart(itemData.item.productId));
            }}
            onAdd={() => {
              dispatch(cartActions.addFromCart(itemData.item.productId));
            }}
            onDelete={() => {
              dispatch(cartActions.deleteFromCart(itemData.item.productId));
            }}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10
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
    fontSize: Dimensions.get('window').width > 400 ? 18 : 14,
  },
  amount: {
    color: Colors.primary,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CartScreen;
