import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {Persistor, Store} from './src/modules/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {enableMapSet, setAutoFreeze} from 'immer';
import DrawerNavigator from './src/navigation/DrawerNavigator';

// Immer 초기화 설정
enableMapSet();
setAutoFreeze(false);

function App(): React.JSX.Element {
  return (
    // Redux-Store
    <Provider store={Store}>
      {/* Redux-Persist */}
      <PersistGate persistor={Persistor}>
        <SafeAreaProvider>
          <NavigationContainer>
            <DrawerNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
