import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {View, Text} from 'react-native';
import * as authActions from '../store/actions/auth';
import {useDispatch} from 'react-redux';

const StartupScreen = (props) => {
  console.log('Start Up Screen');
  const dispatch = useDispatch();
  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      const userDataJson = JSON.parse(userData);

      if (!userData) {
        dispatch(authActions.restoreToken(null));
        return;
      }
      //console.log('IN STARTUPPPP');
      //  console.log(userDataJson);
      const {token, userId, expiryDate} = userDataJson;
      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId) {
        dispatch(authActions.restoreToken(null));
        return;
      }

      //console.log('USER DATA JSON TOKEN' + userDataJson.token);
      dispatch(authActions.restoreToken(userDataJson.token));
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
