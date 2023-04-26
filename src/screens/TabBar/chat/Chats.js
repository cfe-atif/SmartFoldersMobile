import React, {useState, useEffect, useRef} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {unwrapResult} from '@reduxjs/toolkit';
import {get} from 'lodash';
import {over} from 'stompjs';
import {showFaliureToast} from '../../../helpers/AppToasts';
import {
  mapAPICallError,
  isUnAuthenticatedUser,
} from '../../../utils/HelperFunctions';
import {
  getUserChatsListRequest,
  getUsersAllGroupsRequest,
} from '../../../redux/reducers/SmartChatReducer';
import SockJS from 'sockjs-client';
import RBSheet from 'react-native-raw-bottom-sheet';
import APIConstants from '../../../helpers/APIConstants';
import AppColors from './../../../helpers/AppColors';
import AppRoutes from './../../../helpers/AppRoutes';
import Applogger from '../../../helpers/AppLogger';
import AppIcons from './../../../helpers/AppIcons';
import ChatCell from '../../../components/cells/ChatCell';
import Header from '../../../components/headers/Header';
import SearchBar from '../../../components/search/SearchBar';
import ChatsButton from './../../../components/buttons/ChatsButton';
import SimpleButton from './../../../components/buttons/SimpleButton';
import GroupCell from './../../../components/cells/GroupCell';
import SFNoRecord from './../../../components/texts/SFNoRecord';
import SFLoader from './../../../components/loaders/SFLoader';

let topicId = 'stompClientTopicId';
let stompClient = null;
let messageSendPath = '/app/private/message';

export default function Chats({navigation}) {
  const sheetRef = useRef(null);
  const chatsRef = useRef();

  const dispatch = useDispatch();

  const isFocused = useIsFocused();

  const {usersAllGroups, userAllChats, loading} = useSelector(
    state => state.SmartChatReducer,
  );

  const {user} = useSelector(state => state.AuthenticationReducer);

  const currentUserId = user?.No;

  const [searchedGroupArray, setSearchedGroupArray] = useState([]);
  const [searchedArray, setSearchedArray] = useState([]);
  const [searchedText, setSearchedText] = useState('');
  const [isChatListing, setIsChatListing] = useState(true);

  useEffect(() => {
    if (isFocused) {
      handleGetUserChatsListRequest();
      handleGetUsersAllGroupsRequest(currentUserId);
    }
  }, [isFocused]);

  useEffect(() => {
    if (!user) {
      if (stompClient != null) {
        stompClient.disconnect(onDisconnect);
      }
    }
  }, [user]);

  useEffect(() => {
    if (stompClient == null) {
      connect();
    }

    return () => {
      if (stompClient != null && user == null) {
        stompClient.disconnect(onDisconnect);
        stompClient = null;
      }
    };
  }, []);

  const connect = () => {
    let Sock = new SockJS(APIConstants.wsChatBaseUrl);
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

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

  const onError = err => {
    Applogger('Error at React Stomp Client', err);
    stompClient = null;
    connect();
  };

  const onDisconnect = event => {
    Applogger('Disconnect Event: ', event);
    stompClient = null;
  };

  const onMessageReceived = msg => {
    const notification = JSON.parse(msg.body);
    if (get(notification, 'groupId', null)) {
      handleGetUsersAllGroupsRequest(currentUserId);
    } else {
      handleGetUserChatsListRequest();
    }
  };

  const handleGetUserChatsListRequest = () => {
    dispatch(getUserChatsListRequest({userId: currentUserId}))
      .then(unwrapResult)
      .then(res => {
        handleSuccessToastAndLogs('getUserChatsListRequest', res);
      })
      .catch(err => {
        handleFaliureToastAndLogs('getUserChatsListRequest', err);
      });
  };

  const handleGetUsersAllGroupsRequest = userId => {
    dispatch(getUsersAllGroupsRequest({userId}))
      .then(unwrapResult)
      .then(res => {
        handleSuccessToastAndLogs('getUsersAllGroupsRequest', res);
      })
      .catch(err => {
        handleFaliureToastAndLogs('getUsersAllGroupsRequest', err);
      });
  };

  const handleSuccessToastAndLogs = (message, res) => {
    Applogger('Response at ' + message, res);
    if (isUnAuthenticatedUser(res)) {
      navigation.navigate(AppRoutes.Login);
      showFaliureToast(mapAPICallError(res));
    }
  };

  const handleFaliureToastAndLogs = (message, err) => {
    Applogger('Error at ' + message, err);
    if (isUnAuthenticatedUser(err)) {
      navigation.navigate(AppRoutes.Login);
      showFaliureToast(mapAPICallError(err));
    }
  };

  const handleViewAllUsers = () => {
    sheetRef.current.close();
    navigation.navigate(AppRoutes.AllUsers);
  };

  const handleViewAllgroups = () => {
    sheetRef.current.close();
    navigation.navigate(AppRoutes.AllGroups, {
      userId: currentUserId,
    });
  };

  const handleAddGroups = () => {
    sheetRef.current.close();
    navigation.navigate(AppRoutes.AddOrUpdateGroup);
  };

  const handleSearch = search => {
    setSearchedText(search);
    if (!isChatListing) {
      if (search) {
        const filteredArray = usersAllGroups.filter(item => {
          const groupName = get(item, 'name', '');
          return groupName.toLowerCase().includes(search.toLowerCase());
        });
        const sortedArray = filteredArray.sort((a, b) => {
          const groupNameA = get(a, 'name', '');
          const groupNameB = get(b, 'name', '');
          return groupNameA.toLowerCase() > groupNameB.toLowerCase() ? 1 : -1;
        });
        setSearchedGroupArray(sortedArray);
      } else {
        setSearchedGroupArray([]);
      }
    } else {
      if (search) {
        const filteredArray = userAllChats.filter(item => {
          const {userName} = item;
          return userName.toLowerCase().includes(search.toLowerCase());
        });
        const sortedArray = filteredArray.sort((a, b) => {
          return a?.userName.toLowerCase() > b?.userName.toLowerCase() ? 1 : -1;
        });
        setSearchedArray(sortedArray);
      } else {
        setSearchedArray([]);
      }
    }
  };

  const renderGroupChatsItem = ({item, index}) => {
    const {name, groupMessageHistory, unreadMessageCount, createdAt} = item;
    return (
      <GroupCell
        key={index}
        title={name}
        lastMessage={get(groupMessageHistory, 'messageBody', '')}
        timestamp={
          groupMessageHistory
            ? get(groupMessageHistory, 'createdAt', '')
            : createdAt
        }
        sender={
          groupMessageHistory
            ? get(groupMessageHistory, 'sender.userName', '')
            : 'No Recent Message'
        }
        senderId={get(groupMessageHistory, 'sender.No', '')}
        unreadMessageCount={unreadMessageCount}
        onPress={() =>
          navigation.navigate(AppRoutes.Messages, {
            group: item,
            stompClient: stompClient,
          })
        }
      />
    );
  };

  const renderChatsItem = ({item, index}) => {
    const {userId, userName, messageBody, createdAt, unreadMessageCount} = item;
    if (userId != currentUserId) {
      return (
        <ChatCell
          key={index}
          title={userName}
          message={messageBody}
          timeStamp={createdAt}
          unreadMessage={unreadMessageCount}
          onPress={() =>
            navigation.navigate(AppRoutes.Messages, {
              userChat: item,
              stompClient: stompClient,
            })
          }
        />
      );
    } else {
      return null;
    }
  };

  return (
    <View style={styles.container}>
      {loading && (userAllChats.length == 0 || usersAllGroups.length == 0) && (
        <SFLoader />
      )}
      <Header
        title={'Chats'}
        rightIcon={AppIcons.menuIcon}
        rightButton={true}
        onRightButtonPress={() => sheetRef.current.open()}
      />
      <SearchBar
        value={searchedText}
        placeholder="Type here to search..."
        onChange={text => handleSearch(text)}
        onClosePress={() => setSearchedText('')}
        onSearchPress={() => Applogger('Pressed search')}
      />
      <View style={styles.buttonContainer}>
        <ChatsButton
          onPress={() => setIsChatListing(true)}
          title="Chats"
          selected={isChatListing}
        />
        <ChatsButton
          onPress={() => setIsChatListing(false)}
          title="Groups"
          selected={!isChatListing}
        />
      </View>
      <View style={styles.listContainer}>
        {isChatListing ? (
          searchedText && !searchedArray.length > 0 ? (
            <SFNoRecord title="No Chat Found" textStyle={styles.noSearchText} />
          ) : (
            <FlatList
              ref={chatsRef}
              data={searchedText ? searchedArray : userAllChats}
              renderItem={renderChatsItem}
              showsVerticalScrollIndicator={false}
            />
          )
        ) : searchedText && !searchedGroupArray.length > 0 ? (
          <SFNoRecord title="No Group Found" textStyle={styles.noSearchText} />
        ) : (
          <FlatList
            ref={chatsRef}
            data={searchedText ? searchedGroupArray : usersAllGroups}
            renderItem={renderGroupChatsItem}
            showsVerticalScrollIndicator={false}
          />
        )}
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
            title="View All User"
            addStyles={{textAlign: 'center', color: AppColors.white}}
            onPress={() => handleViewAllUsers()}
          />
          <SimpleButton
            title="View All groups"
            addStyles={{textAlign: 'center', color: AppColors.white}}
            onPress={() => handleViewAllgroups()}
          />
          <SimpleButton
            title="Create Group"
            addStyles={{textAlign: 'center', color: AppColors.white}}
            onPress={() => handleAddGroups()}
          />
        </View>
      </RBSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  listContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: AppColors.lightGray,
  },
  noSearchText: {
    color: AppColors.gray,
  },
});
