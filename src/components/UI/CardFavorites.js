import React from 'react';
import {View, StyleSheet, Image, Text, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CardFavorites = (props) => {
  return (
    <View style={styles.main}>
      <View style={styles.imageContainer}>
        {/* <Image style={styles.image} source={{uri: ''}} /> */}
      </View>
      <Text style={styles.title}>Short title</Text>
      <View style={horizontalContainer}>
        <Text style={styles.price}>Price : 200</Text>
        <Icon
          style={styles.icon}
          name={Platform.OS === 'android' ? 'md-heart' : 'ios-heart'}
          size={25}
          color="red"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: 200,
    height: 200,
  },
});

export default CardFavorites;
