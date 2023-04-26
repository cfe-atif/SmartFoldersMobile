import React, {useEffect, useState} from 'react';
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

export default function DocumentView({selectedDocType, folderPath}) {
  const dispatch = useDispatch();

  const {user, dataBaseNumber} = useSelector(
    state => state.AuthenticationReducer,
  );
  const {treeData, newDocumentData, loading} = useSelector(
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
    console.log('====================================');
    console.log('user: ', user);
    console.log('====================================');
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

  return (
    <KeyboardAwareScrollView>
      {loading && <SFLoader />}
      {newDocumentData ? (
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
      ) : loading ? (
        <SFNoRecord title="Getting Data" />
      ) : (
        <SFNoRecord title={'Record not found'} />
      )}
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
