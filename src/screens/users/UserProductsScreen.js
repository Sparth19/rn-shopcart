import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Button,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/Shop/ProductItem';
import * as productsActions from '../../store/actions/products';
import Colors from '../../constants/Colors';

const UserProductsScreen = (props) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();

  const {navigation} = props;

  useEffect(() => {
    props.navigation.setOptions({
      title: 'Your Products',
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="menu"
            iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
            onPress={() => {
              props.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      ),
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="add"
            iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
            onPress={() => {
              props.navigation.navigate('EditProductsScreen', {});
            }}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  const products = useSelector((state) => state.products.userProducts);
  //console.log(products);

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      // console.log('in try');
      await dispatch(productsActions.fetchUserProduct());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsRefreshing, setError]);

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
        <Text>No User Products found. Maybe start adding some!</Text>
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
              props.navigation.navigate('EditProductsScreen', {
                productId: itemData.item.id,
              });
            }}>
            <Button
              color={Colors.accent}
              title="Edit Product"
              onPress={() => {}}
            />
            <Button
              color={Colors.accent}
              title="Delete Product"
              onPress={() => {}}
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
});

export default UserProductsScreen;
