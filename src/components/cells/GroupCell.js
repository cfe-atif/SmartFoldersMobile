import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import moment from 'moment';
import AppFontFamily from '../../helpers/AppFontFamily';
import AppColors from '../../helpers/AppColors';
import AppFontSize from '../../helpers/AppFontSize';

export default function GroupCell({
  title = '',
  lastMessage = '',
  timestamp = '',
  sender = '',
  senderId = '',
  unreadMessageCount = '',
  onPress = () => {},
}) {
  const currentUserId = 10;

  const getUserName = () => {
    if (senderId == currentUserId) {
      return 'You';
    } else {
      return sender;
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.desContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text
          style={styles.description}>{`${getUserName()}: ${lastMessage}`}</Text>
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.timestamp}>{moment(timestamp).fromNow()}</Text>
        {unreadMessageCount > 0 && <View style={styles.dotIcon} />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    backgroundColor: AppColors.white,
    borderBottomColor: AppColors.lightGray,
  },
  desContainer: {
    flex: 1,
  },
  title: {
    margin: 2,
    textTransform: 'capitalize',
    fontSize: AppFontSize.size16,
    fontFamily: AppFontFamily.semiBold,
  },
  description: {
    margin: 2,
    fontSize: AppFontSize.size14,
    fontFamily: AppFontFamily.regular,
    color: AppColors.gray,
  },
  timeContainer: {
    alignItems: 'center',
    marginLeft: 10,
  },
  timestamp: {
    margin: 2,
    color: AppColors.gray,
    fontSize: AppFontSize.size12,
    fontFamily: AppFontFamily.regular,
  },
  dotIcon: {
    backgroundColor: AppColors.customBlue,
    height: 15,
    width: 15,
    borderRadius: 15 / 2,
    marginTop: 8,
  },
});
