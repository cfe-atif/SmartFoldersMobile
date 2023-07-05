import React from 'react';
import {StyleSheet, Image, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AppIcons from './../../helpers/AppIcons';
import AppColors from './../../helpers/AppColors';
import AppImages from './../../helpers/AppImages';
import AppFontSize from './../../helpers/AppFontSize';
import AppFontFamily from './../../helpers/AppFontFamily';

export default function FolderCell({
  title = '',
  nestedItems = 0,
  isSelected = false,
  onSelectFolder = () => {},
  onPressFolder = () => {},
  onPressFiles = () => {},
}) {
  const getTitle = () => {
    if (nestedItems > 0) {
      return `${title} (${nestedItems})`;
    } else {
      return title;
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onSelectFolder}>
        <Icon
          name={isSelected ? AppIcons.selectFill : AppIcons.select}
          color={isSelected ? AppColors.customBlue : AppColors.gray}
          size={25}
        />
      </TouchableOpacity>
      <Text style={styles.title}>{getTitle()}</Text>
      {nestedItems > 0 && (
        <TouchableOpacity onPress={onPressFiles}>
          <Icon
            name={AppIcons.documents}
            color={AppColors.customBlue}
            size={30}
            style={styles.image}
          />
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={onPressFolder}>
        <Image source={AppImages.cellFolder} style={styles.image} />
      </TouchableOpacity>
    </View>
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
    marginHorizontal: 10,
  },
  title: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: AppFontSize.size14,
    color: AppColors.black,
    fontFamily: AppFontFamily.semiBold,
  },
});
