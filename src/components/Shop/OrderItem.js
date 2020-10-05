import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, Dimensions} from 'react-native';

import CartItem from './CartItem';
import Colors from '../../constants/Colors';
import Card from '../UI/Card';

const OrderItem = (props) => {
  const [showDetail, setShowDetail] = useState(false);
  // console.log(props.amount);
  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text
          numberOfLines={1}
          ellipsizeMode={'tail'}
          style={styles.totalAmount}>
          Total : ₹{props.amount.toFixed(2)}
        </Text>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>{props.date}</Text>
        </View>
      </View>
      <Button
        color={Colors.accent}
        title={showDetail ? 'Hide Details' : 'Show Details'}
        onPress={() => {
          setShowDetail((prevState) => !prevState);
        }}
      />
      {showDetail && (
        <View style={styles.detailItems}>
          {props.items.map((cartItem) => (
            <CartItem
              key={cartItem.productId}
              quantity={cartItem.quantity}
              amount={cartItem.sum}
              title={cartItem.productTitle}
              image={cartItem.productImage}
              price={cartItem.productPrice}
            />
          ))}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    margin: 10,
    padding: 10,
    alignItems: 'center',
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  totalAmount: {
    //fontFamily: 'open-sans-bold',
    fontSize: Dimensions.get('window').width > 400 ? 18 : 14,
    color: Colors.primary,
  },
  dateContainer: {},
  date: {
    //fontFamily: 'open-sans',
    fontSize: Dimensions.get('window').width > 400 ? 16 : 12,
    color: '#888',
    overflow: 'hidden',
  },
  detailItems: {
    width: '100%',
  },
});

export default OrderItem;
