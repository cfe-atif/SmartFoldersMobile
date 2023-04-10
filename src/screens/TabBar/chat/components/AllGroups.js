import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {get} from 'lodash';
import {useDispatch, useSelector} from 'react-redux';
import {unwrapResult} from '@reduxjs/toolkit';
import {
  mapAPICallError,
  isUnAuthenticatedUser,
} from '../../../../utils/HelperFunctions';
import {showFaliureToast} from '../../../../helpers/AppToasts';
import {getSpecificUsersAllGroupsRequest} from '../../../../redux/reducers/SmartChatReducer';
import AppColors from '../../../../helpers/AppColors';
import Applogger from './../../../../helpers/AppLogger';
import AppRoutes from './../../../../helpers/AppRoutes';
import SFNoRecord from '../../../../components/texts/SFNoRecord';
import Header from '../../../../components/headers/Header';
import GroupCell from './../../../../components/cells/GroupCell';
import SearchBar from '../../../../components/search/SearchBar';
import SFLoader from './../../../../components/loaders/SFLoader';

export default function AllGroups({navigation, route}) {
  const dispatch = useDispatch();

  const {user} = useSelector(state => state.AuthenticationReducer);
  const {specificUsersAllGroups, loading} = useSelector(
    state => state.SmartChatReducer,
  );

  const [searchedArray, setSearchedArray] = useState([]);
  const [searchedText, setSearchedText] = useState('');

  useEffect(() => {
    handleGetSpecificUsersAllGroupsRequest(getSelectedUserId());
  }, []);

  const getSelectedUserId = () => {
    var selectedUserId = '';

    if (get(route, 'params.userChat', null)) {
      if (get(route, 'params.userChat.userId', '')) {
        selectedUserId = get(route, 'params.userChat.userId', '');
      } else {
        selectedUserId = get(route, 'params.userChat.No', '');
      }
    } else {
      selectedUserId = user.No;
    }

    return selectedUserId;
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

  const handleGetSpecificUsersAllGroupsRequest = userId => {
    if (userId) {
      dispatch(getSpecificUsersAllGroupsRequest({userId}))
        .then(unwrapResult)
        .then(res => {
          handleSuccessToastAndLogs('getSpecificUsersAllGroupsRequest', res);
        })
        .catch(err => {
          handleFaliureToastAndLogs('getSpecificUsersAllGroupsRequest', err);
        });
    }
  };

  const handleSearch = search => {
    setSearchedText(search);
    if (search) {
      const filteredArray = specificUsersAllGroups.filter(item => {
        const groupName = get(item, 'name', '');
        return groupName.toLowerCase().includes(search.toLowerCase());
      });
      const sortedArray = filteredArray.sort((a, b) => {
        const groupNameA = get(a, 'name', '');
        const groupNameB = get(b, 'name', '');
        return groupNameA.toLowerCase() > groupNameB.toLowerCase() ? 1 : -1;
      });
      setSearchedArray(sortedArray);
    } else {
      setSearchedArray([]);
    }
  };

  const renderGroupItem = ({item, index}) => {
    const {name, groupMessageHistory, unreadMessageCount} = item;
    return (
      <GroupCell
        key={index}
        title={name}
        lastMessage={get(groupMessageHistory, 'messageBody', '')}
        timestamp={get(groupMessageHistory, 'createdAt', '')}
        sender={get(groupMessageHistory, 'sender.userName', '')}
        senderId={get(groupMessageHistory, 'sender.No', '')}
        unreadMessageCount={unreadMessageCount}
        onPress={() => navigation.navigate(AppRoutes.Messages)}
      />
    );
  };

  return (
    <View style={styles.container}>
      {loading && <SFLoader />}
      <Header
        title={'Groups'}
        backButton={true}
        onBackPress={() => navigation.goBack()}
      />
      <SearchBar
        value={searchedText}
        placeholder="Search group by name..."
        onChange={text => handleSearch(text)}
        onClosePress={() => setSearchedText('')}
        onSearchPress={() => Applogger('Pressed search')}
      />
      {searchedText && !searchedArray.length > 0 ? (
        <SFNoRecord title="No Group Found" textStyle={styles.noSearchText} />
      ) : (
        <FlatList
          data={
            searchedArray.length > 0 ? searchedArray : specificUsersAllGroups
          }
          renderItem={renderGroupItem}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  noSearchText: {
    color: AppColors.gray,
  },
});
