import {createAsyncThunk, createReducer} from '@reduxjs/toolkit';
import {AuthApiServices} from '../actions/AuthApiServices';
import {getDataBaseName, responseHasError} from '../../utils/HelperFunctions';
import Applogger from '../../helpers/AppLogger';

export const stopLoaderAndError = createAsyncThunk(
  'AuthenticationReducer/stopLoaderAndError',
  async payload => {
    return payload;
  },
);

export const loginRequest = createAsyncThunk(
  'AuthenticationReducer/loginRequest',
  async payload => {
    const response = await AuthApiServices.apiLoginRequest(payload);
    return response.data;
  },
);

export const changePasswordRequest = createAsyncThunk(
  'AuthenticationReducer/changePasswordRequest',
  async payload => {
    const response = await AuthApiServices.apiChangePasswordRequest(payload);
    return response.data;
  },
);

export const changeDBNumber = createAsyncThunk(
  'AuthenticationReducer/changeDBNumber',
  async payload => {
    return payload;
  },
);

export const changeDBName = createAsyncThunk(
  'AuthenticationReducer/changeDBName',
  async payload => {
    return payload;
  },
);

export const logoutUser = createAsyncThunk(
  'AuthenticationReducer/logoutUser',
  async payload => {
    const response = await AuthApiServices.apiLogoutRequest(payload);
    return response.data;
  },
);

export const clearStore = createAsyncThunk(
  'AuthenticationReducer/clearStore',
  async () => {
    return true;
  },
);

const initialState = {
  loading: false,
  error: null,
  user: null,
  databases: [],
  dataBaseNumber: null,
  dataBaseName: null,
  expiry: '',
  loggedOut: false,
};

export const AuthenticationReducer = createReducer(initialState, {
  [loginRequest.pending]: (state, action) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  },
  [loginRequest.fulfilled]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: null,
      user: responseHasError(action.payload) ? null : action.payload.User,
      databases: responseHasError(action.payload)
        ? []
        : action.payload.Database,
    };
  },
  [loginRequest.rejected]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [changePasswordRequest.fulfilled]: (state, action) => {
    return {
      ...state,
      loading: true,
      error: action.payload,
    };
  },

  [changeDBNumber.pending]: (state, _) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  },
  [changeDBNumber.fulfilled]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: null,
      dataBaseNumber: action.payload,
    };
  },
  [changeDBNumber.rejected]: (state, _) => {
    return {
      ...state,
      loading: false,
      error: null,
    };
  },
  [changeDBName.pending]: (state, _) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  },
  [changeDBName.fulfilled]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: null,
      dataBaseName: action.payload,
    };
  },
  [changeDBName.rejected]: (state, _) => {
    return {
      ...state,
      loading: false,
      error: null,
    };
  },

  [logoutUser.pending]: (state, _) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  },
  [logoutUser.fulfilled]: (state, _) => {
    return {
      ...state,
      loading: false,
      error: null,
    };
  },
  [logoutUser.rejected]: (state, _) => {
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
