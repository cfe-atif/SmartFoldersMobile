import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {decalreOptions} from './Constants';
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
import moment from 'moment';
import Applogger from '../../helpers/AppLogger';
import AppConstants from '../../helpers/AppConstants';
import PrimaryButton from '../buttons/PrimaryButton';
import PrimaryDatePicker from '../textFields/PrimaryDatePicker';
import PrimaryDropDown from '../dropdowns/PrimaryDropDown';
import PrimaryTextField from './../textFields/PrimaryTextField';
import SFLoader from '../loaders/SFLoader';

export default function GeneralDocument() {
  const dispatch = useDispatch();

  const {user, dataBaseNumber} = useSelector(
    state => state.AuthenticationReducer,
  );
  const {treeData, documentType, loading} = useSelector(
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

  const handleAddDocument = () => {
    Applogger('Called handleAddDocument');
  };

  return (
    <KeyboardAwareScrollView>
      {loading && <SFLoader />}
      <View style={styles.container}>
        <PrimaryTextField
          placeholder="Title"
          value={addDocumentBody.title}
          onChange={text =>
            setAddDocumentBody({...addDocumentBody, title: text})
          }
        />
        <PrimaryTextField
          placeholder="Subject"
          value={addDocumentBody.subject}
          onChange={text =>
            setAddDocumentBody({...addDocumentBody, subject: text})
          }
        />
        <PrimaryTextField
          placeholder="Description"
          value={addDocumentBody.description}
          onChange={text =>
            setAddDocumentBody({...addDocumentBody, description: text})
          }
        />
        <PrimaryDatePicker
          placeholder="Received Date"
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
        <PrimaryTextField
          placeholder="Addressee"
          value={addDocumentBody.addressee}
          onChange={text =>
            setAddDocumentBody({...addDocumentBody, addressee: text})
          }
        />
        <PrimaryDropDown
          title="Declared as Record Type"
          options={decalreOptions}
          setSelected={declareType =>
            setAddDocumentBody({...addDocumentBody, recordType: declareType})
          }
        />
        <PrimaryButton title="Add" onPress={() => handleAddDocument()} />
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
