import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {usersList} from '../Constants';
import AppColors from '../../../../helpers/AppColors';
import Applogger from './../../../../helpers/AppLogger';
import Header from '../../../../components/headers/Header';
import UserCell from '../../../../components/cells/UserCell';
import SearchBar from '../../../../components/search/SearchBar';

export default function AllUsers({navigation}) {
  const [searchText, setSearchText] = useState('');

  const renderUserItem = ({item, index}) => {
    const {userName, email} = item;
    return (
      <UserCell
        key={index}
        title={userName}
        email={email}
        onPress={() => Applogger('Clicked User Cell')}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title={'Users'}
        backButton={true}
        onBackPress={() => navigation.goBack()}
      />
      <SearchBar
        value={searchText}
        placeholder="Search user by name..."
        onChange={text => setSearchText(text)}
        onClosePress={() => Applogger('Pressed close search')}
        onSearchPress={() => Applogger('Pressed search')}
      />
      <FlatList data={usersList} renderItem={renderUserItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
});
