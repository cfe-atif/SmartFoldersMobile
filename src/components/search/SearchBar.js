import React from 'react';
import {StyleSheet, TextInput, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AppIcons from './../../helpers/AppIcons';
import AppColors from './../../helpers/AppColors';
import AppFontSize from './../../helpers/AppFontSize';

export default function SearchBar() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconStyle}>
        <Icon name={AppIcons.search} color={AppColors.customBlue} size={20} />
      </TouchableOpacity>
      <TextInput style={styles.searchField} placeholder="Search ..." />
      <TouchableOpacity style={styles.iconStyle}>
        <Icon name={AppIcons.close} color={AppColors.customBlue} size={25} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 10,
    paddingHorizontal: 5,
    alignItems: 'center',
    borderColor: AppColors.gray,
    borderWidth: 1.5,
    borderRadius: 10,
  },
  searchField: {
    flex: 1,
    marginHorizontal: 5,
    paddingHorizontal: 5,
    fontSize: AppFontSize.size16,
  },
  iconStyle: {
    padding: 5,
  },
});
