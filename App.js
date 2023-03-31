import React from 'react';
import {ActivityIndicator, LogBox} from 'react-native';
import {Provider as ReduxProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import AppContainer from './src/navigation/MainNavigator';
import configureStores from './src/redux/store';

LogBox.ignoreAllLogs();

export default function App() {
  const {persistor, store} = configureStores();

  return (
    <ReduxProvider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <AppContainer />
      </PersistGate>
    </ReduxProvider>
  );
}
