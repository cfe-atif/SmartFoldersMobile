import React, {useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AppColors from '../../helpers/AppColors';
import AppImages from '../../helpers/AppImages';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import PrimaryTextField from '../../components/textFields/PrimaryTextField';
import SFLoader from '../../components/loaders/SFLoader';
import SFHeading from '../../components/texts/SFHeading';

export default function ChangePassword({navigation}) {
  const loading = false;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmitPress = () => {
    navigation.goBack();
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
      />
      <PrimaryTextField
        placeholder={'Confirm Password'}
        value={confirmPassword}
        onChange={text => setConfirmPassword(text)}
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
