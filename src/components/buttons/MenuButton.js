import React from 'react';
import {StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import AppFontSize from '../../helpers/AppFontSize';
import AppColors from './../../helpers/AppColors';
import AppFontFamily from './../../helpers/AppFontFamily';

export default function MenuButton({
  image = '',
  title = '',
  onPress = () => {},
}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.menuItem}>
      <Image source={image} resizeMode="contain" style={styles.menuIcon} />
      <Text style={styles.menuTitle}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  menuIcon: {
    height: 30,
    width: 30,
  },
  menuItem: {
    margin: 10,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  menuTitle: {
    fontSize: AppFontSize.size12,
    color: AppColors.black,
    fontFamily: AppFontFamily.regular,
  },
});
