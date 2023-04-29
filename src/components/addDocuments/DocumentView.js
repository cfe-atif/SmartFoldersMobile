import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {fieldTypes} from './Constants';
import {unwrapResult} from '@reduxjs/toolkit';
import {useDispatch, useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {get} from 'lodash';
import {
  mapAPICallError,
  responseHasError,
  isUnAuthenticatedUser,
} from '../../utils/HelperFunctions';
import {showSuccessToast, showFaliureToast} from '../../helpers/AppToasts';
import {createNewDocumentData} from '../../redux/reducers/DocumentsReducer';
import moment from 'moment';
import Applogger from '../../helpers/AppLogger';
import AppRoutes from '../../helpers/AppRoutes';
import AppConstants from '../../helpers/AppConstants';
import PrimaryButton from '../buttons/PrimaryButton';
import PrimaryDatePicker from '../textFields/PrimaryDatePicker';
import PrimaryDropDown from '../dropdowns/PrimaryDropDown';
import PrimaryTextField from '../textFields/PrimaryTextField';
import SFLoader from '../loaders/SFLoader';
import SFNoRecord from './../texts/SFNoRecord';

export default function DocumentView({
  navigation,
  selectedDocType,
  folderPath,
}) {
  const dispatch = useDispatch();

  const {user, dataBaseNumber} = useSelector(
    state => state.AuthenticationReducer,
  );
  const {loading, newDocumentData} = useSelector(
    state => state.DocumentsReducer,
  );

  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [addDocumentBody, setAddDocumentBody] = useState({
    title: '',
    subject: '',
    description: '',
    receivedDate: new Date(),
    addressee: '',
    recordType: '',
  });

  useEffect(() => {
    handleCreateNewDocumentData();
  }, [selectedDocType]);

  const handleCreateNewDocumentData = () => {
    dispatch(
      createNewDocumentData({
        bunPath: folderPath,
        dataBaseNumber: dataBaseNumber,
        user: get(user, 'No', ''),
        docTypeNo: get(selectedDocType, 'no', ''),
      }),
    )
      .then(unwrapResult)
      .then(res => {
        if (isUnAuthenticatedUser(res)) {
          navigation.navigate(AppRoutes.Login);
          showFaliureToast('Error', mapAPICallError(res));
        } else {
          if (responseHasError(res)) {
            showFaliureToast('Error', mapAPICallError(res));
          }
        }
        Applogger('Response at createNewDocumentData', res);
      })
      .catch(err => {
        Applogger('Error at createNewDocumentData', err);
        showFaliureToast('Error', mapAPICallError(err));
      });
  };

  const handleAddDocument = () => {
    Applogger('Called handleAddDocument');
  };

  const documentFields = Array.isArray(
    get(newDocumentData, 'Document.Fields.User.Field', []),
  )
    ? get(newDocumentData, 'Document.Fields.User.Field', [])
    : [get(newDocumentData, 'Document.Fields.User.Field', [])];

  return (
    <View style={styles.container}>
      {newDocumentData ? (
        <View style={{flex: 1}}>
          <KeyboardAwareScrollView>
            {get(newDocumentData, 'Document.Fields.User', null) &&
              documentFields.map((document, index) => {
                if (get(document, 'Type', '') == fieldTypes.edit) {
                  return (
                    <PrimaryTextField
                      key={index}
                      placeholder={get(document, 'Label', '')}
                      value={addDocumentBody.title}
                      onChange={text =>
                        setAddDocumentBody({...addDocumentBody, title: text})
                      }
                    />
                  );
                } else if (get(document, 'Type', '') == fieldTypes.date) {
                  return (
                    <PrimaryDatePicker
                      placeholder={get(document, 'Label', '')}
                      openDatePicker={openDatePicker}
                      setOpenDatePicker={setOpenDatePicker}
                      date={addDocumentBody.receivedDate}
                      dateMode={AppConstants.datePicker.dateTime}
                      value={moment(addDocumentBody.receivedDate).format(
                        AppConstants.dateTimeFormat,
                      )}
                      onChange={date =>
                        setAddDocumentBody({
                          ...addDocumentBody,
                          receivedDate: date,
                        })
                      }
                    />
                  );
                } else if (get(document, 'Type', '') == fieldTypes.combo) {
                  return null;
                } else if (get(document, 'Type', '') == fieldTypes.checkbox) {
                  return null;
                } else if (get(document, 'Type', '') == fieldTypes.radioGroup) {
                  return null;
                } else if (get(document, 'Type', '') == fieldTypes.grid) {
                  return null;
                } else {
                  return null;
                }
              })}
          </KeyboardAwareScrollView>
          <PrimaryButton title="Add" onPress={() => handleAddDocument()} />
        </View>
      ) : loading ? (
        <SFNoRecord title="Getting Data" />
      ) : (
        <SFNoRecord title={'Record not found'} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '75%',
  },
});
