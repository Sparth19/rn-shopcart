import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  SafeAreaView,
} from 'react-native';
import {Snackbar} from 'react-native-paper';

import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/Ionicons';

import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/Shop/ProductItem';
import * as productsActions from '../../store/actions/products';
import * as cartActions from '../../store/actions/cart';
import * as favoritesActions from '../../store/actions/favorites';
import CATEGORIES from '../../data/category-data';
import Colors from '../../constants/Colors';

const HomeScreen = (props) => {
  const dispatch = useDispatch();
  const [filled, setFilled] = useState();
  //for snackbar
  const [visible, setVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();

  const {category} = props.route.params;
  const selectedCategory = CATEGORIES.find((cat) => cat.title === category);
  const {navigation} = props;

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
  const favoriteList = useSelector((state) => state.fav.favoritesProduct);

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    setVisible(false);

    try {
      await dispatch(favoritesActions.fetchFavorites());
      await dispatch(productsActions.fetchProduct(category));
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
    setIsLoading(false);
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

  //extra

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
    <SafeAreaView style={{flex: 1}}>
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
              let variable = 'false';
              for (var x in favoriteList) {
                if (favoriteList[x].favProductId === itemData.item.id) {
                  variable = 'true';
                }
              }
              props.navigation.navigate('ProductDetailScreen', {
                productId: itemData.item.id,
                variable: variable,
              });
            }}>
            {/* <Touchable
              onPress={() => {
                dispatch(favoritesActions.toggleFavoritesApi(itemData.item.id));
                setFilled(filled === 'true' ? 'false' : 'true');
              }}>
              <Icon
                color={Colors.primary}
                style={styles.icon}
                name={filled === 'true' ? 'ios-heart' : 'ios-heart-outline'}
              />
            </Touchable> */}
            <Button
              color={Colors.accent}
              title="Add To Cart"
              onPress={() => {
                dispatch(cartActions.addToCart(itemData.item));
                setVisible(true);
              }}
            />
          </ProductItem>
        )}
      />
      <Snackbar
        style={styles.snackbar}
        visible={visible}
        onDismiss={() => {
          setVisible(false);
        }}
        action={{
          label: 'Okay',
          onPress: () => {
            setVisible(false);
          },
        }}>
        Added to cart.
      </Snackbar>
    </SafeAreaView>
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
  snackbar: {
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
});

export default HomeScreen;
