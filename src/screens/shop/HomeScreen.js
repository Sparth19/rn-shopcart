import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {Icon} from 'react-native-elements';

import HeaderButton from '../../components/UI/HeaderButton';
import CategoryGridTiles from '../../components/UI/CategoryGridTile';
import * as authActions from '../../store/actions/auth';
import Colors from '../../constants/Colors';
import withBadge from '../../components/UI/Badge';

const HomeScreen = (props) => {
  const categories = useSelector((state) => state.products.availableCategories);

  const {navigation} = props;
  const token = useSelector((state) => state.auth.token);
  const cartItems = useSelector((state) => state.cart.items);
  const cartLength = Object.keys(cartItems).length;

  useEffect(() => {
    if (token === null) {
      dispatch(authActions.logout());
    }
    const BadgedIcon = withBadge(cartLength)(Icon);
    navigation.setOptions({
      title: 'All Categories',

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
        <View style={{flexDirection: 'row'}}>
          <React.Fragment>
            <Icon
              name={
                Platform.OS === 'android'
                  ? 'md-search-outline'
                  : 'ios-search-outline'
              }
              type="ionicon"
              size={25}
              color={Platform.OS === 'android' ? 'white' : Colors.primary}
              containerStyle={{
                paddingRight: 18,
              }}
              onPress={() => {
                props.navigation.navigate('SearchScreen');
              }}
            />
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
                  marginRight: 18,
                }}
              />
            </TouchableOpacity>
          </React.Fragment>
        </View>
      ),
    });
  }, [navigation, token, cartLength]);

  return (
    <SafeAreaView>
      <FlatList
        data={categories}
        numColumns={2}
        renderItem={(itemData) => (
          <CategoryGridTiles
            title={itemData.item.title}
            color={itemData.item.color}
            image={itemData.item.image}
            onSelect={() => {
              props.navigation.navigate('CategoryProductsScreen', {
                category: itemData.item.title,
              });
            }}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  slider: {
    height: Dimensions.get('window').width > 400 ? 270 : 200,
  },
});
export default HomeScreen;
