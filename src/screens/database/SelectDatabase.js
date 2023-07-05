import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import {useDispatch, useSelector} from 'react-redux';
import {unwrapResult} from '@reduxjs/toolkit';
import {
  changeDBNumber,
  changeDBName,
} from '../../redux/reducers/AuthenticationReducer';
import {get} from 'lodash';
import {showFaliureToast} from '../../helpers/AppToasts';
import {StackActions} from '@react-navigation/native';
import AppColors from './../../helpers/AppColors';
import AppRoutes from './../../helpers/AppRoutes';
import Applogger from './../../helpers/AppLogger';
import AppFontFamily from '../../helpers/AppFontFamily';
import SFHeading from './../../components/texts/SFHeading';
import PrimaryButton from './../../components/buttons/PrimaryButton';
import SFLoader from './../../components/loaders/SFLoader';

export default function SelectDatabase({navigation}) {
  const dispatch = useDispatch();

  const {databases, loading} = useSelector(
    state => state.AuthenticationReducer,
  );

  const [localLoadinng, setLocalLoading] = useState(false);
  const [dropDownItems, setDropDownItems] = useState([]);
  const [selectedDatabase, setSelectedDatabase] = useState('');

  useEffect(() => {
    createDrpDownArray();
  }, []);

  const createDrpDownArray = () => {
    setDropDownItems(() => {
      return databases.map(({Number: key, Name: value, ...rest}) => ({
        key,
        value,
        ...rest,
      }));
    });
  };

  const getDatabaseNumber = () => {
    var databaseName = '';
    databases.forEach(database => {
      if (get(database, 'Name', '') == selectedDatabase) {
        databaseName = get(database, 'Number', '');
      }
    });
    return databaseName;
  };

  const handleChangeDBName = () => {
    dispatch(changeDBName(selectedDatabase))
      .then(unwrapResult)
      .then(res => {
        setLocalLoading(false);
        Applogger('DB Name updated Successfully', res);
        // navigation.navigate(AppRoutes.BottomNavigation, {
        //   screen: AppRoutes.Home,
        // });
        navigation.dispatch(
          StackActions.replace(AppRoutes.BottomNavigation, {
            screen: AppRoutes.Home,
          }),
        );
      })
      .catch(err => {
        setLocalLoading(false);
        Applogger('Error at updating DB Name', err);
      });
  };

  const handleChangeDBNumber = () => {
    dispatch(changeDBNumber(getDatabaseNumber()))
      .then(unwrapResult)
      .then(res => {
        Applogger('DB Number updated Successfully', res);
        handleChangeDBName();
      })
      .catch(err => {
        setLocalLoading(false);
        Applogger('Error at updating DB Number', err);
      });
  };

  const handleContinue = () => {
    if (selectedDatabase) {
      setLocalLoading(true);
      handleChangeDBNumber();
    } else {
      showFaliureToast('Warning', 'Please select database to continue');
    }
  };

  return (
    <View style={styles.container}>
      {(loading || localLoadinng) && <SFLoader />}
      <View>
        <SFHeading title="Select Database" />
        <SelectList
          setSelected={val => setSelectedDatabase(val)}
          data={dropDownItems}
          save="value"
          search={true}
          placeholder="Select Database"
          searchPlaceholder="Search Database"
          notFoundText="Database not found"
          boxStyles={{
            borderColor: AppColors.gray,
            margin: 10,
          }}
          inputStyles={{
            color: AppColors.gray,
          }}
          dropdownStyles={{
            borderColor: AppColors.gray,
            margin: 10,
          }}
          dropdownTextStyles={{
            color: AppColors.gray,
          }}
          maxHeight={300}
          fontFamily={AppFontFamily.semiBold}
        />
      </View>
      <PrimaryButton title="Continue" onPress={() => handleContinue()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
    padding: 10,
    paddingVertical: 20,
    justifyContent: 'center',
  },
});
