import React, { useState, useCallback, useEffect } from 'react';
import { View, Button, Text, TextInput, StyleSheet } from 'react-native';
import io from "socket.io-client";
import { GiftedChat } from 'react-native-gifted-chat';


const ChatScreen = props => {
    //const [chatMessage, setChatMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);

    const socket = io("http://localhost:3000");

    // useEffect(() => {
    //     setChatMessages([
    //         {
    //             _id: 1,
    //             text: 'Hello developer',
    //             createdAt: new Date(),
    //             user: {
    //                 _id: 2,
    //                 name: 'React Native',
    //                 avatar: 'https://placeimg.com/140/140/any',
    //             },
    //         },
    //     ])
    // }, [])


    // socket.on("loadMessage", msg => {
    //     setChatMessages([...chatMessages, msg]);
    // });

    // const submitChatMessage = () => {
    //     socket.emit('chat message', chatMessage);
    //     setChatMessage('');
    // };
    const onSend = useCallback((chatMessages = []) => {
        socket.emit('sendMessage', chatMessages);
        setChatMessages(previousMessages => GiftedChat.append(previousMessages, chatMessages))
    }, [])
    // const chatMessagess = chatMessages.map(chatMessage => (
    //     <Text style={{ borderWidth: 2, top: 500 }}>{chatMessage}</Text>
    // ));

    return (

        <GiftedChat
            messages={chatMessages}
            onSend={messages => onSend(messages)}
            user={{
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