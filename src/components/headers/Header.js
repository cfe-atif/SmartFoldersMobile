import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AppIcons from './../../helpers/AppIcons';
import AppColors from './../../helpers/AppColors';
import AppFontSize from './../../helpers/AppFontSize';
import AppFontFamily from './../../helpers/AppFontFamily';

export default function Header({
  title = '',
  backButton = false,
  rightButton = false,
  rightIcon = '',
  onBackPress = () => {},
  onRightButtonPress = () => {},
}) {
  return (
    <View style={styles.container}>
      {backButton && (
        <TouchableOpacity style={styles.leftButton} onPress={onBackPress}>
          <Icon name={AppIcons.backButton} color={AppColors.white} size={30} />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
      {rightButton && (
        <TouchableOpacity
          style={styles.rightButton}
          onPress={onRightButtonPress}>
          <Icon name={rightIcon} color={AppColors.white} size={30} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.customBlue,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 75,
  },
  title: {
    color: AppColors.white,
    fontSize: AppFontSize.size22,
    fontFamily: AppFontFamily.bold,
    textAlign: 'center',
    width: '75%',
  },
  leftButton: {
    height: 50,
    left: 0,
    padding: 10,
    position: 'absolute',
    justifyContent: 'center',
  },
  rightButton: {
    height: 50,
    right: 0,
    padding: 10,
    position: 'absolute',
    justifyContent: 'center',
  },
});
