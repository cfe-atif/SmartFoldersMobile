import React from 'react';
import {StyleSheet, View} from 'react-native';
import PrimaryTextField from './../../../../components/textFields/PrimaryTextField';
import PrimaryButton from './../../../../components/buttons/PrimaryButton';

export default function AddDocument() {
  const handleAddDocument = () => {};

  return (
    <View style={styles.container}>
      <PrimaryTextField placeholder="Title" />
      <PrimaryTextField placeholder="Subject" />
      <PrimaryTextField placeholder="Description" />
      <PrimaryTextField placeholder="Received Date" />
      <PrimaryTextField placeholder="Addressee" />
      <PrimaryTextField placeholder="Declared as Record Type" />
      <PrimaryButton title="Add" onPress={() => handleAddDocument()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
