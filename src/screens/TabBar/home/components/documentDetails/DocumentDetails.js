import React, {useState} from 'react';
import {StyleSheet, View, ScrollView, FlatList} from 'react-native';
import {get} from 'lodash';
import {unwrapResult} from '@reduxjs/toolkit';
import {useDispatch, useSelector} from 'react-redux';
import {
  getSuffix,
  getFormattedDate,
  convertBooleanToString,
  isUnAuthenticatedUser,
  mapAPICallError,
  responseHasError,
} from '../../../../../utils/HelperFunctions';
import {
  showFaliureToast,
  showSuccessToast,
} from '../../../../../helpers/AppToasts';
import {signDocumentRequest} from '../../../../../redux/reducers/DocumentsReducer';
import AppImages from '../../../../../helpers/AppImages';
import Applogger from '../../../../../helpers/AppLogger';
import AppRoutes from '../../../../../helpers/AppRoutes';
import Header from '../../../../../components/headers/Header';
import SFLoader from '../../../../../components/loaders/SFLoader';
import MenuButton from '../../../../../components/buttons/MenuButton';
import DocumentDetailsCell from '../../../../../components/cells/DocumentDetailsCell';

export default function DocumentDetails({navigation, route}) {
  const dispatch = useDispatch();

  const {selectedDocument} = useSelector(state => state.DocumentsReducer);

  const {user, dataBaseNumber, dataBaseName} = useSelector(
    state => state.AuthenticationReducer,
  );
  const {loading, folderDocuments} = useSelector(
    state => state.DocumentsReducer,
  );

  const [localDocument, setLocalDocument] = useState({
    Database: '',
    DatabaseNo: null,
    DocumentExtention: '',
    DocumentNo: null,
    DocumentTitle: '',
  });

  const menuItems = [
    {
      title: 'Properties',
      image: AppImages.addDocument,
      onPress: () => {
        navigation.navigate(AppRoutes.DocumentProperties, {
          selectedDocument: selectedDocument,
        });
      },
    },
    {
      title: 'Edit',
      image: AppImages.addDocument,
      onPress: () => {
        navigation.navigate(AppRoutes.EditDocument, {
          selectedDocument: selectedDocument,
        });
      },
    },
    {
      title: 'Index Card',
      image: AppImages.addDocument,
      onPress: () => {
        navigation.navigate(AppRoutes.DocumentIndex, {
          selectedDocument: selectedDocument,
        });
      },
    },
    {
      title: 'Checkout',
      image: AppImages.addDocument,
      onPress: () => {
        navigation.navigate(AppRoutes.CheckoutDocument, {
          selectedDocument: selectedDocument,
        });
      },
    },
    {
      title: 'Page Version info',
      image: AppImages.addDocument,
      onPress: () => {
        navigation.navigate(AppRoutes.DocumentVersionInfo, {
          selectedDocument: selectedDocument,
        });
      },
    },
    {
      title: 'Add Reminder',
      image: AppImages.addDocument,
      onPress: () => {
        navigation.navigate(AppRoutes.AddOrUpdateReminder, {
          selectedDocument: getLocalDocument(),
        });
      },
    },
    {
      title: 'Sign',
      image: AppImages.addDocument,
      onPress: () => {
        handleSignDocumentRequest();
      },
    },
  ];

  const getLocalDocument = () => {
    let finalDocument = null;
    if (selectedDocument) {
      const suffix = getSuffix(selectedDocument);
      const {Field} = get(selectedDocument, 'Column.User', null);
      const imageSource = suffix ? `${AppImages[suffix]}` : null;
      finalDocument = {
        Database: dataBaseName,
        DocumentNo: get(selectedDocument, 'Index', ''),
        DocumentExtention: suffix,
        DatabaseNo: dataBaseNumber,
        DocumentTitle: getDocumentTitle(Field),
      };
    }
    return finalDocument;
  };

  const handleSignDocumentRequest = () => {
    let DB = dataBaseNumber;
    let UserNo = user.No;
    let DOC_NO = get(selectedDocument, 'Index', '');
    dispatch(signDocumentRequest({DB, UserNo, DOC_NO}))
      .then(unwrapResult)
      .then(res => {
        Applogger('Response at signDocumentRequest', res);
        if (!responseHasError(res)) {
          showSuccessToast(
            'Congrats',
            get(res, 'Confirm', 'Documents Signature updated Successfully'),
          );
          navigation.goBack();
        } else {
          if (isUnAuthenticatedUser(res)) {
            showFaliureToast(mapAPICallError(res));
          } else {
            var errorMessage = responseHasError(res)
              ? res.Error
              : 'Unable to edit docuemnt at the moment';
            showFaliureToast(errorMessage);
          }
        }
      })
      .catch(err => {
        Applogger('Error at signDocumentRequest'.err);
        if (isUnAuthenticatedUser(err)) {
          showFaliureToast(mapAPICallError(err));
        }
      });
  };

  const renderMenuItems = ({item, index}) => {
    const {title, image, onPress} = item;
    return (
      <MenuButton key={index} title={title} image={image} onPress={onPress} />
    );
  };

  const getSignaturetext = signature => {
    if (signature == '') {
      return 'N/A';
    } else {
      return `Signed By: ${get(signature, 'Authority', '')} ${get(
        signature,
        'User',
        '',
      )}`;
    }
  };

  const getDocumentTitle = Field => {
    let description = '';
    if (Array.isArray(Field)) {
      Field.forEach(item => {
        const {Label, Data} = item;
        const title = Label;
        if (title.toLowerCase().includes('title')) {
          description = Data;
        }
      });
    }
    return description;
  };

  const renderFileCells = () => {
    if (selectedDocument) {
      const suffix = getSuffix(selectedDocument);
      const imageSource = suffix ? `${AppImages[suffix]}` : null;
      const {Field} = get(selectedDocument, 'Column.User', null);
      const isDeclared = get(selectedDocument, 'Declared', false);
      const hasCopy = get(selectedDocument, 'HasCopy', false);
      const hasAttachments = get(selectedDocument, 'HasAttachments', false);
      const signature = get(selectedDocument, 'Signature', '');

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
          <DocumentDetailsCell
            title={'Signature'}
            description={getSignaturetext(signature)}
          />
        </View>
      );
    }
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
