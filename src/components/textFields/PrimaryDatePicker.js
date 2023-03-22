import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import AppColors from '../../helpers/AppColors';
import AppFontSize from '../../helpers/AppFontSize';
import DatePicker from 'react-native-date-picker';
import AppConstants from './../../helpers/AppConstants';

export default function PrimaryDatePicker({
  placeholder = 'Type here...',
  openDatePicker = false,
  onChange,
  setOpenDatePicker,
  date,
  dateMode = AppConstants.datePicker.dateTime,
  value = '',
}) {
  console.log('Date: ', date);
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
    textAlign: 'center',
    fontWeight: 'bold',
    color: AppColors.gray,
    flex: 1,
  },
  dateText: {
    fontWeight: 'bold',
    color: AppColors.gray,
  },
  textField: {
    height: 50,
    flex: 2,
    paddingHorizontal: 10,
    justifyContent: 'center',
    borderLeftWidth: 1.5,
    borderLeftColor: AppColors.lightGray,
    fontWeight: 'bold',
    color: AppColors.gray,
    fontSize: AppFontSize.size16,
  },
});
