import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import * as authActions from '../../store/actions/auth';

const ForgetPasswordScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState(false);
  const [serverOtp, setServerOtp] = useState();
  const [updatedPassword, setUpdatedPassword] = useState('');
  const dispatch = useDispatch();

  const {navigation} = props;
  useEffect(() => {
    navigation.setOptions({
      title: 'Forget Password',
    });
  }, [navigation]);

  const sendOtpHandler = async () => {
    try {
      setIsLoading(true);
      setOtp(true);
      await dispatch(authActions.forgetPassword(email));
    } catch (e) {
      Alert.alert('Error', 'Email address not found.', [
        {
          text: 'Okay',
        },
      ]);
      setOtp(false);
      // props.navigation.goBack();
      // throw new Error(e);
    }
    setIsLoading(false);
  };

  const userOtpHandler = (text) => {
    setOtpInput(text);
  };

  const selectorOtp = useSelector((state) => state.auth.otp);
  useEffect(() => {
    console.log(selectorOtp);
    if (selectorOtp) {
      setServerOtp(selectorOtp);
    }
  }, [selectorOtp]);

  const confirmOtpHandler = () => {
    setIsLoading(true);
    console.log(otpInput);
    if (otpInput == serverOtp) {
      setEmail('');
      setOtp(false);
      setPass(true);
    } else {
      Alert.alert('Error', 'OTP is Invalid.', [
        {
          text: 'Okay',
        },
      ]);
    }
    setIsLoading(false);
  };

  const updatePasswordHandler = async () => {
    try {
      setIsLoading(true);
      if (updatedPassword != '' && updatedPassword.length > 5) {
        await dispatch(authActions.updatePassword(updatedPassword));
        props.navigation.navigate('AuthScreen');
      } else {
        Alert.alert('Error', 'Please enter valid password.', [
          {
            text: 'Okay',
          },
        ]);
      }
      setIsLoading(false);
    } catch (e) {
      throw new Error(e);
    }
  };

  const emailInputHandler = (text) => {
    let isValid = true;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (text.trim().length === 0) {
      isValid = false;
    }
    if (!emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (isValid) {
      setEmail(text);
    }
  };

  const passInputHandler = (text1) => {
    // console.log(updatedPassword);
    let isValid = true;
    if (text1.length < 6) {
      isValid = false;
    }
    if (isValid) {
      setUpdatedPassword(text1);
    }
  };

  if (pass) {
    return (
      <KeyboardAvoidingView
        behavior="height"
        keyboardVerticalOffset={50}
        style={styles.screen}>
        <View style={styles.gradient}>
          <Card style={styles.authContainer}>
            <ScrollView>
              <View style={styles.edit}>
                <Text style={styles.text}>Enter New Password</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="default"
                  placeholder="New Password"
                  secureTextEntry
                  defaultValue=""
                  autoCapitalize={'none'}
                  onChangeText={passInputHandler}
                />

                <View style={styles.buttonContainer}>
                  {isLoading ? (
                    <ActivityIndicator size="small" color={Colors.primary} />
                  ) : (
                    <Button
                      title={'Update Password'}
                      color={Colors.primary}
                      onPress={updatePasswordHandler}
                    />
                  )}
                </View>
              </View>
            </ScrollView>
          </Card>
        </View>
      </KeyboardAvoidingView>
    );
  } else {
    return (
      <KeyboardAvoidingView
        behavior="height"
        keyboardVerticalOffset={50}
        style={styles.screen}>
        <View style={styles.gradient}>
          <Card style={styles.authContainer}>
            <ScrollView>
              <View style={styles.edit}>
                <Text style={styles.text}>Enter Email address</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="default"
                  placeholder={'Email address'}
                  defaultValue=""
                  autoCapitalize={'none'}
                  onChangeText={emailInputHandler}
                />

                <View style={styles.buttonContainer}>
                  {isLoading ? (
                    <ActivityIndicator size="small" color={Colors.primary} />
                  ) : (
                    <Button
                      title={'Send OTP'}
                      color={Colors.primary}
                      onPress={sendOtpHandler}
                    />
                  )}
                </View>
              </View>
              {otp ? (
                <View style={styles.edit}>
                  <Text style={styles.text}>Enter OTP</Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    onChangeText={userOtpHandler}
                  />
                  <View style={styles.buttonContainer}>
                    {isLoading ? (
                      <ActivityIndicator size="small" color={Colors.primary} />
                    ) : (
                      <Button
                        title="Confirm OTP"
                        color={Colors.primary}
                        onPress={confirmOtpHandler}
                      />
                    )}
                  </View>
                </View>
              ) : (
                <View></View>
              )}
            </ScrollView>
          </Card>
        </View>
      </KeyboardAvoidingView>
    );
  }
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background, //sky color #C9F6FF
  },
  edit: {
    marginVertical: 5,
  },
  text: {
    fontSize: 18,
  },
  input: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingHorizontal: 2,
    paddingVertical: 5,
    fontSize: 15,
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default ForgetPasswordScreen;
