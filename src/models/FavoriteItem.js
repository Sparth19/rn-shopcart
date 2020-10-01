import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  ImageBackground,
  Platform
} from 'react-native';
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';

const FavoriteItem = (props) => {
  let Touchable = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    Touchable = TouchableNativeFeedback;
  }
  return (
    <View style={styles.favItem}>
      <TouchableOpacity onPress={props.onSelect}>
        <View>
          <View style={{ ...styles.favRow, ...styles.FavHeader }}>
            <ImageBackground source={{ uri: props.image }} style={styles.bgImage}>
              <View style={styles.titleContainer}>
                <Text style={styles.title} >
                  {props.title}
                </Text>
              </View>
            </ImageBackground>
          </View>
          <View style={{ ...styles.favRow, ...styles.favDetail }}>
            <Text style={styles.price}>Price : ₹ {props.price}</Text>
            <View>
              <Touchable onPress={props.onSelectFavorite} >
                <Icon color={Colors.primary} style={styles.icon} name={Platform.OS === "android" ? 'md-heart' : 'ios-heart'} />
              </Touchable>
            </View>
            <Button color={Colors.primary} title='Add to Cart' onPress={props.onAdd} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  favItem: {
    height: 250,
    width: '100%',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 10,
  },
  bgImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  favRow: {
    flexDirection: 'row'
  },
  FavHeader: {
    height: '75%',
  },
  price: {
    fontSize: 20,
    color: Colors.primary
  },
  favDetail: {
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '25%',
  },
  titleContainer: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  icon: {
    fontSize: 30,
    margin: 10
  }
});

export default FavoriteItem;
