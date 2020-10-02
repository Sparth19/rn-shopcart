import React, {useEffect, useState, useCallback} from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import * as favoritesActions from '../../store/actions/favorites';
import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cart';
import Icon from 'react-native-vector-icons/Ionicons';

const PlaceDetailScreen = (props) => {
  const {productId, variable} = props.route.params;
  const [filled, setFilled] = useState(variable);
  console.log('var : ' + variable);

  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((prod) => prod.id === productId),
  );

  const dispatch = useDispatch();

  useEffect(() => {
    props.navigation.setOptions({
      title: selectedProduct.title,
    });
  }, [props]);

  return (
    <ScrollView>
      <Image style={styles.image} source={{uri: selectedProduct.imageUrl}} />

      <View style={styles.actions}>
        <TouchableOpacity
          onPress={() => {
            dispatch(favoritesActions.toggleFavoritesApi(productId));
            setFilled(filled === 'true' ? 'false' : 'true');
            // setFlag(flag === 'true' ? 'false' : 'true');
          }}>
          <Icon
            color={Colors.primary}
            style={styles.icon}
            size={30}
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
      <Text style={styles.price}>${selectedProduct.price}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center',
  },
  price: {
    //fontFamily: 'open-sans-bold',
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
  },
  description: {
    //fontFamily: 'open-sans',
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20,
  },
});

export default PlaceDetailScreen;
