import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Chip } from 'react-native-paper';

import Colors from '../../constants/Colors';

const Chips = props => {
    return (
        <View style={styles.row}>
            <Chip
                style={styles.chip}
                //type='outlined'
                onPress={props.onSelect}
            >
                <Text style={styles.chipText}>{props.title}</Text>
            </Chip>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        height: 200,
        flexDirection: 'row',
        //flexWrap: 'wrap',
        paddingHorizontal: 10
    },
    chip: {
        backgroundColor: Colors.background,
        margin: 7
    },
    chipText: {
        color: Colors.primary
    }
});

export default Chips;