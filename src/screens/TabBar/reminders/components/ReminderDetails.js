import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {unwrapResult} from '@reduxjs/toolkit';
import {get} from 'lodash';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ReminderDocumentView} from './../../../../components/cells/ReminderCell';
import moment from 'moment';
import Header from '../../../../components/headers/Header';
import ReminderDetailCell from '../../../../components/cells/ReminderDetailCell';
import AppColors from './../../../../helpers/AppColors';
import AppConstants from './../../../../helpers/AppConstants';

export default function ReminderDetails({navigation, route}) {
  const dispatch = useDispatch();

  const selectedReminder = get(route, 'params.selectedReminder', null);

  return (
    <View style={styles.container}>
      <Header
        title="Reminder Details"
        backButton={true}
        onBackPress={() => navigation.goBack()}
      />
      <KeyboardAwareScrollView>
        {get(selectedReminder, 'DocumentNo', '') && (
          <ReminderDocumentView
            addStyle={styles.docView}
            // docIcon={require(`../../../../assets/docImages/${get(
            //   selectedReminder,
            //   'DocumentExtention',
            //   '',
            // )}.png`)}
            docIcon={require(`../../../../assets/docImages/${'copy'}.png`)}
            dbName={get(selectedReminder, 'Database.Name', '')}
            subject={get(selectedReminder, 'DocumentTitle', '')}
          />
        )}
        <ReminderDetailCell
          title={'Subject'}
          description={get(selectedReminder, 'Subject', '')}
        />
        <ReminderDetailCell
          title={'Details'}
          description={get(selectedReminder, 'Details', '')}
        />
        <ReminderDetailCell
          title={'State'}
          description={get(selectedReminder, 'State', '')}
        />
        <ReminderDetailCell
          title={'Alert Date'}
          description={
            get(selectedReminder, 'AlertDate', '') &&
            moment(get(selectedReminder, 'AlertDate', '')).format(
              AppConstants.dateTimeFormat,
            )
          }
        />
        <ReminderDetailCell
          title={'Due Date'}
          description={moment(get(selectedReminder, 'DueDate', '')).format(
            AppConstants.dateTimeFormat,
          )}
        />
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  docView: {
    margin: 50,
  },
});
