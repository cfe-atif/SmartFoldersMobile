import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import AppColors from '../../helpers/AppColors';
import AppFontSize from '../../helpers/AppFontSize';
import AppFontFamily from '../../helpers/AppFontFamily';

export default function FolderTypeButton({
  title = '',
  isSelected = false,
  onPress = () => {},
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={isSelected ? styles.folderButton : styles.selFolderButton}>
      <Text
        style={
          isSelected ? styles.selFolderButtonText : styles.folderButtonText
        }>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  selFolderButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: AppColors.customBlue,
    borderColor: AppColors.customBlue,
  },
  folderButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: AppColors.white,
    borderColor: AppColors.customBlue,
  },
  selFolderButtonText: {
    fontSize: AppFontSize.size16,
    color: AppColors.customBlue,
    fontFamily: AppFontFamily.bold,
  },
  folderButtonText: {
    fontSize: AppFontSize.size16,
    color: AppColors.white,
    fontFamily: AppFontFamily.bold,
  },
});
