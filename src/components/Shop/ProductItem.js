import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  ImageBackground,
  Image,
  Dimensions,
} from 'react-native';
import Colors from '../../constants/Colors';
import Card from '../UI/Card';

const ProductItem = (props) => {
  let Touchable = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    Touchable = TouchableNativeFeedback;
  }

  return (
    <View style={styles.cardContainer}>
      <Touchable onPress={props.onSelect}>
        <View style={styles.card}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{uri: props.image}}
              resizeMode={'contain'}
            />
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.title} numberOfLines={2} ellipsizeMode={'tail'}>
              {props.title}
            </Text>
            <Text style={styles.price}>₹ {props.price.toFixed(2)}</Text>
            <View style={styles.actions}>{props.children}</View>
          </View>
        </View>
      </Touchable>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    height: 200,
    marginHorizontal: Dimensions.get('window').width > 400 ? 20 : 10,
    marginVertical: 10,
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  card: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  imageContainer: {
    width: '40%',
    margin: Dimensions.get('window').width > 400 ? 10 : 5,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    //backgroundColor: '#DCDCDC',
  },
  detailsContainer: {
    width: '60%',
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection: 'column',
  },
  title: {
    fontSize: Dimensions.get('window').width > 400 ? 18 : 14,
    marginBottom: 6,
    // fontWeight: 'bold',
  },
  price: {
    fontSize: Dimensions.get('window').width > 400 ? 20 : 15,
    marginBottom: 6,
    color: Colors.primary,
  },
  actions: {
    paddingHorizontal: Dimensions.get('window').width > 400 ? 15 : 5,
  },
});

export default ProductItem;
