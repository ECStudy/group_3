import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {io, Socket} from 'socket.io-client';
import {ChatMessage} from '../sampleData';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {DrawerParamList} from '../navigation/DrawerNavigator';
import {navigations} from '../constants';

type ChatScreenProps = DrawerScreenProps<
  DrawerParamList,
  typeof navigations.CHAT
>;

function ChatScreen({route}: ChatScreenProps) {
  const [inputText, setInputText] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const room_id = route.params?.room_id;
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // WebSocket 연결 생성
    const newSocket = io('http://localhost:3000'); // WebSocket 서버 URL
    setSocket(newSocket);

    // 클린업: 컴포넌트 언마운트 시 연결 해제
    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket || !room_id) {
      return;
    }
    // 특정 방에 참여
    socket.emit('joinRoom', {room_id});

    // 기존 메시지 수신
    const handleChatHistory = (data: ChatMessage[]) => {
      setMessages(data);
    };

    // 새 메시지 수신
    const handleNewMessage = (message: ChatMessage) => {
      setMessages(prevMessages => [...prevMessages, message]);
    };

    // 이벤트 등록
    socket.on('chatHistory', handleChatHistory);
    socket.on('newMessage', handleNewMessage);

    // 에러 핸들링
    socket.on('connect_error', err => {
      console.error('Connection Error:', err);
    });

    // 클린업: 이전 이벤트 리스너 제거
    return () => {
      socket.off('chatHistory', handleChatHistory);
      socket.off('newMessage', handleNewMessage);
      socket.off('connect_error');
    };
  }, [socket, room_id]);

  const sendMessage = () => {
    if (inputText.trim() && room_id && socket) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        text: inputText,
        isSentByUser: true,
      };

      // 메시지 전송
      socket.emit('sendMessage', {room_id, message: newMessage});

      // 로컬 메시지 추가
      setInputText('');
    }
  };

  const renderMessageItem = ({item}: {item: ChatMessage}) => (
    <View
      style={[
        styles.messageContainer,
        item.isSentByUser ? styles.sentMessage : styles.receivedMessage,
      ]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
          <FlatList
            data={messages}
            renderItem={renderMessageItem}
            keyExtractor={item => item.id}
            style={{flex: 1}}
            contentContainerStyle={{flexGrow: 1}}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="메시지를 입력하세요"
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={sendMessage}
              blurOnSubmit={false}
            />
            <Button title="전송" onPress={sendMessage} />
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  messageContainer: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginRight: 10,
  },
  sentMessage: {
    backgroundColor: '#d9f7be',
    alignSelf: 'flex-end',
    marginRight: '5%',
  },
  receivedMessage: {
    backgroundColor: '#f0f0f0',
    alignSelf: 'flex-start',
    marginLeft: '5%',
  },
});

export default ChatScreen;
