import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {get} from 'lodash';
import {unwrapResult} from '@reduxjs/toolkit';
import {useDispatch, useSelector} from 'react-redux';
import {createNewFolderData} from './../../../../../redux/reducers/DocumentsReducer';
import {
  showSuccessToast,
  showFaliureToast,
} from '../../../../../helpers/AppToasts';
import {
  mapAPICallError,
  responseHasError,
  isUnAuthenticatedUser,
} from '../../../../../utils/HelperFunctions';
import Applogger from '../../../../../helpers/AppLogger';
import AppRoutes from '../../../../../helpers/AppRoutes';
import Header from '../../../../../components/headers/Header';
import SFLoader from '../../../../../components/loaders/SFLoader';

export default function AddFolder({navigation}) {
  const dispatch = useDispatch();

  const {loading} = useSelector(state => state.DocumentsReducer);

  return (
    <View style={styles.container}>
      {loading && <SFLoader />}
      <Header
        title="Add Folder"
        backButton={true}
        onBackPress={() => navigation.goBack()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
