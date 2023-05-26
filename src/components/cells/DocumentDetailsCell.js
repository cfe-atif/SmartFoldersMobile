import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import AppColors from '../../helpers/AppColors';
import AppFontFamily from '../../helpers/AppFontFamily';

export default function DocumentDetailsCell({
  title = '',
  description = '',
  suffix = '',
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title + ':'}</Text>
      {!suffix && (
        <Text style={styles.description}>
          {description != '' ? description : 'N/A'}
        </Text>
      )}
      {suffix && (
        <Image source={suffix} resizeMode="contain" style={styles.image} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    backgroundColor: AppColors.white,
    borderBottomColor: AppColors.gray,
  },
  title: {
    fontFamily: AppFontFamily.semiBold,
    color: AppColors.customBlue,
    textTransform: 'capitalize',
  },
  description: {
    fontFamily: AppFontFamily.regular,
    color: AppColors.black,
  },
  image: {
    height: 25,
    width: 25,
  },
});
