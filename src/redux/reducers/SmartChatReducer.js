import {createAsyncThunk, createReducer} from '@reduxjs/toolkit';
import {SmartChatAPIServices} from './../actions/SmartChatAPIServices';
import {clearStore} from './AuthenticationReducer';
import {
  sortUserAllChats,
  sortUserGroupsList,
  sortUsersByName,
  sortChatMessagesbyDate,
} from '../utitlities';

export const setShowSmartChat = createAsyncThunk(
  'SmartChatReducer/setShowSmartChat',
  async payload => {
    return payload;
  },
);

export const getUserChatsListRequest = createAsyncThunk(
  'SmartChatReducer/getUserChatsListRequest',
  async (payload, {rejectWithValue}) => {
    try {
      const response = await SmartChatAPIServices.apiGetUserChatsListRequest(
        payload,
      );
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  },
);

export const getSingleMessageHistoryRequest = createAsyncThunk(
  'SmartChatReducer/getSingleMessageHistoryRequest',
  async (payload, {rejectWithValue}) => {
    try {
      const response =
        await SmartChatAPIServices.apiGetSingleMessageHistoryRequest(payload);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  },
);

export const deleteUserGroupRequest = createAsyncThunk(
  'SmartChatReducer/deleteUserGroupRequest',
  async (payload, {rejectWithValue}) => {
    try {
      const response = await SmartChatAPIServices.apiDeleteUserGroupRequest(
        payload,
      );
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  },
);

export const exitFromGroupRequest = createAsyncThunk(
  'SmartChatReducer/exitFromGroupRequest',
  async (payload, {rejectWithValue}) => {
    try {
      const response = await SmartChatAPIServices.apiExitFromGroupRequest(
        payload,
      );
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  },
);

export const getSpecificUsersAllGroupsRequest = createAsyncThunk(
  'SmartChatReducer/getSpecificUsersAllGroupsRequest',
  async (payload, {rejectWithValue}) => {
    try {
      const response = await SmartChatAPIServices.apiGetUsersAllGroupsRequest(
        payload,
      );
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  },
);

export const getUsersAllGroupsRequest = createAsyncThunk(
  'SmartChatReducer/getUsersAllGroupsRequest',
  async (payload, {rejectWithValue}) => {
    try {
      const response = await SmartChatAPIServices.apiGetUsersAllGroupsRequest(
        payload,
      );
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  },
);

export const getUsersInGroupRequest = createAsyncThunk(
  'SmartChatReducer/getUsersInGroupRequest',
  async (payload, {rejectWithValue}) => {
    try {
      const response = await SmartChatAPIServices.apiGetUsersInGroupRequest(
        payload,
      );
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  },
);

export const createUserGroupRequest = createAsyncThunk(
  'SmartChatReducer/createUserGroupRequest',
  async (payload, {rejectWithValue}) => {
    try {
      const response = await SmartChatAPIServices.apiCreateUserGroupRequest(
        payload,
      );
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  },
);

export const groupChatMessagesRead = createAsyncThunk(
  'SmartChatReducer/groupChatMessagesRead',
  async (payload, {rejectWithValue}) => {
    try {
      const response = await SmartChatAPIServices.apiGroupChatMessagesRead(
        payload,
      );
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  },
);

export const singleChatMessageReadAll = createAsyncThunk(
  'SmartChatReducer/singleChatMessageReadAll',
  async (payload, {rejectWithValue}) => {
    try {
      const response = await SmartChatAPIServices.apiSingleChatMessageReadAll(
        payload,
      );
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  },
);

export const singleChatMessageRead = createAsyncThunk(
  'SmartChatReducer/singleChatMessageRead',
  async (payload, {rejectWithValue}) => {
    try {
      const response = await SmartChatAPIServices.apiSingleChatMessageRead(
        payload,
      );
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  },
);

export const updateUserGroupRequest = createAsyncThunk(
  'SmartChatReducer/updateUserGroupRequest',
  async (payload, {rejectWithValue}) => {
    try {
      const response = await SmartChatAPIServices.apiUpdateUserGroupRequest(
        payload,
      );
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  },
);

export const getUsersListRequest = createAsyncThunk(
  'SmartChatReducer/getUsersListRequest',
  async (payload, {rejectWithValue}) => {
    try {
      const response = await SmartChatAPIServices.apiGetUsersListRequest(
        payload,
      );
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  },
);

export const getUserGroupMessagesListRequest = createAsyncThunk(
  'SmartChatReducer/getUserGroupMessagesListRequest',
  async (payload, {rejectWithValue}) => {
    try {
      const response =
        await SmartChatAPIServices.apiGetUserGroupMessagesListRequest(payload);
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
  loading: false,
  error: null,
  userAllChats: [],
  showSmartChat: true,
  usersAllGroups: [],
  usersInGroup: [],
  specificUsersAllGroups: [],
  usersList: [],
  userChatMessagesList: [],
  userGroupMessagesList: [],
};

export const SmartChatReducer = createReducer(initialState, {
  [setShowSmartChat.fulfilled]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: null,
      showSmartChat: action.payload,
    };
  },

  [getUserChatsListRequest.fulfilled]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: null,
      userAllChats: sortUserAllChats(action.payload.data),
    };
  },

  [deleteUserGroupRequest.pending]: (state, action) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  },

  [deleteUserGroupRequest.fulfilled]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: null,
    };
  },

  [deleteUserGroupRequest.rejected]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: null,
    };
  },

  [groupChatMessagesRead.fulfilled]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: null,
      usersAllGroups: sortUserGroupsList(action.payload.groups),
    };
  },

  [getUsersAllGroupsRequest.pending]: (state, action) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  },

  [getUsersAllGroupsRequest.fulfilled]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: null,
      usersAllGroups: sortUserGroupsList(action.payload.groups),
    };
  },

  [getUsersAllGroupsRequest.rejected]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: null,
    };
  },

  [getSpecificUsersAllGroupsRequest.pending]: (state, action) => {
    return {
      ...state,
      loading: true,
      error: null,
      specificUsersAllGroups: [],
    };
  },

  [getSpecificUsersAllGroupsRequest.fulfilled]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: null,
      specificUsersAllGroups: sortUserGroupsList(action.payload.groups),
    };
  },

  [getSpecificUsersAllGroupsRequest.rejected]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: null,
    };
  },

  [getUsersInGroupRequest.pending]: (state, action) => {
    return {
      ...state,
      loading: true,
      error: null,
      usersInGroup: [],
    };
  },

  [getUsersInGroupRequest.fulfilled]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: null,
      usersInGroup: sortUsersByName(action.payload.users),
    };
  },

  [getUsersInGroupRequest.rejected]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: null,
    };
  },

  [createUserGroupRequest.pending]: (state, action) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  },

  [createUserGroupRequest.fulfilled]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: null,
    };
  },

  [createUserGroupRequest.rejected]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: null,
    };
  },

  [updateUserGroupRequest.pending]: (state, action) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  },

  [updateUserGroupRequest.fulfilled]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: null,
    };
  },

  [updateUserGroupRequest.rejected]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: null,
    };
  },

  [getUsersListRequest.pending]: (state, action) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  },

  [getUsersListRequest.fulfilled]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: null,
      usersList: sortUsersByName(action.payload.users),
    };
  },
  [getUsersListRequest.rejected]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: null,
    };
  },

  [getSingleMessageHistoryRequest.fulfilled]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: null,
      userChatMessagesList: sortChatMessagesbyDate(action.payload.data),
    };
  },

  [getUserGroupMessagesListRequest.fulfilled]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: null,
      userGroupMessagesList: sortChatMessagesbyDate(action.payload.data),
    };
  },

  [clearStore.fulfilled]: (state, action) => {
    return initialState;
  },
});
