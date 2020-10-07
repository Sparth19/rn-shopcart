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
    <View style={{...styles.gridItem}}>
      <TouchableCmp style={{flex: 1}} onPress={props.onSelect}>
        <View style={{...styles.container, ...{borderColor: props.color}}}>
          <Image source={{uri: props.image}} style={styles.bgImage} />
          <Text
            style={screenWidth > 400 ? styles.largeTitle : styles.smallTitle}
            numberOfLines={2}>
            {props.title}
          </Text>
        </View>
      </TouchableCmp>
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
    borderRadius: 10,
    overflow:
      Platform.OS === 'android' && Platform.Version >= 21
        ? 'hidden'
        : 'visible',
    elevation: 5,
  },
  container: {
    flex: 1,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
    padding: 15,
    borderWidth: 2,
    backgroundColor: '#fff',
  },
  bgImage: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: 80,
    marginBottom: 10,
  },
  largeTitle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'right',
    fontWeight: 'bold',
  },
  smallTitle: {
    flex: 1,
    fontSize: 14,
    textAlign: 'right',
    fontWeight: 'bold',
  },
});

export default CategoryGridTile;
