import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/Colors';

const CartItem = (props) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemDataUp}>
        <View style={styles.itemDataInnerOne}>
          <Text style={styles.mainText}>{props.title}</Text>
          <Text style={styles.price}>
            ({props.price} X {props.quantity})
          </Text>
        </View>

        <View style={styles.itemDataInnerTwo}>
          <Image style={styles.image} source={{uri: props.image}} />
          <View style={styles.quantity}>
            {props.editable && (
              <View style={styles.iconleft}>
                <Icon
                  name="remove"
                  size={Dimensions.get('window').width > 400 ? 25 : 20}
                  onPress={props.onRemove}
                />
              </View>
            )}
            {!props.editable && <Text style={styles.quantityText}>Qty : </Text>}
            <Text style={styles.quantityText}> {props.quantity} </Text>
            {props.editable && (
              <View style={styles.iconRight}>
                <Icon
                  name="add"
                  size={Dimensions.get('window').width > 400 ? 25 : 20}
                  onPress={props.onAdd}
                />
              </View>
            )}
          </View>
        </View>
      </View>
      <View style={styles.itemDataDown}>
        <Text style={styles.mainText}>Sum : ₹ {props.amount.toFixed(2)}</Text>
        {props.deletable && (
          <TouchableOpacity
            onPress={props.onDelete}
            style={styles.deleteButton}>
            <Icon
              name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
              size={23}
              color="red"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginVertical: 5,
  },
  itemDataUp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemDataDown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  itemDataInnerOne: {
    flex: 1,
    flexDirection: 'column',
  },
  itemDataInnerTwo: {
    //flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
  price: {
    fontSize: Dimensions.get('window').width > 400 ? 18 : 14,
    marginTop: 15,
  },
  quantity: {
    //fontFamily: 'open-sans',
    width: 100,
    flexDirection: 'row',
    color: '#888',
    marginTop: 15,
    justifyContent: 'center',
    borderWidth: 1,
  },
  quantityText: {
    //fontFamily: 'open-sans',
    //color: '#888',
    fontSize: Dimensions.get('window').width > 400 ? 20 : 15,
    paddingHorizontal: 7,
    //marginTop: 15,
    //justifyContent: 'center'
  },
  mainText: {
    fontSize: Dimensions.get('window').width > 400 ? 18 : 14,
  },
  deleteButton: {
    marginLeft: 20,
  },
  iconleft: {
    flex: 1,
    alignItems: 'center',
    borderRightWidth: 1,
    backgroundColor: '#ccc',
  },
  iconRight: {
    flex: 1,
    alignItems: 'center',
    borderLeftWidth: 1,
    backgroundColor: '#ccc',
  },
});

export default CartItem;
