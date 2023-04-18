import {createReducer, combineReducers} from '@reduxjs/toolkit';
import {AuthenticationReducer} from '../reducers/AuthenticationReducer';
import {RemindersReducer} from '../reducers/RemindersReducer';
import {SmartChatReducer} from '../reducers/SmartChatReducer';
import {RecentSearchesReducer} from '../reducers/RecentSearchesReducer';
import {DocumentsReducer} from '../reducers/DocumentsReducer';

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
  DocumentsReducer: DocumentsReducer,
  RecentSearchesReducer: RecentSearchesReducer,
  RemindersReducer: RemindersReducer,
  SmartChatReducer: SmartChatReducer,
});

export default rootReducer;
