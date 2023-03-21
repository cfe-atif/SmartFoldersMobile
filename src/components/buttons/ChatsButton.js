import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import AppColors from './../../helpers/AppColors';
import AppFontSize from './../../helpers/AppFontSize';

export default function ChatsButton({
  title = '',
  selected = false,
  onPress = () => {},
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={selected ? styles.selectedContainer : styles.container}>
      <Text style={selected ? styles.selectedButtontext : styles.buttontext}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    borderWidth: 1.5,
    borderRadius: 10,
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.white,
    borderColor: AppColors.customBlue,
  },
  selectedContainer: {
    margin: 10,
    padding: 10,
    borderWidth: 1.5,
    borderRadius: 10,
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.customBlue,
    borderColor: AppColors.customBlue,
  },
  selectedButtontext: {
    fontSize: AppFontSize.size16,
    fontWeight: 'bold',
    color: AppColors.white,
  },
  buttontext: {
    fontSize: AppFontSize.size16,
    fontWeight: 'bold',
    color: AppColors.customBlue,
  },
});
