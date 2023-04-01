import Applogger from '../helpers/AppLogger';
import AppConstants from '../helpers/AppConstants';

const error = 'Error';

export const mapAPICallError = (errorMsg, isLoginError = false) => {
  Applogger('Error to map at mapAPICallError = ', errorMsg);
  var errorMessage = '';
  if (errorMsg.hasOwnProperty(error)) {
    errorMessage = errorMsg.Error;
  } else {
    errorMessage = errorMsg;
  }
  if (errorMessage === AppConstants.toastMessages.invalidUserNameOrPassword) {
    return AppConstants.toastMessages.invalidUserNameOrPassword;
  } else if (errorMessage === AppConstants.toastMessages.noDatabaseFound) {
    return AppConstants.toastMessages.noDatabaseFound;
  } else if (errorMessage === AppConstants.toastMessages.loginTokenFailed) {
    return AppConstants.toastMessages.loginTokenFailedMsg;
  } else if (errorMessage === AppConstants.toastMessages.notFound) {
    return AppConstants.toastMessages.notFoundMsg;
  } else if (errorMessage === AppConstants.toastMessages.serverError) {
    return AppConstants.toastMessages.serverErrorMsg;
  } else if (errorMessage === AppConstants.toastMessages.sessionExpired) {
    return AppConstants.toastMessages.sessionExpiredMsg;
  } else if (errorMessage === AppConstants.toastMessages.licenceError) {
    return AppConstants.toastMessages.licenceErrorMsg;
  } else if (errorMessage === AppConstants.toastMessages.permissionDenied) {
    return AppConstants.toastMessages.permissionDeniedMsg;
  } else if (errorMessage === AppConstants.toastMessages.revokeMsg) {
    return AppConstants.toastMessages.revokeMsg;
  } else if (isLoginError) {
    return AppConstants.toastMessages.loginFailedMsg;
  } else if (errorMessage === AppConstants.toastMessages.groupAlreadyExit) {
    return AppConstants.toastMessages.groupAlreadyExitMsg;
  } else {
    return AppConstants.toastMessages.unknownError;
  }
};

export const isUnAuthenticatedUser = response => {
  var status = false;
  if (response.hasOwnProperty(error)) {
    if (
      response.Error === AppConstants.toastMessages.licenceError ||
      response.Error === AppConstants.toastMessages.loginTokenFailed ||
      response.Error === AppConstants.toastMessages.sessionExpired
    ) {
      status = true;
    }
  }
  return status;
};

export const responseHasError = response => {
  if (response.hasOwnProperty(error)) {
    return true;
  } else {
    return false;
  }
};

export const responseHasError2 = (response, name) => {
  if (response.hasOwnProperty(name)) {
    return true;
  } else {
    return false;
  }
};

export const getCurrentData = currentData => {
  return currentData;
};

export const getDataBaseName = response => {
  if (response.hasOwnProperty('Database')) {
    if (Array.isArray(response.Database) > 0) {
      return response.Database[0].Name;
    } else {
      return response.Database.Name;
    }
  } else {
    return '';
  }
};

export const getDataBaseNumber = response => {
  if (response.hasOwnProperty('Database')) {
    if (Array.isArray(response.Database) > 0) {
      return response.Database[0].Number;
    } else {
      return response.Database.Number;
    }
  } else {
    return '';
  }
};

export const getAttachmentList = (attachmentList, payload) => {
  const {a_Index, type} = payload;
  if (a_Index !== null) {
    var myArray1 = attachmentList;
    var myArray2 = [a_Index];
    var myFinalArray = myArray1.concat(
      myArray2.filter(item => myArray1.indexOf(item) < 0),
    );

    if (type === 'Remove') {
      myFinalArray.pop(a_Index);
    }
    return myFinalArray;
  } else {
    return [];
  }
};

export function getConvertedTime(date) {
  if (typeof date !== 'object') {
    date = new Date(date);
  }

  var seconds = Math.floor((new Date() - date) / 1000);
  var intervalType;

  var interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    intervalType = 'year';
  } else {
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      intervalType = 'month';
    } else {
      interval = Math.floor(seconds / 86400);
      if (interval >= 1) {
        intervalType = 'day';
      } else {
        interval = Math.floor(seconds / 3600);
        if (interval >= 1) {
          intervalType = 'hr';
        } else {
          interval = Math.floor(seconds / 60);
          if (interval >= 1) {
            intervalType = 'min';
          } else {
            interval = seconds;
            intervalType = 'second';
          }
        }
      }
    }
  }

  if (interval > 1 || interval === 0) {
    intervalType += 's ago';
  }

  return interval + ' ' + intervalType;
}

export function truncatedString(str, n) {
  return str?.length > n ? str?.slice(0, n - 1) + '...' : str;
}
