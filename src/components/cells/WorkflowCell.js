import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AppColors from '../../helpers/AppColors';
import AppFontSize from '../../helpers/AppFontSize';
import AppFontFamily from '../../helpers/AppFontFamily';

export default function WorkflowCell() {
  return (
    <View style={styles.container}>
      {[
        1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 2, 3, 4, 5,
        1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5,
      ].map((item, index) => {
        return <Text style={styles.title}>WorkflowCell</Text>;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    borderColor: AppColors.gray,
  },
  title: {
    fontSize: AppFontSize.size16,
    fontFamily: AppFontFamily.bold,
    marginVertical: 10,
  },
});
