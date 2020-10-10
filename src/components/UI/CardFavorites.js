import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Platform,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/Colors';
import Card from '../UI/Card';

const CardFavorites = (props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        console.log(props.title);
      }}>
      <Card style={styles.main}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            resizeMode={'contain'}
            source={{uri: props.image}}
          />
        </View>
        <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.title}>
          {props.title}
        </Text>
        <View style={styles.horizontalContainer}>
          <Text style={styles.price}>₹{props.price}</Text>
          <Icon
            style={styles.icon}
            name={Platform.OS === 'android' ? 'md-heart' : 'ios-heart'}
            size={20}
            color="red"
          />
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    height: 220,
    padding: 15,
    marginVertical: 5,
    marginLeft: 25,
    shadowColor: Colors.accent,
    marginRight: 25,
  },
  imageContainer: {
    height: '70%',
    width: '100%',
    marginBottom: 10,
    borderRadius: 20,
    backgroundColor: 'white',
    padding: 5,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: '500',
    fontSize: Dimensions.get('window').width > 400 ? 18 : 14,
  },
  price: {
    fontSize: Dimensions.get('window').width > 400 ? 18 : 14,
  },
  icon: {},
});

export default CardFavorites;
