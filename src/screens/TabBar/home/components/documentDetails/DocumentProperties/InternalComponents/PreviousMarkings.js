import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function PreviousMarkings() {
  return (
    <View style={styles.container}>
      <Text>Work in Progress</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    alignItems: 'center',
  },
});
