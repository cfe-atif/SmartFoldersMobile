import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import AppColors from '../../helpers/AppColors';
import AppFontSize from '../../helpers/AppFontSize';
import AppFontFamily from '../../helpers/AppFontFamily';

export default function SimpleButton({
  title = '',
  onPress = () => {},
  addStyles = {},
}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={[styles.buttonText, addStyles]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontFamily: AppFontFamily.bold,
    color: AppColors.blue,
    fontSize: AppFontSize.size14,
    textAlign: 'right',
  },
});
