import AxiosEvent from '../../Api/AxiosEvent';
import Applogger from '../../helpers/AppLogger';

function apiGetRecentAndSavedSearches(payload) {
  Applogger('Payload at apiGetRecentAndSavedSearches', payload);
  const {DB, USER} = payload;
  const path = `servlets.CH_VaultJson?DB=${DB}&USER=${USER}&INT=22`;
  return AxiosEvent.get(path);
}

function apiDeleteSavedSearch(payload) {
  Applogger('Payload at apiDeleteSavedSearch', payload);
  const {DB, USER, SNAME, TYPE} = payload;
  const path = `servlets.CH_VaultJson?DB=${DB}&USER=${USER}&INT=410&SNAME=${SNAME}&TYPE=${TYPE}`;
  return AxiosEvent.get(path);
}

function apiSaveSearch(payload) {
  Applogger('Payload at apiSaveSearch', payload);
  const {DB, HITS, SEARCH, TYPE, USER, SEARCHNAME} = payload;
  var path = `servlets.CH_VaultJson?INT=408&DB=${DB}&USER=${USER}&SNAME=${SEARCHNAME}&STRING=${SEARCH}&DOCTOTAL=${HITS}&TYPE=${TYPE}&STRIP=true`;
  return AxiosEvent.get(path);
}

export const RecentSearchesAPIServices = {
  apiGetRecentAndSavedSearches,
  apiDeleteSavedSearch,
  apiSaveSearch,
};
