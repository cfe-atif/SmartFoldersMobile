import {createAsyncThunk, createReducer} from '@reduxjs/toolkit';
import {DocumentsAPIServices} from '../actions/DocumentsAPIServices';
import {responseHasError} from '../../utils/HelperFunctions';
import {clearStore} from './AuthenticationReducer';
import Applogger from './../../helpers/AppLogger';

export const setSelectedDocType = createAsyncThunk(
  'DocumentsReducer/setSelectedDocType',
  async payload => {
    return payload;
  },
);

export const setSelectedFolder = createAsyncThunk(
  'DocumentsReducer/setSelectedFolder',
  async payload => {
    return payload;
  },
);

export const setSelectedDocument = createAsyncThunk(
  'DocumentsReducer/setSelectedDocument',
  async payload => {
    return payload;
  },
);

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

export const getViewPropertiesData = createAsyncThunk(
  'DocumentsReducer/getViewPropertiesData',
  async payload => {
    const response = await DocumentsAPIServices.apiGetViewPropertiesData(
      payload,
    );
    return response.data;
  },
);

export const getVersionInfoData = createAsyncThunk(
  'DocumentsReducer/getVersionInfoData',
  async payload => {
    const response = await DocumentsAPIServices.apiGetVersionInfoData(payload);
    return response.data;
  },
);

export const getDocumentIndexData = createAsyncThunk(
  'DocumentsReducer/getDocumentIndexData',
  async payload => {
    const response = await DocumentsAPIServices.apiGetDocumentIndexData(
      payload,
    );
    return response.data;
  },
);

const initialState = {
  loading: false,
  error: null,
  selectedFolder: null,
  selectedDocument: null,
  selectedDocType: null,
  folderType: null,
  documentType: null,
  treeData: null,
  newDocumentData: null,
  newFolderData: null,
  folders: null,
  folderDocuments: null,
  viewPropertiesData: null,
  versionInfoData: null,
  documentIndexData: null,
};

export const DocumentsReducer = createReducer(initialState, {
  [setSelectedDocType.fulfilled]: (state, action) => {
    return {
      ...state,
      selectedDocType: action.payload,
    };
  },

  [setSelectedFolder.fulfilled]: (state, action) => {
    return {
      ...state,
      selectedFolder: action.payload,
    };
  },

  [setSelectedDocument.fulfilled]: (state, action) => {
    return {
      ...state,
      selectedDocument: action.payload,
    };
  },

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
      loading: true,
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
      loading: true,
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
      loading: false,
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
      loading: false,
      error: null,
    };
  },

  [getViewPropertiesData.pending]: (state, _) => {
    return {
      ...state,
      loading: true,
      error: null,
      viewPropertiesData: null,
    };
  },
  [getViewPropertiesData.fulfilled]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: null,
      viewPropertiesData: action.payload,
    };
  },
  [getViewPropertiesData.rejected]: (state, _) => {
    return {
      ...state,
      loading: false,
      error: null,
    };
  },

  [getVersionInfoData.pending]: (state, _) => {
    return {
      ...state,
      loading: true,
      error: null,
      versionInfoData: null,
    };
  },
  [getVersionInfoData.fulfilled]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: null,
      versionInfoData: action.payload,
    };
  },
  [getVersionInfoData.rejected]: (state, _) => {
    return {
      ...state,
      loading: false,
      error: null,
    };
  },

  [getDocumentIndexData.pending]: (state, _) => {
    return {
      ...state,
      loading: true,
      error: null,
      documentIndexData: null,
    };
  },
  [getDocumentIndexData.fulfilled]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: null,
      documentIndexData: action.payload,
    };
  },
  [getDocumentIndexData.rejected]: (state, _) => {
    return {
      ...state,
      loading: false,
      error: null,
    };
  },

  [clearStore.fulfilled]: (state, action) => {
    return initialState;
  },
});
