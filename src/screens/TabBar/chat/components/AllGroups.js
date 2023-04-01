import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {groupsList} from '../Constants';
import {get} from 'lodash';
import AppColors from '../../../../helpers/AppColors';
import Applogger from './../../../../helpers/AppLogger';
import Header from '../../../../components/headers/Header';
import GroupCell from './../../../../components/cells/GroupCell';
import SearchBar from '../../../../components/search/SearchBar';

export default function AllGroups({navigation}) {
  const [searchText, setSearchText] = useState('');

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
        onPress={() => Applogger('Clicked Group Cell')}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title={'Groups'}
        backButton={true}
        onBackPress={() => navigation.goBack()}
      />
      <SearchBar
        value={searchText}
        placeholder="Search group by name..."
        onChange={text => setSearchText(text)}
        onClosePress={() => Applogger('Pressed close search')}
        onSearchPress={() => Applogger('Pressed search')}
      />
      <FlatList data={groupsList} renderItem={renderGroupItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
});
