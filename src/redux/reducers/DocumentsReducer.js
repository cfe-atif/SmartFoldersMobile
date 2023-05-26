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

export const treeFolderDocsRequest = createAsyncThunk(
  'DocumentsReducer/treeFolderDocsRequest',
  async payload => {
    const response = await DocumentsAPIServices.apiTreeFolderDocsRequest(
      payload,
    );
    return response.data;
  },
);

export const treeFoldersRequest = createAsyncThunk(
  'DocumentsReducer/treeFoldersRequest',
  async payload => {
    const response = await DocumentsAPIServices.apiTreeFoldersRequest(payload);
    return response.data;
  },
);

export const createNewFolderData = createAsyncThunk(
  'DocumentsReducer/createNewFolderData',
  async payload => {
    const response = await DocumentsAPIServices.apiCreateNewFolderData(payload);
    return response.data;
  },
);

export const createNewDocumentData = createAsyncThunk(
  'DocumentsReducer/createNewDocumentData',
  async payload => {
    const response = await DocumentsAPIServices.apiCreateNewDocumentData(
      payload,
    );
    return response.data;
  },
);

const initialState = {
  loading: false,
  error: null,
  folderType: null,
  documentType: null,
  treeData: null,
  newDocumentData: null,
  newFolderData: null,
  folders: null,
  folderDocuments: null,
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
      folders: null,
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
      loading: true,
      error: null,
      treeData: null,
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
      folders: action.payload.hasOwnProperty('Document')
        ? action.payload.Document
        : action.payload,
    };
  },
  [treeAPIRRData.rejected]: (state, _) => {
    return {
      ...state,
      loading: false,
      error: null,
    };
  },

  [treeFolderDocsRequest.pending]: (state, _) => {
    return {
      ...state,
      loading: false,
      error: null,
      folderDocuments: null,
    };
  },
  [treeFolderDocsRequest.fulfilled]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: null,
      folderDocuments: action.payload,
    };
  },
  [treeFolderDocsRequest.rejected]: (state, _) => {
    return {
      ...state,
      loading: false,
      error: null,
    };
  },

  [treeFoldersRequest.pending]: (state, _) => {
    return {
      ...state,
      loading: false,
      error: null,
      folders: null,
    };
  },
  [treeFoldersRequest.fulfilled]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: null,
      folders: action.payload,
    };
  },
  [treeFoldersRequest.rejected]: (state, _) => {
    return {
      ...state,
      loading: false,
      error: null,
    };
  },

  [createNewFolderData.pending]: (state, _) => {
    return {
      ...state,
      loading: true,
      error: null,
      newFolderData: null,
    };
  },
  [createNewFolderData.fulfilled]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: null,
      newFolderData: action.payload,
    };
  },
  [createNewFolderData.rejected]: (state, _) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  },

  [createNewDocumentData.pending]: (state, _) => {
    return {
      ...state,
      loading: true,
      error: null,
      newDocumentData: null,
    };
  },
  [createNewDocumentData.fulfilled]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: null,
      newDocumentData: action.payload,
    };
  },
  [createNewDocumentData.rejected]: (state, _) => {
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
