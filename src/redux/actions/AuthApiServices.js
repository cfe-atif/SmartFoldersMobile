import AxiosEvent from '../../Api/AxiosEvent';
import APIConstants from '../../helpers/APIConstants';
import Applogger from '../../helpers/AppLogger';

function apiLoginRequest(payload) {
  Applogger('Payload at apiLoginRequest', payload);
  const {username, password} = payload;
  const path = APIConstants.login + `Name=${username}&Password=${password}`;
  Applogger('Path at apiLoginRequest', path);
  return AxiosEvent.post(path);
}

function apiChangePasswordRequest(payload) {
  Applogger('Payload at apiChangePasswordRequest', payload);
  const {password, userNo} = payload;
  const path =
    APIConstants.baseUrl +
    `servlets.CH_VaultJson?UserNo=${userNo}&INT=21&Password=${password}&Password_Cycle=-1`;
  Applogger('Path at apiChangePasswordRequest', path);
  return AxiosEvent.post(path);
}

function apiLogoutRequest(payload) {
  Applogger('Payload at apiLogoutRequest', payload);
  const {DB, USER} = payload;
  var path = `servlets.CH_VaultJson?DB=${DB}&USER=${USER}&INT=54`;
  Applogger('Path at apiLogoutRequest', path);
  return AxiosEvent.get(path);
}

export const AuthApiServices = {
  apiLoginRequest,
  apiChangePasswordRequest,
  apiLogoutRequest,
};
