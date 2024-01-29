import React from 'react';

import { Provider } from 'react-redux'
import { store } from './src/store/store';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import Main from './src/Main/Main';
import { NavigationContainer } from '@react-navigation/native';



export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>

          <Main />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}

