import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableNativeFeedback,
  Image,
  Dimensions,
  SafeAreaView,
} from 'react-native';

const CategoryGridTile = (props) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get('window').width,
  );
  useEffect(() => {
    const updateLayout = () => {
      setScreenWidth(Dimensions.get('window').width);
    };

    Dimensions.addEventListener('change', updateLayout);
    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  });

  //console.log(props.image);
  return (
    <View style={styles.gridItem}>
      <TouchableCmp style={{flex: 1}} onPress={props.onSelect}>
        <View
          style={{
            ...styles.container,
            ...{
              backgroundColor: props.color,
              borderColor: 'white',
              borderWidth: 5,
            },
          }}>
          <View style={styles.imageContainer}>
            <Image source={{uri: props.image}} style={styles.bgImage} />
          </View>
        </View>
      </TouchableCmp>
      <View style={styles.textContainer}>
        <Text
          style={screenWidth > 400 ? styles.largeTitle : styles.smallTitle}
          numberOfLines={2}>
          {props.title}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    margin: 10,
    height: Dimensions.get('window').width > 400 ? 120 : 120,
    borderRadius: 10,
    // overflow:
    //   Platform.OS === 'android' && Platform.Version >= 21
    //     ? 'hidden'
    //     : 'visible',
    //elevation: 5,
  },
  container: {
    padding: 15,
    borderRadius: 180,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
    elevation: 10,
    borderWidth: 2,
    backgroundColor: '#fff',
  },
  imageContainer: {
    //flex: 3,
    alignSelf: 'center',
    // width: 80,
    // height: 80,
  },
  bgImage: {
    width: 50,
    height: 50,
    // flex: 1,
    //alignItems: 'center',
    //flexDirection: 'column',
    // justifyContent: 'flex-start',
    //justifyContent: 'center',
    //marginBottom: 10,
  },
  textContainer: {},
  largeTitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  smallTitle: {
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default CategoryGridTile;
