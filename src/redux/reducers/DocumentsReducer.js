import {createAsyncThunk, createReducer} from '@reduxjs/toolkit';
import {DocumentsAPIServices} from '../actions/DocumentsAPIServices';
import {responseHasError} from '../../utils/HelperFunctions';
import {clearStore} from './AuthenticationReducer';
import Applogger from './../../helpers/AppLogger';

export const treeAPIData = createAsyncThunk(
  'DocumentsReducer/treeAPIData',
  async payload => {
    const response = await DocumentsAPIServices.apiTreeAPIData(payload);
    return response.data;
  },
);

export const treeAPIRRData = createAsyncThunk(
  'DocumentsReducer/treeAPIRRData',
  async payload => {
    const response = await DocumentsAPIServices.apiTreeAPIRRData(payload);
    return response.data;
  },
);

const initialState = {
  loading: false,
  error: null,
  folderType: null,
  documentType: null,
  treeData: null,
};

export const DocumentsReducer = createReducer(initialState, {
  [treeAPIData.pending]: (state, _) => {
    return {
      ...state,
      treeData: null,
      loading: true,
      error: null,
    };
  },
  [treeAPIData.fulfilled]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: null,
      treeData: responseHasError(action.payload)
        ? null
        : action.payload.Document,
      documentType: responseHasError(action.payload)
        ? null
        : action.payload.Document.sys.dtl,
      folderType: responseHasError(action.payload)
        ? null
        : action.payload.Document.sys.ftl,
    };
  },
  [treeAPIData.rejected]: (state, _) => {
    return {
      ...state,
      loading: false,
      error: null,
    };
  },

  [treeAPIRRData.pending]: (state, _) => {
    return {
      ...state,
      treeData: null,
      loading: true,
      error: null,
    };
  },
  [treeAPIRRData.fulfilled]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: null,
      treeData: action.payload.hasOwnProperty('Document')
        ? action.payload.Document
        : action.payload,
    };
  },
  [treeAPIRRData.rejected]: (state, _) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  },

  [clearStore.fulfilled]: (state, action) => {
    return initialState;
  },
});
