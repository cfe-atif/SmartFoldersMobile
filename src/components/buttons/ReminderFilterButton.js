import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import AppColors from './../../helpers/AppColors';
import AppFontSize from './../../helpers/AppFontSize';
import AppFontFamily from './../../helpers/AppFontFamily';

export default function ReminderFilterButton({
  selected = false,
  title = '',
  onPress = () => {},
}) {
  const backgroundColor = selected ? AppColors.customBlue : AppColors.lightGray;
  const color = selected ? AppColors.white : AppColors.gray;

  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor: backgroundColor}]}
      onPress={onPress}>
      <Text style={[styles.title, {color: color}]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  selectedContainer: {
    margin: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: AppFontSize.size14,
    fontFamily: AppFontFamily.bold,
  },
});
