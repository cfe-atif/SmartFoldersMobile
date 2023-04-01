import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import AppColors from './../../helpers/AppColors';
import AppFontSize from './../../helpers/AppFontSize';
import AppFontFamily from './../../helpers/AppFontFamily';
import moment from 'moment';

export default function ChatCell({
  title = '',
  message = '',
  timeStamp = '',
  unreadMessage = 0,
  onPress = () => {},
}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.textsContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.description} numberOfLines={1}>
          {message}
        </Text>
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.timeStamp}>{moment(timeStamp).fromNow()}</Text>
        {unreadMessage > 0 && <View style={styles.dotIcon} />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    padding: 10,
    borderBottomColor: AppColors.lightGray,
    backgroundColor: AppColors.white,
  },
  textsContainer: {
    flex: 1,
  },
  title: {
    margin: 2,
    fontSize: AppFontSize.size16,
    color: AppColors.black,
    fontFamily: AppFontFamily.bold,
  },
  description: {
    margin: 2,
    fontSize: AppFontSize.size14,
    color: AppColors.gray,
    fontFamily: AppFontFamily.regular,
  },
  rightContainer: {
    alignItems: 'center',
    marginLeft: 10,
  },
  timeStamp: {
    margin: 2,
    fontSize: AppFontSize.size12,
    color: AppColors.gray,
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
