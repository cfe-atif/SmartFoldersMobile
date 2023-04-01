import React, {useRef, useState} from 'react';
import {StyleSheet, View, FlatList, TouchableOpacity, Text} from 'react-native';
import {decalreOptions} from '../Constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {get} from 'lodash';
import moment from 'moment';
import AppColors from './../../../../helpers/AppColors';
import AppFontFamily from '../../../../helpers/AppFontFamily';
import AppConstants from './../../../../helpers/AppConstants';
import Header from '../../../../components/headers/Header';
import PrimaryTextField from './../../../../components/textFields/PrimaryTextField';
import PrimaryButton from './../../../../components/buttons/PrimaryButton';
import PrimaryDatePicker from '../../../../components/textFields/PrimaryDatePicker';
import PrimaryDropDown from './../../../../components/dropdowns/PrimaryDropDown';
import SFDescription from './../../../../components/texts/SFDescription';

export default function AddDocument({navigation}) {
  const docTypeListRef = useRef(null);

  const [selectedDocType, setSelectedDocType] = useState(
    get(documentTypes, '[0].title', ''),
  );
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [addDocumentBody, setAddDocumentBody] = useState({
    title: '',
    subject: '',
    description: '',
    receivedDate: new Date(),
    addressee: '',
    recordType: '',
  });

  const handleAddDocument = () => {};

  const documentTypes = [
    {
      title: 'General',
    },
    {
      title: 'Pictures',
    },
  ];

  const renderDocumentTypeItem = ({item, index}) => {
    const {title} = item;
    const selected = title === selectedDocType;
    const backgroundColor = selected
      ? AppColors.customBlue
      : AppColors.lightGray;
    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          setSelectedDocType(title);
          docTypeListRef?.current.scrollToIndex({
            animated: true,
            index: index,
          });
        }}
        style={[styles.docTypeCont, {backgroundColor: backgroundColor}]}>
        <Text style={selected ? styles.selDocTypeTitle : styles.docTypeTitle}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title="Add Document"
        backButton={true}
        onBackPress={() => navigation.goBack()}
      />
      <View>
        <SFDescription
          title="Select Document Type"
          containerStyle={{margin: 0}}
        />
        <FlatList
          ref={docTypeListRef}
          style={{alignSelf: 'center'}}
          horizontal={true}
          data={documentTypes}
          renderItem={renderDocumentTypeItem}
        />
      </View>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <PrimaryTextField
            placeholder="Title"
            value={addDocumentBody.title}
            onChange={text =>
              setAddDocumentBody({...addDocumentBody, title: text})
            }
          />
          <PrimaryTextField
            placeholder="Subject"
            value={addDocumentBody.subject}
            onChange={text =>
              setAddDocumentBody({...addDocumentBody, subject: text})
            }
          />
          <PrimaryTextField
            placeholder="Description"
            value={addDocumentBody.description}
            onChange={text =>
              setAddDocumentBody({...addDocumentBody, description: text})
            }
          />
          <PrimaryDatePicker
            placeholder="Received Date"
            openDatePicker={openDatePicker}
            setOpenDatePicker={setOpenDatePicker}
            date={addDocumentBody.receivedDate}
            dateMode={AppConstants.datePicker.dateTime}
            value={moment(addDocumentBody.receivedDate).format(
              AppConstants.dateTimeFormat,
            )}
            onChange={date =>
              setAddDocumentBody({
                ...addDocumentBody,
                receivedDate: date,
              })
            }
          />
          <PrimaryTextField
            placeholder="Addressee"
            value={addDocumentBody.addressee}
            onChange={text =>
              setAddDocumentBody({...addDocumentBody, addressee: text})
            }
          />
          <PrimaryDropDown
            title="Declared as Record Type"
            options={decalreOptions}
            setSelected={declareType =>
              setAddDocumentBody({...addDocumentBody, recordType: declareType})
            }
          />
          <PrimaryButton title="Add" onPress={() => handleAddDocument()} />
        </View>
      </KeyboardAwareScrollView>
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
    fontFamily: AppFontFamily.regular,
  },
  selDocTypeTitle: {
    color: AppColors.white,
    fontFamily: AppFontFamily.bold,
  },
});
