import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import AppColors from './../../helpers/AppColors';
import AppFontSize from './../../helpers/AppFontSize';
import AppFontFamily from './../../helpers/AppFontFamily';

export default function ReminderDropDown({
  title = '',
  options = [],
  setSelected = () => {},
  defaultKey = '',
  defaultValue = '',
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <SelectList
        defaultOption={{key: defaultKey, value: defaultValue}}
        setSelected={val => setSelected(val)}
        data={options}
        save="key"
        search={false}
        placeholder="Select an Option"
        boxStyles={{
          borderColor: AppColors.gray,
          marginHorizontal: 10,
        }}
        inputStyles={{
          color: AppColors.gray,
        }}
        dropdownStyles={{
          borderColor: AppColors.gray,
          marginHorizontal: 10,
        }}
        dropdownTextStyles={{
          color: AppColors.gray,
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
    marginHorizontal: 10,
    marginVertical: 10,
    color: AppColors.customBlue,
    fontFamily: AppFontFamily.bold,
    fontSize: AppFontSize.size14,
  },
});
