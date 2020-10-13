import React, { useState, useCallback, useEffect } from 'react';
import { View, Button, Text, TextInput, StyleSheet } from 'react-native';
import io from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat';

let text1 = ''
const ChatScreen = (props) => {
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  const socket = io('https://shopcartapi.herokuapp.com');



  socket.emit('join', { username: 'ayush', id: 'id:ayush', room: 'ayush-room' }, (error) => {
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

  // socket.on("loadMessage", msg => {
  //     setChatMessages([...chatMessages, msg]);
  // });

  // const submitChatMessage = () => {
  //     socket.emit('chat message', chatMessage);
  //     setChatMessage('');
  // };

  const onSend = useCallback((chatMessages = []) => {
    const len = chatMessages.length
    socket.emit('sendMsg', chatMessages[len - 1].text, 'id:ayush', (error) => {
      if (error) {
        console.log(error)
      }
    });
    setChatMessages((previousMessages) =>
      GiftedChat.append(previousMessages, chatMessages),
    );
  }, []);
  // const chatMessagess = chatMessages.map(chatMessage => (
  //     <Text style={{ borderWidth: 2, top: 500 }}>{chatMessage}</Text>
  // ));

  return (
    <GiftedChat
      messages={chatMessages}
      onSend={(messages) => {
        // console.log(messages[0].text)
        // setChatMessage(messages[0].text)
        onSend(messages)
      }
      }
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
