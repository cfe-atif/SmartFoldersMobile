import AxiosEvent from '../../Api/AxiosEvent';
import APIConstants from '../../helpers/APIConstants';
import Applogger from '../../helpers/AppLogger';

function apiLoginRequest(payload) {
  Applogger('Payload at apiLoginRequest', payload);
  const {username, password} = payload;
  const path = `servlets.CH_VaultJson?INT=1&Name=${username}&Password=${password}`;
  return AxiosEvent.post(path);
}

function apiChangePasswordRequest(payload) {
  Applogger('Payload at apiChangePasswordRequest', payload);
  const {password, userNo} = payload;
  const path =
    APIConstants.baseUrl +
    `servlets.CH_VaultJson?UserNo=${userNo}&INT=21&Password=${password}&Password_Cycle=-1`;
  return AxiosEvent.post(path);
}

function apiLogoutRequest(payload) {
  Applogger('Payload at apiLogoutRequest', payload);
  const {DB, USER} = payload;
  var path = `servlets.CH_VaultJson?DB=${DB}&USER=${USER}&INT=54`;
  return AxiosEvent.get(path);
}

export const AuthApiServices = {
  apiLoginRequest,
  apiChangePasswordRequest,
  apiLogoutRequest,
};
