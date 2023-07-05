import React, {useEffect} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {unwrapResult} from '@reduxjs/toolkit';
import {get} from 'lodash';
import {showFaliureToast} from '../../../../../../helpers/AppToasts';
import {getVersionInfoData} from '../../../../../../redux/reducers/DocumentsReducer';
import {
  mapAPICallError,
  isUnAuthenticatedUser,
} from '../../../../../../utils/HelperFunctions';
import Applogger from '../../../../../../helpers/AppLogger';
import Header from '../../../../../../components/headers/Header';
import SFLoader from '../../../../../../components/loaders/SFLoader';
import SFHeading from '../../../../../../components/texts/SFHeading';
import VersionInfoCell from '../../../../../../components/cells/VersionInfoCell';

export default function DocumentVersionInfo({navigation, route}) {
  const dispatch = useDispatch();

  const {user} = useSelector(state => state.AuthenticationReducer);

  const {
    loading,
    selectedDocument,
    selectedDocType,
    folderDocuments,
    versionInfoData,
  } = useSelector(state => state.DocumentsReducer);

  const versionInfoPageList = Array.isArray(
    get(versionInfoData, 'VersionInfo.Document.Page', []),
  )
    ? get(versionInfoData, 'VersionInfo.Document.Page', [])
    : [get(versionInfoData, 'VersionInfo.Document.Page', null)];

  useEffect(() => {
    if (selectedDocument) {
      handleGetVersionInfoData();
    }
  }, [selectedDocument]);

  const handleGetVersionInfoData = () => {
    const DB = get(folderDocuments, 'System.DB', '');
    const USER = user.No;
    const HIT = get(selectedDocument, 'Index', '');
    const BUN = get(folderDocuments, 'System.Bundle', '');
    const SRC = get(folderDocuments, 'System.Search', '');
    const DocType = selectedDocType;

    dispatch(getVersionInfoData({DB, USER, HIT, BUN, DocType, SRC}))
      .then(unwrapResult)
      .then(res => {
        Applogger('Response at getVersionInfoData', res);
        if (isUnAuthenticatedUser(res)) {
          navigation.navigate(AppRoutes.Login);
          showFaliureToast('Error', mapAPICallError(res));
        }
      })
      .catch(err => {
        if (isUnAuthenticatedUser(err)) {
          navigation.navigate(AppRoutes.Login);
          showFaliureToast(mapAPICallError(err));
        }
        Applogger('Error at getVersionInfoData', err);
      });
  };

  return (
    <View style={styles.container}>
      {loading && <SFLoader />}
      <Header
        title={'Document No. ' + get(versionInfoData, 'VersionInfo.DocID', '')}
        backButton={true}
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView>
        {versionInfoPageList.map((page, index) => {
          const checkoutDetails =
            get(page, 'CheckOutDetails.UserName', 0) !== 0
              ? get(page, 'CheckOutDetails.UserName', 0)
              : 'Not Checked Out';
          const versionInfoList = Array.isArray(
            get(page, 'Versions.Version', []),
          )
            ? get(page, 'Versions.Version', [])
            : [get(page, 'Versions.Version', [])];
          return (
            <View key={index}>
              <SFHeading title={`Attachment No: ${get(page, 'Page', '')}`} />
              <View>
                {versionInfoList.map((versionInfo, index) => {
                  return (
                    <VersionInfoCell
                      key={index}
                      versionInfo={versionInfo}
                      checkoutDetails={checkoutDetails}
                    />
                  );
                })}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
