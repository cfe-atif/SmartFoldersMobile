import {createAsyncThunk, createReducer} from '@reduxjs/toolkit';
import {RemindersAPIServices} from '../actions/RemindersAPIServices';
import {clearStore} from './AuthenticationReducer';
import {getConvertedRemindersList} from '../utitlities';
import {get} from 'lodash';
import Applogger from './../../helpers/AppLogger';

export const setRemindersViewShown = createAsyncThunk(
  'RemindersReducer/setRemindersViewShown',
  async payload => {
    return payload;
  },
);

export const setRemindersViewHidden = createAsyncThunk(
  'RemindersReducer/setRemindersViewHidden',
  async payload => {
    return payload;
  },
);

export const setPopUpReminder = createAsyncThunk(
  'RemindersReducer/setPopUpReminder',
  async payload => {
    return payload;
  },
);

export const setRemindersPopupShown = createAsyncThunk(
  'RemindersReducer/setRemindersPopupShown',
  async payload => {
    return payload;
  },
);

export const setRemindersPopupHidden = createAsyncThunk(
  'RemindersReducer/setRemindersPopupHidden',
  async payload => {
    return payload;
  },
);

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

export const addReminderRequest = createAsyncThunk(
  'RemindersReducer/addReminderRequest',
  async payload => {
    const response = await RemindersAPIServices.apiAddReminderRequest(payload);
    return response.data;
  },
);

export const updateReminderRequest = createAsyncThunk(
  'RemindersReducer/updateReminderRequest',
  async payload => {
    const response = await RemindersAPIServices.apiUpdateReminderRequest(
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
  showRemindersView: false,
  showRemindersPopup: false,
  remindersList: [],
  upComingRemindersList: [],
  popupReminder: null,
};

export const RemindersReducer = createReducer(initialState, {
  [setRemindersViewShown.fulfilled]: (state, action) => {
    return {
      ...state,
      showRemindersView: true,
    };
  },

  [setRemindersViewHidden.fulfilled]: (state, action) => {
    return {
      ...state,
      showRemindersView: false,
    };
  },

  [setRemindersPopupShown.fulfilled]: (state, action) => {
    return {
      ...state,
      showRemindersPopup: true,
    };
  },

  [setRemindersPopupHidden.fulfilled]: (state, action) => {
    return {
      ...state,
      showRemindersPopup: false,
    };
  },

  [setPopUpReminder.fulfilled]: (state, action) => {
    return {
      ...state,
      popupReminder: action.payload,
    };
  },

  [deleteReminderRequest.fulfilled]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: null,
    };
  },

  [updateReminderRequest.fulfilled]: (state, action) => {
    return {
      ...state,
      loading: false,
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

  [addReminderRequest.fulfilled]: (state, action) => {
    return {
      ...state,
      loading: false,
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

  [clearStore.fulfilled]: (state, action) => {
    return initialState;
  },
});
