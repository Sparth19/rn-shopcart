import IO from 'socket.io-client';
import {LOCAL_WEB_URL} from '../chat_config';

export const JOIN_CHAT_ROOM = 'JOIN_CHAT_ROOM';
export const LOAD_MESSAGES = 'LOAD_MESSAGES';
export const SEND_MESSAGES = 'SEND_MESSAGES';

/** socket configurations */
const socket = IO('http://localhost:3000');
// const socket = IO('https://shopcartapi.herokuapp.com');

export const joinChatRoom = (username, id, room) => {
  return async (dispatch) => {
    //  socket.emit('join', {username: username, id: id, room: room});
    socket.on('message', (msgObject) => {
      console.log('in Action');
      console.log(msgObject);
      //    if (username !== msgObject.username) {
      dispatch({
        type: LOAD_MESSAGES,
        payload: msgObject,
      });
    });
  };
};

export const sendMessage = (
  username,
  chatMessages,
  senderid,
  receiverid,
  room,
) => {
  return async (dispatch) => {
    dispatch({type: SEND_MESSAGES, payload: chatMessages});

    socket.emit(
      'sendMsg',
      chatMessages,
      senderid,
      receiverid,
      room,
      (error) => {
        if (error) {
          console.log(error);
        }
      },
    );
  };
};
