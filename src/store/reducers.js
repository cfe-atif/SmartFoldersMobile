import {createReducer, combineReducers} from '@reduxjs/toolkit';
import {AuthenticationReducer} from '../redux/reducers/AuthenticationReducer';
import {SmartChatReducer} from '../redux/reducers/SmartChatReducer';

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
  SmartChatReducer: SmartChatReducer,
});

export default rootReducer;
