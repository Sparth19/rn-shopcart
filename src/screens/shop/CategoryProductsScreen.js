import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/Ionicons';

import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/Shop/ProductItem';
import * as productsActions from '../../store/actions/products';
import * as cartActions from '../../store/actions/cart';
import CATEGORIES from '../../data/category-data';
import Colors from '../../constants/Colors';

const HomeScreen = (props) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();

  const { category } = props.route.params;
  const selectedCategory = CATEGORIES.find((cat) => cat.title === category);
  const { navigation } = props;

  useEffect(() => {
    navigation.setOptions({
      title: selectedCategory.title,
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="cart"
            iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
            onPress={() => {
              props.navigation.navigate('CartScreen');
            }}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  let Touchable = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    Touchable = TouchableNativeFeedback;
  }

  const products = useSelector((state) => state.products.availableProducts);
  //console.log(products);

  const loadProducts = useCallback(async () => {
    setError(null);
    // setIsRefreshing(true);
    try {
      // console.log('in try');
      await dispatch(productsActions.fetchProduct(category));
    } catch (err) {
      setError(err.message);
    }
    //setIsRefreshing(false);
  }, [dispatch, setError]);

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
          title="Handle Error"
          onPress={loadProducts}
          color={Colors.primary}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
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
        renderItem={(itemData) => (
          <ProductItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onSelect={() => {
              props.navigation.navigate('ProductDetailScreen', {
                productId: itemData.item.id,
              });
            }}
            onSelectFavorite={() => {
              dispatch(productsActions.toggleFavorite(itemData.item.id));
            }}>
            <Touchable
              onPress={() => {
                dispatch(productsActions.toggleFavorite(itemData.item.id));
              }}>
              <Icon
                color={Colors.primary}
                style={styles.icon}
                name={'ios-heart-outline'}
              />
            </Touchable>
            <Button
              color={Colors.primary}
              title="Add To Cart"
              onPress={() => {
                dispatch(cartActions.addToCart(itemData.item));
              }}
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
    alignItems: 'center',
  },
  icon: {
    fontSize: 30,
    margin: 8,
  },
});

export default HomeScreen;
