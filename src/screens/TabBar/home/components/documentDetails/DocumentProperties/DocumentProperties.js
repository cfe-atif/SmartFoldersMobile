import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, FlatList, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {unwrapResult} from '@reduxjs/toolkit';
import {get} from 'lodash';
// import {viewPropertiesData} from '../../../Constants';
import {getViewPropertiesData} from '../../../../../../redux/reducers/DocumentsReducer';
import {showFaliureToast} from '../../../../../../helpers/AppToasts';
import {
  mapAPICallError,
  isUnAuthenticatedUser,
} from '../../../../../../utils/HelperFunctions';
import Security from './InternalComponents/Security';
// import WorkflowHistory from './InternalComponents/WorkflowHistory';
// import PreviousMarkings from './InternalComponents/PreviousMarkings';
import ViewDocProperties from './InternalComponents/ViewDocProperties';
import FreedomOfInformation from './InternalComponents/FOI';
import Header from '../../../../../../components/headers/Header';
import SFLoader from '../../../../../../components/loaders/SFLoader';
import FolderTypeButton from '../../../../../../components/buttons/FolderTypeButton';

export default function DocumentProperties({navigation}) {
  const dispatch = useDispatch();

  const headerTypesRef = useRef(null);

  const {user} = useSelector(state => state.AuthenticationReducer);
  const {
    loading,
    selectedDocument,
    selectedDocType,
    folderDocuments,
    viewPropertiesData,
  } = useSelector(state => state.DocumentsReducer);

  const headerTypes = {
    Document: 'Document',
    Security: 'Security',
    FOI: 'Freedom Of Information',
    // WorkflowHistory: 'Workflow History',
    // PreviousMarkings: 'Previous Markings',
  };

  const [selectedType, setSelectedType] = useState(headerTypes.Document);

  const headerItemsList = [
    {
      title: `Document ${get(viewPropertiesData, 'Document.Hit', '')}`,
      type: headerTypes.Document,
    },
    {
      title: headerTypes.Security,
      type: headerTypes.Security,
    },
    {
      title: headerTypes.FOI,
      type: headerTypes.FOI,
    },
    // {
    //   title: headerTypes.WorkflowHistory,
    //   type: headerTypes.WorkflowHistory,
    // },
    // {
    //   title: headerTypes.PreviousMarkings,
    //   type: headerTypes.PreviousMarkings,
    // },
  ];

  useEffect(() => {
    if (selectedDocument) {
      handleViewPropertiesData();
    }
  }, [selectedDocument]);

  const handleViewPropertiesData = () => {
    const DB = get(folderDocuments, 'System.DB', '');
    const USER = user.No;
    const HIT = get(selectedDocument, 'Index', '');
    const BUN = get(folderDocuments, 'System.Bundle', '');
    const DocType = selectedDocType;

    dispatch(getViewPropertiesData({DB, USER, HIT, BUN, DocType}))
      .then(unwrapResult)
      .then(res => {
        Applogger('Response at getViewPropertiesData', res);
        if (isUnAuthenticatedUser(res)) {
          navigation.navigate(AppRoutes.Login);
          showFaliureToast(mapAPICallError(res));
        }
      })
      .catch(err => {
        if (isUnAuthenticatedUser(err)) {
          navigation.navigate(AppRoutes.Login);
          showFaliureToast(mapAPICallError(err));
        }
        Applogger('Error at getViewPropertiesData', err);
      });
  };

  const renderHeaderTypeView = () => {
    switch (selectedType) {
      case headerTypes.Document:
        return <ViewDocProperties viewPropertiesData={viewPropertiesData} />;

      case headerTypes.Security:
        return <Security viewPropertiesData={viewPropertiesData} />;

      case headerTypes.FOI:
        return <FreedomOfInformation viewPropertiesData={viewPropertiesData} />;

      // case headerTypes.WorkflowHistory:
      //   return <WorkflowHistory viewPropertiesData={viewPropertiesData} />;

      // case headerTypes.PreviousMarkings:
      //   return <PreviousMarkings viewPropertiesData={viewPropertiesData} />;

      default:
        return <ViewDocProperties viewPropertiesData={viewPropertiesData} />;
    }
  };

  const renderHeaderTypeItems = ({item, index}) => {
    const {title, type} = item;
    return (
      <FolderTypeButton
        key={index}
        title={title}
        isSelected={type === selectedType}
        onPress={() => {
          setSelectedType(type);
          headerTypesRef?.current.scrollToIndex({
            animated: true,
            index: index,
          });
        }}
      />
    );
  };

  return (
    <View>
      {loading && <SFLoader />}
      <Header
        title="Document Properties"
        backButton={true}
        onBackPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <FlatList
          ref={headerTypesRef}
          horizontal={true}
          data={headerItemsList}
          renderItem={renderHeaderTypeItems}
        />
        <ScrollView>{renderHeaderTypeView()}</ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
});
