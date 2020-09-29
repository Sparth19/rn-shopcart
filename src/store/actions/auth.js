import AsyncStorage from '@react-native-community/async-storage';

export const USER_LOGIN = 'USER_LOGIN';
export const USER_SIGNUP = 'USER_SIGNUP';
export const RESTORE_TOKEN = 'RESTORE_TOKEN';
export const LOGOUT = 'LOGOUT';

let timer;
export const signup = (name, email, password) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        'https://shopcartapi.herokuapp.com/users/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
          }),
        },
      );
      if (!response.ok) {
        const resData = await response.json();
        console.log(resData);
        throw new Error('Response not ok');
      }

      const resData = await response.json();
      console.log(resData);
      console.log(resData.token);
      //async storage

      //for autologin
      const expiresIn = 3600;
      const expirationDate = new Date(
        new Date().getTime() + parseInt(expiresIn) * 1000,
      );

      saveDataToStorage(resData.token, resData.user._id, expirationDate);

      dispatch(setLogoutTimer(parseInt(expiresIn) * 1000));

      dispatch({type: USER_SIGNUP, token: resData.token});
    } catch (err) {
      throw new Error('Authentication Error');
    }
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        'https://shopcartapi.herokuapp.com/users/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        },
      );
      if (!response.ok) {
        const resData = await response.json();
        console.log(resData);
        throw new Error('Response not ok');
      }

      const resData = await response.json();
      console.log(resData);
      console.log(resData.token);
      //for autologin
      const expiresIn = 3600;
      const expirationDate = new Date(
        new Date().getTime() + parseInt(expiresIn) * 1000,
      );

      saveDataToStorage(resData.token, resData.user._id, expirationDate);

      dispatch(setLogoutTimer(parseInt(expiresIn) * 1000));

      dispatch({type: USER_LOGIN, token: resData.token});
    } catch (err) {
      throw new Error('Authentication Error');
    }
  };
};

export const restoreToken = (token) => {
  return {type: RESTORE_TOKEN, token: token};
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem('userData');
  return {type: LOGOUT};
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString(),
    }),
  );
};
