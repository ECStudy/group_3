import {createDrawerNavigator} from '@react-navigation/drawer';
import {navigations} from '../constants';
import LoginScreen from '../screens/LoginScreen';
import ChatScreen from '../screens/ChatScreen';
import {RoomData} from '../sampleData';
import React from 'react';
import HeaderLeft from '../components/HeaderLeft';
import HeaderRight from '../components/HeaderRight';
import MainScreen from '../screens/MainScreen';
import RoomCreationScreen from '../screens/RoomCreationScreen';

export type DrawerParamList = {
  [navigations.LOGIN]: undefined;
  [navigations.CHAT]: RoomData;
  [navigations.MAIN]: undefined;
  [navigations.CREATION_ROOM]: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name={navigations.LOGIN}
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name={navigations.MAIN}
        component={MainScreen}
        options={{drawerItemStyle: {display: 'none'}}}
      />
      <Drawer.Screen
        name={navigations.CREATION_ROOM}
        component={RoomCreationScreen}
        options={({navigation}) => ({
          drawerItemStyle: {display: 'none'},
          headerLeft: () => HeaderLeft(navigation, navigations.MAIN_STACK),
        })}
      />
      <Drawer.Screen
        name={navigations.CHAT}
        component={ChatScreen}
        options={({navigation}) => ({
          drawerItemStyle: {display: 'none'},
          headerLeft: () => HeaderLeft(navigation, navigations.MAIN_STACK),
          headerRight: () => HeaderRight(),
        })}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
