import {JOIN_CHAT_ROOM, LOAD_MESSAGES, SEND_MESSAGES} from '../actions/chat';

initialState = {
  messages: [],
  //   activeUsers: 0,
  //   errormsg: '',
  currentUser: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    //case JOIN_CHAT_ROOM:

    // console.log('in reducer join');

    // console.log(state.messages);
    // console.log(action.payload);
    // return {
    //   ...state,
    //   //currentUser: action.payload.username,
    //   messages: [...state.messages, ...action.payload],
    //   //messages: action.payload,
    // };
    case LOAD_MESSAGES:
      console.log('in reducer');
      console.log(state.messages);
      console.log(action.payload);
      return {
        ...state,
        messages: [...state.messages, ...action.payload],
      };
    // case SEND_MESSAGES:
    //   return {
    //     ...state,
    //     messages: [...state.messages, ...action.payload],
    //   };
    default:
      return state;
  }
};
