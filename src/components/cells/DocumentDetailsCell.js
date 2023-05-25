import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AppColors from '../../helpers/AppColors';
import AppFontFamily from '../../helpers/AppFontFamily';

export default function DocumentDetailsCell({title = '', description = ''}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    backgroundColor: AppColors.white,
    borderBottomColor: AppColors.gray,
  },
  title: {
    fontFamily: AppFontFamily.semiBold,
    color: AppColors.customBlue,
  },
  description: {
    fontFamily: AppFontFamily.regular,
    color: AppColors.black,
  },
});
