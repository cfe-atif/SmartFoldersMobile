import React, {useEffect} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {unwrapResult} from '@reduxjs/toolkit';
import {getDocumentIndexData} from '../../../../../../redux/reducers/DocumentsReducer';
import {get} from 'lodash';
import {showFaliureToast} from '../../../../../../helpers/AppToasts';
import {
  mapAPICallError,
  isUnAuthenticatedUser,
  getFormattedDate,
} from '../../../../../../utils/HelperFunctions';
import Applogger from '../../../../../../helpers/AppLogger';
import AppRoutes from '../../../../../../helpers/AppRoutes';
import Header from '../../../../../../components/headers/Header';
import SFLoader from '../../../../../../components/loaders/SFLoader';
import SFHeading from '../../../../../../components/texts/SFHeading';
import DocumentDetailsCell from '../../../../../../components/cells/DocumentDetailsCell';
import AppColors from '../../../../../../helpers/AppColors';

export default function DocumentIndex({navigation}) {
  const dispatch = useDispatch();

  const {user} = useSelector(state => state.AuthenticationReducer);

  const {
    loading,
    selectedDocument,
    selectedDocType,
    folderDocuments,
    documentIndexData,
  } = useSelector(state => state.DocumentsReducer);

  useEffect(() => {
    if (selectedDocument) {
      handleGetDocumentIndexData();
    }
  }, [selectedDocument]);

  const handleGetDocumentIndexData = () => {
    const DB = get(folderDocuments, 'System.DB', '');
    const USER = user.No;
    const HIT = get(selectedDocument, 'Index', '');
    const BUN = get(folderDocuments, 'System.Bundle', '');
    const SRC = get(folderDocuments, 'System.Search', '');
    const TotalHITS = get(folderDocuments, 'System.Total_Hits', '');
    const DocType = selectedDocType;

    dispatch(
      getDocumentIndexData({DB, USER, HIT, BUN, SRC, DocType, TotalHITS}),
    )
      .then(unwrapResult)
      .then(res => {
        Applogger('Response at getDocumentIndexData', res);
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
        Applogger('Error at getDocumentIndexData', err);
      });
  };

  const renderFileCells = () => {
    if (documentIndexData) {
      const {Field} = get(documentIndexData, 'Document.Fields.User', null);
      return (
        <View style={styles.dataContainer}>
          {Array.isArray(Field) &&
            Field.map((item, index) => {
              const {Label, Data, Type} = item;
              const title = Label;
              if (Type == 'Date') {
                return (
                  <DocumentDetailsCell
                    key={index}
                    title={title}
                    description={getFormattedDate(item)}
                  />
                );
              } else {
                return (
                  <DocumentDetailsCell
                    key={index}
                    title={title}
                    description={Data}
                  />
                );
              }
            })}
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      {loading && <SFLoader />}
      <Header
        title="Document Index"
        backButton={true}
        onBackPress={() => navigation.goBack()}
      />
      {documentIndexData && (
        <SFHeading
          title={'Document ' + get(documentIndexData, 'System.Hit', '')}
          textStyle={styles.heading}
        />
      )}
      <ScrollView>{renderFileCells()}</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dataContainer: {
    marginVertical: 10,
  },
  heading: {
    textAlign: 'left',
    color: AppColors.black,
  },
});
