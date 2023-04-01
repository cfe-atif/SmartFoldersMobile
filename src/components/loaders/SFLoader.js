import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {BarIndicator} from 'react-native-indicators';
import AppColors from '../../helpers/AppColors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function SFLoader() {
  return (
    <View style={styles.container}>
      <BarIndicator size={50} color={AppColors.customBlue} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 0,
    position: 'absolute',
    top: 0,
    zIndex: 3,
    opacity: 1,
    height: windowHeight,
    width: windowWidth,
    backgroundColor: AppColors.loadingBg,
  },
});
