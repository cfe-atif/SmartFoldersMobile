import React from 'react';
import {StyleSheet, View} from 'react-native';
import Header from '../../../../../components/headers/Header';

export default function AddFolder({navigation}) {
  return (
    <View style={styles.container}>
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
