import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Icon } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import { SliderBox } from 'react-native-image-slider-box';

import ImageSlider from '../../data/image-slider';
import HeaderButton from '../../components/UI/HeaderButton';
import CategoryGridTiles from '../../components/UI/CategoryGridTile';
import Colors from '../../constants/Colors';
import withBadge from '../../components/UI/Badge';
import CardFavorites from '../../components/UI/CardFavorites';

import * as authActions from '../../store/actions/auth';
import * as favoritesActions from '../../store/actions/favorites';
import * as productActions from '../../store/actions/products';
import { cond } from 'react-native-reanimated';

const HomeScreen = (props) => {
  const [imageSlider, setImageSlider] = useState(() => {
    let imageS = [];
    for (var x in ImageSlider) {
      imageS = imageS.concat(ImageSlider[x].image);
    }
    return imageS;
  });

  const categories = useSelector((state) => state.products.availableCategories);

  const { navigation } = props;
  const token = useSelector((state) => state.auth.token);
  const cartItems = useSelector((state) => state.cart.items);
  const cartLength = Object.keys(cartItems).length;

  //for favorites slider
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [activeIndex, setActiveIndex] = useState(0);
  const [favoritesSlider, setFavoritesSlider] = useState(false);

  const dispatch = useDispatch();

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

  useEffect(() => {
    //console.log(favDisplay.length);
    if (favDisplay.length != 0) {
      setFavoritesSlider(true);
    }
  }, [favDisplay]);

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

  useEffect(() => {
    if (token === null) {
      dispatch(authActions.logout());
    }
    const BadgedIcon = withBadge(cartLength)(Icon);
    navigation.setOptions({
      title: 'Home',

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
        <View style={{ flexDirection: 'row' }}>
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.slider}>
          <SliderBox
            images={imageSlider}
            sliderBoxHeight={Dimensions.get('window').width > 400 ? 250 : 200}
            dotColor={Colors.primary}
            inactiveDotColor="#90A4AE"
            autoplay
            circleLoop
          />
        </View>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>All Categories</Text>
        </View>
        <FlatList
          data={categories}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          // numColumns={2}
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
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Your Favorites</Text>
        </View>
        {favDisplay.length > 0 ? (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Carousel
              layout={'default'}
              autoplay
              data={favDisplay}
              sliderWidth={270}
              itemWidth={270}
              loop
              renderItem={(itemData) => {
                return (
                  <CardFavorites
                    image={itemData.item.imageUrl}
                    title={itemData.item.short_title}
                    price={itemData.item.price}
                    id={itemData.item.id}
                    navigation={props.navigation}
                  />
                );
              }}
              onSnapToItem={(index) => setActiveIndex(index)}
            />
          </View>
        ) : (
            <View
              style={{
                height: 200,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableWithoutFeedback
                onPress={() => {
                  props.navigation.navigate('SearchScreen');
                }}>
                <Image
                  style={{ height: '70%', width: '70%' }}
                  resizeMode={'contain'}
                  source={require('../../Images/search.png')}
                // source={{
                //   uri:
                //     'https://image.freepik.com/free-vector/illustration-search-box_53876-37578.jpg',
                // }}
                />
              </TouchableWithoutFeedback>
            </View>
          )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  slider: {
    height: Dimensions.get('window').width > 400 ? 270 : 200,
  },
  headingContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  heading: {
    fontSize: Dimensions.get('window').width > 400 ? 18 : 14,
    color: 'grey',
    fontWeight: 'bold',
  },
});
export default HomeScreen;
