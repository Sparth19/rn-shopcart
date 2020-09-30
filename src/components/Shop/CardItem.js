import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Image, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CartItem = props => {
    return (
        <View style={styles.cartItem}>
            <View style={styles.itemDataUp}>
                <Text style={styles.mainText}>{props.title}</Text>
                <View style={styles.itemDataInner}>
                    <Image style={styles.image} source={{ uri: props.image }} />
                    <Text style={styles.quantity}>{props.quantity}</Text>
                </View>
            </View>
            <View style={styles.itemDataDown}>
                <Text style={styles.mainText}>${props.amount.toFixed(2)}</Text>
                {props.deletable && <TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
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
    itemDataInner: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    image: {
        width: 100,
        height: 100
    },
    quantity: {
        //fontFamily: 'open-sans',
        color: '#888',
        fontSize: 16,
        marginTop: 15
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