import AsyncStorage from '@react-native-community/async-storage';

export const USER_LOGIN = 'USER_LOGIN';
export const USER_SIGNUP = 'USER_SIGNUP';
export const RESTORE_TOKEN = 'RESTORE_TOKEN';
export const LOGOUT = 'LOGOUT';
export const USER_UPDATE = 'USER_UPDATE';

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
            address: '',
          }),
        },
      );
      if (!response.ok) {
        const resData = await response.json();
        console.log(resData);
        throw new Error('Response not ok');
      }

      const resData = await response.json();
      //console.log(resData);

      const userData = {
        userId: resData.user._id,
        userName: resData.user.name,
        userEmail: resData.user.email,
        userAddress: resData.user.address,
      };
      console.log('signup user Data');
      console.log(userData);

      //async storage

      const expiresIn = 3600;
      const expirationDate = new Date(
        new Date().getTime() + parseInt(expiresIn) * 1000,
      );

      saveDataToStorage(resData.token, userData, expirationDate);

      dispatch(setLogoutTimer(parseInt(expiresIn) * 1000));

      dispatch({type: USER_SIGNUP, token: resData.token, userData: userData});
    } catch (err) {
      throw new Error('Authentication Error in signup');
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
      const userData = {
        userId: resData.user._id,
        userName: resData.user.name,
        userEmail: resData.user.email,
        userAddress: resData.user.address,
      };

      console.log('Logged in user');
      console.log(userData);

      //for autologin
      const expiresIn = 3600;
      const expirationDate = new Date(
        new Date().getTime() + parseInt(expiresIn) * 1000,
      );

      saveDataToStorage(resData.token, userData, expirationDate);

      dispatch(setLogoutTimer(parseInt(expiresIn) * 1000));

      dispatch({type: USER_LOGIN, token: resData.token, userData: userData});
    } catch (err) {
      throw new Error('Authentication Error');
    }
  };
};

export const restoreToken = (token, userData) => {
  return {type: RESTORE_TOKEN, token: token, userData: userData};
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem('userData');
  return {type: LOGOUT};
};

export const userUpdate = (userId, name, email, address) => {
  return async (dispatch, getState) => {
    try {
      const token = getState().auth.token;

      const response = await fetch(
        'https://shopcartapi.herokuapp.com/users/updateProfile/' + userId,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
          body: JSON.stringify({
            name: name,
            email: email,
            address: address,
          }),
        },
      );
      if (!response.ok) {
        const resData = await response.json();
        console.log(resData);
        throw new Error('Response not ok');
      }

      const resData = await response.json();
      console.log('user updated');
      console.log(resData);

      const userData = {
        userId: resData._id,
        userName: resData.name,
        userEmail: resData.email,
        userAddress: resData.address,
      };
      console.log(userData);
      // async storage
      // merge item will overwrite old data if exists
      AsyncStorage.mergeItem(
        'userData',
        JSON.stringify({
          userData: userData,
        }),
      );
      console.log('after merge');
      dispatch({type: USER_UPDATE, userData: userData});
    } catch (err) {
      throw new Error('Authentication Error in update user profile');
    }
  };
};

//
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

const saveDataToStorage = (token, userData, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userData: userData,
      expiryDate: expirationDate.toISOString(),
    }),
  );
};
