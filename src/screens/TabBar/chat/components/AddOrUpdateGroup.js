import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {unwrapResult} from '@reduxjs/toolkit';
import {get} from 'lodash';
import {
  showFaliureToast,
  showSuccessToast,
} from '../../../../helpers/AppToasts';
import {
  isUnAuthenticatedUser,
  mapAPICallError,
} from '../../../../utils/HelperFunctions';
import {
  createUserGroupRequest,
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

export default function AddOrUpdateGroup({navigation}) {
  const dispatch = useDispatch();

  const {user} = useSelector(state => state.AuthenticationReducer);
  const {loading, usersList} = useSelector(state => state.SmartChatReducer);

  const [title, setTitle] = useState('');
  const [dropDownItems, setDropDownItems] = useState([]);
  const [selectedUsersList, setSelectedUsersList] = useState([]);

  useEffect(() => {
    if (!usersList.length > 0) {
      handlGetUsersListRequest();
    } else {
      createDrpDownArray();
    }
  }, [usersList]);

  const createDrpDownArray = () => {
    const convertedArray = usersList.map(
      ({No: key, userName: value, ...rest}) => ({
        key,
        value,
        ...rest,
      }),
    );
    const filteredOptions = convertedArray.filter(o => {
      return o?.key != get(user, 'No', '');
    });
    setDropDownItems(filteredOptions);
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

  const handleSave = () => {
    handleCreateGroupRequest();
  };

  const handleCreateGroupRequest = () => {
    if (!title) {
      showFaliureToast('Warning', 'Please enter group name');
    } else if (!selectedUsersList.length > 0) {
      showFaliureToast('Warning', 'Please select users for group');
    } else {
      let groupUsers = selectedUsersList;
      if (!selectedUsersList.includes(get(user, 'No', ''))) {
        selectedUsersList.push(get(user, 'No', ''));
      }
      const createGroupBody = {
        name: title,
        userIds: groupUsers,
      };

      dispatch(createUserGroupRequest({createGroupBody}))
        .then(unwrapResult)
        .then(res => {
          showSuccessToast(AppConstants.toastMessages.groupCreated);
          handleSuccessToastAndLogs('createUserGroupRequest', res);
          navigation.goBack();
        })
        .catch(err => {
          showFaliureToast(mapAPICallError(err.message));
          handleFaliureToastAndLogs('createUserGroupRequest', err);
        });
    }
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

  return (
    <View style={styles.container}>
      {loading && <SFLoader />}
      <Header
        title={'Create Group'}
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
  },
});
