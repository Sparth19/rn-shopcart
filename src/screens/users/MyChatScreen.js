import React, { useState, useCallback, useEffect } from 'react';
import { View, Button, Text, TextInput, StyleSheet } from 'react-native';
import io from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
let text1 = ''
const MyChatScreen = (props) => {
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  const socket = io('http://localhost:3000');

  socket.emit('join', { username: 'Parth', id: 'id:parth', room: 'ayush-room' }, (error) => {
    if (error) {
      console.log(error)
      //location.href = '/'
    }
  })


  socket.on('message', (msgObject) => {
    console.log(msgObject)
    text1 = text1.concat(msgObject.text);
    // const html = Mustache.render(messageTemplate, {
    //   username: msgObject.username,
    //   message: msgObject.text,
    //   createdAt: moment(msgObject.createdAt).format('h:mm a')
    // })
    // if (msgObject.side === 0) {
    //   console.log("Other")
    // } else if (msgObject.side === 1) {
    //   console.log("me")
    // }
    // message.insertAdjacentHTML('beforeend', html)
    // autoscroll()
  })

  const { navigation } = props;
  useEffect(() => {
    navigation.setOptions({
      title: 'My Chats',
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            name="Menu"
            iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
            onPress={() => {
              navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  useEffect(() => {

    setChatMessages([
      {
        //receiver id 1
        _id: 1,
        text: text1,
        createdAt: new Date(),
        user: {
          //sender id 2
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, [text1]);

  const onSend = useCallback((chatMessages = []) => {
    const len = chatMessages.length
    socket.emit('sendMsg', chatMessages[len - 1].text, 'id:parth', (error) => {
      if (error) {
        console.log(error)
      }
    }); setChatMessages((previousMessages) =>
      GiftedChat.append(previousMessages, chatMessages),
    );
  }, [chatMessage]);

  return (
    <GiftedChat
      messages={chatMessages}
      onSend={(messages) => {
        // console.log(messages[0].text)
        // setChatMessage(messages[0].text)
        onSend(messages)
      }}
      user={{
        //sender id
        _id: 1,
      }}
    />
  );
};

export default MyChatScreen;
