import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import AppColors from '../../../helpers/AppColors';
import Header from '../../../components/headers/Header';
import PrimaryTextField from './../../../components/textFields/PrimaryTextField';
import ChatGroupDropDown from './../../../components/dropdowns/ChatGroupDropDown';
import PrimaryButton from './../../../components/buttons/PrimaryButton';
import Applogger from '../../../helpers/AppLogger';

export default function AddOrUpdateGroup({navigation}) {
  const [title, setTitle] = useState('');
  const usersList = [
    {
      value: 'System Administrator 1',
      key: '1',
    },
    {
      value: 'System Administrator 2',
      key: '2',
    },
    {
      value: 'System Administrator 3',
      key: '3',
    },
    {
      value: 'System Administrator 4',
      key: '4',
    },
    {
      value: 'System Administrator 5',
      key: '5',
    },
    {
      value: 'System Administrator 6',
      key: '6',
    },
  ];

  const handleSave = () => {};

  const handleSelectUsers = users => {
    Applogger('Users handleSelectUsers: ', users);
  };

  const handleOnSelect = users => {
    Applogger('Users handleOnSelect: ', users);
  };

  return (
    <View style={styles.container}>
      <Header
        title={'Create Group'}
        backButton={true}
        onBackPress={() => navigation.goBack()}
      />
      <View style={styles.intContainer}>
        <PrimaryTextField
          value={title}
          onChange={text => setTitle(text)}
          placeholder="Enter Name"
        />
        <ChatGroupDropDown
          options={usersList}
          title="Search or select users"
          setSelected={text => handleSelectUsers(text)}
          handleOnSelect={text => handleOnSelect(text)}
        />
      </View>
      <PrimaryButton title="Save" onPress={() => handleSave()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.offWhite,
  },
  intContainer: {
    flex: 1,
  },
});
