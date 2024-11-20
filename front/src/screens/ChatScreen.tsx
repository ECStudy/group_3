import {StackScreenProps} from '@react-navigation/stack';
import React, {useState} from 'react';
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
import {StackParamList} from '../navigation/StackNavigator';
import {navigations} from '../constants';
import {ChatMessage} from '../sampleData';
import {setChatData} from '../modules/redux/slice/RoomDatasSlice';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../modules/redux/RootReducer';

type ChatScreenProps = StackScreenProps<
  StackParamList,
  typeof navigations.CHAT
>;

const ChatScreen = ({route}: ChatScreenProps) => {
  const [inputText, setInputText] = useState<string>('');
  const dispatch = useDispatch();
  const chat_data = useSelector(
    (state: RootState) =>
      state.roomDatas.room_datas.find(
        room_data => room_data.room_id === route.params.room_id,
      )?.chat_data,
  );
  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        text: inputText,
        isSentByUser: true,
      };
      dispatch(
        setChatData({room_id: route.params.room_id, chat_data: newMessage}),
      );
      setInputText('');
    }
  };

  const renderMessageItem = ({item}: {item: ChatMessage}) => (
    <View
      style={[
        styles.messageContainer,
        item.isSentByUser ? styles.sentMessage : styles.receivedMessage, // 전송자에 따라 스타일 적용
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
          keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} // iOS 키보드 높이 보정
        >
          <FlatList
            data={chat_data}
            renderItem={renderMessageItem}
            keyExtractor={item => item.id}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="메시지를 입력하세요"
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={sendMessage} // 엔터 키 입력 시 전송
              blurOnSubmit={false} // 엔터 후 포커스 유지
            />
            <Button title="전송" onPress={sendMessage} />
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

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
    alignSelf: 'flex-end', // 오른쪽 정렬
    marginRight: '5%',
  },
  receivedMessage: {
    backgroundColor: '#f0f0f0',
    alignSelf: 'flex-start', // 왼쪽 정렬
    marginLeft: '5%',
  },
});

export default ChatScreen;
