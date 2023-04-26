import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AppColors from './../../helpers/AppColors';
import AppFontSize from './../../helpers/AppFontSize';
import AppFontFamily from './../../helpers/AppFontFamily';

export default function ReminderDetailCell({title = '', description = ''}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}: </Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  title: {
    fontSize: AppFontSize.size14,
    fontFamily: AppFontFamily.semiBold,
    color: AppColors.black,
    marginRight: 5,
    flex: 1,
  },
  description: {
    fontSize: AppFontSize.size14,
    fontFamily: AppFontFamily.semiBold,
    color: AppColors.gray,
    marginRight: 5,
    flex: 3,
  },
});
