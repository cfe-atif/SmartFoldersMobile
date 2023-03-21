import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AppColors from './../../helpers/AppColors';
import AppFontSize from './../../helpers/AppFontSize';

export default function OutGoingMessageCell({message = '', timeStamp = ''}) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      <Text style={styles.timeStamp}>{timeStamp}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.customBlue,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    maxWidth: '75%',
    alignSelf: 'flex-end',
  },
  message: {
    color: AppColors.white,
    fontSize: AppFontSize.size14,
    marginVertical: 4,
  },
  timeStamp: {
    color: AppColors.lightGray,
    fontSize: AppFontSize.size12,
    textAlign: 'right',
    fontWeight: '600',
  },
});
