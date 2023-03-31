import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import AppColors from '../../helpers/AppColors';
import AppFontSize from '../../helpers/AppFontSize';
import AppFontFamily from '../../helpers/AppFontFamily';

export default function FolderNavigationButton({
  title = '',
  isSelected = false,
  onPress = () => {},
}) {
  return (
    <TouchableOpacity style={styles.navBtn} onPress={onPress}>
      <Text style={isSelected ? styles.currentNavBtnText : styles.navBtnText}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  navBtn: {
    marginRight: 5,
  },
  navBtnText: {
    color: AppColors.gray,
    fontSize: AppFontSize.size14,
    fontFamily: AppFontFamily.regular,
  },
  currentNavBtnText: {
    color: AppColors.customBlue,
    fontSize: AppFontSize.size14,
    fontFamily: AppFontFamily.bold,
  },
});
