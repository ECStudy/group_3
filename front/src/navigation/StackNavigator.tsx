import LoginScreen from '../screens/LoginScreen';
import { navigations } from '../constants';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from '../screens/MainScreen';

export type StackParamList = {
  [navigations.LOGIN] : undefined;
  [navigations.MAIN] : undefined;
};

function StackNavigator(){
    const Stack = createStackNavigator<StackParamList>();

    return (
      <Stack.Navigator>
        <Stack.Screen name={navigations.LOGIN} component={LoginScreen} />
        <Stack.Screen name={navigations.MAIN} component={MainScreen} />
      </Stack.Navigator>
    );
}
export default StackNavigator;
