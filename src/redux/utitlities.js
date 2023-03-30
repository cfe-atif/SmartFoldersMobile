import {get} from 'lodash';

export function sortUserAllChats(usersList) {
  return usersList.sort((a, b) => {
    const lastSeenA = get(a, 'createdAt', '');
    const lastSeenB = get(b, 'createdAt', '');
    return lastSeenA < lastSeenB ? 1 : -1;
  });
}

export function sortUserGroupsList(userGroupsList) {
  return userGroupsList.sort((a, b) => {
    const lastSeenA = get(a, 'groupMessageHistory.createdAt', '')
      ? get(a, 'groupMessageHistory.createdAt', '')
      : get(a, 'createdAt', '');
    const lastSeenB = get(b, 'groupMessageHistory.createdAt', '')
      ? get(b, 'groupMessageHistory.createdAt', '')
      : get(b, 'createdAt', '');
    return lastSeenA < lastSeenB ? 1 : -1;
  });
}

export function sortUsersByName(userGroupsList) {
  return userGroupsList.sort((a, b) => {
    const userA = get(a, 'Full_Name', '');
    const userB = get(b, 'Full_Name', '');
    return userA.toLowerCase() > userB.toLowerCase() ? 1 : -1;
  });
}

export function sortChatMessagesbyDate(chatMessages) {
  return chatMessages.sort((a, b) => {
    const createdAtA = get(a, 'createdAt', '');
    const createdAtB = get(b, 'createdAt', '');
    return createdAtA > createdAtB ? 1 : -1;
  });
}
