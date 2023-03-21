import {createReducer, combineReducers} from '@reduxjs/toolkit';
import {AuthenticationReducer} from '../apiHandlers/authentication/AuthenticationReducer';

const appState = {
  name: 'SmartFoldersApp',
  url: '',
  version: '1.0.0',
};

const AppReducer = createReducer(appState, _ => {
  return appState;
});

const rootReducer = combineReducers({
  AppReducer: AppReducer,
  AuthenticationReducer: AuthenticationReducer,
});

export default rootReducer;
