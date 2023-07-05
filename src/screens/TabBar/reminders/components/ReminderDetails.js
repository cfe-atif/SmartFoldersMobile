import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {unwrapResult} from '@reduxjs/toolkit';
import {get} from 'lodash';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ReminderDocumentView} from './../../../../components/cells/ReminderCell';
import {reminderActions, reminderStates} from '../Constants';
import {
  deleteReminderRequest,
  setReminderStateRequest,
} from '../../../../redux/reducers/RemindersReducer';
import {
  responseHasError,
  isUnAuthenticatedUser,
  mapAPICallError,
} from '../../../../utils/HelperFunctions';
import {
  showFaliureToast,
  showSuccessToast,
} from '../../../../helpers/AppToasts';
import moment from 'moment';
import Header from '../../../../components/headers/Header';
import ReminderDetailCell from '../../../../components/cells/ReminderDetailCell';
import AppColors from './../../../../helpers/AppColors';
import AppConstants from './../../../../helpers/AppConstants';
import ReminderFilterButton from './../../../../components/buttons/ReminderFilterButton';
import Applogger from './../../../../helpers/AppLogger';
import AppRoutes from '../../../../helpers/AppRoutes';

export default function ReminderDetails({navigation, route}) {
  const dispatch = useDispatch();

  const {user} = useSelector(state => state.AuthenticationReducer);

  const selectedReminder = get(route, 'params.selectedReminder', null);

  const handleEditPress = () => {
    Applogger('Clicked Edit');
    navigation.navigate(AppRoutes.AddOrUpdateReminder, {
      reminderToUpdate: selectedReminder,
    });
  };

  const handleDeletePress = () => {
    Applogger('Clicked Edit');
    const deleteReminderBody = {
      ACTION_TYPE: reminderActions.delete,
      USER: user.No,
      REMINDER_ID: get(selectedReminder, 'ID', ''),
    };
    dispatch(deleteReminderRequest({deleteReminderBody}))
      .then(unwrapResult)
      .then(res => {
        handleSuccessToastAndLogs('deleteReminderRequest', res);
        if (responseHasError(res)) {
          showFaliureToast('Unable to delete reminder');
        } else {
          showSuccessToast('Success', 'Reminder Deleted Successfully');
          navigation.goBack();
        }
      })
      .catch(err => {
        handleFaliureToastAndLogs('deleteReminderRequest', err);
      });
  };

  const handleCompletePress = () => {
    Applogger('Clicked Edit');
    const setReminderBody = {
      ACTION_TYPE: reminderActions.setState,
      USER: user.No,
      REMINDER_ID: get(selectedReminder, 'ID', ''),
      STATE: reminderStates.completed,
    };
    dispatch(setReminderStateRequest({setReminderBody}))
      .then(unwrapResult)
      .then(res => {
        handleSuccessToastAndLogs('setReminderStateRequest', res);
        if (!responseHasError(res)) {
          showSuccessToast('Success', 'Reminder Status Updated Successfully');
          navigation.goBack();
        }
      })
      .catch(err => {
        handleFaliureToastAndLogs('setReminderStateRequest', err);
      });
  };

  const handleSuccessToastAndLogs = (message, res) => {
    Applogger('Response at ' + message, res);
    if (isUnAuthenticatedUser(res)) {
      navigation.navigate(AppRoutes.Login);
      showFaliureToast('Error', mapAPICallError(res));
    }
  };

  const handleFaliureToastAndLogs = (message, err) => {
    Applogger('Error at ' + message, err);
    if (isUnAuthenticatedUser(err)) {
      navigation.navigate(AppRoutes.Login);
      showFaliureToast(mapAPICallError(err));
    }
  };

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
        <View style={styles.buttonsContainer}>
          <ReminderFilterButton
            selected={true}
            title={'Edit'}
            onPress={() => handleEditPress()}
          />
          <ReminderFilterButton
            selected={true}
            title={'Delete'}
            onPress={() => handleDeletePress()}
          />
          <ReminderFilterButton
            selected={true}
            title={'Complete'}
            onPress={() => handleCompletePress()}
          />
        </View>
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
    alignSelf: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
});
