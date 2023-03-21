import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import AppColors from './../../helpers/AppColors';
import AppFontSize from './../../helpers/AppFontSize';

export default function ReminderDropDown({title, options, setSelected}) {
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
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  title: {
    color: AppColors.customBlue,
    marginHorizontal: 10,
    marginVertical: 10,
    fontSize: AppFontSize.size14,
    fontWeight: 'bold',
  },
});
