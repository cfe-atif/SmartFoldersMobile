import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AppColors from './../../helpers/AppColors';
import AppFontSize from './../../helpers/AppFontSize';

export default function IncomingMessageCell({
  message = '',
  timeStamp = '',
  senderName = '',
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.senderName}>{senderName}</Text>
      <Text style={styles.message}>{message}</Text>
      <Text style={styles.timeStamp}>{timeStamp}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.white,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    maxWidth: '75%',
    alignSelf: 'flex-start',
  },
  senderName: {
    color: AppColors.customBlue,
    fontSize: AppFontSize.size12,
    fontWeight: 'bold',
  },
  message: {
    color: AppColors.black,
    fontSize: AppFontSize.size14,
    marginVertical: 4,
  },
  timeStamp: {
    color: AppColors.gray,
    fontSize: AppFontSize.size12,
    textAlign: 'right',
    fontWeight: '600',
  },
});
