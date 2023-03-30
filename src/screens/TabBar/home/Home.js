import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import {menuTypes, foldersTypes} from './Constants';
import AppImages from './../../../helpers/AppImages';
import Applogger from '../../../helpers/AppLogger';
import AppFontSize from './../../../helpers/AppFontSize';
import AppColors from './../../../helpers/AppColors';
import AppRoutes from './../../../helpers/AppRoutes';
import Header from '../../../components/headers/Header';
import SearchBar from '../../../components/search/SearchBar';

export default function Home({navigation}) {
  const [selectedMenu, setSelectedMenu] = useState('');
  const [foldersType, setFoldersType] = useState(foldersTypes.public);
  const [folderNavigation, setFolderNavigation] = useState([
    {title: 'Nayyer'},
    {title: 'Usman'},
    {title: 'Junaid'},
    {title: 'Shahab'},
    {title: 'Atif Jamil'},
  ]);

  const menuItems = [
    {
      title: 'Add Document',
      image: AppImages.addDocument,
      onPress: () => {
        Applogger('Clicked Add Document');
        // setSelectedMenu(menuTypes.addDocument);
        navigation.navigate(AppRoutes.AddDocument);
      },
    },
    {
      title: 'Add Folder',
      image: AppImages.addFolder,
      onPress: () => {
        Applogger('Clicked Add Folder');
        // setSelectedMenu(menuTypes.addFolder);
        navigation.navigate(AppRoutes.AddFolder);
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
        // setSelectedMenu(menuTypes.recentSearch);
        navigation.navigate(AppRoutes.RecentSearches);
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

  const renderFolderNavigationitem = ({item, index}) => {
    const {title} = item;
    return (
      <TouchableOpacity style={styles.navBtn}>
        <Text
          style={
            index == folderNavigation.length - 1
              ? styles.currentNavBtnText
              : styles.navBtnText
          }>{`${title}/`}</Text>
      </TouchableOpacity>
    );
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
      <View style={styles.intContainer}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={() => setFoldersType(foldersTypes.public)}
            style={
              foldersType == foldersTypes.public
                ? styles.folderButton
                : styles.selFolderButton
            }>
            <Text
              style={
                foldersType == foldersTypes.public
                  ? styles.selFolderButtonText
                  : styles.folderButtonText
              }>
              Public
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setFoldersType(foldersTypes.private)}
            style={
              foldersType == foldersTypes.private
                ? styles.folderButton
                : styles.selFolderButton
            }>
            <Text
              style={
                foldersType == foldersTypes.private
                  ? styles.selFolderButtonText
                  : styles.folderButtonText
              }>
              Private
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={folderNavigation}
          renderItem={renderFolderNavigationitem}
          horizontal={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  intContainer: {
    flex: 1,
    paddingHorizontal: 10,
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
  navBtn: {
    marginRight: 5,
  },
  navBtnText: {
    color: AppColors.gray,
    fontSize: AppFontSize.size16,
    fontWeight: '500',
  },
  currentNavBtnText: {
    color: AppColors.customBlue,
    fontSize: AppFontSize.size16,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    justifyContent: 'space-around',
  },
  selFolderButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: AppColors.customBlue,
    borderColor: AppColors.customBlue,
  },
  folderButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: AppColors.white,
    borderColor: AppColors.customBlue,
  },
  selFolderButtonText: {
    fontSize: AppFontSize.size16,
    color: AppColors.customBlue,
    fontWeight: 'bold',
  },
  folderButtonText: {
    fontSize: AppFontSize.size16,
    color: AppColors.white,
    fontWeight: 'bold',
  },
});
