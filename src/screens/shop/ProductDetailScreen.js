import React, { useEffect, useState, useCallback } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Button, FAB, Portal, Provider } from 'react-native-paper';
import * as favoritesActions from '../../store/actions/favorites';
import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cart';
import Icon from 'react-native-vector-icons/Ionicons';

const PlaceDetailScreen = (props) => {
  const { productId } = props.route.params;
  const { variable } = props.route.params;
  const [filled, setFilled] = useState(variable);

  const [open, setOpen] = useState(false);

  const onStateChange = () => {
    setOpen(open ? false : true);
  };

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
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.details}>
          <Text style={styles.title}>{selectedProduct.title}</Text>
          <Image
            style={styles.image}
            source={{ uri: selectedProduct.imageUrl }}
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
              icon="plus"
              color={Colors.accent}
              uppercase={false}
              mode="outlined"
              onPress={() => {
                dispatch(cartActions.addToCart(selectedProduct));
              }}>
              Add to cart
            </Button>
          </View>

          <Text style={styles.text}>
            M.R.P.: <Text style={styles.price}>₹{selectedProduct.price}</Text>
          </Text>
          <Text style={styles.text}>Features & Details</Text>
          <Text style={styles.description}>{selectedProduct.description}</Text>
        </View>
      </ScrollView>
      <Provider>
        <Portal>
          <FAB.Group
            fabStyle={styles.fab}
            open={open}
            icon={open ? 'close' : 'chat'}
            actions={[
              {
                icon: 'email',
                label: 'Give Feedback',
                onPress: () => props.navigation.navigate('FeedbackScreen', {
                  productId: selectedProduct.id
                }),
              },
              {
                icon: 'send',
                label: 'Ask questions',
                onPress: () => props.navigation.navigate('ChatScreen'),
              },
            ]}
            onStateChange={onStateChange}
            onPress={() => {
              if (open) {
                // do something if the speed dial is open
              }
            }}
          />
        </Portal>
      </Provider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: Dimensions.get('window').width > 400 ? 300 : 250,
    // backgroundColor: '#DCDCDC',
  },
  actions: {
    marginVertical: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  icon: { marginRight: 10 },
  details: {
    margin: 20,
  },
  title: {
    fontSize: Dimensions.get('window').width > 400 ? 18 : 14,
    marginBottom: 20,
    fontWeight: 'bold',
    lineHeight: 25,
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
    lineHeight: 25,
  },
  fab: {
    margin: 20,
    right: 0,
    bottom: 0,
    backgroundColor: 'green',
  },
});

export default PlaceDetailScreen;
