import React, {useState, useRef} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {chats} from './Constants';
import RBSheet from 'react-native-raw-bottom-sheet';
import AppColors from './../../../helpers/AppColors';
import AppRoutes from './../../../helpers/AppRoutes';
import Applogger from '../../../helpers/AppLogger';
import AppIcons from './../../../helpers/AppIcons';
import ChatCell from '../../../components/cells/ChatCell';
import Header from '../../../components/headers/Header';
import SearchBar from '../../../components/search/SearchBar';
import ChatsButton from './../../../components/buttons/ChatsButton';
import SimpleButton from './../../../components/buttons/SimpleButton';

export default function Chats({navigation}) {
  const sheetRef = useRef(null);

  const currentUserId = 10;

  const [searchText, setSearchText] = useState('');
  const [selected, setSelected] = useState(true);

  const handleChatCellPress = chat => {
    navigation.navigate(AppRoutes.Messages);
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
          onPress={item => handleChatCellPress(item)}
        />
      );
    } else {
      return null;
    }
  };

  const handleViewAllUsers = () => {
    sheetRef.current.close();
    navigation.navigate(AppRoutes.AllUsers);
  };

  const handleViewAllgroups = () => {
    sheetRef.current.close();
    navigation.navigate(AppRoutes.AllGroups);
  };

  const handleAddGroups = () => {
    sheetRef.current.close();
    navigation.navigate(AppRoutes.AddOrUpdateGroup);
  };

  return (
    <View style={styles.container}>
      <Header
        title={'Chats'}
        rightIcon={AppIcons.menuIcon}
        rightButton={true}
        onRightButtonPress={() => sheetRef.current.open()}
      />
      <SearchBar
        value={searchText}
        placeholder="Search..."
        onChange={text => setSearchText(text)}
        onClosePress={() => Applogger('Pressed close search')}
        onSearchPress={() => Applogger('Pressed search')}
      />
      <View style={styles.buttonContainer}>
        <ChatsButton
          onPress={() => setSelected(true)}
          title="Chats"
          selected={selected}
        />
        <ChatsButton
          onPress={() => setSelected(false)}
          title="Groups"
          selected={!selected}
        />
      </View>
      <View style={styles.listContainer}>
        <FlatList data={chats} renderItem={renderChatsItem} />
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
});
