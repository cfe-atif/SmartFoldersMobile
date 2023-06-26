import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import AppColors from '../../../../helpers/AppColors';
import AppFontFamily from '../../../../helpers/AppFontFamily';

export default function ReminderDocView({
  title = '',
  description = '',
  suffix = null,
}) {
  return (
    <View style={styles.container}>
      {suffix && (
        <Image source={suffix} resizeMode="contain" style={styles.image} />
      )}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.lightGray,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: AppColors.gray,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    marginVertical: 5,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    paddingHorizontal: 10,
    color: AppColors.black,
    borderRightColor: AppColors.gray,
    borderLeftColor: AppColors.gray,
    fontFamily: AppFontFamily.semiBold,
    textAlign: 'center',
  },
  description: {
    flex: 1,
    color: AppColors.black,
    fontFamily: AppFontFamily.semiBold,
    paddingLeft: 10,
    textAlign: 'center',
  },
  image: {
    height: 25,
    width: 25,
    marginRight: 10,
  },
});
