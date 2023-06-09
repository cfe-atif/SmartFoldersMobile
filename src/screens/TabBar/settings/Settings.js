import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {unwrapResult} from '@reduxjs/toolkit';
import {logoutUser} from '../../../redux/reducers/AuthenticationReducer';
import {get} from 'lodash';
import Header from './../../../components/headers/Header';
import SettingsCell from './../../../components/cells/SettingsCell';
import AppRoutes from './../../../helpers/AppRoutes';
import Applogger from '../../../helpers/AppLogger';
import SFLoader from './../../../components/loaders/SFLoader';

export default function Settings({navigation}) {
  const dispatch = useDispatch();

  const {user, dataBaseNumber, loading} = useSelector(
    state => state.AuthenticationReducer,
  );

  const handleChangePassword = () => {
    navigation.navigate(AppRoutes.ChangePassword);
  };

  const handleChangeDB = () => {
    navigation.navigate(AppRoutes.SelectDatabase);
  };

  const handleLogout = () => {
    const DB = dataBaseNumber;
    const USER = get(user, 'No', '');
    dispatch(logoutUser({DB, USER}))
      .then(unwrapResult)
      .then(res => {
        Applogger('Response at logoutUser', res);
        navigation.navigate(AppRoutes.Login);
      })
      .catch(err => {
        Applogger('Error at logoutUser', err);
        navigation.navigate(AppRoutes.Login);
      });
  };

  return (
    <View style={styles.container}>
      {loading && <SFLoader />}
      <Header title="Settings" />
      <View>
        <SettingsCell
          title={'Change Password'}
          onPress={() => handleChangePassword()}
        />
        <SettingsCell
          title={'Change Database'}
          onPress={() => handleChangeDB()}
        />
        <SettingsCell title={'Logout'} onPress={() => handleLogout()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
