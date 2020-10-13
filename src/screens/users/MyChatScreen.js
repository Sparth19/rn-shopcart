import React, {useState, useCallback, useEffect} from 'react';
import {View, Button, Text, TextInput, StyleSheet} from 'react-native';
import io from 'socket.io-client';
import {GiftedChat} from 'react-native-gifted-chat';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';

const MyChatScreen = (props) => {
  //const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  const socket = io('http://localhost:3000');

  const {navigation} = props;
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
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          //sender id 2
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((chatMessages = []) => {
    socket.emit('sendMessage', chatMessages, 'android');
    setChatMessages((previousMessages) =>
      GiftedChat.append(previousMessages, chatMessages),
    );
  }, []);

  return (
    <GiftedChat
      messages={chatMessages}
      onSend={(messages) => onSend(messages)}
      user={{
        //sender id
        _id: 1,
      }}
    />
  );
};

export default MyChatScreen;
