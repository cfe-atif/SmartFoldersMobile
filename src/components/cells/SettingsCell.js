import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import AppColors from './../../helpers/AppColors';
import AppFontSize from './../../helpers/AppFontSize';
import AppFontFamily from '../../helpers/AppFontFamily';

export default function SettingsCell({title = '', onPress = () => {}}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.cellContainer}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomColor: AppColors.gray,
    borderBottomWidth: 1.5,
  },
  cellContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  title: {
    marginVertical: 10,
    color: AppColors.gray,
    fontSize: AppFontSize.size16,
    fontFamily: AppFontFamily.semiBold,
  },
});
