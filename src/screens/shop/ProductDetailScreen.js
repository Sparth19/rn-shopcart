import React, {useEffect, useState, useCallback} from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import * as favoritesActions from '../../store/actions/favorites';
import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cart';
import Icon from 'react-native-vector-icons/Ionicons';

const PlaceDetailScreen = (props) => {
  const {productId} = props.route.params;
  const {variable} = props.route.params;
  const [filled, setFilled] = useState(variable);

  let selectedProduct = useSelector((state) =>
    state.products.availableAllProducts.find((prod) => prod.id === productId),
  );
  if (!selectedProduct) {
    selectedProduct = useSelector((state) =>
      state.products.availableProducts.find((prod) => prod.id === productId),
    );
  }

  const dispatch = useDispatch();

  useEffect(() => {
    props.navigation.setOptions({
      title: selectedProduct.title,
    });
  }, [props]);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.details}>
          <Text style={styles.title}>{selectedProduct.title}</Text>
          <Image
            style={styles.image}
            source={{uri: selectedProduct.imageUrl}}
            resizeMode={'contain'}
          />
          <View style={styles.actions}>
            <TouchableOpacity
              onPress={() => {
                dispatch(favoritesActions.toggleFavoritesApi(productId));
                setFilled(filled === 'true' ? 'false' : 'true');
              }}>
              <Icon
                color={Colors.primary}
                style={styles.icon}
                size={Dimensions.get('window').width > 400 ? 30 : 25}
                name={filled === 'true' ? 'ios-heart' : 'ios-heart-outline'}
              />
            </TouchableOpacity>
            <Button
              color={Colors.primary}
              title="Add to Cart"
              onPress={() => {
                dispatch(cartActions.addToCart(selectedProduct));
              }}
            />
          </View>

          <Text style={styles.text}>
            M.R.P.: <Text style={styles.price}>₹{selectedProduct.price}</Text>
          </Text>
          <Text style={styles.text}>Features & Details</Text>
          <Text style={styles.description}>{selectedProduct.description}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: Dimensions.get('window').width > 400 ? 300 : 250,
    backgroundColor: '#DCDCDC',
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  icon: {marginRight: 10},
  details: {
    margin: 20,
  },
  title: {
    fontSize: Dimensions.get('window').width > 400 ? 18 : 14,
    marginBottom: 10,
  },
  price: {
    fontSize: Dimensions.get('window').width > 400 ? 20 : 15,
    color: Colors.primary,
    marginBottom: 10,
  },
  text: {
    fontWeight: 'bold',
    fontSize: Dimensions.get('window').width > 400 ? 18 : 14,
    marginBottom: 10,
  },
  description: {
    fontSize: Dimensions.get('window').width > 400 ? 18 : 14,
  },
});

export default PlaceDetailScreen;
