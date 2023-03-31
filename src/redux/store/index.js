import {persistReducer} from 'redux-persist';
import {configureStore} from '@reduxjs/toolkit';
import {createLogger} from 'redux-logger';
import {persistStore} from 'redux-persist';
import rootReducer from './reducers';
import thunkMiddleware from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [createLogger(), thunkMiddleware];

const store = configureStore({
  reducer: persistedReducer,
  middleware: middlewares,
});

let persistor = persistStore(store);

const configureStores = () => {
  return {persistor, store};
};

export default configureStores;
