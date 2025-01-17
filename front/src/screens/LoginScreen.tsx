import React, {useCallback, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View, Alert} from 'react-native';
import {navigations} from '../constants';
import {Input, Button} from '@rneui/themed';

import {DrawerScreenProps} from '@react-navigation/drawer';
import {DrawerParamList} from '../navigation/DrawerNavigator';
import {login} from '../modules/login/login';

type LoginScreenProps = DrawerScreenProps<
  DrawerParamList,
  typeof navigations.LOGIN
>;

function LoginScreen({navigation}: LoginScreenProps) {
  const [inviteCode, setInviteCode] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = useCallback(async () => {
    try {
      await login(username, password);
    } catch (error) {
      Alert.alert('Login failed', (error as Error).message);
    }
  }, [password, username]);

  const onPressLogin = useCallback(() => {
    handleLogin();

    navigation.navigate(navigations.MAIN_STACK);
  }, [handleLogin, navigation]);

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
