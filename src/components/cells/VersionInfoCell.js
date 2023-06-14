import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {get} from 'lodash';
import AppColors from '../../helpers/AppColors';
import AppFontSize from '../../helpers/AppFontSize';
import AppFontFamily from '../../helpers/AppFontFamily';

export default function VersionInfoCell({versionInfo, checkoutDetails}) {
  const {MajorMinor, FullName, Comment, Status1, Date} = versionInfo;

  return (
    <View style={styles.container}>
      <View style={styles.intContainer}>
        <Text style={styles.title}>Version No:</Text>
        <Text style={styles.desc}>{parseInt(MajorMinor).toFixed(1)}</Text>
      </View>
      <View style={styles.intContainer}>
        <Text style={styles.title}>User:</Text>
        <Text style={styles.desc}>{FullName}</Text>
      </View>
      <View style={styles.intContainer}>
        <Text style={styles.title}>Comment:</Text>
        <Text style={styles.desc}>{Comment ? Comment : 'N/A'}</Text>
      </View>
      <View style={styles.intContainer}>
        <Text style={styles.title}>Status:</Text>
        <Text style={styles.desc}>{get(Status1, 'Label', 'N/A')}</Text>
      </View>
      <View style={styles.intContainer}>
        <Text style={styles.title}>Issue Date:</Text>
        <Text style={styles.desc}>{Date}</Text>
      </View>
      <View style={styles.intContainer}>
        <Text style={styles.title}>Checked out to:</Text>
        <Text style={styles.desc}>{checkoutDetails}</Text>
      </View>
      <View style={styles.intContainer}>
        <Text style={styles.title}>View:</Text>
        <Text style={styles.desc}>Need to add dropdown</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: AppColors.gray,
    backgroundColor: AppColors.white,
  },
  intContainer: {
    marginVertical: 5,
    flexDirection: 'row',
  },
  title: {
    flex: 1,
    marginHorizontal: 10,
    color: AppColors.black,
    fontSize: AppFontSize.size14,
    fontFamily: AppFontFamily.semiBold,
  },
  desc: {
    flex: 2,
    marginHorizontal: 10,
    color: AppColors.gray,
    fontSize: AppFontSize.size14,
    fontFamily: AppFontFamily.semiBold,
  },
});
