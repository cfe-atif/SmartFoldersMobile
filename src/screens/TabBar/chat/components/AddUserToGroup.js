import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {unwrapResult} from '@reduxjs/toolkit';
import {_, get} from 'lodash';
import {
  showFaliureToast,
  showSuccessToast,
} from '../../../../helpers/AppToasts';
import {
  isUnAuthenticatedUser,
  mapAPICallError,
} from '../../../../utils/HelperFunctions';
import {
  updateUserGroupRequest,
  getUsersListRequest,
} from '../../../../redux/reducers/SmartChatReducer';
import AppConstants from '../../../../helpers/AppConstants';
import AppColors from '../../../../helpers/AppColors';
import Applogger from '../../../../helpers/AppLogger';
import Header from '../../../../components/headers/Header';
import PrimaryButton from '../../../../components/buttons/PrimaryButton';
import PrimaryTextField from '../../../../components/textFields/PrimaryTextField';
import ChatGroupDropDown from '../../../../components/dropdowns/ChatGroupDropDown';
import SFLoader from './../../../../components/loaders/SFLoader';
import AppRoutes from './../../../../helpers/AppRoutes';

export default function AddUserToGroup({navigation, route}) {
  const dispatch = useDispatch();

  const {user} = useSelector(state => state.AuthenticationReducer);
  const {loading, usersList} = useSelector(state => state.SmartChatReducer);

  const [title, setTitle] = useState(
    get(route, 'params.selectedGroup.name', ''),
  );
  const [dropDownItems, setDropDownItems] = useState([]);
  const [selectedUsersList, setSelectedUsersList] = useState([]);

  const selectedGroup = get(route, 'params.selectedGroup', null);
  const selectedGroupUsersList = get(route, 'params.selectedGroup.users', null);

  useEffect(() => {
    if (!usersList.length > 0) {
      handlGetUsersListRequest();
    } else {
      createDrpDownArray();
    }
  }, [usersList]);

  const createDrpDownArray = () => {
    let filteredOptions = usersList.filter(o => {
      return o?.No != get(user, 'No', '');
    });

    filteredOptions = _.differenceWith(
      filteredOptions,
      selectedGroupUsersList,
      _.isEqual,
    );

    const convertedArray = filteredOptions.map(
      ({No: key, userName: value, ...rest}) => ({
        key,
        value,
        ...rest,
      }),
    );

    setDropDownItems(convertedArray);
  };

  const handlGetUsersListRequest = () => {
    dispatch(getUsersListRequest())
      .then(unwrapResult)
      .then(res => {
        handleSuccessToastAndLogs('getUsersListRequest', res);
      })
      .catch(err => {
        handleFaliureToastAndLogs('getUsersListRequest', err);
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

  const handleSave = () => {
    handleUpdateGroupRequest();
  };

  const handleUpdateGroupRequest = () => {
    if (!title) {
      showFaliureToast('Warning', 'Please enter group name');
    } else if (!selectedUsersList.length > 0) {
      showFaliureToast('Warning', 'Please select users for group');
    } else {
      const updateGroupBody = {
        name: title,
        groupId: get(selectedGroup, 'id', ''),
        userIds: selectedUsersList,
      };

      dispatch(
        updateUserGroupRequest({
          groupId: get(selectedGroup, 'id', ''),
          updateGroupBody,
        }),
      )
        .then(unwrapResult)
        .then(res => {
          showSuccessToast(AppConstants.toastMessages.groupUpdated);
          handleSuccessToastAndLogs('updateUserGroupRequest', res);
          navigation.navigate(AppRoutes.BottomNavigation, {
            screen: AppRoutes.Chats,
          });
        })
        .catch(err => {
          showFaliureToast(mapAPICallError(err.message));
          handleFaliureToastAndLogs('updateUserGroupRequest', err);
        });
    }
  };

  return (
    <View style={styles.container}>
      {loading && <SFLoader />}
      <Header
        title={get(selectedGroup, 'name', '')}
        backButton={true}
        onBackPress={() => navigation.goBack()}
      />
      <View style={styles.intContainer}>
        <PrimaryTextField
          value={title}
          onChange={text => setTitle(text)}
          placeholder="Group Name"
        />
        <ChatGroupDropDown
          options={dropDownItems}
          title={
            selectedUsersList.length > 0
              ? 'Selected Users'
              : 'Search or select users'
          }
          setSelected={val => setSelectedUsersList(val)}
        />
      </View>
      <PrimaryButton title="Save" onPress={() => handleSave()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.offWhite,
  },
  intContainer: {
    flex: 1,
    paddingVertical: 10,
  },
});
