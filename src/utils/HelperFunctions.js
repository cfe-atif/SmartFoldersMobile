import Applogger from '../helpers/AppLogger';
import AppConstants from '../helpers/AppConstants';

const error = 'Error';

export function mapAPICallError(errorMsg, isLoginError = false) {
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
}

export function isUnAuthenticatedUser(response) {
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
}

export function responseHasError(response) {
  if (response.hasOwnProperty(error)) {
    return true;
  } else {
    return false;
  }
}

export function responseHasError2(response, name) {
  if (response.hasOwnProperty(name)) {
    return true;
  } else {
    return false;
  }
}

export function getCurrentData(currentData) {
  return currentData;
}

export function getDataBaseName(response) {
  if (response.hasOwnProperty('Database')) {
    if (Array.isArray(response.Database) > 0) {
      return response.Database[0].Name;
    } else {
      return response.Database.Name;
    }
  } else {
    return '';
  }
}

export function getDataBaseNumber(response) {
  if (response.hasOwnProperty('Database')) {
    if (Array.isArray(response.Database) > 0) {
      return response.Database[0].Number;
    } else {
      return response.Database.Number;
    }
  } else {
    return '';
  }
}

export function getAttachmentList(attachmentList, payload) {
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
}

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

export function getSuffix(document) {
  let suffix = null;
  let docSuffix = null;
  if (document) {
    if (Array.isArray(get(document, 'Page', []))) {
      docSuffix = get(document, 'Page[0].Suffix', null);
      if (docSuffix) {
        suffix = docSuffix;
      }
    } else {
      docSuffix = get(document, 'Page.Suffix', null);
      if (docSuffix) {
        suffix = docSuffix;
      }
    }
  }
  return suffix;
}

export function getFormattedDate(dateObj) {
  if (get(dateObj, 'Date.Day', null)) {
    const date = dateObj.Date;
    let day = date.Day;
    let month = date.Month;
    let year = date.Year;
    return `${day}/${month}/${year}`;
  } else {
    return null;
  }
}

export function convertBooleanToString(itemStatus) {
  return itemStatus ? 'Yes' : 'No';
}
