import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import StackNavigator from './src/navigation/StackNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {Persistor, Store} from './src/modules/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {enableMapSet, setAutoFreeze} from 'immer';

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
            <StackNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
