import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Image, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CartItem = props => {
    return (
        <View style={styles.cartItem}>
            <View style={styles.itemDataUp}>
                <View style={styles.itemDataInnerOne}>
                    <Text style={styles.mainText}>{props.title}</Text>
                    <Text style={styles.price}>{props.price} X {props.quantity}</Text>
                </View>

                <View style={styles.itemDataInnerTwo}>
                    <Image style={styles.image} source={{ uri: props.image }} />
                    <Text style={styles.quantity}>
                        {props.editable && <Icon name='remove-circle-outline' size={20} onPress={props.onRemove} />}
                        {'  '}{props.quantity}{'  '}
                        {props.editable && <Icon name='add-circle-outline' size={20} onPress={props.onAdd} />}
                    </Text>
                </View>
            </View>
            <View style={styles.itemDataDown}>
                <Text style={styles.mainText}>Sum : ₹ {props.amount.toFixed(2)}</Text>
                {props.deletable && <TouchableOpacity onPress={props.onDelete} style={styles.deleteButton}>
                    <Icon
                        name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                        size={23}
                        color='red'
                    />
                </TouchableOpacity>}
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
        marginHorizontal: 20
    },
    itemDataUp: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    itemDataDown: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20
    },
    itemDataInnerOne: {
        flex: 1,
        flexDirection: 'column'
    },
    itemDataInnerTwo: {
        //flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    image: {
        width: 100,
        height: 100
    },
    price: {
        fontSize: 16,
        marginTop: 15
    },
    quantity: {
        //fontFamily: 'open-sans',
        color: '#888',
        fontSize: 20,
        marginTop: 15,
        justifyContent: 'center'
    },
    mainText: {
        //fontFamily: 'open-sans-bold',
        fontSize: 16,
    },
    deleteButton: {
        marginLeft: 20
    },
});

export default CartItem;