import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {get} from 'lodash';
import {showFaliureToast} from '../../../../../helpers/AppToasts';
import {useDispatch, useSelector} from 'react-redux';
import {unwrapResult} from '@reduxjs/toolkit';
import {
  mapAPICallError,
  isUnAuthenticatedUser,
} from '../../../../../utils/HelperFunctions';
import {getViewPropertiesData} from '../../../../../redux/reducers/DocumentsReducer';
import Header from '../../../../../components/headers/Header';

export default function DocumentProperties({navigation, route}) {
  const dispatch = useDispatch();

  const {user, dataBaseNumber} = useSelector(
    state => state.AuthenticationReducer,
  );

  const {folders, loading} = useSelector(state => state.DocumentsReducer);

  const selectedDocument = get(route, 'params.selectedDocument', null);

  useEffect(() => {
    console.log('====================================');
    console.log('selectedDocument:', selectedDocument);
    console.log('====================================');

    // handleViewPropertiesData();
  }, []);

  const handleViewPropertiesData = (DB, USER, HIT, BUN, DocType) => {
    dispatch(getViewPropertiesData({DB, USER, HIT, BUN, DocType}))
      .then(unwrapResult)
      .then(res => {
        Applogger('Response at getViewPropertiesData', res);
        if (isUnAuthenticatedUser(res)) {
          navigation.navigate(AppRoutes.Login);
          showFaliureToast(mapAPICallError(res));
        }
      })
      .catch(err => {
        if (isUnAuthenticatedUser(err)) {
          navigation.navigate(AppRoutes.Login);
          showFaliureToast(mapAPICallError(err));
        }
        Applogger('Error at getViewPropertiesData', err);
      });
  };
  return (
    <View style={styles.container}>
      <Header
        title="Document Properties"
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
