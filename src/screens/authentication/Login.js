import React, {useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AppColors from '../../helpers/AppColors';
import AppImages from '../../helpers/AppImages';
import AppRoutes from '../../helpers/AppRoutes';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import SimpleButton from '../../components/buttons/SimpleButton';
import PrimaryTextField from '../../components/textFields/PrimaryTextField';
import SFLoader from '../../components/loaders/SFLoader';
import SFHeading from '../../components/texts/SFHeading';

export default function Login({navigation}) {
  const loading = false;

  const [loginBody, setLoginBody] = useState({
    username: '',
    password: '',
  });

  const handleLoginPress = () => {
    navigation.navigate(AppRoutes.SelectDatabase);
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
