import React, {useState, useEffect} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {unwrapResult} from '@reduxjs/toolkit';
import {useDispatch, useSelector} from 'react-redux';
import {showFaliureToast} from '../../../../helpers/AppToasts';
import {get} from 'lodash';
import {
  setSelectedDocument,
  treeFolderDocsRequest,
} from '../../../../redux/reducers/DocumentsReducer';
import {
  mapAPICallError,
  responseHasError,
  isUnAuthenticatedUser,
} from '../../../../utils/HelperFunctions';
import Header from '../../../../components/headers/Header';
import SFLoader from '../../../../components/loaders/SFLoader';
import FileCell from '../../../../components/cells/FileCell';
import SFNoRecord from '../../../../components/texts/SFNoRecord';
import Applogger from '../../../../helpers/AppLogger';
import AppImages from './../../../../helpers/AppImages';
import AppRoutes from './../../../../helpers/AppRoutes';

export default function DocumentsList({navigation, route}) {
  const dispatch = useDispatch();

  const {user, dataBaseNumber} = useSelector(
    state => state.AuthenticationReducer,
  );
  const {folderDocuments, loading} = useSelector(
    state => state.DocumentsReducer,
  );

  const [localDocumentsList, setLocalDocumentsList] = useState([]);

  const selectedFolder = get(route, 'params.selectedFolder', null);

  const localSearchResults = Array.isArray(
    get(folderDocuments, 'Search_Result', []),
  )
    ? get(folderDocuments, 'Search_Result', [])
    : [get(folderDocuments, 'Search_Result', [])];

  useEffect(() => {
    if (selectedFolder) {
      callTreeAPIFolderDocsRequest();
    }
  }, []);

  useEffect(() => {
    for (let index = 0; index < localSearchResults.length; index++) {
      const element = localSearchResults[index];
      if (element != '') {
        const localDocsArray = Array.isArray(get(element, 'Document', []))
          ? get(element, 'Document', [])
          : [get(element, 'Document', [])];
        setLocalDocumentsList(localDocsArray);
        break;
      }
    }
  }, [localSearchResults]);

  const callTreeAPIFolderDocsRequest = () => {
    const f_path = get(selectedFolder, 'gbl', false)
      ? `G${get(selectedFolder, 'ph', '')}`
      : `P${get(selectedFolder, 'ph', '')}`;
    const f_class = get(selectedFolder, 'cs', false) ? `class` : `folder`;
    dispatch(
      treeFolderDocsRequest({
        dataBaseNumber,
        user,
        f_path,
        f_class,
        state: 'open',
      }),
    )
      .then(unwrapResult)
      .then(res => {
        Applogger('Response at treeFolderDocsRequest NavBar', res);
        if (isUnAuthenticatedUser(res)) {
          navigation.navigate(AppRoutes.Login);
          showFaliureToast(mapAPICallError(res));
        } else {
          if (!responseHasError(res)) {
          }
        }
      })
      .catch(err => {
        if (isUnAuthenticatedUser(err)) {
          navigation.navigate(AppRoutes.Login);
          showFaliureToast(mapAPICallError(err));
        }
        Applogger('Error at treeFolderDocsRequest NavBar', err);
      });
  };

  const handleNoRecordView = () => {
    if (!localDocumentsList.length > 0) {
      return <SFNoRecord title={`No Documents`} textStyle={styles.noRecord} />;
    } else {
      return null;
    }
  };

  const getSuffix = document => {
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
  };

  const getFormattedDate = dateObj => {
    if (get(dateObj, 'Date.Day', null)) {
      const date = dateObj.Date;
      let day = date.Day;
      let month = date.Month;
      let year = date.Year;
      return `${day}/${month}/${year}`;
    } else {
      return null;
    }
  };

  const renderFileItems = ({item, index}) => {
    const suffix = getSuffix(item);
    const imageSource = suffix ? `${AppImages[suffix]}` : null;
    const {Field} = get(item, 'Column.User', null);
    const isDeclared = get(item, 'Declared', false);

    // Finding the desired field by its FieldNumber
    const titleField = Field.find(field => field.FieldNumber === 21);
    const descriptionField = Field.find(field => field.FieldNumber === 23);
    const dateField = Field.find(field => field.FieldNumber === 24);

    const titleData = titleField ? titleField.Data : '';
    const descriptionData = descriptionField ? descriptionField.Data : '';
    const dateData = dateField ? dateField.Data : '';

    return (
      <FileCell
        key={index}
        title={titleData}
        description={descriptionData}
        date={getFormattedDate(dateData)}
        suffix={imageSource}
        isDeclared={isDeclared}
        onPress={() => {
          dispatch(setSelectedDocument(item));
          navigation.navigate(AppRoutes.DocumentDetails, {
            selectedDocument: item,
          });
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      {loading && <SFLoader />}
      <View>
        <Header
          title={`${get(selectedFolder, 'n', 'Documents List')} `}
          backButton={true}
          onBackPress={() => navigation.goBack()}
        />
        <View style={styles.foldersContainer}>
          {handleNoRecordView()}
          <FlatList
            data={localDocumentsList}
            renderItem={renderFileItems}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  foldersContainer: {
    padding: 10,
    justifyContent: 'space-between',
  },
});
