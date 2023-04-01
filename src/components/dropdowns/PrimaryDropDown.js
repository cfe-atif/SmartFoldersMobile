import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import AppColors from './../../helpers/AppColors';
import AppFontSize from './../../helpers/AppFontSize';
import AppFontFamily from './../../helpers/AppFontFamily';

export default function PrimaryDropDown({
  title = '',
  options = [],
  setSelected = () => {},
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <SelectList
        setSelected={val => setSelected(val)}
        data={options}
        save="value"
        search={false}
        placeholder="Select"
        boxStyles={{
          marginHorizontal: 10,
          borderWidth: 1.5,
          backgroundColor: AppColors.white,
          borderColor: AppColors.gray,
        }}
        inputStyles={{
          color: AppColors.gray,
        }}
        dropdownStyles={{
          marginHorizontal: 10,
          borderWidth: 1.5,
          backgroundColor: AppColors.white,
          borderColor: AppColors.gray,
        }}
        dropdownTextStyles={{
          borderBottomWidth: 1,
          paddingBottom: 5,
          color: AppColors.gray,
          borderBottomColor: AppColors.lightGray,
        }}
        maxHeight={200}
        fontFamily={AppFontFamily.semiBold}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  title: {
    color: AppColors.gray,
    marginHorizontal: 10,
    marginBottom: 10,
    fontSize: AppFontSize.size14,
    fontFamily: AppFontFamily.bold,
  },
});
