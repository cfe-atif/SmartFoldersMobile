import AxiosEvent from '../../Api/AxiosEvent';
import Applogger from '../../helpers/AppLogger';
import moment from 'moment';

function apiGetRemindersList(payload) {
  Applogger('Payload at apiGetRemindersList', payload);
  const {reminderPeriod, getRemindersBody} = payload;
  const {ACTION_TYPE, USER} = getRemindersBody;
  const path = `servlets.CH_VaultJson?INT=904&ACTION=${ACTION_TYPE}&USER=${USER}&PERIOD=${reminderPeriod}`;
  return AxiosEvent.get(path);
}

function apiGetUpcomingRemindersList(payload) {
  Applogger('Payload at apiGetUpcomingRemindersList', payload);
  const {upcomingRemindersBody} = payload;
  const {ACTION_TYPE, USER} = upcomingRemindersBody;
  const ALERT_DATE = moment(new Date()).format('YYYY-MM-DDTHH:MM');
  const path = `servlets.CH_VaultJson?INT=904&ACTION=${ACTION_TYPE}&USER=${USER}&ALERT_DATE=${ALERT_DATE}`;
  return AxiosEvent.get(path);
}

function apiAddReminderRequest(payload) {
  Applogger('Payload at apiAddReminderRequest', payload);
  const {addReminderBody} = payload;
  const {
    ACTION_TYPE,
    USER,
    SUBJECT,
    DETAILS,
    STATE,
    DUE_DATE,
    ALERT_DATE,
    DATABASE,
    DOC_NUM,
  } = addReminderBody;
  let path = `servlets.CH_VaultJson?INT=904&ACTION=${ACTION_TYPE}&USER=${USER}&SUBJECT=${SUBJECT}&DETAILS=${DETAILS}&STATE=${STATE}&DUE_DATE=${DUE_DATE}&ALERT_DATE=${ALERT_DATE}`;
  if (DATABASE && DOC_NUM) {
    path += `&DB=${DATABASE}&DOC_NO=${DOC_NUM}`;
  }
  return AxiosEvent.get(path);
}

function apiUpdateReminderRequest(payload) {
  Applogger('Payload at apiUpdateReminderRequest', payload);
  const {updateReminderBody} = payload;
  const {
    ACTION_TYPE,
    USER,
    REMINDER_ID,
    SUBJECT,
    DETAILS,
    STATE,
    DUE_DATE,
    ALERT_DATE,
    DATABASE,
    DOC_NUM,
  } = updateReminderBody;
  let path = `servlets.CH_VaultJson?INT=904&ACTION=${ACTION_TYPE}&USER=${USER}&ID=${REMINDER_ID}&SUBJECT=${SUBJECT}&DETAILS=${DETAILS}&STATE=${STATE}&DUE_DATE=${DUE_DATE}&ALERT_DATE=${ALERT_DATE}`;
  if (DATABASE && DOC_NUM) {
    path += `&DB=${DATABASE}&DOC_NO=${DOC_NUM}`;
  }
  return AxiosEvent.get(path);
}

function apiSetReminderStateRequest(payload) {
  Applogger('Payload at apiSetReminderStateRequest', payload);
  const {setReminderBody} = payload;
  const {ACTION_TYPE, USER, REMINDER_ID, STATE} = setReminderBody;
  const path = `servlets.CH_VaultJson?INT=904&ACTION=${ACTION_TYPE}&USER=${USER}&ID=${REMINDER_ID}&STATE=${STATE}`;
  return AxiosEvent.get(path);
}

function apiDeleteReminderRequest(payload) {
  Applogger('Payload at apiDeleteReminderRequest', payload);
  const {deleteReminderBody} = payload;
  const {ACTION_TYPE, USER, REMINDER_ID} = deleteReminderBody;
  const path = `servlets.CH_VaultJson?INT=904&ACTION=${ACTION_TYPE}&USER=${USER}&ID=${REMINDER_ID}`;
  return AxiosEvent.get(path);
}

export const RemindersAPIServices = {
  apiGetRemindersList,
  apiGetUpcomingRemindersList,
  apiAddReminderRequest,
  apiUpdateReminderRequest,
  apiSetReminderStateRequest,
  apiDeleteReminderRequest,
};
