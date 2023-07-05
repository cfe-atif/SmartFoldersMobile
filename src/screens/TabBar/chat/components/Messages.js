import React, {useEffect, useState, useRef, useMemo} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {unwrapResult} from '@reduxjs/toolkit';
import {get} from 'lodash';
import {
  mapAPICallError,
  isUnAuthenticatedUser,
} from '../../../../utils/HelperFunctions';
import {
  getUserGroupMessagesListRequest,
  getSingleMessageHistoryRequest,
  singleChatMessageReadAll,
  groupChatMessagesRead,
  deleteUserGroupRequest,
  exitFromGroupRequest,
} from '../../../../redux/reducers/SmartChatReducer';
import {sortChatMessagesbyDate} from '../../../../redux/utitlities';
import {showSuccessToast} from './../../../../helpers/AppToasts';
import RBSheet from 'react-native-raw-bottom-sheet';
import Icon from 'react-native-vector-icons/Feather';
import AppColors from '../../../../helpers/AppColors';
import Applogger from '../../../../helpers/AppLogger';
import AppIcons from './../../../../helpers/AppIcons';
import AppFontSize from './../../../../helpers/AppFontSize';
import AppFontFamily from '../../../../helpers/AppFontFamily';
import Header from '../../../../components/headers/Header';
import SimpleButton from '../../../../components/buttons/SimpleButton';
import SFNoRecord from './../../../../components/texts/SFNoRecord';
import OutGoingMessageCell from '../../../../components/cells/OutGoingMessageCell';
import IncomingMessageCell from './../../../../components/cells/IncomingMessageCell';
import AppRoutes from './../../../../helpers/AppRoutes';

let topicId = 'stompClientTopicId';
let messageSendPath = '/app/private/message';

export default function Messages({navigation, route}) {
  const messagesRef = useRef();
  const sheetRef = useRef(null);

  const dispatch = useDispatch();

  const {user} = useSelector(state => state.AuthenticationReducer);

  const {userGroupMessagesList, userChatMessagesList} = useSelector(
    state => state.SmartChatReducer,
  );

  const currentUserId = user?.No;

  const [stompClient, setStompClient] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [textMessage, setTextMessage] = useState('');
  const [localMessages, setLocalMessages] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [offset, setOffset] = useState(1);
  const keyExtractor = item => item.id;
  const windowSize = localMessages.length > 50 ? localMessages.length / 4 : 21;
  let num = 50; // This is the number which defines how many data will be loaded for every 'onReachEnd'
  let initialLoadNumber = 40;

  useEffect(() => {
    setSelectedUser(get(route, 'params.userChat', null));
    setSelectedGroup(get(route, 'params.group', null));
    setStompClient(get(route, 'params.stompClient', null));
    return () => {
      setLocalMessages([]);
    };
  }, []);

  useEffect(() => {
    if (stompClient) {
      onConnected();
    }
  }, [stompClient]);

  useEffect(() => {
    if (selectedGroup) {
      handleGetUserGroupMessagesListRequest();
    } else {
      handleGetSingleMessageHistoryRequest(getSelectedUserId());
    }
  }, [selectedGroup, selectedUser]);

  useEffect(() => {
    setLocalMessages(userChatMessagesList);
  }, [userChatMessagesList]);

  useEffect(() => {
    setLocalMessages(userGroupMessagesList);
  }, [userGroupMessagesList]);

  useEffect(() => {
    scrollToBottom();
    if (dataSource.length < localMessages.length) {
      if (offset == 1) {
        setDataSource(localMessages.slice(0, offset * initialLoadNumber));
      }
    }
  }, [localMessages]);

  const onConnected = () => {
    Applogger('React Stomp Client Is Connected');
    stompClient.subscribe(
      `/user/${currentUserId}/private`,
      msg => {
        onMessageReceived(msg);
      },
      {id: topicId},
    );
  };

  const onMessageReceived = msg => {
    const notification = JSON.parse(msg.body);
    if (get(notification, 'groupId', null)) {
      handleGroupChatMessageReceive(notification);
    } else {
      handleSingleChatMessageReceive(notification);
    }
    if (selectedUser || selectedGroup) {
      setTimeout(() => {
        scrollToBottom();
      }, 250);
    }
    setTextMessage('');
  };

  const addChatMessage = (message, messagesList, selectedId) => {
    if (get(message, 'senderId') == get(messagesList, '[0].sender.No', null)) {
      setLocalMessages(localMessages => [...localMessages, message]);
    } else {
      if (messagesList.length == 0 && selectedId) {
        setLocalMessages(localMessages => [...localMessages, message]);
      }
    }
    setTextMessage('');
    handleGetSingleMessageHistoryRequest(getSelectedUserId());
  };

  const handleSingleChatMessageReceive = notification => {
    addChatMessage(notification, userChatMessagesList, selectedUser);
  };

  const handleGroupChatMessageReceive = notification => {
    if (notification.groupId == selectedGroup.id) {
      setLocalMessages(localMessages => [...localMessages, notification]);
    }
    handleGetUserGroupMessagesListRequest(selectedGroup);
    handleGroupChatMessagesRead(
      get(notification, 'userGroupMessageId', ''),
      get(selectedGroup, 'id', ''),
    );
  };

  const handleMessageSend = () => {
    if (selectedGroup) {
      handleCreateMessagesRequestBetweenGroupUsers();
    } else {
      handleCreateMessagesRequestBetween2Users();
    }
  };

  const handleCreateMessagesRequestBetween2Users = () => {
    Applogger('Called Message Send - Single Chat');
    if (textMessage && stompClient) {
      const messageBody = {
        senderId: currentUserId,
        receiverId: getSelectedUserId(),
        messageContent: textMessage,
        messageType: 'CHAT',
        // groupId: 0, // Single User Chat
        userMessageId: 0,
        userGroupMessageId: 0,
      };

      stompClient.send(messageSendPath, {}, JSON.stringify(messageBody));
      handleGetSingleMessageHistoryRequest(getSelectedUserId());
      setLocalMessages(localMessages => [...localMessages, messageBody]);
      setTextMessage('');
    }
  };

  const handleCreateMessagesRequestBetweenGroupUsers = () => {
    Applogger('Called Message Send - Group Chat');
    if (textMessage && stompClient) {
      const messageBody = {
        senderId: currentUserId,
        // receiverId: null, // Null User For Group Chat
        messageContent: textMessage,
        messageType: 'CHAT',
        groupId: selectedGroup.id,
        userMessageId: 0,
        userGroupMessageId: 0,
      };

      stompClient.send(messageSendPath, {}, JSON.stringify(messageBody));
      setLocalMessages(localMessages => [...localMessages, messageBody]);
      setTextMessage('');
    }
  };

  const getUserName = user => {
    let finalUserName = '';
    if (user?.userName) {
      finalUserName = user?.userName;
    }
    if (user?.username) {
      finalUserName = user?.username;
    }
    if (user?.Full_Name) {
      finalUserName = user?.Full_Name;
    }

    return finalUserName;
  };

  const getSelectedUserId = () => {
    var selectedUserId = '';

    if (selectedUser) {
      if (get(route, 'params.userChat.userId', '')) {
        selectedUserId = get(route, 'params.userChat.userId', '');
      } else {
        selectedUserId = get(route, 'params.userChat.No', '');
      }
    }

    return selectedUserId;
  };

  const handleSuccessToastAndLogs = (message, res) => {
    Applogger('Response at ' + message, res);
    if (isUnAuthenticatedUser(res)) {
      navigation.navigate(AppRoutes.Login);
      showFaliureToast('Error', mapAPICallError(res));
    }
  };

  const handleFaliureToastAndLogs = (message, err) => {
    Applogger('Error at ' + message, err);
    if (isUnAuthenticatedUser(err)) {
      navigation.navigate(AppRoutes.Login);
      showFaliureToast(mapAPICallError(err));
    }
  };

  const scrollToBottom = () => {
    // setTimeout(() => {
    //   if (
    //     messagesRef.current &&
    //     (selectedUser || selectedGroup) &&
    //     localMessages.length > 0
    //   ) {
    //     messagesRef.current.scrollToEnd({animated: false});
    //   }
    // }, 100);
  };

  const handleGetSingleMessageHistoryRequest = receiverId => {
    if (getSelectedUserId()) {
      dispatch(
        getSingleMessageHistoryRequest({
          senderId: receiverId,
          receiverId: currentUserId,
        }),
      )
        .then(unwrapResult)
        .then(res => {
          handleSingleChatMessageReadAll(receiverId);
          handleSuccessToastAndLogs('getSingleMessageHistoryRequest', res);
        })
        .catch(err => {
          handleFaliureToastAndLogs('getSingleMessageHistoryRequest', err);
        });
    }
  };

  const handleSingleChatMessageReadAll = senderId => {
    dispatch(singleChatMessageReadAll({senderId, receiverId: currentUserId}))
      .then(unwrapResult)
      .then(res => {
        handleSuccessToastAndLogs('singleChatMessageReadAll', res);
      })
      .catch(err => {
        handleFaliureToastAndLogs('singleChatMessageReadAll', err);
      });
  };

  const handleGetUserGroupMessagesListRequest = () => {
    dispatch(
      getUserGroupMessagesListRequest({
        groupId: get(route, 'params.group.id', ''),
      }),
    )
      .then(unwrapResult)
      .then(res => {
        const messagesList = get(res, 'data', []);
        if (messagesList.length > 0) {
          const sortedMessages = sortChatMessagesbyDate([...messagesList]);
          const lastChatObj = sortedMessages[sortedMessages.length - 1];
          const userGroupMessageId = get(lastChatObj, 'id', '');
          handleGroupChatMessagesRead(
            userGroupMessageId,
            get(route, 'params.group.id', ''),
          );
        }
        handleSuccessToastAndLogs('getUserGroupMessagesListRequest', res);
        scrollToBottom();
      })
      .catch(err => {
        handleFaliureToastAndLogs('getUserGroupMessagesListRequest', err);
      });
  };

  const handleGroupChatMessagesRead = (userGroupMessageId, groupId) => {
    dispatch(
      groupChatMessagesRead({
        groupId: groupId,
        userId: currentUserId,
        userGroupMessageId,
      }),
    )
      .then(unwrapResult)
      .then(res => {
        handleSuccessToastAndLogs('groupChatMessagesRead', res);
      })
      .catch(err => {
        handleFaliureToastAndLogs('groupChatMessagesRead', err);
      });
  };

  const handleAddUsers = () => {
    navigation.navigate(AppRoutes.AddUserToGroup, {
      selectedGroup: selectedGroup,
    });
  };

  const handleDeleteGroup = () => {
    sheetRef.current.close();
    dispatch(
      deleteUserGroupRequest({userGroupId: get(selectedGroup, 'id', '')}),
    )
      .then(unwrapResult)
      .then(res => {
        handleSuccessToastAndLogs('deleteUserGroupRequest', res);
        showSuccessToast('Success', 'Group Deleted Successfully');
        navigation.goBack();
      })
      .catch(err => {
        showFaliureToast(mapAPICallError(err.message));
        handleFaliureToastAndLogs('deleteUserGroupRequest', err);
      });
  };

  const handleEditGroup = () => {
    sheetRef.current.close();
    dispatch(
      exitFromGroupRequest({
        userGroupId: get(selectedGroup, 'id', ''),
        userId: currentUserId,
      }),
    )
      .then(unwrapResult)
      .then(res => {
        showSuccessToast('Success', 'Group Exited Successfully');
        handleSuccessToastAndLogs('exitFromGroupRequest', res);
        navigation.goBack();
      })
      .catch(err => {
        showFaliureToast(mapAPICallError(err.message));
        handleFaliureToastAndLogs('exitFromGroupRequest', err);
      });
  };

  const RenderMessageCell = useMemo(
    () =>
      ({item, index}) => {
        const {createdAt, messageBody, sender} = get(item, 'item', {});
        if (selectedUser) {
          if (get(sender, 'No', '') == 10) {
            return (
              <OutGoingMessageCell
                key={index}
                message={messageBody}
                timeStamp={createdAt}
                senderName={''}
              />
            );
          } else {
            return (
              <IncomingMessageCell
                key={index}
                message={messageBody}
                timeStamp={createdAt}
                senderName={''}
              />
            );
          }
        } else {
          if (get(sender, 'No', '') == 10) {
            return (
              <OutGoingMessageCell
                key={index}
                message={messageBody}
                timeStamp={createdAt}
                senderName={''}
              />
            );
          } else {
            return (
              <IncomingMessageCell
                key={index}
                message={messageBody}
                timeStamp={createdAt}
                senderName={get(sender, 'userName', '')}
              />
            );
          }
        }
      },
    [localMessages],
  );

  const getData = () => {
    if (dataSource.length < localMessages.length && localMessages.length != 0) {
      setOffset(offset + 1);
      setDataSource(localMessages.slice(0, offset * num));
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title={
          selectedUser
            ? get(selectedUser, 'userName', '')
            : get(selectedGroup, 'name', '')
        }
        backButton={true}
        onBackPress={() => navigation.goBack()}
        rightIcon={AppIcons.menuIcon}
        rightButton={selectedGroup}
        onRightButtonPress={() => sheetRef.current.open()}
      />
      <View style={styles.listContainer}>
        {localMessages.length > 0 ? (
          <FlatList
            ref={messagesRef}
            // data={localMessages}
            data={dataSource}
            inverted={true}
            initialNumToRender={initialLoadNumber}
            windowSize={windowSize}
            maxToRenderPerBatch={num}
            updateCellsBatchingPeriod={num / 2}
            keyExtractor={keyExtractor}
            onEndReachedThreshold={
              offset < 10 ? offset * (offset == 1 ? 2 : 2) : 20
            }
            onEndReached={getData}
            removeClippedSubviews={true}
            renderItem={(item, index) => (
              <RenderMessageCell item={item} index={index} />
            )}
          />
        ) : (
          <SFNoRecord title="Start Chat Now" textStyle={styles.noRecord} />
        )}
      </View>
      <View style={styles.fieldContainer}>
        <TextInput
          value={textMessage}
          onChangeText={text => setTextMessage(text)}
          style={styles.messageField}
          placeholder="Type message here..."
          placeholderTextColor={AppColors.gray}
        />
        <TouchableOpacity
          onPress={() => {
            handleMessageSend();
          }}>
          <Icon
            name={AppIcons.chatIcon}
            size={40}
            color={AppColors.customBlue}
          />
        </TouchableOpacity>
      </View>
      <RBSheet
        ref={sheetRef}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={175}
        openDuration={250}
        customStyles={{
          container: {
            backgroundColor: AppColors.customBlue,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
          },
        }}>
        <View>
          <SimpleButton
            title="Add Users"
            addStyles={{textAlign: 'center', color: AppColors.white}}
            onPress={() => handleAddUsers()}
          />
          <SimpleButton
            title="Delete Group"
            addStyles={{textAlign: 'center', color: AppColors.white}}
            onPress={() => handleDeleteGroup()}
          />
          <SimpleButton
            title="Exit Group"
            addStyles={{textAlign: 'center', color: AppColors.white}}
            onPress={() => handleEditGroup()}
          />
        </View>
      </RBSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.offWhite,
  },
  listContainer: {
    flex: 1,
  },
  fieldContainer: {
    backgroundColor: AppColors.white,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  messageField: {
    flex: 1,
    height: 50,
    borderWidth: 2,
    borderRadius: 10,
    marginRight: 10,
    paddingHorizontal: 10,
    fontSize: AppFontSize.size16,
    color: AppColors.black,
    borderColor: AppColors.gray,
    fontFamily: AppFontFamily.regular,
  },
  noRecord: {
    color: AppColors.gray,
  },
});
