import {StackScreenProps} from '@react-navigation/stack';
import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {StackParamList} from '../navigation/StackNavigator';
import {navigations} from '../constants';
import {Input, Button} from '@rneui/themed';

type LoginScreenProps = StackScreenProps<
  StackParamList,
  typeof navigations.LOGIN
>;

function LoginScreen({navigation}: LoginScreenProps) {
  const [inviteCode, setInviteCode] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // 로그인 처리 로직 추가
    console.log('Username:', username);
    console.log('Password:', password);
  };

  const onPressLogin = () => {
    handleLogin();
    navigation.navigate('main');
  };

  const onPressInviteCode = () => {};

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>로그인</Text>
        <Input
          placeholder="초대코드"
          value={inviteCode}
          onChangeText={setInviteCode}
        />
        <Input
          placeholder="아이디"
          value={username}
          onChangeText={setUsername}
        />
        <Input
          placeholder="비밀번호"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <Button title="로그인" onPress={onPressLogin} />
        <Button
          title="초대코드 요청하기"
          type={'outline'}
          onPress={onPressInviteCode}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

export default LoginScreen;
