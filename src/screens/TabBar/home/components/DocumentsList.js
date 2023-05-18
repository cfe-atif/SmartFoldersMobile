import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {unwrapResult} from '@reduxjs/toolkit';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {showFaliureToast} from '../../../../helpers/AppToasts';
import {get} from 'lodash';
import {treeFolderDocsRequest} from '../../../../redux/reducers/DocumentsReducer';
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
import AppColors from './../../../../helpers/AppColors';

export default function DocumentsList({navigation, route}) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

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
      Applogger('selectedFolder', selectedFolder);
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
    console.log('====================================');
    console.log('localDocumentsList:', localDocumentsList);
    console.log('====================================');
    if (!localDocumentsList.length > 0) {
      return (
        <SFNoRecord title={`No Child Folders`} textStyle={styles.noRecord} />
      );
    } else {
      return null;
    }
  };

  const renderFileItems = ({item, index}) => {
    const {n, dc, ph} = item;
    return (
      <FileCell
        key={index}
        title={'Doc Title'}
        description={'Doc Description'}
        date={'Doc Date'}
        onPress={() => Applogger('Clicked File Cell', item)}
      />
    );
  };

  return (
    <View style={styles.container}>
      {loading && <SFLoader />}
      <View>
        <Header
          title="Documents List"
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
