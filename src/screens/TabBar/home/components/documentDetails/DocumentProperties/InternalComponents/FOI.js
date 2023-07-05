import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {get} from 'lodash';
import {useDispatch} from 'react-redux';
import {unwrapResult} from '@reduxjs/toolkit';
import {addDocumentRequest} from '../../../../../../../redux/reducers/DocumentsReducer';
import {
  responseHasError,
  mapAPICallError,
  isUnAuthenticatedUser,
} from '../../../../../../../utils/HelperFunctions';
import {
  showSuccessToast,
  showFaliureToast,
} from '../../../../../../../helpers/AppToasts';
import AppRoutes from '../../../../../../../helpers/AppRoutes';
import AppColors from '../../../../../../../helpers/AppColors';
import Applogger from '../../../../../../../helpers/AppLogger';
import AppConstants from '../../../../../../../helpers/AppConstants';
import AppFontSize from '../../../../../../../helpers/AppFontSize';
import AppFontFamily from '../../../../../../../helpers/AppFontFamily';
import Separator from '../../../../../../../components/seperator/Separator';
import PrimaryTextField from '../../../../../../../components/textFields/PrimaryTextField';
import PrimaryButton from '../../../../../../../components/buttons/PrimaryButton';

export default function FOI({viewPropertiesData, navigation}) {
  const dispatch = useDispatch();

  const [documentRequest, setDocumentRequest] = useState('');

  const handleAddDocumentRequest = () => {
    if (!documentRequest) {
      showFaliureToast('Field Error', 'Please enter request to continue');
      return;
    }

    let HIT = viewPropertiesData.Document.Hit;
    let DB = viewPropertiesData.Document.DB;
    let USER = viewPropertiesData.User;
    let DocType = viewPropertiesData.Document.DocType;
    let REQUEST = documentRequest;

    dispatch(addDocumentRequest({HIT, DB, USER, DocType, REQUEST}))
      .then(unwrapResult)
      .then(res => {
        Applogger('Response at addDocumentRequest', res);
        if (!responseHasError(res)) {
          showSuccessToast('Success', AppConstants.toastMessages.addFOISuccess);
          setDocumentRequest('');
        } else {
          if (isUnAuthenticatedUser(res)) {
            navigation.navigate(AppRoutes.Login);
            showFaliureToast('Error', mapAPICallError(res));
          } else {
            var errorMessage = responseHasError(res)
              ? res.Error
              : 'Something Wrong';
            showFaliureToast(errorMessage);
          }
        }
      })
      .catch(err => {
        if (isUnAuthenticatedUser(err)) {
          navigation.navigate(AppRoutes.Login);
          showFaliureToast(mapAPICallError(err));
        } else {
          showFaliureToast(AppConstants.toastMessages.addFOIFailed);
        }
        Applogger('Error at addDocumentRequest', err);
      });
  };

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
        <PrimaryButton title="Add" onPress={() => handleAddDocumentRequest()} />
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
