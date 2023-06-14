import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {get} from 'lodash';
import AppColors from '../../../../../../../helpers/AppColors';
import AppFontSize from '../../../../../../../helpers/AppFontSize';
import AppFontFamily from '../../../../../../../helpers/AppFontFamily';
import Separator from '../../../../../../../components/seperator/Separator';
import SFNoRecord from '../../../../../../../components/texts/SFNoRecord';

export default function Security({viewPropertiesData}) {
  return (
    <View style={styles.container}>
      <View style={styles.intContainer}>
        <Text style={styles.title}>Category:</Text>
        <Text style={styles.desc}>
          {get(viewPropertiesData, 'Document.Security.Category.Name', 'N/A')}
        </Text>
      </View>
      <Separator />
      <View style={styles.intContainer}>
        <SFNoRecord title="Note" containerStyle={styles.note} />
        <SFNoRecord
          title="Please visit website to edit security"
          textStyle={styles.desc}
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
  note: {
    margin: 0,
  },
});
