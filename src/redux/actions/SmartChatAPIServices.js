import ChatAxiosEvent from '../../Api/ChatAxiosEvent';
import Applogger from './../../helpers/AppLogger';

function apiGetUserChatsListRequest(payload) {
  Applogger('Payload at apiGetUserChatsListRequest', payload);
  const {userId} = payload;
  const path = `messages/${userId}/lastChat`;
  Applogger('Path at apiGetUserChatsListRequest', path);
  return ChatAxiosEvent.get(path);
}

function apiGetSingleMessageHistoryRequest(payload) {
  Applogger('Payload at apiGetSingleMessageHistoryRequest', payload);
  const {senderId, receiverId} = payload;
  const path = `messages/${senderId}/${receiverId}/history`;
  Applogger('Path at apiGetSingleMessageHistoryRequest', path);
  return ChatAxiosEvent.get(path);
}

function apiDeleteUserGroupRequest(payload) {
  Applogger('Payload at apiDeleteUserGroupRequest', payload);
  const {userGroupId} = payload;
  const path = `groups/${userGroupId}`;
  Applogger('Path at apiDeleteUserGroupRequest', path);
  return ChatAxiosEvent.delete(path);
}

function apiExitFromGroupRequest(payload) {
  Applogger('Payload at apiExitFromGroupRequest', payload);
  const {userGroupId, userId} = payload;
  const path = `groups/${userGroupId}/exit/${userId}`;
  Applogger('Path at apiExitFromGroupRequest', path);
  return ChatAxiosEvent.delete(path);
}

function apiGetUsersAllGroupsRequest(payload) {
  Applogger('Payload at apiGetUsersAllGroupsRequest', payload);
  const {userId} = payload;
  const path = `groups/users/${userId}`;
  Applogger('Path at apiGetUsersAllGroupsRequest', path);
  return ChatAxiosEvent.get(path);
}

function apiGetUsersInGroupRequest(payload) {
  Applogger('Payload at apiGetUsersInGroupRequest', payload);
  const {groupId} = payload;
  const path = `groups/${groupId}`;
  Applogger('Path at apiGetUsersInGroupRequest', path);
  return ChatAxiosEvent.get(path);
}

function apiCreateUserGroupRequest(payload) {
  Applogger('Payload at apiCreateUserGroupRequest', payload);
  const {createGroupBody} = payload;
  const path = `groups`;
  Applogger('Path at apiCreateUserGroupRequest', path);
  return ChatAxiosEvent.post(path, createGroupBody);
}

function apiUpdateUserGroupRequest(payload) {
  Applogger('Payload at apiUpdateUserGroupRequest', payload);
  const {groupId, updateGroupBody} = payload;
  const path = `groups/${groupId}`;
  Applogger('Path at apiUpdateUserGroupRequest', path);
  return ChatAxiosEvent.put(path, updateGroupBody);
}

function apiGetUsersListRequest(payload) {
  Applogger('Payload at apiGetUsersListRequest', payload);
  const path = `users`;
  Applogger('Path at apiGetUsersListRequest', path);
  return ChatAxiosEvent.get(path);
}

function apiGetUserGroupMessagesListRequest(payload) {
  Applogger('Payload at apiGetUserGroupMessagesListRequest', payload);
  const {groupId} = payload;
  const path = `groups/${groupId}/history`;
  Applogger('Path at apiGetUserGroupMessagesListRequest', path);
  return ChatAxiosEvent.get(path);
}

function apiGroupChatMessagesRead(payload) {
  Applogger('Payload at apiGroupChatMessagesRead', payload);
  const {groupId, userId, userGroupMessageId} = payload;
  const path = `groups/${groupId}/users/${userId}/lastRead/${userGroupMessageId}/`;
  Applogger('Path at apiGroupChatMessagesRead', path);
  return ChatAxiosEvent.put(path);
}

function apiSingleChatMessageRead(payload) {
  Applogger('Payload at apiSingleChatMessageRead', payload);
  const {userMessageId, status} = payload;
  const path = `messages/${userMessageId}/status/${status}`;
  Applogger('Path at apiSingleChatMessageRead', path);
  return ChatAxiosEvent.put(path);
}

function apiSingleChatMessageReadAll(payload) {
  Applogger('Payload at apiSingleChatMessageReadAll', payload);
  const {senderId, receiverId} = payload;
  const path = `messages/${senderId}/${receiverId}/readAll`;
  Applogger('Path at apiSingleChatMessageReadAll', path);
  return ChatAxiosEvent.put(path);
}

export const SmartChatAPIServices = {
  apiGetUserChatsListRequest,
  apiCreateMessagesRequestBetween2Users,
  apiGetSingleMessageHistoryRequest,
  apiDeleteUserGroupRequest,
  apiExitFromGroupRequest,
  apiGetUsersAllGroupsRequest,
  apiGetUsersInGroupRequest,
  apiCreateUserGroupRequest,
  apiUpdateUserGroupRequest,
  apiGetUsersListRequest,
  apiGetUserGroupMessagesListRequest,
  apiSingleChatMessageRead,
  apiGroupChatMessagesRead,
  apiSingleChatMessageReadAll,
};
