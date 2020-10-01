import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform,
    ImageBackground
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Card from '../UI/Card';

const ProductItem = props => {
    let Touchable = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        Touchable = TouchableNativeFeedback;
    }

    return (
        <Card style={styles.product}>
            <View style={styles.touchable}>
                <Touchable onPress={props.onSelect} useForeground>
                    <View style={styles.wholeView}>
                        <View style={styles.imageContainer}>
                            <ImageBackground style={styles.image} source={{ uri: props.image }} />
                        </View>
                        <View style={styles.content} >
                            <View style={styles.details}>
                                <Text style={styles.title}>{props.title}</Text>
                                <Text style={styles.price}>₹ {props.price.toFixed(2)}</Text>
                            </View>
                            <View style={styles.actions}>
                                {props.children}
                            </View>
                        </View>
                    </View>
                </Touchable>
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    product: {
        height: 265,
        margin: 20
    },
    touchable: {
        overflow: 'hidden',
        borderRadius: 10
    },
    wholeView: {

    },
    imageContainer: {
        width: '100%',
        height: '65%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    details: {
        flex: 1
    },
    actions: {
        flex: 1,
        alignItems: 'flex-end',
        //flexDirection: 'column',
        //justifyContent: 'space-around',
        //paddingHorizontal: 20
        //height: '23%',
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        marginHorizontal: 10,
        fontWeight: 'bold',
    },
    price: {
        //fontFamily: 'open-sans',
        fontSize: 16,
        marginVertical: 10,
        marginHorizontal: 10,
        color: '#888'
    }
});

export default ProductItem;