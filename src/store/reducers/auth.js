import {LOGOUT, RESTORE_TOKEN, USER_LOGIN, USER_SIGNUP} from '../actions/auth';

const initialState = {
  token: null,
  isLoading: true,
  userData: null,
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

    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
