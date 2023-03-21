import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AppFontSize from './../../helpers/AppFontSize';
import AppColors from './../../helpers/AppColors';

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
    fontSize: AppFontSize.size20,
    color: AppColors.gray,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
