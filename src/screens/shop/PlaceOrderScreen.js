import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  Alert,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {CommonActions} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';

import Colors from '../../constants/Colors';
import * as ordersActions from '../../store/actions/orders';

const PlaceOrderScreen = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const {navigation} = props;

  const userData = useSelector((state) => state.auth.userData);
  const {cartItems} = props.route.params;
  const {cartTotalAmount} = props.route.params;

  let editAddress = false;
  if (userData.userAddress === '') {
    editAddress = true;
  }
  useEffect(() => {
    navigation.setOptions({
      title: 'Place Order',
    });
  }, [navigation]);

  const placeOrderHandler = useCallback(async () => {
    setIsLoading(true);
    try {
      await dispatch(ordersActions.addOrder(cartItems, cartTotalAmount));
      setIsLoading(false);
      props.navigation.navigate('HomeScreen');
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  }, [dispatch, cartItems, cartTotalAmount]);

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
    <ScrollView style={styles.screen}>
      <View style={styles.main}>
        <Text style={{...styles.totalPayment, ...styles.text}}>
          Total Payment : ₹ {cartTotalAmount}
        </Text>
        {!editAddress ? (
          <View>
            <Text style={styles.text}>Delivery Address</Text>
            <View style={styles.address}>
              <Text style={styles.text}>{userData.userAddress}</Text>
            </View>
            <View style={styles.changeAddress}>
              <Text>Change Address ? </Text>
              <Button
                title="Go to My Account"
                onPress={() => {
                  navigation.dispatch(
                    CommonActions.navigate({
                      name: 'MyAccountNavigator',
                    }),
                  );
                }}
              />
            </View>
            <View style={styles.addOrderContainer}>
              <Button
                title="Place Order"
                color={Colors.primary}
                onPress={placeOrderHandler}
              />
            </View>
          </View>
        ) : (
          <View style={styles.red}>
            <Text style={styles.textRed}>
              Please insert Address in My Account Section
            </Text>
            <Button
              title="Go to My Account"
              color={Colors.accent}
              onPress={() => {
                navigation.dispatch(
                  CommonActions.navigate({
                    name: 'MyAccountNavigator',
                  }),
                );
              }}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    margin: 20,
  },
  text: {
    fontSize: Dimensions.get('window').width > 400 ? 18 : 14,
    fontWeight: '400',
    marginVertical: 5,
  },
  totalPayment: {
    color: Colors.primary,
  },
  textRed: {
    fontSize: Dimensions.get('window').width > 400 ? 18 : 14,
    fontWeight: '400',
    marginVertical: 5,
    color: 'red',
  },
  address: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginVertical: 8,
  },
  red: {
    borderColor: 'red',
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
  },
  changeAddress: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addOrderContainer: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primary,
    padding: 10,
    margin: 10,
  },
});

export default PlaceOrderScreen;
