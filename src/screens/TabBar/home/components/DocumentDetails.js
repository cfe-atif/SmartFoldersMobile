import React, {useEffect, useRef} from 'react';
import {StyleSheet, View, ScrollView, Text, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {get} from 'lodash';
import AppImages from '../../../../helpers/AppImages';
import AppColors from '../../../../helpers/AppColors';
import Applogger from '../../../../helpers/AppLogger';
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
      title: 'Properties',
      image: AppImages.addDocument,
      onPress: () => {
        Applogger('Clicked Add Document');
      },
    },
    {
      title: 'Edit',
      image: AppImages.addDocument,
      onPress: () => {
        Applogger('Clicked Add Document');
      },
    },
    {
      title: 'Index Card',
      image: AppImages.addDocument,
      onPress: () => {
        Applogger('Clicked Add Document');
      },
    },
    {
      title: 'Checkout',
      image: AppImages.addDocument,
      onPress: () => {
        Applogger('Clicked Add Document');
      },
    },
    {
      title: 'Page Version info',
      image: AppImages.addDocument,
      onPress: () => {
        Applogger('Clicked Add Document');
      },
    },
    {
      title: 'Add Reminder',
      image: AppImages.addDocument,
      onPress: () => {
        Applogger('Clicked Add Document');
      },
    },
    {
      title: 'Sign',
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
    const hasCopy = get(selectedDocument, 'HasCopy', false);
    const hasAttachments = get(selectedDocument, 'HasAttachments', false);

    const convertBooleanToString = itemStatus => {
      return itemStatus ? 'Yes' : 'No';
    };

    return (
      <View style={styles.dataContainer}>
        {Array.isArray(Field) &&
          Field.map((item, index) => {
            const {Label, Data} = item;
            const title = Label;
            let description = Data;
            if (title == 'Date') {
              description = getFormattedDate(description);
            }
            return (
              <DocumentDetailsCell
                key={index}
                title={title}
                description={description}
              />
            );
          })}
        <DocumentDetailsCell title={'Attachment'} suffix={imageSource} />
        <DocumentDetailsCell
          title={'Declared'}
          description={convertBooleanToString(isDeclared)}
        />
        <DocumentDetailsCell
          title={'Has Copy'}
          description={convertBooleanToString(hasCopy)}
        />
        <DocumentDetailsCell
          title={'Has Attachments'}
          description={convertBooleanToString(hasAttachments)}
        />
      </View>
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
      <View>
        <FlatList
          ref={menulistRef}
          data={menuItems}
          horizontal={true}
          renderItem={renderMenuItems}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
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
});
