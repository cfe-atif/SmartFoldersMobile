import React from 'react';
import {StyleSheet, View} from 'react-native';
import {get} from 'lodash';
import Header from '../../../../../components/headers/Header';

export default function EditDocument({navigation, route}) {
  const selectedDocument = get(route, 'params.selectedDocument', null);

  return (
    <View style={styles.container}>
      <Header
        title="Edit Document"
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
