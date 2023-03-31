import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AppColors from './../../helpers/AppColors';
import AppFontSize from './../../helpers/AppFontSize';
import AppFontFamily from './../../helpers/AppFontFamily';

export default function SFHeading({
  title = '',
  containerStyle = {},
  textStyle = {},
}) {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.heading, textStyle]}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  heading: {
    textAlign: 'center',
    color: AppColors.gray,
    fontSize: AppFontSize.size20,
    fontFamily: AppFontFamily.bold,
  },
});
