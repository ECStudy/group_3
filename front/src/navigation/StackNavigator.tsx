import LoginScreen from '../screens/LoginScreen';
import {navigations} from '../constants';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from '../screens/MainScreen';
import RoomCreationScreen from '../screens/RoomCreationScreen';

export type StackParamList = {
  [navigations.LOGIN]: undefined;
  [navigations.MAIN]: undefined;
  [navigations.CREATION_ROOM]: undefined;
};

function StackNavigator() {
  const Stack = createStackNavigator<StackParamList>();

  return (
    <Stack.Navigator>
      <Stack.Screen name={navigations.LOGIN} component={LoginScreen} />
      <Stack.Screen name={navigations.MAIN} component={MainScreen} />
      <Stack.Screen
        name={navigations.CREATION_ROOM}
        component={RoomCreationScreen}
      />
    </Stack.Navigator>
  );
}
export default StackNavigator;
