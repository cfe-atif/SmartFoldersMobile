import React from 'react';
import {StyleSheet, View} from 'react-native';
import Header from '../../../../components/headers/Header';

export default function ReminderDetails({navigation}) {
  return (
    <View style={styles.container}>
      <Header
        title="Reminder Details"
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
