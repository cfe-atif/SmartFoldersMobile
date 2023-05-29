import React from 'react';
import {StyleSheet, View} from 'react-native';
import {get} from 'lodash';
import Header from '../../../../../components/headers/Header';

export default function SignDocument({navigation, route}) {
  const selectedDocument = get(route, 'params.selectedDocument', null);

  return (
    <View style={styles.container}>
      <Header
        title="Sign Document"
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
