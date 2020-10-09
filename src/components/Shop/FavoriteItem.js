import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  ImageBackground,
  Platform,
  Dimensions,
} from 'react-native';
import Colors from '../../constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native-paper';

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
            <ImageBackground
              source={{ uri: props.image }}
              resizeMode={'contain'}
              style={styles.bgImage}>
              <View style={styles.titleContainer}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={styles.title}>
                  {props.title}
                </Text>
              </View>
            </ImageBackground>
          </View>
          <View style={{ ...styles.favRow, ...styles.favDetail }}>
            <Text style={styles.text}>
              Price : <Text style={styles.price}>₹{props.price}</Text>
            </Text>
            <View>
              <Touchable onPress={props.onSelectFavorite}>
                {/* change icon here */}
                <Icon
                  color={Colors.primary}
                  style={styles.icon}
                  name={'ios-heart'}
                />
              </Touchable>
            </View>

            <Button
              icon={'plus'}
              color={Colors.accent}
              uppercase={false}
              mode="contained"
              onPress={props.onAdd}>
              Add to Cart
            </Button>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  favItem: {
    height: 250,
    // width: '100%',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    overflow: 'hidden',
    margin: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  bgImage: {
    width: '100%',
    height: '100%',
    //backgroundColor: '#DCDCDC',
    justifyContent: 'flex-end',
  },
  favRow: {
    flexDirection: 'row',
  },
  FavHeader: {
    height: '75%',
  },
  price: {
    fontSize: Dimensions.get('window').width > 400 ? 18 : 12,
    color: Colors.primary,
  },
  text: {
    fontWeight: 'bold',
    fontSize: Dimensions.get('window').width > 400 ? 18 : 12,
  },
  favDetail: {
    paddingHorizontal: Dimensions.get('window').width > 400 ? 20 : 12,
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
    fontSize: Dimensions.get('window').width > 400 ? 18 : 15,
    color: 'white',
    textAlign: 'center',
  },
  icon: {
    fontSize: Dimensions.get('window').width > 400 ? 30 : 25,
    margin: 10,
  },
});

export default FavoriteItem;
