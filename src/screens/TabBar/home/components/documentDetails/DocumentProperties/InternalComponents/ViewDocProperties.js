import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {get} from 'lodash';
import AppColors from '../../../../../../../helpers/AppColors';
import Applogger from '../../../../../../../helpers/AppLogger';
import AppFontSize from '../../../../../../../helpers/AppFontSize';
import AppFontFamily from '../../../../../../../helpers/AppFontFamily';
import Separator from '../../../../../../../components/seperator/Separator';
import PrimaryButton from '../../../../../../../components/buttons/PrimaryButton';

export default function ViewDocProperties({viewPropertiesData}) {
  return (
    <View style={styles.container}>
      <View style={styles.intContainer}>
        <Text style={styles.title}>Created Date:</Text>
        <Text style={styles.desc}>
          {get(viewPropertiesData, 'Document.Created_Date', 'N/A')}
        </Text>
      </View>
      <View style={styles.intContainer}>
        <Text style={styles.title}>Created By:</Text>
        <Text style={styles.desc}>
          {get(viewPropertiesData, 'Document.Creator', 'N/A')}
        </Text>
      </View>
      <View style={styles.intContainer}>
        <Text style={styles.title}>Metadata amended date:</Text>
        <Text style={styles.desc}>
          {get(viewPropertiesData, 'Document.Amended_Date', 'N/A')}
        </Text>
      </View>
      <View style={styles.intContainer}>
        <Text style={styles.title}>Metadata amended by:</Text>
        <Text style={styles.desc}>
          {get(viewPropertiesData, 'Document.Amendor', 'N/A')}
        </Text>
      </View>
      <Separator />
      <View style={styles.intContainer}>
        <Text style={styles.title}>Checked out date:</Text>
        <Text style={styles.desc}>{'None'}</Text>
      </View>
      <View style={styles.intContainer}>
        <Text style={styles.title}>Checked out by:</Text>
        <Text style={styles.desc}>{'Nobody'}</Text>
      </View>
      <Separator />
      <View style={styles.intContainer}>
        <Text style={styles.title}>Folders:</Text>
        <Text style={styles.desc}>
          {get(
            viewPropertiesData,
            'Document.BundleList.Bundle.BundleListName',
            'N/A',
          )}
        </Text>
      </View>
      <Separator />
      <View style={styles.intContainer}>
        <Text style={styles.title}>Declare Document as record</Text>
        <PrimaryButton
          title="Declare"
          onPress={() => Applogger('Pressed Declare')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  intContainer: {
    margin: 5,
  },
  title: {
    marginHorizontal: 10,
    color: AppColors.black,
    fontSize: AppFontSize.size14,
    fontFamily: AppFontFamily.semiBold,
  },
  desc: {
    marginHorizontal: 10,
    color: AppColors.gray,
    fontSize: AppFontSize.size14,
    fontFamily: AppFontFamily.semiBold,
  },
});
