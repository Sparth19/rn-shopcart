import React, {useState, useCallback, useEffect} from 'react';
import {View, Button, Text, TextInput, StyleSheet} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {useSelector, useDispatch} from 'react-redux';

import * as chatActions from '../../store/actions/chat';

const ChatScreen = (props) => {
  const [chatMsg, setChatMsg] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const dispatch = useDispatch();

  const joinChatRoom = useCallback(async () => {
    try {
      await dispatch(
        chatActions.joinChatRoom('parth', 'id:parth', 'parth-room'),
      );
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    joinChatRoom().then(() => {
      console.log('parth joined');
    });
  }, []);

  const messages = useSelector((state) => state.chat.messages);

  console.log('messages froom useSelector');
  console.log(messages);

  useEffect(() => {
    setChatMessages(messages);
  }, [messages]);

  const onSend = useCallback(
    async (chatMessages = []) => {
      try {
        // username, chatMessages, id, room
        setChatMessages((previousMessages) =>
          GiftedChat.append(previousMessages, chatMessages),
        );
        console.log(chatMessages);

        const len = chatMessages.length;

        await dispatch(
          chatActions.sendMessage(
            'parth',
            chatMessages,
            'id:parth',
            'id:ayush',
            'parth-room',
          ),
        );
      } catch (err) {
        console.log(err);
      }
    },
    [chatMessages],
  );

  return (
    <GiftedChat
      inverted={false}
      messages={chatMessages}
      onSend={onSend}
      user={{
        //sender id
        _id: 1,
      }}
    />
    // {/* {chatMessagess}
    // <TextInput
    //     style={{ height: 40, borderWidth: 2, top: 600 }}
    //     autoCorrect={false}
    //     value={chatMessage}
    //     onSubmitEditing={submitChatMessage}
    //     onChangeText={chatMessage => {
    //         setChatMessage(chatMessage);
    //     }}
    // /> */}
  );
};

// const styles = StyleSheet.create({
//     container: {
//         height: 400,
//         flex: 1,
//         backgroundColor: '#F5FCFF',
//     },
// });

export default ChatScreen;
