import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {menuTypes, foldersTypes} from './Constants';
import {unwrapResult} from '@reduxjs/toolkit';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {
  treeAPIData,
  treeAPIRRData,
} from '../../../redux/reducers/DocumentsReducer';
import {
  mapAPICallError,
  responseHasError,
  isUnAuthenticatedUser,
} from '../../../utils/HelperFunctions';
import {showFaliureToast} from '../../../helpers/AppToasts';
import moment from 'moment';
import Applogger from '../../../helpers/AppLogger';
import AppImages from './../../../helpers/AppImages';
import AppRoutes from './../../../helpers/AppRoutes';
import AppColors from './../../../helpers/AppColors';
import AppConstants from './../../../helpers/AppConstants';
import Header from '../../../components/headers/Header';
import SearchBar from '../../../components/search/SearchBar';
import FileCell from './../../../components/cells/FileCell';
import SFLoader from './../../../components/loaders/SFLoader';
import MenuButton from '../../../components/buttons/MenuButton';
import FolderCell from './../../../components/cells/FolderCell';
import FolderTypeButton from './../../../components/buttons/FolderTypeButton';
import FolderNavigationButton from './../../../components/buttons/FolderNavigationButton';

export default function Home({navigation}) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const {user, dataBaseNumber} = useSelector(
    state => state.AuthenticationReducer,
  );
  const {treeData, loading} = useSelector(state => state.DocumentsReducer);

  const menulistRef = useRef(null);
  const folderNavlistRef = useRef(null);

  const [searchText, setSearchText] = useState('');
  const [selectedMenu, setSelectedMenu] = useState('');
  const [foldersType, setFoldersType] = useState(foldersTypes.public);
  const [folderPath, setFolderPath] = useState('');
  const [currentFoldersData, setCurrentFoldersData] = useState([
    {title: 'Junaid', folder: true},
    {title: 'Nayyer', folder: true},
    {title: 'Atif Jamil', folder: true},
    {
      title: 'Usman',
      folder: false,
      date: moment(new Date()).format(AppConstants.dateFormat),
      description: 'This is file description',
    },
    {
      title: 'Shahab',
      folder: false,
      date: moment(new Date()).format(AppConstants.dateFormat),
      description:
        'This is file description which has multiple lines to truncate',
    },
  ]);

  const [folderNavigation, setFolderNavigation] = useState([
    {title: 'Nayyer'},
    {title: 'Usman'},
    {title: 'Junaid'},
    {title: 'Shahab'},
  ]);

  const menuItems = [
    {
      title: 'Add Document',
      image: AppImages.addDocument,
      onPress: () => {
        Applogger('Clicked Add Document');
        // setSelectedMenu(menuTypes.addDocument);
        navigation.navigate(AppRoutes.AddDocument, {
          folderPath: foldersType == foldersTypes.private ? 'P' : 'G',
        });
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
      title: 'Add Reminder',
      image: AppImages.addReminder,
      onPress: () => {
        Applogger('Clicked Add Reminder');
        setSelectedMenu('');
        navigation.navigate(AppRoutes.AddOrUpdateReminder);
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
      title: 'Refresh',
      image: AppImages.refresh,
      onPress: () => {
        Applogger('Clicked Refresh');
        setSelectedMenu(menuTypes.refresh);
      },
    },
    // {
    //   title: 'Email',
    //   image: AppImages.email,
    //   onPress: () => {
    //     Applogger('Clicked Email');
    //     setSelectedMenu(menuTypes.email);
    //   },
    // },
    // {
    //   title: 'PDF',
    //   image: AppImages.pdf,
    //   onPress: () => {
    //     Applogger('Clicked PDF');
    //     setSelectedMenu(menuTypes.pdf);
    //   },
    // },
  ];

  useEffect(() => {
    if (isFocused) {
      if (user !== null && dataBaseNumber != null) {
        getTreeData();
      }
    }
  }, [dataBaseNumber, isFocused]);

  const getTreeData = () => {
    let firstChar = '';
    if (folderPath !== null) {
      firstChar = folderPath.charAt(0);
    }

    if (folderPath && firstChar !== 'P') {
      fetchTreeAPIRRData(folderPath);
    } else {
      fetchTreeAPIData();
    }
  };

  const fetchTreeAPIRRData = folderPath => {
    dispatch(
      treeAPIRRData({
        dataBaseNumber,
        folderPath,
        user,
      }),
    )
      .then(unwrapResult)
      .then(res => {
        if (isUnAuthenticatedUser(res)) {
          navigation.navigate(AppRoutes.Login);
          showFaliureToast(mapAPICallError(res));
        } else {
          if (responseHasError(res)) {
            showFaliureToast(mapAPICallError(res));
          }
        }
        Applogger('Response at fetchTreeAPIRRData', res);
      })
      .catch(err => {
        Applogger('Error at fetchTreeAPIRRData', err);
        showFaliureToast(mapAPICallError(err));
      });
  };

  const fetchTreeAPIData = () => {
    dispatch(
      treeAPIData({
        dataBaseNumber,
        user,
      }),
    )
      .then(unwrapResult)
      .then(res => {
        if (isUnAuthenticatedUser(res)) {
          navigate(AppRoutes.Login);
          showFaliureToast(mapAPICallError(res));
        } else {
          if (responseHasError(res)) {
            showFaliureToast(mapAPICallError(res));
          }
        }
        Applogger('Response at fetchTreeAPIData', res);
      })
      .catch(err => {
        if (isUnAuthenticatedUser(err)) {
          navigate(AppRoutes.Login);
          showFaliureToast(mapAPICallError(err));
        } else {
          showFaliureToast(mapAPICallError(err));
        }
        Applogger('Error at fetchTreeAPIData', err);
      });
  };

  const renderMenuItems = ({item, index}) => {
    const {title, image, onPress} = item;
    return (
      <MenuButton
        key={index}
        title={title}
        image={image}
        onPress={() => {
          onPress();
          menulistRef?.current.scrollToIndex({animated: true, index: index});
        }}
      />
    );
  };

  const renderFolderNavigationitem = ({item, index}) => {
    const {title} = item;
    return (
      <FolderNavigationButton
        title={index == 0 ? `/${title}/` : `${title}/`}
        isSelected={index == folderNavigation.length - 1}
        onPress={() => {
          folderNavlistRef?.current.scrollToIndex({
            animated: true,
            index: index,
          });
        }}
      />
    );
  };

  const renderFolderFileItem = ({item, index}) => {
    const {title, folder, date, description} = item;
    if (folder) {
      return <FolderCell key={index} title={title} onPress={null} />;
    } else {
      return (
        <FileCell
          key={index}
          title={title}
          date={date}
          description={description}
          onPress={() =>
            navigation.navigate(AppRoutes.DocumentDetails, {
              document: item,
            })
          }
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      {loading && <SFLoader />}
      <View>
        <Header title="Home" />
        <SearchBar
          value={searchText}
          placeholder="Search..."
          onChange={text => setSearchText(text)}
          onClosePress={() => Applogger('Pressed close search')}
          onSearchPress={() => Applogger('Pressed search')}
        />
        <FlatList
          ref={menulistRef}
          data={menuItems}
          horizontal={true}
          renderItem={renderMenuItems}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <FolderTypeButton
          title="Public"
          isSelected={foldersType == foldersTypes.public}
          onPress={() => setFoldersType(foldersTypes.public)}
        />
        <FolderTypeButton
          title="Private"
          isSelected={foldersType == foldersTypes.private}
          onPress={() => setFoldersType(foldersTypes.private)}
        />
      </View>
      <View style={styles.foldersContainer}>
        <FlatList
          data={currentFoldersData}
          renderItem={renderFolderFileItem}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={styles.folderNavCon}>
        <FlatList
          ref={folderNavlistRef}
          data={folderNavigation}
          renderItem={renderFolderNavigationitem}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
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
    paddingHorizontal: 10,
  },
  foldersContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  buttonsContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  folderNavCon: {
    padding: 10,
    marginTop: 0,
    backgroundColor: AppColors.white,
  },
});
