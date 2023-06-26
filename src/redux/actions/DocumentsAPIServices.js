import AxiosEvent from '../../Api/AxiosEvent';
import Applogger from '../../helpers/AppLogger';

function apiTreeAPIData(payload) {
  Applogger('Payload at apiTreeAPIData', payload);
  const {dataBaseNumber, user} = payload;
  const path = `servlets.CH_VaultJson?INT=411&USER=${user.No}&DB=${dataBaseNumber}&BUN=top&FOLDER=top&BRANCH=true&REFRESH=true&GETPRIVATETREE=false&StyleSheet=/tree/fTree.xsl`;
  return AxiosEvent.get(path);
}

function apiTreeAPIRRData(payload) {
  Applogger('Payload at apiTreeAPIRRData', payload);
  const {folderPath, dataBaseNumber, user} = payload;
  const path = `servlets.CH_VaultJson?INT=475&USER=${user.No}&DB=${dataBaseNumber}&BUN=${folderPath}&FOLDER=${folderPath}&VALIDTREE=true&BRANCH=true&REDIRECT=false`;
  return AxiosEvent.get(path);
}

function apiTreeFolderDocsRequest(payload) {
  Applogger('Payload at apiTreeFolderDocsRequest', payload);
  const {dataBaseNumber, user, f_path, f_class, state} = payload;
  const path = `servlets.CH_VaultJson?DB=${dataBaseNumber}&USER=${user.No}&INT=232&BUN=${f_path}&START=1&END=15&GETQUICK=true&FOLDERCLASS=${f_class}&FOLDERSTATE=${state}`;
  return AxiosEvent.get(path);
}

function apiTreeFoldersRequest(payload) {
  Applogger('Payload at apiTreeFoldersRequest', payload);
  const {dataBaseNumber, user, f_path} = payload;
  const path = `servlets.CH_VaultJson?DB=${dataBaseNumber}&USER=${user.No}&INT=475&BUN=${f_path}&FOLDER=${f_path}&BRANCH=true&PARENTID=%23parentid%23&UseTimeoutStyleSheet=false`;
  return AxiosEvent.get(path);
}

function apiCreateNewFolderData(payload) {
  Applogger('Payload at apiCreateNewFolderData', payload);
  const {folderPath, bunPath, dataBaseNumber, user, docTypeNo} = payload;
  var path = `servlets.CH_VaultJson?DB=${dataBaseNumber}&USER=${user}&INT=151&FOLDER=${folderPath}&BUN=${bunPath}&ADD=null&DOCTYPE=${docTypeNo}`;
  return AxiosEvent.get(path);
}

function apiCreateNewDocumentData(payload) {
  Applogger('Payload at apiCreateNewDocumentData', payload);
  const {bunPath, dataBaseNumber, user, docTypeNo} = payload;
  var path = `servlets.CH_VaultJson?USER=${user}&DB=${dataBaseNumber}&INT=233&BUN=${bunPath}&DOCTYPE=${docTypeNo}&SRC=-1&HIT=-1&EDIT=true`;
  return AxiosEvent.get(path);
}

function apiGetViewPropertiesData(payload) {
  Applogger('Payload at apiGetViewPropertiesData', payload);
  const {DB, USER, HIT, BUN, DocType} = payload;
  var path = `servlets.CH_VaultJson?DB=${DB}&USER=${USER}&INT=191&BUN=${BUN}&HIT=${HIT}&DOCTYPE=${DocType}&EDIT=true`;
  return AxiosEvent.get(path);
}

function apiGetVersionInfoData(payload) {
  Applogger('Payload at apiGetVersionInfoData', payload);
  const {DB, USER, HIT, BUN, SRC, DocType} = payload;
  var path = `servlets.CH_VaultJson?DB=${DB}&USER=${USER}&INT=455&SRC=${SRC}&BUN=${BUN}&Doc=${HIT}&DOCTYPE=${DocType}`;
  return AxiosEvent.get(path);
}

function apiGetDocumentIndexData(payload) {
  Applogger('Payload at apiGetDocumentIndexData', payload);
  const {DB, USER, HIT, BUN, SRC, DocType, TotalHITS} = payload;
  var path = `servlets.CH_VaultJson?DB=${DB}&USER=${USER}&INT=4&SRC=${SRC}&BUN=${BUN}&TOTALHITS=${TotalHITS}&HIT=${HIT}&DOCTYPE=${DocType}&EDIT=false`;
  return AxiosEvent.get(path);
}

function apiSignDocumentRequest(payload) {
  Applogger('Payload at apiSignDocumentRequest', payload);
  const {DB, UserNo, DOC_NO} = payload;
  let path = `servlets.CH_VaultJson?INT=907&UserNo=${UserNo}&DB=${DB}&DOC_NO=${DOC_NO}`;
  return AxiosEvent.get(path);
}

export const DocumentsAPIServices = {
  apiTreeAPIData,
  apiTreeAPIRRData,
  apiTreeFolderDocsRequest,
  apiTreeFoldersRequest,
  apiCreateNewFolderData,
  apiCreateNewDocumentData,
  apiGetViewPropertiesData,
  apiGetVersionInfoData,
  apiGetDocumentIndexData,
  apiSignDocumentRequest,
};
