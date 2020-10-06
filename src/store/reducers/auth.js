import { act } from 'react-test-renderer';
import {
  LOGOUT,
  RESTORE_TOKEN,
  USER_LOGIN,
  USER_SIGNUP,
  USER_UPDATE,
  SET_OTP
} from '../actions/auth';

const initialState = {
  token: null,
  isLoading: true,
  userData: null,
  otp: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGNUP:
      return {
        ...state,
        token: action.token,
        isLoading: false,
        userData: action.userData,
      };
    case USER_LOGIN:
      return {
        ...state,
        token: action.token,
        isLoading: false,
        userData: action.userData,
      };
    case RESTORE_TOKEN:
      return {
        ...state,
        token: action.token,
        isLoading: false,
        userData: action.userData,
      };

    case USER_UPDATE:
      return {
        ...state,
        userData: action.userData,
      };
    case SET_OTP:
      return {
        ...state,
        otp: action.otp
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
