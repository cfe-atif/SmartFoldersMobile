import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import AppFontFamily from '../../helpers/AppFontFamily';
import AppColors from './../../helpers/AppColors';
import AppFontSize from './../../helpers/AppFontSize';

export default function UserCell({title = '', email = '', onPress = () => {}}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.email}>{email}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    backgroundColor: AppColors.white,
    borderBottomColor: AppColors.lightGray,
  },
  title: {
    margin: 2,
    textTransform: 'capitalize',
    fontSize: AppFontSize.size16,
    fontFamily: AppFontFamily.semiBold,
  },
  email: {
    margin: 2,
    fontSize: AppFontSize.size14,
    fontFamily: AppFontFamily.regular,
    color: AppColors.gray,
  },
});
