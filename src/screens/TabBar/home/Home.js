import React from 'react';
import {StyleSheet, View} from 'react-native';
import Header from './../../../components/headers/Header';

export default function Home() {
  return (
    <View style={styles.container}>
      <Header title="Home" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
