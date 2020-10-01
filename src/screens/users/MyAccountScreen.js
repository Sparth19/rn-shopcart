import React, {useEffect, useState, useReducer, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useSelector, useDispatch} from 'react-redux';

import Input from '../../components/UI/Input';
import HeaderButton from '../../components/UI/HeaderButton';
import * as authActions from '../../store/actions/auth';

const USER_DATA_REDUCER = 'USER_DATA_REDUCER';

const formReducer = (state, action) => {
  if (action.type === USER_DATA_REDUCER) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }

    return {
      inputValues: updatedValues,
      inputValidities: updatedValidities,
      formIsValid: updatedFormIsValid,
    };
  }
  return state;
};

const MyAccountScreen = (props) => {
  const dispatch = useDispatch();

  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const userData = useSelector((state) => state.auth.userData);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    initialValue: {
      name: userData.userName,
      email: userData.userEmail,
      address: userData.userAddress,
    },
    inputValidities: {
      name: true,
      email: true,
      address: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert('Error Occurred', error, [{text: 'Okay'}]);
    }
  }, [error]);

  const inputChangeHandler = useCallback(
    (identifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: USER_DATA_REDUCER,
        value: inputValue,
        isValid: inputValidity,
        input: identifier,
      });
    },
    [dispatchFormState],
  );

  const saveAccountHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert('Invalid Input', 'Please enter valid input', [
        {text: 'Okay'},
      ]);
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(
        authActions.userUpdate(
          userData.userId,
          formState.inputValues.name,
          formState.inputValues.email,
          formState.inputValues.address,
        ),
      );
    } catch (err) {
      setError('Something went wrong' + err);
    }
    setIsLoading(false);
  }, [dispatch, formState, userData]);

  const {navigation} = props;
  useEffect(() => {
    navigation.setOptions({
      title: 'My Account',
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            name="Menu"
            iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
            onPress={() => {
              navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      ),
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Save"
            iconName={
              Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
            }
            onPress={saveAccountHandler}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation, saveAccountHandler]);

  return (
    <KeyboardAvoidingView
      behavior="height"
      keyboardVerticalOffset={50}
      style={styles.screen}>
      <ScrollView>
        <View style={styles.main}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{
                uri:
                  'https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png',
              }}
            />
          </View>
          <View style={styles.detailsContainer}>
            <Input
              id="name"
              label="Full Name"
              autoCapitalize="none"
              errorMessage="Please enter a valid name"
              onInputChange={inputChangeHandler}
              initialValue={userData.userName}
              initiallyValid={!!userData.userName}
            />
            <Input
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorMessage="Please enter a valid email address."
              onInputChange={inputChangeHandler}
              initialValue={userData.userEmail}
              initiallyValid={!!userData.userEmail}
            />
            <Input
              id="address"
              label="Address"
              errorMessage="Please enter valid address"
              keyboardType="default"
              autoCapitalize="sentences"
              autoCorrect
              returnKeyType="done"
              multiline
              numberOfLines={5}
              onInputChange={inputChangeHandler}
              initialValue={userData.userAddress}
              initiallyValid={!!userData.userAddress}
              required
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    margin: 20,
  },
  imageContainer: {
    marginVertical: 50,
    alignItems: 'center',
    // borderBottomColor: '#ccc',
    // borderBottomWidth: 1,
  },
  image: {
    height: 100,
    width: 120,
  },
});

export default MyAccountScreen;