import {createReducer, combineReducers} from '@reduxjs/toolkit';
import {AuthenticationReducer} from '../reducers/AuthenticationReducer';
import {RemindersReducer} from '../reducers/RemindersReducer';
import {SmartChatReducer} from '../reducers/SmartChatReducer';

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
  RemindersReducer: RemindersReducer,
});

export default rootReducer;
