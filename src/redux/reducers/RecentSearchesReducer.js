import {createAsyncThunk, createReducer} from '@reduxjs/toolkit';
import {RecentSearchesAPIServices} from '../actions/RecentSearchesAPIServices';
import {clearStore} from './AuthenticationReducer';
import {get} from 'lodash';
import Applogger from './../../helpers/AppLogger';

export const getRecentAndSavedSearches = createAsyncThunk(
  'RecentSearchesReducer/getRecentAndSavedSearches',
  async payload => {
    const response =
      await RecentSearchesAPIServices.apiGetRecentAndSavedSearches(payload);
    return response.data;
  },
);

export const deleteSavedSearch = createAsyncThunk(
  'RecentSearchesReducer/deleteSavedSearch',
  async payload => {
    const response = await RecentSearchesAPIServices.apiDeleteSavedSearch(
      payload,
    );
    return response.data;
  },
);

export const saveSearch = createAsyncThunk(
  'RecentSearchesReducer/saveSearch',
  async payload => {
    const response = await RecentSearchesAPIServices.apiSaveSearch(payload);
    return response.data;
  },
);

const initialState = {
  loading: false,
  error: null,
  recentAndSavedSearches: null,
  savedSearch: null,
};

export const RecentSearchesReducer = createReducer(initialState, {
  [getRecentAndSavedSearches.pending]: (state, action) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  },
  [getRecentAndSavedSearches.fulfilled]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: null,
      recentAndSavedSearches: action.payload,
    };
  },
  [getRecentAndSavedSearches.rejected]: (state, _) => {
    return {
      ...state,
      loading: false,
      error: null,
    };
  },

  [saveSearch.pending]: (state, action) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  },
  [saveSearch.fulfilled]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: null,
      savedSearch: action.payload,
    };
  },
  [saveSearch.rejected]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: null,
    };
  },

  [deleteSavedSearch.pending]: (state, action) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  },
  [deleteSavedSearch.fulfilled]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: null,
    };
  },
  [deleteSavedSearch.rejected]: (state, action) => {
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
