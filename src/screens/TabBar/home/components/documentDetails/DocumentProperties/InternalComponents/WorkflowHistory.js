import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import WorkflowCell from '../../../../../../../components/cells/WorkflowCell';
import AppFontSize from '../../../../../../../helpers/AppFontSize';
import AppFontFamily from '../../../../../../../helpers/AppFontFamily';
import AppColors from '../../../../../../../helpers/AppColors';

export default function WorkflowHistory() {
  const [selectedBtn, setSelectedBtn] = useState(0);
  return (
    <View style={styles.container}>
      <View style={styles.btnsContainer}>
        <TouchableOpacity
          style={
            selectedBtn == 0 ? styles.btnContainerSelected : styles.btnContainer
          }
          onPress={() => setSelectedBtn(0)}>
          <Text
            style={selectedBtn == 0 ? styles.btnTextSelected : styles.btnText}>
            Current Workflow
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            selectedBtn == 1 ? styles.btnContainerSelected : styles.btnContainer
          }
          onPress={() => setSelectedBtn(1)}>
          <Text
            style={selectedBtn == 1 ? styles.btnTextSelected : styles.btnText}>
            Previous Workflow
          </Text>
        </TouchableOpacity>
      </View>
      <WorkflowCell />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flex: 1,
  },
  btnsContainer: {
    flexDirection: 'row',
  },
  btnContainer: {
    borderBottomColor: AppColors.gray,
    borderBottomWidth: 3,
    paddingBottom: 10,
    marginRight: 10,
  },
  btnText: {
    fontSize: AppFontSize.size14,
    fontFamily: AppFontFamily.semiBold,
    color: AppColors.gray,
  },
  btnContainerSelected: {
    borderBottomColor: AppColors.customBlue,
    borderBottomWidth: 5,
    paddingBottom: 10,
    marginRight: 10,
  },
  btnTextSelected: {
    fontSize: AppFontSize.size14,
    fontFamily: AppFontFamily.bold,
    color: AppColors.customBlue,
  },
});
