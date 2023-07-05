import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {get} from 'lodash';
import {useDispatch, useSelector} from 'react-redux';
import {unwrapResult} from '@reduxjs/toolkit';
import {
  getDeclaredOption,
  setDeclaredRequest,
} from '../../../../../../../redux/reducers/DocumentsReducer';
import {
  responseHasError,
  mapAPICallError,
  isUnAuthenticatedUser,
} from '../../../../../../../utils/HelperFunctions';
import {
  showSuccessToast,
  showFaliureToast,
} from '../../../../../../../helpers/AppToasts';
import AppRoutes from '../../../../../../../helpers/AppRoutes';
import AppColors from '../../../../../../../helpers/AppColors';
import Applogger from '../../../../../../../helpers/AppLogger';
import AppFontSize from '../../../../../../../helpers/AppFontSize';
import AppFontFamily from '../../../../../../../helpers/AppFontFamily';
import Separator from '../../../../../../../components/seperator/Separator';
import PrimaryButton from '../../../../../../../components/buttons/PrimaryButton';
import ReminderDropDown from '../../../../../../../components/dropdowns/ReminderDropDown';

export default function ViewDocProperties({viewPropertiesData, navigation}) {
  const dispatch = useDispatch();

  const {declareOptions} = useSelector(state => state.DocumentsReducer);

  const [declareOption, setDeclareOption] = useState('');
  const [recordTypeList, setRecordTypeList] = useState([]);
  const [declareOptionsList, setDeclareOptionsList] = useState([]);

  useEffect(() => {
    if (viewPropertiesData) {
      handleGetDeclaredOption();
    }
  }, [viewPropertiesData]);

  useEffect(() => {
    if (Array.isArray(get(declareOptions, 'RecordTypeList.RecordType', []))) {
      setRecordTypeList(get(declareOptions, 'RecordTypeList.RecordType', []));
    } else {
      setRecordTypeList([get(declareOptions, 'RecordTypeList.RecordType', [])]);
    }
  }, [declareOptions]);

  useEffect(() => {
    let testArray = [];
    recordTypeList.map(record => {
      testArray.push({
        key:
          get(record, 'Number', '') == 0 ? 'zero' : get(record, 'Number', ''),
        value: get(record, 'Name', ''),
      });
    });
    setDeclareOptionsList(testArray);
  }, [recordTypeList]);

  const handleSetDeclaredRequest = () => {
    if (!declareOption) {
      showFaliureToast('Field Error', 'Please select an option to continue');
      return;
    }

    let HIT = viewPropertiesData.Document.Hit;
    let DB = viewPropertiesData.Document.DB;
    let USER = viewPropertiesData.User;
    let DocType = viewPropertiesData.Document.DocType;

    dispatch(
      setDeclaredRequest({
        HIT,
        DB,
        USER,
        DocType,
        declaredValue: declareOption == 'zero' ? 0 : declareOption,
      }),
    )
      .then(unwrapResult)
      .then(res => {
        if (responseHasError(res)) {
          if (isUnAuthenticatedUser(res)) {
            navigation.navigate(AppRoutes.Login);
            showFaliureToast(mapAPICallError(res));
          } else {
            var errorMessage = responseHasError(res)
              ? res.Error
              : 'Something Wrong';
            showFaliureToast(errorMessage);
          }
        } else {
          showSuccessToast(
            'Success',
            res?.Response ?? 'Document declared as record successfully',
          );
          navigation.goBack();
        }
        Applogger('Response at setDeclaredRequest ', res);
      })
      .catch(err => {
        if (isUnAuthenticatedUser(err)) {
          navigation.navigate(AppRoutes.Login);
          showFaliureToast(mapAPICallError(err));
        } else {
          showFaliureToast('Set Declared Request Failed');
        }
        Applogger('Error at setDeclaredRequest', err);
      });
  };

  const handleGetDeclaredOption = () => {
    let HIT = viewPropertiesData.Document.Hit;
    let DB = viewPropertiesData.Document.DB;
    let USER = viewPropertiesData.User;
    let DocType = viewPropertiesData.Document.DocType;

    dispatch(getDeclaredOption({HIT, DB, USER, DocType}))
      .then(unwrapResult)
      .then(res => {
        Applogger('Response at getDeclaredOption ', res);
        if (responseHasError(res)) {
          if (isUnAuthenticatedUser(res)) {
            navigation.navigate(AppRoutes.Login);
            showFaliureToast(mapAPICallError(res));
          } else {
            var errorMessage = responseHasError(res)
              ? res.Error
              : 'Something Wrong';
            showFaliureToast(errorMessage);
          }
        }
      })
      .catch(err => {
        if (isUnAuthenticatedUser(err)) {
          navigation.navigate(AppRoutes.Login);
          showFaliureToast(mapAPICallError(err));
        } else {
          showFaliureToast('Declared options Request Failed');
        }
        Applogger('Error at getDeclaredOption', err);
      });
  };

  const isDeclared = () => {
    return get(viewPropertiesData, 'Document.Declared', false);
  };

  const declaredDetails = () => {
    return `On: ${get(
      viewPropertiesData,
      'Document.DeclaredDate[0]',
      '',
    )} By: ${get(viewPropertiesData, 'Document.DeclaredBy', '')}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.intContainer}>
        <Text style={styles.title}>Created Date:</Text>
        <Text style={styles.desc}>
          {get(viewPropertiesData, 'Document.Created_Date', 'N/A')}
        </Text>
      </View>
      <View style={styles.intContainer}>
        <Text style={styles.title}>Created By:</Text>
        <Text style={styles.desc}>
          {get(viewPropertiesData, 'Document.Creator', 'N/A')}
        </Text>
      </View>
      <View style={styles.intContainer}>
        <Text style={styles.title}>Metadata amended date:</Text>
        <Text style={styles.desc}>
          {get(viewPropertiesData, 'Document.Amended_Date', 'N/A')}
        </Text>
      </View>
      <View style={styles.intContainer}>
        <Text style={styles.title}>Metadata amended by:</Text>
        <Text style={styles.desc}>
          {get(viewPropertiesData, 'Document.Amendor', 'N/A')}
        </Text>
      </View>
      <Separator />
      <View style={styles.intContainer}>
        <Text style={styles.title}>Checked out date:</Text>
        <Text style={styles.desc}>{'None'}</Text>
      </View>
      <View style={styles.intContainer}>
        <Text style={styles.title}>Checked out by:</Text>
        <Text style={styles.desc}>{'Nobody'}</Text>
      </View>
      <Separator />
      <View style={styles.intContainer}>
        <Text style={styles.title}>Folders:</Text>
        <Text style={styles.desc}>
          {get(
            viewPropertiesData,
            'Document.BundleList.Bundle.BundleListName',
            'N/A',
          )}
        </Text>
      </View>
      <Separator />
      {get(viewPropertiesData, 'Document.UserEdit.DeclareDocument', 'N/A') &&
      isDeclared() ? (
        <View style={styles.intContainer}>
          <Text style={styles.title}>Declared as record:</Text>
          <Text style={styles.desc}>{declaredDetails()}</Text>
        </View>
      ) : (
        <View style={styles.intContainer}>
          <ReminderDropDown
            title="Declare Document as record"
            options={declareOptionsList}
            setSelected={option => {
              Applogger('Declare Option: ', option);
              setDeclareOption(option);
            }}
            defaultKey={''}
            defaultValue={''}
          />
          <PrimaryButton
            title="Declare"
            onPress={() => handleSetDeclaredRequest()}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  intContainer: {
    margin: 5,
  },
  title: {
    marginHorizontal: 10,
    color: AppColors.black,
    fontSize: AppFontSize.size14,
    fontFamily: AppFontFamily.semiBold,
  },
  desc: {
    marginHorizontal: 10,
    color: AppColors.gray,
    fontSize: AppFontSize.size14,
    fontFamily: AppFontFamily.semiBold,
  },
});
// viewPropertiesDataLocal.Document.UserEdit
//                       .DeclareDocument ? (
//                       viewPropertiesDataLocal.Document.Declared ? (
//                         <tr>
//                           <th>Declared as record</th>
//                           <td>
//                             <Text>
//                               On:
//                               {viewPropertiesDataLocal.Document.DeclaredDate[0]}
//                             </Text>
//                             <br />
//                             <Text>
//                               By: {viewPropertiesDataLocal.Document.DeclaredBy}
//                             </Text>
//                           </td>
//                         </tr>
//                       ) : (
//                         <tr>
//                           <th>Declare document as record </th>
//                           <td>
//                             {declaredData !== null && (
//                               <Select
//                                 name={`DISPOSALSCHEDULE`}
//                                 placeholder={`Select Declare document as record`}
//                                 onChange={handleChange}
//                                 style={{
//                                   width: "190px",
//                                   marginRight: "20px",
//                                 }}
//                               >
//                                 {declaredData.RecordTypeList.RecordType.map(
//                                   (option, indexKey) => (
//                                     <>
//                                       <Option
//                                         key={indexKey}
//                                         value={option.Number}
//                                       >
//                                         {option.Name}
//                                       </Option>
//                                     </>
//                                   )
//                                 )}
//                               </Select>
//                             )}
//                             <Button
//                               style={{ width: "110px" }}
//                               type="primary"
//                               onClick={() => setDeclared()}
//                             >
//                               Declare
//                             </Button>
//                           </td>
//                         </tr>
//                       )
//                     ) : null}
