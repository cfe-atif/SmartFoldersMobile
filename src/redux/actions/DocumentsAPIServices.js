import AxiosEvent from '../../Api/AxiosEvent';
import Applogger from '../../helpers/AppLogger';

function apiTreeAPIData(payload) {
  Applogger('Payload at apiTreeAPIData', payload);
  const {dataBaseNumber, user} = payload;
  const path = `servlets.CH_VaultJson?INT=411&USER=${user.No}&DB=${dataBaseNumber}&BUN=top&FOLDER=top&BRANCH=true&REFRESH=true&GETPRIVATETREE=false&StyleSheet=/tree/fTree.xsl`;
  Applogger('Path at apiTreeAPIData', path);
  return AxiosEvent.get(path);
}

function apiTreeAPIRRData(payload) {
  Applogger('Payload at apiTreeAPIRRData', payload);
  const {folderPath, dataBaseNumber, user} = payload;
  const path = `servlets.CH_VaultJson?INT=475&USER=${user.No}&DB=${dataBaseNumber}&BUN=${folderPath}&FOLDER=${getFolderPath}&VALIDTREE=true&BRANCH=true&REDIRECT=false`;
  Applogger('Path at apiTreeAPIRRData', path);
  return AxiosEvent.get(path);
}

function apiCreateNewFolderData(payload) {
  Applogger('Payload at apiCreateNewFolderData', payload);
  const {folderPath, bunPath, dataBaseNumber, user, docTypeNo} = payload;
  var path = `servlets.CH_VaultJson?DB=${dataBaseNumber}&USER=${user}&INT=151&FOLDER=${folderPath}&BUN=${bunPath}&ADD=null&DOCTYPE=${docTypeNo}`;
  Applogger('Path at apiCreateNewFolderData', path);
  return AxiosEvent.get(path);
}

function apiCreateNewDocumentData(payload) {
  Applogger('Payload at apiCreateNewDocumentData', payload);
  const {bunPath, dataBaseNumber, user, docTypeNo} = payload;
  var path = `servlets.CH_VaultJson?USER=${user}&DB=${dataBaseNumber}&INT=233&BUN=${bunPath}&DOCTYPE=${docTypeNo}&SRC=-1&HIT=-1&EDIT=true`;
  Applogger('Path at apiCreateNewDocumentData', path);
  return AxiosEvent.get(path);
}

export const DocumentsAPIServices = {
  apiTreeAPIData,
  apiTreeAPIRRData,
  apiCreateNewFolderData,
  apiCreateNewDocumentData,
};
