import {createAsyncThunk, createReducer} from '@reduxjs/toolkit';
import {RemindersAPIServices} from '../actions/RemindersAPIServices';
import {clearStore} from './AuthenticationReducer';
import {getConvertedRemindersList} from '../utitlities';
import {get} from 'lodash';

export const getRemindersList = createAsyncThunk(
  'RemindersReducer/getRemindersList',
  async payload => {
    const response = await RemindersAPIServices.apiGetRemindersList(payload);
    return response.data;
  },
);

export const getUpcomingRemindersList = createAsyncThunk(
  'RemindersReducer/getUpcomingRemindersList',
  async payload => {
    const response = await RemindersAPIServices.apiGetUpcomingRemindersList(
      payload,
    );
    return response.data;
  },
);

export const addOrUpdateReminderRequest = createAsyncThunk(
  'RemindersReducer/addOrUpdateReminderRequest',
  async payload => {
    const response = await RemindersAPIServices.apiAddOrUpdateReminderRequest(
      payload,
    );
    return response.data;
  },
);

export const setReminderStateRequest = createAsyncThunk(
  'RemindersReducer/setReminderStateRequest',
  async payload => {
    const response = await RemindersAPIServices.apiSetReminderStateRequest(
      payload,
    );
    return response.data;
  },
);

export const deleteReminderRequest = createAsyncThunk(
  'RemindersReducer/deleteReminderRequest',
  async payload => {
    const response = await RemindersAPIServices.apiDeleteReminderRequest(
      payload,
    );
    return response.data;
  },
);

const initialState = {
  remindersList: [],
  upComingRemindersList: [],
};

export const RemindersReducer = createReducer(initialState, {
  [deleteReminderRequest.pending]: (state, action) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  },

  [deleteReminderRequest.fulfilled]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: null,
    };
  },

  [deleteReminderRequest.rejected]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: null,
    };
  },

  [setReminderStateRequest.pending]: (state, action) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  },

  [setReminderStateRequest.fulfilled]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: null,
    };
  },

  [setReminderStateRequest.rejected]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: null,
    };
  },

  [addOrUpdateReminderRequest.pending]: (state, action) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  },

  [addOrUpdateReminderRequest.fulfilled]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: null,
    };
  },

  [addOrUpdateReminderRequest.rejected]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: null,
    };
  },

  [getRemindersList.pending]: (state, action) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  },

  [getRemindersList.fulfilled]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: null,
      remindersList: getConvertedRemindersList(
        get(action.payload, 'Reminders.Reminder', []),
      ),
    };
  },

  [getRemindersList.rejected]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: null,
    };
  },

  [getUpcomingRemindersList.pending]: (state, action) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  },

  [getUpcomingRemindersList.fulfilled]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: null,
      upComingRemindersList: getConvertedRemindersList(
        get(action.payload, 'Reminders.Reminder', []),
      ),
    };
  },

  [getRemindersList.rejected]: (state, action) => {
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
