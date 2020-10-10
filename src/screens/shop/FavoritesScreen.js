import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {Icon} from 'react-native-elements';

import * as favoritesActions from '../../store/actions/favorites';
import * as productActions from '../../store/actions/products';
import Colors from '../../constants/Colors';

import HeaderButton from '../../components/UI/HeaderButton';
import FavoriteList from '../../components/Shop/FavoriteList';
import withBadge from '../../components/UI/Badge';

const FavoritesScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const cartLength = Object.keys(cartItems).length;

  const allProducts = useSelector(
    (state) => state.products.availableAllProducts,
  );

  const favoriteList = useSelector((state) => state.fav.favoritesProduct);

  const favDisplay = allProducts.filter((prod) => {
    for (var x in favoriteList) {
      if (prod.id === favoriteList[x].favProductId) {
        return true;
      }
    }
  });

  //console.log(favDisplay);

  const loadedFavorites = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(productActions.fetchAllProduct());
      await dispatch(favoritesActions.fetchFavorites());
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  }, [dispatch, setError, setIsLoading]);

  useEffect(() => {
    props.navigation.addListener('focus', loadedFavorites);
    return () => {
      props.navigation.removeListener('focus', loadedFavorites);
    };
  }, [loadedFavorites]);

  useEffect(() => {
    setIsLoading(true);
    loadedFavorites().then(() => {
      setIsLoading(false);
    });
  }, [loadedFavorites]);

  const toggleHandler = () => {
    setIsLoading(true);
    loadedFavorites().then(() => {
      setIsLoading(false);
    });
  };

  const {navigation} = props;

  useEffect(() => {
    const BadgedIcon = withBadge(cartLength)(Icon);
    navigation.setOptions({
      title: 'Your Favorites',
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Menu"
            iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
            onPress={() => {
              props.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      ),
      headerRight: () => (
        <React.Fragment>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('CartScreen');
            }}>
            <BadgedIcon
              name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
              type="ionicon"
              size={25}
              color={Platform.OS === 'android' ? 'white' : Colors.primary}
              containerStyle={{
                paddingRight: 18,
              }}
            />
          </TouchableOpacity>
        </React.Fragment>
      ),
    });
  }, [navigation, cartLength]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (favDisplay.length === 0 || !favDisplay) {
    return (
      <View style={styles.content}>
        <Text>No Favorites Product Found. Start adding Some!</Text>
      </View>
    );
  }

  return (
    <FavoriteList
      listData={favDisplay}
      navigation={props.navigation}
      onToggle={toggleHandler}
    />
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FavoritesScreen;
