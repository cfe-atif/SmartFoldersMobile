import React from 'react';
import {StyleSheet, View} from 'react-native';
import {MultipleSelectList} from 'react-native-dropdown-select-list';
import AppColors from '../../helpers/AppColors';
import AppFontSize from '../../helpers/AppFontSize';
import AppFontFamily from '../../helpers/AppFontFamily';

export default function ChatGroupDropDown({
  title = '',
  options = [],
  setSelected = () => {},
}) {
  return (
    <View style={styles.container}>
      <MultipleSelectList
        label={title}
        setSelected={setSelected}
        data={options}
        save="key"
        search={true}
        placeholder="Select from the list"
        searchPlaceholder=""
        boxStyles={{
          borderColor: AppColors.gray,
          marginHorizontal: 10,
          backgroundColor: AppColors.white,
        }}
        inputStyles={{
          color: AppColors.gray,
        }}
        dropdownStyles={{
          borderColor: AppColors.gray,
          marginHorizontal: 10,
          backgroundColor: AppColors.white,
        }}
        dropdownTextStyles={{
          color: AppColors.gray,
        }}
        notFoundText="No record found"
        maxHeight={300}
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
    color: AppColors.customBlue,
    marginHorizontal: 10,
    marginVertical: 10,
    fontSize: AppFontSize.size14,
    fontFamily: AppFontFamily.bold,
  },
});
