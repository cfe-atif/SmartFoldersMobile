import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import {menuTypes} from './Constants';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../../components/headers/Header';
import SearchBar from '../../../components/search/SearchBar';
import AddDocument from './components/AddDocument';
import AppImages from './../../../helpers/AppImages';
import Applogger from '../../../helpers/AppLogger';
import AppFontSize from './../../../helpers/AppFontSize';
import SFHeading from './../../../components/texts/SFHeading';
import AppIcons from './../../../helpers/AppIcons';
import AppColors from './../../../helpers/AppColors';
import AppRoutes from './../../../helpers/AppRoutes';
import RecentSearches from './components/RecentSearches';

export default function Home({navigation}) {
  const [selectedMenu, setSelectedMenu] = useState('');

  const menuItems = [
    {
      title: 'Add Document',
      image: AppImages.addDocument,
      onPress: () => {
        Applogger('Clicked Add Document');
        setSelectedMenu(menuTypes.addDocument);
      },
    },
    {
      title: 'Add Folder',
      image: AppImages.addFolder,
      onPress: () => {
        Applogger('Clicked Add Folder');
        setSelectedMenu(menuTypes.addFolder);
      },
    },
    {
      title: 'Refresh',
      image: AppImages.refresh,
      onPress: () => {
        Applogger('Clicked Refresh');
        setSelectedMenu(menuTypes.refresh);
      },
    },
    {
      title: 'Add Reminder',
      image: AppImages.addReminder,
      onPress: () => {
        Applogger('Clicked Add Reminder');
        setSelectedMenu('');
        navigation.navigate(AppRoutes.AddOrUpdateReminder);
      },
    },
    {
      title: 'Email',
      image: AppImages.email,
      onPress: () => {
        Applogger('Clicked Email');
        setSelectedMenu(menuTypes.email);
      },
    },
    {
      title: 'Recent Searches',
      image: AppImages.recentSearches,
      onPress: () => {
        Applogger('Clicked Recent Searches');
        setSelectedMenu(menuTypes.recentSearch);
      },
    },
    {
      title: 'PDF',
      image: AppImages.pdf,
      onPress: () => {
        Applogger('Clicked PDF');
        setSelectedMenu(menuTypes.pdf);
      },
    },
    {
      title: 'Reminders',
      image: AppImages.reminders,
      onPress: () => {
        Applogger('Clicked Reminders');
        setSelectedMenu('');
        navigation.navigate(AppRoutes.Reminders);
      },
    },
  ];

  const renderMenuItems = ({item, index}) => {
    const {title, image, onPress} = item;
    return (
      <TouchableOpacity onPress={onPress} key={index} style={styles.menuItem}>
        <Image source={image} resizeMode="contain" style={styles.menuIcon} />
        <Text style={styles.menuTitle}>{title}</Text>
      </TouchableOpacity>
    );
  };

  const renderMenuView = () => {
    if (selectedMenu === menuTypes.addDocument) {
      return <AddDocument />;
    } else if (selectedMenu === menuTypes.recentSearch) {
      return <RecentSearches />;
    } else {
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Header title="Home" />
        <SearchBar />
        <FlatList
          data={menuItems}
          horizontal={true}
          renderItem={renderMenuItems}
        />
      </View>
      {selectedMenu && (
        <View style={styles.intHeaderView}>
          <SFHeading title={selectedMenu} />
          <TouchableOpacity
            style={styles.closeIcon}
            onPress={() => setSelectedMenu('')}>
            <Icon name={AppIcons.close} size={25} color={AppColors.gray} />
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.intContainer}>{renderMenuView()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  intContainer: {
    flex: 1,
  },
  menuIcon: {
    height: 30,
    width: 30,
  },
  menuItem: {
    margin: 10,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  menuTitle: {
    fontSize: AppFontSize.size12,
  },
  intHeaderView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    position: 'absolute',
    right: 10,
    padding: 5,
  },
});
