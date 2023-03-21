import {createAsyncThunk, createReducer} from '@reduxjs/toolkit';
import {AuthApiServices} from './AuthApiServices';
import {mapAPICallError} from '../../helpers/AppFunctions';

export const stopLoaderAndError = createAsyncThunk(
  'AuthenticationReducer/stopLoaderAndError',
  async payload => {
    return null;
  },
);

export const loginRequest = createAsyncThunk(
  'AuthenticationReducer/loginRequest',
  async (payload, {rejectWithValue}) => {
    try {
      const response = await AuthApiServices.apiLoginRequest(payload);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  },
);

const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const AuthenticationReducer = createReducer(initialState, {
  [loginRequest.pending]: (state, action) => {
    return {
      ...state,
      loginCredentials: action.meta.arg,
      loading: true,
      error: null,
    };
  },
  [loginRequest.fulfilled]: (state, action) => {
    return {
      ...state,
      user: action.payload.user,
      loading: false,
      error: null,
    };
  },
  [loginRequest.rejected]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: mapAPICallError(action.error),
    };
  },
  [stopLoaderAndError.fulfilled]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: null,
    };
  },
});
