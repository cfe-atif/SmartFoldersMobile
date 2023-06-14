import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {get} from 'lodash';
import AppColors from '../../../../../../../helpers/AppColors';
import Applogger from '../../../../../../../helpers/AppLogger';
import AppFontSize from '../../../../../../../helpers/AppFontSize';
import AppFontFamily from '../../../../../../../helpers/AppFontFamily';
import Separator from '../../../../../../../components/seperator/Separator';
import PrimaryTextField from '../../../../../../../components/textFields/PrimaryTextField';
import PrimaryButton from '../../../../../../../components/buttons/PrimaryButton';

export default function FOI({viewPropertiesData}) {
  const [documentRequest, setDocumentRequest] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.intContainer}>
        <Text style={styles.title}>Requests:</Text>
        {Array.isArray(
          get(viewPropertiesData, 'Document.FreedomOfInformation.Request', []),
        ) &&
          get(
            viewPropertiesData,
            'Document.FreedomOfInformation.Request',
            [],
          ).map((request, index) => {
            return (
              <Text key={index} style={styles.desc}>
                {request}
              </Text>
            );
          })}
        {typeof get(viewPropertiesData, 'Document.FreedomOfInformation', '') ==
          'object' && (
          <Text style={styles.desc}>
            {get(
              viewPropertiesData,
              'Document.FreedomOfInformation.Request',
              '',
            )}
          </Text>
        )}
        {typeof get(viewPropertiesData, 'Document.FreedomOfInformation', '') ==
          'string' && <Text style={styles.desc}>{'No request on system'}</Text>}
      </View>
      <Separator />
      <View style={styles.intContainer}>
        <Text style={styles.title}>Add a to Document Request:</Text>
        <PrimaryTextField
          value={documentRequest}
          onChange={text => {
            setDocumentRequest(text);
          }}
        />
        <PrimaryButton title="Add" onPress={() => Applogger('Pressed Add')} />
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
