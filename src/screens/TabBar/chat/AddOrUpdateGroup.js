import React from 'react';
import {StyleSheet, View} from 'react-native';
import AppColors from '../../../helpers/AppColors';
import Header from '../../../components/headers/Header';

export default function AddOrUpdateGroup({navigation}) {
  return (
    <View style={styles.container}>
      <Header
        title={'Add or Update Group'}
        backButton={true}
        onBackPress={() => navigation.goBack()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.offWhite,
  },
});
