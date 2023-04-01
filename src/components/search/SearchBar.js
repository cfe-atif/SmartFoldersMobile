import React from 'react';
import {StyleSheet, TextInput, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AppIcons from './../../helpers/AppIcons';
import AppColors from './../../helpers/AppColors';
import AppFontSize from './../../helpers/AppFontSize';
import AppFontFamily from '../../helpers/AppFontFamily';

export default function SearchBar({
  value = '',
  placeholder = '',
  onChange = () => {},
  onClosePress = () => {},
  onSearchPress = () => {},
}) {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.iconStyle} onPress={onSearchPress}>
          <Icon name={AppIcons.search} color={AppColors.customBlue} size={20} />
        </TouchableOpacity>
        <TextInput
          style={styles.searchField}
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
        />
        <TouchableOpacity style={styles.iconStyle} onPress={onClosePress}>
          <Icon name={AppIcons.close} color={AppColors.customBlue} size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    borderBottomColor: AppColors.lightGray,
    borderBottomWidth: 1,
  },
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
    fontFamily: AppFontFamily.regular,
  },
  iconStyle: {
    padding: 5,
  },
});
