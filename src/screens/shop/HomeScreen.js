import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/Ionicons';
import CategoryGridTile from '../../components/UI/CategoryGridTile';
import HeaderButton from '../../components/UI/HeaderButton';

const HomeScreen = (props) => {
  const categories = useSelector((state) => state.products.availableCategories);

  const {navigation} = props;

  useEffect(() => {
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
    });
  }, [navigation]);

  return (
    <FlatList
      data={categories}
      renderItem={(itemData) => (
        <CategoryGridTile
          title={itemData.item.title}
          color={itemData.item.color}
          onSelect={() => {
            props.navigation.navigate('CategoryProductsScreen', {
              categoryId: itemData.item.id,
            });
          }}
        />
      )}
      numColumns={2}
    />
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
