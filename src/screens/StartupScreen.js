import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {View, Text} from 'react-native';
import * as authActions from '../store/actions/auth';
import {useDispatch} from 'react-redux';
import {cos} from 'react-native-reanimated';

const StartupScreen = (props) => {
  console.log('Start Up Screen');
  const dispatch = useDispatch();
  useEffect(() => {
    const tryLogin = async () => {
      const storedUserData = await AsyncStorage.getItem('userData');
      const userDataJson = JSON.parse(storedUserData);

      if (!storedUserData) {
        dispatch(authActions.restoreToken(null, null));
        return;
      }
      //console.log('IN STARTUPPPP');
      //  console.log(userDataJson);
      const {token, userData, expiryDate} = userDataJson;
      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userData) {
        dispatch(authActions.restoreToken(null, null));
        return;
      }

      //console.log('in Startup');
      console.log(userDataJson);
      dispatch(authActions.restoreToken(token, userData));
    };
    tryLogin();
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Loading...</Text>
    </View>
  );
};

export default StartupScreen;
