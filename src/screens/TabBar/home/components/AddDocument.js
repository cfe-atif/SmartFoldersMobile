import React, {useRef, useState} from 'react';
import {StyleSheet, View, FlatList, TouchableOpacity, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {get} from 'lodash';
import AppColors from '../../../../helpers/AppColors';
import AppFontSize from '../../../../helpers/AppFontSize';
import AppFontFamily from '../../../../helpers/AppFontFamily';
import Header from '../../../../components/headers/Header';
import SFLoader from '../../../../components/loaders/SFLoader';
import DocumentView from '../../../../components/addDocuments/DocumentView';
import SFDescription from '../../../../components/texts/SFDescription';

export default function AddDocument({navigation, route}) {
  const docTypeListRef = useRef(null);

  const {documentType, loading} = useSelector(state => state.DocumentsReducer);

  const [selectedDocType, setSelectedDocType] = useState(
    get(documentOptions, '[0].title', ''),
  );

  const documentOptions = get(documentType, 'dt', [])
    ? get(documentType, 'dt', [])
    : [get(documentType, 'dt', [])];

  const folderPath = get(route, 'params.folderPath', '');

  const renderDocumentTypeItem = ({item, index}) => {
    const {n, no} = item;
    const selected = item === selectedDocType;
    const backgroundColor = selected
      ? AppColors.customBlue
      : AppColors.lightGray;
    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          setSelectedDocType(item);
          docTypeListRef?.current.scrollToIndex({
            animated: true,
            index: index,
          });
        }}
        style={[styles.docTypeCont, {backgroundColor: backgroundColor}]}>
        <Text style={selected ? styles.selDocTypeTitle : styles.docTypeTitle}>
          {n}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {loading && <SFLoader />}
      <Header
        title="Add Document"
        backButton={true}
        onBackPress={() => navigation.goBack()}
      />
      <View>
        <SFDescription
          title="Select Document Type"
          textStyle={{fontSize: AppFontSize.size16}}
        />
        <FlatList
          ref={docTypeListRef}
          style={{alignSelf: 'center'}}
          horizontal={true}
          data={documentOptions}
          renderItem={renderDocumentTypeItem}
        />
        {selectedDocType && (
          <DocumentView
            selectedDocType={selectedDocType}
            folderPath={folderPath}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  docTypeCont: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
    fontFamily: AppFontFamily.regular,
  },
  docTypeTitle: {
    color: AppColors.black,
    fontFamily: AppFontFamily.semiBold,
  },
  selDocTypeTitle: {
    color: AppColors.white,
    fontFamily: AppFontFamily.bold,
  },
});
