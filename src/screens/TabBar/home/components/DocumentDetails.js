import React, {useEffect, useRef} from 'react';
import {StyleSheet, View, ScrollView, Text, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {get} from 'lodash';
import AppImages from '../../../../helpers/AppImages';
import AppColors from '../../../../helpers/AppColors';
import AppFontSize from '../../../../helpers/AppFontSize';
import AppFontFamily from '../../../../helpers/AppFontFamily';
import Header from '../../../../components/headers/Header';
import SFLoader from '../../../../components/loaders/SFLoader';
import MenuButton from '../../../../components/buttons/MenuButton';
import DocumentDetailsCell from '../../../../components/cells/DocumentDetailsCell';

export default function DocumentDetails({navigation, route}) {
  const dispatch = useDispatch();

  const {user, dataBaseNumber} = useSelector(
    state => state.AuthenticationReducer,
  );
  const {treeData, folders, loading} = useSelector(
    state => state.DocumentsReducer,
  );

  const menulistRef = useRef(null);
  const selectedDocument = get(route, 'params.selectedDocument', null);

  const menuItems = [
    {
      title: 'Add Document',
      image: AppImages.addDocument,
      onPress: () => {
        Applogger('Clicked Add Document');
      },
    },
  ];

  useEffect(() => {
    console.log('====================================');
    console.log(selectedDocument);
    console.log('====================================');
  }, [selectedDocument]);

  const renderMenuItems = ({item, index}) => {
    const {title, image, onPress} = item;
    return (
      <MenuButton
        key={index}
        title={title}
        image={image}
        onPress={() => {
          onPress();
          menulistRef?.current.scrollToIndex({animated: true, index: index});
        }}
      />
    );
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

  const renderFileCells = () => {
    const suffix = getSuffix(selectedDocument);
    const imageSource = suffix ? `${AppImages[suffix]}` : null;
    const {Field} = get(selectedDocument, 'Column.User', null);
    const isDeclared = get(selectedDocument, 'Declared', false);

    // Finding the desired field by its FieldNumber
    const titleField = Field.find(field => field.FieldNumber === 21);
    const descriptionField = Field.find(field => field.FieldNumber === 23);
    const dateField = Field.find(field => field.FieldNumber === 24);

    const titleLabel = titleField ? titleField.Label : 'N/A';
    const titleData = titleField ? titleField.Data : '';
    const descriptionLabel = descriptionField ? descriptionField.Label : '';
    const descriptionData = descriptionField ? descriptionField.Data : 'N/A';
    const dateLabel = dateField ? dateField.Label : '';
    const dateData = dateField ? dateField.Data : 'N/A';

    return (
      <>
        <DocumentDetailsCell title={titleLabel + ':'} description={titleData} />
        <DocumentDetailsCell
          title={descriptionLabel + ':'}
          description={descriptionData}
        />
        <DocumentDetailsCell
          title={dateLabel + ':'}
          description={getFormattedDate(dateData)}
        />
        <DocumentDetailsCell
          title={dateLabel + ':'}
          description={getFormattedDate(dateData)}
        />
        <DocumentDetailsCell
          title={dateLabel + ':'}
          description={getFormattedDate(dateData)}
        />
      </>
    );
  };

  return (
    <View style={styles.container}>
      {loading && <SFLoader />}
      <Header
        title="Document Details"
        backButton={true}
        onBackPress={() => navigation.goBack()}
      />
      <FlatList
        ref={menulistRef}
        data={menuItems}
        horizontal={true}
        renderItem={renderMenuItems}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
      <ScrollView>{renderFileCells()}</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  viewContainer: {
    padding: 10,
    borderBottomWidth: 1,
    backgroundColor: AppColors.white,
    borderBottomColor: AppColors.gray,
  },
  title: {
    fontFamily: AppFontFamily.semiBold,
    color: AppColors.customBlue,
  },
  description: {
    fontFamily: AppFontFamily.regular,
    color: AppColors.black,
  },
});
