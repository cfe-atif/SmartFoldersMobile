import React, {useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {unwrapResult} from '@reduxjs/toolkit';
import {mapAPICallError, responseHasError} from '../../utils/HelperFunctions';
import {changePasswordRequest} from './../../redux/reducers/AuthenticationReducer';
import {get} from 'lodash';
import {showFaliureToast, showSuccessToast} from '../../helpers/AppToasts';
import Applogger from '../../helpers/AppLogger';
import AppColors from '../../helpers/AppColors';
import AppImages from '../../helpers/AppImages';
import AppRoutes from './../../helpers/AppRoutes';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import PrimaryTextField from '../../components/textFields/PrimaryTextField';
import SFLoader from '../../components/loaders/SFLoader';
import SFHeading from '../../components/texts/SFHeading';

export default function ChangePassword({navigation}) {
  const dispatch = useDispatch();

  const {loading, user} = useSelector(state => state.AuthenticationReducer);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmitPress = () => {
    if (password != confirmPassword) {
      showFaliureToast('Error', 'Password and confirm password does not match');
      return;
    }
    dispatch(
      changePasswordRequest({password: password, userNo: get(user, 'No', '')}),
    )
      .then(unwrapResult)
      .then(res => {
        if (responseHasError(res)) {
          Applogger('Error at changePasswordRequest Response', res);
          showFaliureToast(mapAPICallError(err));
        } else {
          Applogger('Response at changePasswordRequest', res);
          showSuccessToast(
            'Congrats',
            'Password has been changed successfully, Login again to continue',
          );
          navigation.navigate(AppRoutes.Login);
        }
      })
      .catch(err => {
        Applogger('Error at changePasswordRequest', err);
        showFaliureToast(mapAPICallError(err));
      });
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      {loading && <SFLoader />}
      <Image
        source={AppImages.logoColor}
        resizeMode="contain"
        style={styles.image}
      />
      <SFHeading title="Change Password" />
      <PrimaryTextField
        placeholder={'Password'}
        value={password}
        onChange={text => setPassword(text)}
        isSecure={true}
      />
      <PrimaryTextField
        placeholder={'Confirm Password'}
        value={confirmPassword}
        onChange={text => setConfirmPassword(text)}
        isSecure={true}
      />
      <PrimaryButton title="Submit" onPress={() => handleSubmitPress()} />
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
