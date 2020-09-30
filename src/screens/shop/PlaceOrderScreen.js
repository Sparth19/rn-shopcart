import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const PlaceOrderScreen = props => {
    return (
        <View>
            <Text>PlaceOrderScreen</Text>
            <Button title='Done' onPress={() => {
                props.navigation.goBack();
            }} />
        </View>
    );
};

const styles = StyleSheet.create({

});

export default PlaceOrderScreen;