import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import AppColors from './../../helpers/AppColors';
import AppFontSize from './../../helpers/AppFontSize';
import AppFontFamily from './../../helpers/AppFontFamily';

export default function ChatCell({
  title = '',
  message = '',
  timeStamp = '',
  unreadMessage = false,
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
        <Text style={styles.timeStamp}>{timeStamp}</Text>
        {unreadMessage && <View style={styles.dotIcon} />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: AppColors.lightGray,
    backgroundColor: AppColors.white,
    flexDirection: 'row',
  },
  textsContainer: {
    flex: 1,
    marginHorizontal: 10,
    padding: 10,
  },
  title: {
    fontSize: AppFontSize.size16,
    color: AppColors.black,
    fontFamily: AppFontFamily.bold,
  },
  description: {
    marginTop: 5,
    fontSize: AppFontSize.size14,
    color: AppColors.gray,
    fontFamily: AppFontFamily.regular,
  },
  rightContainer: {
    alignItems: 'center',
    marginRight: 10,
    padding: 10,
  },
  timeStamp: {
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
