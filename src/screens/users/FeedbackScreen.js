import React, { useCallback, useState } from 'react';
import { View, TextInput, Text, StyleSheet, Dimensions } from 'react-native';
import { Button } from 'react-native-paper';
import { event } from 'react-native-reanimated';
import { useDispatch } from 'react-redux';


import * as productActions from '../../store/actions/products';
import Colors from '../../constants/Colors';

const FeedbackScreen = props => {
    const { productId } = props.route.params;

    const [value, setValue] = useState('');
    const dispatch = useDispatch();

    const feedbackText = (event) => {
        setValue(event);
        //console.log(value);
    };
    const sendFeedbackHandler = async () => {
        try {
            await dispatch(productActions.sendProductFeedback(productId, value));
            props.navigation.goBack();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <View style={styles.screen}>
            <Text style={styles.text}>Give Feedback</Text>
            <TextInput
                placeholder='Type your Feedback here...'
                style={styles.textInput}
                keyboardType='default'
                multiline={true}
                numberOfLines={10}
                autoCorrect
                onChangeText={feedbackText}
            />
            <View style={styles.buttonContainer}>
                <Button
                    icon='send-outline'
                    color={Colors.accent}
                    uppercase={false}
                    mode="contained"
                    onPress={sendFeedbackHandler}>
                    Send Feedback
            </Button>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    screen: {
        margin: 15,
    },
    textInput: {
        textAlignVertical: 'top',
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 2,
        paddingVertical: 5,
        fontSize: Dimensions.get('window').width > 400 ? 15 : 12,
    },
    text: {
        fontSize: Dimensions.get('window').width > 400 ? 18 : 14,
        marginVertical: 10
    },
    buttonContainer: {
        marginTop: 15,
    },
});

export default FeedbackScreen;