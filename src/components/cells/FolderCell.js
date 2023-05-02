import React from 'react';
import {StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AppIcons from './../../helpers/AppIcons';
import AppColors from './../../helpers/AppColors';
import AppImages from './../../helpers/AppImages';
import AppFontSize from './../../helpers/AppFontSize';
import AppFontFamily from './../../helpers/AppFontFamily';

export default function FolderCell({
  title = '',
  nestedItems = 0,
  onPress = () => {},
}) {
  const getTitle = () => {
    if (nestedItems > 0) {
      return `${title} (${nestedItems})`;
    } else {
      return title;
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={AppImages.folder} style={styles.image} />
      <Text style={styles.title}>{getTitle()}</Text>
      <Icon name={AppIcons.arrowRight} color={AppColors.customBlue} size={25} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.white,
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  image: {
    height: 30,
    width: 30,
  },
  title: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: AppFontSize.size14,
    color: AppColors.black,
    fontFamily: AppFontFamily.semiBold,
  },
});
