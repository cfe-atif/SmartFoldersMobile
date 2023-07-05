import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {unwrapResult} from '@reduxjs/toolkit';
import {showFaliureToast} from '../../../../helpers/AppToasts';
import {
  mapAPICallError,
  isUnAuthenticatedUser,
} from '../../../../utils/HelperFunctions';
import {getUsersListRequest} from '../../../../redux/reducers/SmartChatReducer';
import AppColors from '../../../../helpers/AppColors';
import AppRoutes from '../../../../helpers/AppRoutes';
import Applogger from './../../../../helpers/AppLogger';
import Header from '../../../../components/headers/Header';
import UserCell from '../../../../components/cells/UserCell';
import SearchBar from '../../../../components/search/SearchBar';
import SFNoRecord from '../../../../components/texts/SFNoRecord';
import SFLoader from './../../../../components/loaders/SFLoader';

export default function AllUsers({navigation}) {
  const dispatch = useDispatch();

  const {usersList, loading} = useSelector(state => state.SmartChatReducer);

  const [searchedArray, setSearchedArray] = useState([]);
  const [searchedText, setSearchedText] = useState('');

  useEffect(() => {
    handlGetUsersListRequest();
  }, []);

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

  const handleSearch = search => {
    setSearchedText(search);
    if (search) {
      const filteredArray = usersList.filter(item => {
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
  };

  const renderUserItem = ({item, index}) => {
    const {userName, email} = item;
    return (
      <UserCell
        key={index}
        title={userName}
        email={email}
        onPress={() =>
          navigation.navigate(AppRoutes.Messages, {
            userChat: item,
          })
        }
      />
    );
  };

  return (
    <View style={styles.container}>
      {loading && <SFLoader />}
      <Header
        title={'Users'}
        backButton={true}
        onBackPress={() => navigation.goBack()}
      />
      <SearchBar
        value={searchedText}
        placeholder="Search user by name..."
        onChange={text => handleSearch(text)}
        onClosePress={() => setSearchedText('')}
        onSearchPress={() => Applogger('Pressed search')}
      />
      {searchedText && !searchedArray.length > 0 ? (
        <SFNoRecord title="No User Found" textStyle={styles.noSearchText} />
      ) : (
        <FlatList
          data={searchedArray.length > 0 ? searchedArray : usersList}
          renderItem={renderUserItem}
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
