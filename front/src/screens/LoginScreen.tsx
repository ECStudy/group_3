import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {  SafeAreaView, View } from 'react-native';
import { StackParamList } from '../navigation/StackNavigator';
import { navigations } from '../constants';
import {Button} from '@rneui/themed';



type LoginScreenProps = StackScreenProps<StackParamList, typeof navigations.LOGIN>

function LoginScreen({navigation}: LoginScreenProps) {
  const onPress = () => {
    navigation.navigate('main');
  };

  return (
    <SafeAreaView>
      <View>
        <Button title="로그인" onPress={onPress} />
      </View>
    </SafeAreaView>
  );
}
// const styles = StyleSheet.create({});

export default LoginScreen;
