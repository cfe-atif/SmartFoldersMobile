import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import AppFontSize from './../../helpers/AppFontSize';
import AppColors from './../../helpers/AppColors';

export default function RecentSearchCell({title, selected, onPress}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={selected ? styles.selectedTitle : styles.title}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderBottomColor: AppColors.lightGray,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: AppFontSize.size14,
    color: AppColors.gray,
    fontWeight: '500',
  },
  selectedTitle: {
    fontSize: AppFontSize.size14,
    color: AppColors.customBlue,
    fontWeight: '700',
  },
});
