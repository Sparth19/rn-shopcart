import React, {useEffect} from 'react';
import {Button, FlatList, Alert, View, Text} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useSelector, useDispatch} from 'react-redux';

import ProductItem from '../../components/Shop/ProductItem';
import Colors from '../../constants/Colors';
import * as productActions from '../../store/actions/products';
import HeaderButton from '../../components/UI/HeaderButton';

const UserProductsScreen = (props) => {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.products.availableProducts);

  
  const {navigation} = props;
  useEffect(() => {
    navigation.setOptions({
      title: 'Your Products',
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="cart"
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
            title="cart"
            iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
            onPress={() => {
              props.navigation.navigate('EditProductScreen', {});
            }}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  const alertHandler = (id) => {
    Alert.alert('Are you sure ?', 'Do you really want to Delete this item?', [
      {text: 'No', style: 'default'},
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          dispatch(productActions.deleteProduct(id));
        },
      },
    ]);
  };

  const editProductHandler = (id) => {
    props.navigation.navigate('EditProductsScreen', {
      productId: id,
    });
  };

  if (productData.length === 0) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>No User products found! try adding some ?</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={productData}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            editProductHandler(itemData.item.id);
          }}>
          <Button
            color={Colors.primaryColor}
            title="Edit Product"
            onPress={() => {
              editProductHandler(itemData.item.id);
            }}
          />
          <Button
            color={Colors.primaryColor}
            title="Delete Product"
            onPress={() => {
              alertHandler(itemData.item.id);
            }}
          />
        </ProductItem>
      )}
    />
  );
};

export default UserProductsScreen;
