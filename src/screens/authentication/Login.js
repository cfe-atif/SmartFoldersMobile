import React, {useState, useEffect} from 'react';
import {Image, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {unwrapResult} from '@reduxjs/toolkit';
import {
  changeDBNumber,
  loginRequest,
  changeDBName,
  clearStore,
} from '../../redux/reducers/AuthenticationReducer';
import {mapAPICallError, responseHasError} from '../../utils/HelperFunctions';
import {showFaliureToast} from '../../helpers/AppToasts';
import Applogger from '../../helpers/AppLogger';
import AppColors from '../../helpers/AppColors';
import AppImages from '../../helpers/AppImages';
import AppRoutes from '../../helpers/AppRoutes';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import SimpleButton from '../../components/buttons/SimpleButton';
import PrimaryTextField from '../../components/textFields/PrimaryTextField';
import SFLoader from '../../components/loaders/SFLoader';
import SFHeading from '../../components/texts/SFHeading';

export default function Login({navigation}) {
  const dispatch = useDispatch();

  const {loading} = useSelector(state => state.AuthenticationReducer);

  const [loginBody, setLoginBody] = useState({
    username: 'sysadmin',
    password: 'psl2023',
    // username: '',
    // password: '',
  });

  useEffect(() => {
    dispatch(clearStore());
  }, []);

  const handleChangeDBNumber = dbNumber => {
    dispatch(changeDBNumber(dbNumber))
      .then(unwrapResult)
      .then(res => {
        Applogger('DB Number updated Successfully', res);
        navigation.navigate(AppRoutes.BottomNavigation);
      })
      .catch(err => {
        Applogger('Error at updating DB Number', err);
      });
  };

  const handleChangeDBName = dbName => {
    dispatch(changeDBName(dbName))
      .then(unwrapResult)
      .then(res => {
        Applogger('DB Name updated Successfully', res);
        navigation.navigate(AppRoutes.BottomNavigation);
      })
      .catch(err => {
        Applogger('Error at updating DB Name', err);
      });
  };

  const handleLoginPress = () => {
    if (!loginBody.username || !loginBody.password) {
      showFaliureToast('Fields Error', 'Both fields are required');
      return;
    }
    dispatch(
      loginRequest({
        username: loginBody.username,
        password: loginBody.password,
      }),
    )
      .then(unwrapResult)
      .then(res => {
        if (responseHasError(res)) {
          Applogger('Error at loginRequest Response', res);
          showFaliureToast(mapAPICallError(err, true));
        } else {
          Applogger('Response at loginRequest', res);
          if (res.hasOwnProperty('PasswordExpired')) {
            navigation.navigate(AppRoutes.ChangePassword);
          } else {
            if (Array.isArray(res.Database) > 0) {
              navigation.navigate(AppRoutes.SelectDatabase);
            } else {
              handleChangeDBNumber(get(res, 'Database.Number'), '');
              handleChangeDBName(get(res, 'Database.Name'), '');
            }
          }
        }
      })
      .catch(err => {
        Applogger('Error at loginRequest', err);
        showFaliureToast(mapAPICallError(err, true));
      });
  };

  const handleForgotPassword = () => {
    navigation.navigate(AppRoutes.ForgotPassword);
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      {loading && <SFLoader />}
      <Image
        source={AppImages.logoColor}
        resizeMode="contain"
        style={styles.image}
      />
      <SFHeading title="Welcome to SmartFolders" />
      <PrimaryTextField
        placeholder={'Username'}
        value={loginBody.username}
        onChange={text => setLoginBody({...loginBody, username: text})}
      />
      <PrimaryTextField
        placeholder={'Password'}
        value={loginBody.password}
        onChange={text => setLoginBody({...loginBody, password: text})}
        isSecure={true}
      />
      <SimpleButton
        title="Forgot Password ?"
        onPress={() => handleForgotPassword()}
      />
      <PrimaryButton title="Login" onPress={() => handleLoginPress()} />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
    padding: 10,
  },
  image: {
    height: 150,
    aspectRatio: 1,
    margin: 20,
    marginTop: 100,
    alignSelf: 'center',
  },
});
