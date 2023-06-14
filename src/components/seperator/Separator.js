import React from 'react';
import {StyleSheet, View} from 'react-native';
import AppColors from '../../helpers/AppColors';

export default function Separator({addStyles = {}}) {
  return <View style={[styles.container, addStyles]} />;
}

const styles = StyleSheet.create({
  container: {
    height: 1,
    marginVertical: 10,
    backgroundColor: AppColors.gray,
  },
});
