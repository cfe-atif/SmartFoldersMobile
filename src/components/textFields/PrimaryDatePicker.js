import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-date-picker';
import AppColors from '../../helpers/AppColors';
import AppFontSize from '../../helpers/AppFontSize';
import AppConstants from './../../helpers/AppConstants';
import AppFontFamily from './../../helpers/AppFontFamily';

export default function PrimaryDatePicker({
  placeholder = 'Type here...',
  openDatePicker = false,
  onChange = () => {},
  setOpenDatePicker = false,
  date = new Date(),
  dateMode = AppConstants.datePicker.dateTime,
  value = '',
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.placeholder} numberOfLines={2}>
        {placeholder}
      </Text>
      <TouchableOpacity
        onPress={() => setOpenDatePicker(true)}
        style={styles.textField}>
        <Text style={styles.dateText}>{value}</Text>
        <DatePicker
          modal={true}
          open={openDatePicker}
          date={date}
          theme="light"
          onConfirm={date => {
            setOpenDatePicker(false);
            onChange(date);
          }}
          onCancel={() => {
            setOpenDatePicker(false);
          }}
          mode={dateMode}
        />
      </TouchableOpacity>
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
  },
  placeholder: {
    flex: 1,
    textAlign: 'center',
    color: AppColors.gray,
    fontFamily: AppFontFamily.bold,
  },
  dateText: {
    color: AppColors.gray,
    fontFamily: AppFontFamily.semiBold,
    fontSize: AppFontSize.size14,
  },
  textField: {
    height: 50,
    flex: 2,
    paddingHorizontal: 10,
    justifyContent: 'center',
    borderLeftWidth: 1.5,
    color: AppColors.gray,
    fontFamily: AppFontFamily.semiBold,
    fontSize: AppFontSize.size14,
    borderLeftColor: AppColors.lightGray,
  },
});
