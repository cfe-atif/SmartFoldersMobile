import React from 'react';
import {StyleSheet, View} from 'react-native';
import AppColors from '../../../../../../helpers/AppColors';
import AppFontSize from '../../../../../../helpers/AppFontSize';
import AppFontFamily from '../../../../../../helpers/AppFontFamily';
import Header from '../../../../../../components/headers/Header';
import SFNoRecord from '../../../../../../components/texts/SFNoRecord';

export default function CheckoutDocument({navigation}) {
  return (
    <View style={styles.container}>
      <Header
        title="Checkout Document"
        backButton={true}
        onBackPress={() => navigation.goBack()}
      />
      <View style={styles.intContainer}>
        <SFNoRecord title="Note" containerStyle={styles.note} />
        <SFNoRecord
          title="Please visit website to checkout document"
          textStyle={styles.desc}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  intContainer: {
    margin: 5,
  },
  desc: {
    marginHorizontal: 10,
    color: AppColors.gray,
    fontSize: AppFontSize.size14,
    fontFamily: AppFontFamily.semiBold,
  },
  note: {
    marginBottom: 0,
  },
});
