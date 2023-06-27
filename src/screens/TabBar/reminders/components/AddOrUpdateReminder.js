import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {unwrapResult} from '@reduxjs/toolkit';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  pickerTypes,
  reminderActions,
  reminderStates,
  reminderPeriods,
} from '../Constants';
import {get} from 'lodash';
import {
  mapAPICallError,
  isUnAuthenticatedUser,
  responseHasError,
} from '../../../../utils/HelperFunctions';
import {
  addOrUpdateReminderRequest,
  getRemindersList,
  getUpcomingRemindersList,
} from '../../../../redux/reducers/RemindersReducer';
import {
  showSuccessToast,
  showFaliureToast,
} from '../../../../helpers/AppToasts';
import moment from 'moment';
import Applogger from '../../../../helpers/AppLogger';
import AppConstants from '../../../../helpers/AppConstants';
import ReminderDocView from './ReminderDocView';
import Header from '../../../../components/headers/Header';
import PrimaryTextField from '../../../../components/textFields/PrimaryTextField';
import PrimaryButton from '../../../../components/buttons/PrimaryButton';
import PrimaryDatePicker from './../../../../components/textFields/PrimaryDatePicker';
import SFLoader from './../../../../components/loaders/SFLoader';
import ReminderDropDown from './../../../../components/dropdowns/ReminderDropDown';
import AppImages from '../../../../helpers/AppImages';

export default function AddOrUpdateReminder({navigation, route}) {
  const dispatch = useDispatch();

  const {user} = useSelector(state => state.AuthenticationReducer);
  const {loading} = useSelector(state => state.RemindersReducer);

  const selectedDocument = get(route, 'params.selectedDocument', null);
  const reminderToUpdate = get(route, 'params.reminderToUpdate', null);

  const [headerTitle, setHeaderTitle] = useState('Add Reminder');
  const [pickerType, setPickerType] = useState(false);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [addReminderBody, setAddReminderBody] = useState({
    SUBJECT: '',
    DETAILS: '',
    DUE_DATE: new Date(),
    ALERT_DATE: new Date(),
    ALERT_DATE_VALUE: null,
    DATABASE: get(selectedDocument, 'DatabaseNo', ''),
    DOC_NUM: get(selectedDocument, 'DocumentNo', ''),
    ID: null,
    STATE: reminderStates.open,
  });

  useEffect(() => {
    handleInitialValues();
  }, []);

  const handleInitialValues = () => {
    if (reminderToUpdate) {
      setHeaderTitle('Update Reminder');
      addReminderBody.SUBJECT = get(reminderToUpdate, 'Subject', '');
      addReminderBody.DETAILS = get(reminderToUpdate, 'Details', '');
      addReminderBody.DUE_DATE = new Date(get(reminderToUpdate, 'DueDate', ''));
      addReminderBody.ALERT_DATE = new Date(
        get(reminderToUpdate, 'AlertDate', ''),
      );
      addReminderBody.ALERT_DATE_VALUE = get(reminderToUpdate, 'AlertDate', '')
        ? get(reminderToUpdate, 'AlertDate', '')
        : null;
      addReminderBody.STATE = get(reminderToUpdate, 'State', '');
      addReminderBody.DATABASE = get(reminderToUpdate, 'Database.Name', '');
      addReminderBody.DOC_NUM = get(reminderToUpdate, 'DocumentNo', '');
      addReminderBody.ID = get(reminderToUpdate, 'ID', '');
    }
  };

  const handleSuccessToastAndLogs = (message, res) => {
    Applogger('Response at ' + message, res);
    if (isUnAuthenticatedUser(res)) {
      navigation.navigate(AppRoutes.Login);
      showFaliureToast(mapAPICallError(res));
    }
  };

  const handleFaliureToastAndLogs = (message, err) => {
    Applogger('Error at ' + message, err);
    if (isUnAuthenticatedUser(err)) {
      navigation.navigate(AppRoutes.Login);
      showFaliureToast(mapAPICallError(err));
    }
  };

  const getReminderBody = () => {
    const reminderBody = {
      ACTION_TYPE: reminderToUpdate
        ? reminderActions.update
        : reminderActions.add,
      USER: user.No,
      STATE: addReminderBody.STATE,
      SUBJECT: addReminderBody.SUBJECT,
      DETAILS: addReminderBody.DETAILS,
      DUE_DATE: moment(addReminderBody.DUE_DATE).format(
        AppConstants.dateTimeFormatAPI,
      ),
      ALERT_DATE: addReminderBody.ALERT_DATE_VALUE
        ? moment(addReminderBody.ALERT_DATE_VALUE).format(
            AppConstants.dateTimeFormatAPI,
          )
        : null,
      DATABASE: addReminderBody.DATABASE,
      DOC_NUM: addReminderBody.DOC_NUM,
      REMINDER_ID: addReminderBody.ID,
    };
    return reminderBody;
  };

  const handleAddOrUpdateReminderRequest = () => {
    const reminderBody = getReminderBody();
    dispatch(addOrUpdateReminderRequest({reminderBody}))
      .then(unwrapResult)
      .then(res => {
        handleSuccessToastAndLogs('addOrUpdateReminderRequest', res);
        if (!responseHasError(res)) {
          handleGetRemindersList(reminderPeriods.all);
          handleGetUpcomingRemindersList();
          showSuccessToast(
            `Reminder ${reminderToUpdate ? 'updated' : 'added'} successfully`,
          );
          navigation.goBack();
        } else {
          if (responseHasError(res)) {
            showFaliureToast(res.Error);
          }
        }
      })
      .catch(err => {
        handleFaliureToastAndLogs('addOrUpdateReminderRequest', err);
      });
  };

  const handleGetRemindersList = reminderPeriod => {
    const getRemindersBody = {
      ACTION_TYPE: reminderActions.list,
      USER: user.No,
    };
    dispatch(getRemindersList({getRemindersBody, reminderPeriod}))
      .then(unwrapResult)
      .then(res => {
        handleSuccessToastAndLogs('getRemindersList', res);
        if (!responseHasError(res)) {
        }
      })
      .catch(err => {
        handleFaliureToastAndLogs('getRemindersList', err);
      });
  };

  const handleGetUpcomingRemindersList = () => {
    const upcomingRemindersBody = {
      ACTION_TYPE: reminderActions.upcoming,
      USER: user.No,
    };
    dispatch(getUpcomingRemindersList({upcomingRemindersBody}))
      .then(unwrapResult)
      .then(res => {
        handleSuccessToastAndLogs('getUpcomingRemindersList', res);
        if (!responseHasError(res)) {
          if (res.hasOwnProperty('Reminders')) {
            if (res.Reminders.Reminder) {
            }
          }
        }
      })
      .catch(err => {
        handleFaliureToastAndLogs('getUpcomingRemindersList', err);
      });
  };

  const handleAddPress = () => {
    if (!addReminderBody.SUBJECT || !addReminderBody.DETAILS) {
      showFaliureToast('Fields Error', 'Please fill all fields');
    } else {
      handleAddOrUpdateReminderRequest();
    }
  };

  return (
    <View style={styles.container}>
      {loading && <SFLoader />}
      <Header
        title={headerTitle}
        backButton={true}
        onBackPress={() => navigation.goBack()}
      />
      <KeyboardAwareScrollView style={styles.fieldsContainer}>
        {selectedDocument && (
          <ReminderDocView
            title={get(selectedDocument, 'Database', '')}
            description={get(selectedDocument, 'DocumentTitle', '')}
            suffix={`${
              AppImages[get(selectedDocument, 'DocumentExtention', '')]
            }`}
          />
        )}
        <PrimaryTextField
          placeholder="Subject"
          value={addReminderBody.SUBJECT}
          onChange={text =>
            setAddReminderBody({...addReminderBody, SUBJECT: text})
          }
        />
        <PrimaryTextField
          multiline={true}
          placeholder="Details"
          value={addReminderBody.DETAILS}
          onChange={text =>
            setAddReminderBody({...addReminderBody, DETAILS: text})
          }
        />
        <PrimaryDatePicker
          placeholder="Due Date"
          openDatePicker={openDatePicker && pickerType === pickerTypes.dueDate}
          setOpenDatePicker={status => {
            setOpenDatePicker(status);
            setPickerType(pickerTypes.dueDate);
          }}
          date={addReminderBody.DUE_DATE}
          dateMode={AppConstants.datePicker.dateTime}
          value={
            addReminderBody.DUE_DATE &&
            moment(addReminderBody.DUE_DATE).format(AppConstants.dateTimeFormat)
          }
          onChange={date =>
            setAddReminderBody({
              ...addReminderBody,
              DUE_DATE: date,
            })
          }
        />
        <PrimaryDatePicker
          placeholder="Alert Date"
          openDatePicker={
            openDatePicker && pickerType === pickerTypes.alertDate
          }
          setOpenDatePicker={status => {
            setOpenDatePicker(status);
            setPickerType(pickerTypes.alertDate);
          }}
          date={addReminderBody.ALERT_DATE}
          dateMode={AppConstants.datePicker.dateTime}
          value={
            addReminderBody.ALERT_DATE_VALUE &&
            moment(addReminderBody.ALERT_DATE_VALUE).format(
              AppConstants.dateTimeFormat,
            )
          }
          onChange={date =>
            setAddReminderBody({
              ...addReminderBody,
              ALERT_DATE_VALUE: date,
              ALERT_DATE: date,
            })
          }
        />
        {reminderToUpdate && (
          <ReminderDropDown
            title="Set State"
            defaultKey={get(reminderToUpdate, 'State', '')}
            defaultValue={get(reminderToUpdate, 'State', '').toUpperCase()}
            options={[
              {
                key: 'DISMISS',
                value: 'Dismiss',
              },
              {
                key: 'COMPLETE',
                value: 'Complete',
              },
              {
                key: 'OPEN',
                value: 'Open',
              },
            ]}
            setSelected={state =>
              setAddReminderBody({
                ...addReminderBody,
                STATE: state,
              })
            }
          />
        )}
      </KeyboardAwareScrollView>
      <PrimaryButton title="Save" onPress={() => handleAddPress()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fieldsContainer: {
    flex: 1,
  },
});
