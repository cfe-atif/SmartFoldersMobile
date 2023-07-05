import React, {useState, useEffect} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {unwrapResult} from '@reduxjs/toolkit';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {get} from 'lodash';
import {showFaliureToast} from '../../../../../helpers/AppToasts';
import {fieldTypes} from '../../Constants';
import {
  setSelectedDocument,
  setSelectedDocType,
  treeFolderDocsRequest,
} from '../../../../../redux/reducers/DocumentsReducer';
import {
  mapAPICallError,
  responseHasError,
  isUnAuthenticatedUser,
  getSuffix,
  getFormattedDate,
} from '../../../../../utils/HelperFunctions';
import Header from '../../../../../components/headers/Header';
import SFLoader from '../../../../../components/loaders/SFLoader';
import FileCell from '../../../../../components/cells/FileCell';
import SFNoRecord from '../../../../../components/texts/SFNoRecord';
import Applogger from '../../../../../helpers/AppLogger';
import AppImages from '../../../../../helpers/AppImages';
import AppRoutes from '../../../../../helpers/AppRoutes';

export default function DocumentsList({navigation, route}) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const {user, dataBaseNumber} = useSelector(
    state => state.AuthenticationReducer,
  );
  const {loading, folderDocuments} = useSelector(
    state => state.DocumentsReducer,
  );

  const selectedFolder = get(route, 'params.selectedFolder', null);
  const [localDocumentsList, setLocalDocumentsList] = useState([]);

  const localSearchResults = Array.isArray(
    get(folderDocuments, 'Search_Result', []),
  )
    ? get(folderDocuments, 'Search_Result', [])
    : [get(folderDocuments, 'Search_Result', [])];

  useEffect(() => {
    if (selectedFolder && isFocused) {
      callTreeAPIFolderDocsRequest();
    }
  }, [selectedFolder, isFocused]);

  useEffect(() => {
    for (let index = 0; index < localSearchResults.length; index++) {
      const element = localSearchResults[index];
      if (element != '') {
        const localDocsArray = Array.isArray(get(element, 'Document', []))
          ? get(element, 'Document', [])
          : [get(element, 'Document', [])];
        dispatch(setSelectedDocType(get(element, 'DocType', '')));
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
          showFaliureToast('Error', mapAPICallError(res));
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

  const getFieldDataByNumber = (Field, fieldNumber) => {
    const field = Field.find(field => field.FieldNumber === fieldNumber);
    return field ? field : '';
  };

  const renderFileItems = ({item, index}) => {
    const suffix = getSuffix(item);
    const imageSource = suffix ? `${AppImages[suffix]}` : null;
    const {Field} = get(item, 'Column.User', null);
    const isDeclared = get(item, 'Declared', false);

    // Finding the desired field by its FieldNumber

    const fieldNumbers = Field.map(field => field.FieldNumber);

    let fieldData = fieldNumbers.map(fieldNumber =>
      getFieldDataByNumber(Field, fieldNumber),
    );
    fieldData = fieldData.filter(field => {
      return field != '';
    });

    let date = {};
    let title = '';
    let description = '';

    fieldData.forEach(field => {
      if (field) {
        if (get(field, 'Type', '') == fieldTypes.edit) {
          if (get(field, 'Label', '').toLowerCase().includes('title')) {
            title = get(field, 'Data', '');
          } else if (get(field, 'Label', '').toLowerCase().includes('desc')) {
            description = get(field, 'Data', '');
          }
        }
        if (get(field, 'Type', '') == fieldTypes.date) {
          if (get(field, 'Label', '').toLowerCase().includes('date')) {
            date = get(field, 'Data', '');
          }
        }
      }
    });

    return (
      <FileCell
        key={index}
        title={title}
        description={description}
        date={getFormattedDate(date)}
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
