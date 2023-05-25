import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AppColors from './../../helpers/AppColors';
import AppFontSize from './../../helpers/AppFontSize';
import AppIcons from './../../helpers/AppIcons';
import AppFontFamily from '../../helpers/AppFontFamily';
import AppImages from '../../helpers/AppImages';

export default function FileCell({
  title = '',
  date = '',
  description = '',
  suffix = null,
  isDeclared = false,
  onPress = () => {},
}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
      </View>
      {isDeclared && (
        <Image
          source={AppImages.declared}
          resizeMode="contain"
          style={styles.image}
        />
      )}
      {suffix && (
        <Image source={suffix} resizeMode="contain" style={styles.image} />
      )}
      <Text style={styles.date}>{date}</Text>
      <Icon name={AppIcons.infoIcon} color={AppColors.customBlue} size={25} />
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
  textContainer: {
    flex: 1,
  },
  image: {
    marginHorizontal: 5,
    height: 25,
    width: 25,
  },
  title: {
    marginHorizontal: 10,
    color: AppColors.black,
    fontSize: AppFontSize.size14,
    fontFamily: AppFontFamily.semiBold,
  },
  date: {
    marginHorizontal: 10,
    color: AppColors.gray,
    fontSize: AppFontSize.size12,
    fontFamily: AppFontFamily.regular,
  },
  description: {
    marginHorizontal: 10,
    color: AppColors.gray,
    fontSize: AppFontSize.size14,
    fontFamily: AppFontFamily.regular,
  },
});
