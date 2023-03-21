import React from 'react';
import {StyleSheet, View} from 'react-native';
import Header from './../../../components/headers/Header';
import SettingsCell from './../../../components/cells/SettingsCell';
import AppRoutes from './../../../helpers/AppRoutes';

export default function Settings({navigation}) {
  const handleChangePassword = () => {
    navigation.navigate(AppRoutes.ChangePassword);
  };

  const handleLogout = () => {
    navigation.navigate(AppRoutes.Login);
  };

  return (
    <View style={styles.container}>
      <Header title="Settings" />
      <View>
        <SettingsCell
          title={'Change Password'}
          onPress={() => handleChangePassword()}
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
