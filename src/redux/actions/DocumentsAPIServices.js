import AxiosEvent from '../../Api/AxiosEvent';
import Applogger from '../../helpers/AppLogger';

function apiTreeAPIData(payload) {
  Applogger('payload at apiTreeAPIData', payload);
  const {dataBaseNumber, user} = payload;
  const path = `servlets.CH_VaultJson?INT=411&USER=${user.No}&DB=${dataBaseNumber}&BUN=top&FOLDER=top&BRANCH=true&REFRESH=true&GETPRIVATETREE=false&StyleSheet=/tree/fTree.xsl`;
  return AxiosEvent.get(path);
}

function apiTreeAPIRRData(payload) {
  Applogger('payload at apiTreeAPIRRData', payload);
  const {folderPath, dataBaseNumber, user} = payload;
  const path = `servlets.CH_VaultJson?INT=475&USER=${user.No}&DB=${dataBaseNumber}&BUN=${folderPath}&FOLDER=${getFolderPath}&VALIDTREE=true&BRANCH=true&REDIRECT=false`;
  return AxiosEvent.get(path);
}

export const DocumentsAPIServices = {
  apiTreeAPIData,
  apiTreeAPIRRData,
};
