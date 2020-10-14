import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import * as chatActions from '../../store/actions/chat';

const MyChatScreen = (props) => {
  const [chatMsg, setChatMsg] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const dispatch = useDispatch();

  const joinChatRoom = useCallback(async () => {
    try {
      await dispatch(
        chatActions.joinChatRoom('ayush', 'id:ayush', 'parth-room'),
      );
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    joinChatRoom().then(() => {
      console.log('ayush joined');
    });
  }, []);

  const messages = useSelector((state) => state.chat.messages);

  console.log('messages froom useSelector mychatscreen');
  console.log(messages);

  useEffect(() => {
    setChatMessages(messages);
  }, [messages]);

  const {navigation} = props;
  useEffect(() => {
    navigation.setOptions({
      title: 'My Chat',
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Menu"
            iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
            onPress={() => {
              props.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

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
            'ayush',
            chatMessages,
            'id:ayush',
            'id:parth',
            'parth-room',
          ),
        );
      } catch (err) {
        //console.log(err);
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
        _id: 2,
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

export default MyChatScreen;
