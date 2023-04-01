import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AppColors from './../../helpers/AppColors';
import AppFontSize from './../../helpers/AppFontSize';
import AppFontFamily from './../../helpers/AppFontFamily';

export default function SFDescription({
  title = '',
  containerStyle = {},
  textStyle = {},
}) {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.description, textStyle]}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  description: {
    textAlign: 'center',
    fontSize: AppFontSize.size12,
    color: AppColors.gray,
    fontFamily: AppFontFamily.bold,
  },
});
