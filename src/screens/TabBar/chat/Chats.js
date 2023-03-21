import React, {useState, useRef} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import ChatCell from '../../../components/cells/ChatCell';
import Header from '../../../components/headers/Header';
import ChatsButton from './../../../components/buttons/ChatsButton';
import SimpleButton from './../../../components/buttons/SimpleButton';
import AppColors from './../../../helpers/AppColors';
import AppRoutes from './../../../helpers/AppRoutes';
import AppIcons from './../../../helpers/AppIcons';

export default function Chats({navigation}) {
  const sheetRef = useRef(null);

  const [selected, setSelected] = useState(true);

  const chats = [
    {
      title: 'Nayyer Ali',
      message: 'This is last message from nayyer ali',
      timeStamp: '10:00',
      unreadMessage: false,
    },
    {
      title: 'Usman Ali',
      message: 'This is last message from usman ali',
      timeStamp: '07:00',
      unreadMessage: true,
    },
    {
      title: 'Junaid Manzoor',
      message: 'This is last message from junaid manzoor',
      timeStamp: '09:00',
      unreadMessage: false,
    },
  ];

  const handleChatCellPress = chat => {
    navigation.navigate(AppRoutes.Messages);
  };

  const renderChatsItem = ({item, index}) => {
    const {title, message, timeStamp, unreadMessage} = item;
    return (
      <ChatCell
        key={index}
        title={title}
        message={message}
        timeStamp={timeStamp}
        unreadMessage={unreadMessage}
        onPress={item => handleChatCellPress(item)}
      />
    );
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
  },
});
