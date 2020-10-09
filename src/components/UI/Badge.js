import React from "react";
import { StyleSheet, View } from "react-native";
import { Badge } from "react-native-elements";
import Colors from '../../constants/Colors';

const withBadge = (value, options = {}) => WrappedComponent =>
    class extends React.Component {
        render() {
            const { top = -5, right = -5, left = 0, bottom = 0, hidden = !value, ...badgeProps } = options;
            const badgeValue = typeof value === "function" ? value(this.props) : value;
            return (
                <View>
                    <WrappedComponent {...this.props} />
                    <Badge
                        badgeStyle={styles.badge}
                        textStyle={styles.badgeText}
                        value={badgeValue}
                        status="error"
                        containerStyle={[styles.badgeContainer, { top, right, left, bottom }]}
                        {...badgeProps}
                    />
                </View>
            );
        }
    };

const styles = StyleSheet.create({
    badge: {
        // borderRadius: 9,
        // height: 18,
        // minWidth: 0,
        // width: 18
        backgroundColor: Platform.OS === 'ios' ? 'white' : Colors.primary,
        borderColor: Platform.OS === 'android' ? 'white' : Colors.primary,
        borderWidth: 1,
    },
    badgeContainer: {
        position: 'absolute'
    },
    badgeText: {
        color: Platform.OS === 'android' ? 'white' : Colors.primary,
        fontSize: 10,
        fontWeight: 'bold',
        paddingHorizontal: 0
    }
});

export default withBadge;