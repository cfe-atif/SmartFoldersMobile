import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AppColors from '../../../helpers/AppColors';
import AppIcons from './../../../helpers/AppIcons';
import AppFontSize from './../../../helpers/AppFontSize';
import AppFontFamily from '../../../helpers/AppFontFamily';
import Header from '../../../components/headers/Header';
import SFNoRecord from './../../../components/texts/SFNoRecord';
import OutGoingMessageCell from '../../../components/cells/OutGoingMessageCell';
import IncomingMessageCell from './../../../components/cells/IncomingMessageCell';

export default function Messages({navigation}) {
  const messages = [
    {
      message: 'This is first message',
      timeStamp: '10:00 Pm',
      senderId: 10,
      senderName: 'System administrator',
    },
    {
      message: 'This is second message',
      timeStamp: '08:00 Pm',
      senderId: 4,
      senderName: 'Junaid Manzoor',
    },
    {
      message: 'This is third message',
      timeStamp: '07:00 Pm',
      senderId: 3,
      senderName: 'Usman Ali',
    },
    {
      message: 'This is fourth message',
      timeStamp: '09:00 Pm',
      senderId: 2,
      senderName: 'Nayyer Ali',
    },
  ];

  const renderMessageCell = ({item, index}) => {
    const {message, timeStamp, senderId, senderName} = item;
    if (senderId == 10) {
      return (
        <OutGoingMessageCell
          key={index}
          message={message}
          timeStamp={timeStamp}
          senderName={senderName}
        />
      );
    } else {
      return (
        <IncomingMessageCell
          key={index}
          message={message}
          timeStamp={timeStamp}
          senderName={senderName}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title={'Messages'}
        backButton={true}
        onBackPress={() => navigation.goBack()}
      />
      <View style={styles.listContainer}>
        {messages.length > 0 ? (
          <FlatList data={messages} renderItem={renderMessageCell} />
        ) : (
          <SFNoRecord title="No Record found" />
        )}
      </View>

      <View style={styles.fieldContainer}>
        <TextInput
          style={styles.messageField}
          placeholder="Type message here..."
          placeholderTextColor={AppColors.gray}
        />
        <TouchableOpacity>
          <Icon
            name={AppIcons.chatIcon}
            size={40}
            color={AppColors.customBlue}
          />
        </TouchableOpacity>
      </View>
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
});
