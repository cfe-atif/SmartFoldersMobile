import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView, Text} from 'react-native';
import {get} from 'lodash';
import Header from './../../../../components/headers/Header';
import PrimaryTextField from '../../../../components/textFields/PrimaryTextField';
import AppColors from '../../../../helpers/AppColors';
import AppFontSize from '../../../../helpers/AppFontSize';
import AppFontFamily from '../../../../helpers/AppFontFamily';

export default function DocumentDetails({navigation, route}) {
  const selectedDocument = get(route, 'params.selectedDocument', null);

  useEffect(() => {
    console.log('====================================');
    console.log(selectedDocument);
    console.log('====================================');
  }, [selectedDocument]);

  return (
    <View style={styles.container}>
      <Header
        title="Document Details"
        backButton={true}
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView>
        <View style={styles.viewContainer}>
          <Text style={styles.title}>{'Title'}</Text>
          <Text style={styles.description}>{'This Is Title'}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    padding: 10,
    borderBottomWidth: 1,
    backgroundColor: AppColors.white,
    borderBottomColor: AppColors.gray,
  },
  title: {
    fontSize: AppFontSize.size16,
    fontFamily: AppFontFamily.semiBold,
    fontWeight: 'bold',
  },
  description: {
    fontSize: AppFontSize.size16,
    fontFamily: AppFontFamily.semiBold,
    fontWeight: 'bold',
  },
});
