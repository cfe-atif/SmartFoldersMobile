import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import AppColors from './../../helpers/AppColors';
import AppFontSize from '../../helpers/AppFontSize';
import AppFontFamily from '../../helpers/AppFontFamily';

export default function PrimaryButton({title = '', onPress = () => {}}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    margin: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.customBlue,
  },
  buttonText: {
    fontFamily: AppFontFamily.bold,
    color: AppColors.white,
    fontSize: AppFontSize.size18,
  },
});
