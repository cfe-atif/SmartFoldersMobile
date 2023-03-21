import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import AppColors from './../../helpers/AppColors';
import PrimaryButton from './../../components/buttons/PrimaryButton';
import SFHeading from './../../components/texts/SFHeading';
import AppRoutes from './../../helpers/AppRoutes';

export default function SelectDatabase({navigation}) {
  const [selected, setSelected] = useState('');

  const data = [
    {key: '1', value: 'Tax Centilation'},
    {key: '2', value: 'Samples'},
    {key: '3', value: 'Global'},
  ];

  const handleContinue = () => {
    navigation.navigate(AppRoutes.BottomNavigation);
  };

  return (
    <View style={styles.container}>
      <View>
        <SFHeading title="Select Database" />
        <SelectList
          setSelected={val => setSelected(val)}
          data={data}
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
