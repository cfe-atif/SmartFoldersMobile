import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import AppColors from '../../helpers/AppColors';
import AppFontSize from '../../helpers/AppFontSize';
import AppFontFamily from '../../helpers/AppFontFamily';

export default function PrimaryCheckbox({
  value = '',
  placeholder = '',
  onChange = () => {},
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.placeholder} numberOfLines={2}>
        {placeholder}
      </Text>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={value}
          onChange={onChange}
          boxType="square"
          onCheckColor={AppColors.customBlue}
          offAnimationType="fade"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.white,
    borderColor: AppColors.gray,
    borderWidth: 1.5,
    height: 50,
  },
  placeholder: {
    flex: 1,
    textAlign: 'center',
    fontFamily: AppFontFamily.bold,
    color: AppColors.gray,
    paddingHorizontal: 5,
  },
  checkboxContainer: {
    height: 50,
    flex: 2,
    paddingHorizontal: 10,
    justifyContent: 'center',
    borderLeftWidth: 1.5,
    borderLeftColor: AppColors.lightGray,
    fontFamily: AppFontFamily.semiBold,
    color: AppColors.gray,
    fontSize: AppFontSize.size14,
  },
});
