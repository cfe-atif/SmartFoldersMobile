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
import {get} from 'lodash';
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
import SFNoRecord from '../../../components/texts/SFNoRecord';
import AppFontSize from '../../../helpers/AppFontSize';

export default function Home({navigation}) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const {user, dataBaseNumber} = useSelector(
    state => state.AuthenticationReducer,
  );
  const {treeData, loading} = useSelector(state => state.DocumentsReducer);

  const menulistRef = useRef(null);
  const folderNavlistRef = useRef(null);
  const folderTypesRef = useRef(null);

  const [folderTypeItems, setFolderTypeItems] = useState([]);
  const [globalTreeData, setGlobalTreeData] = useState([]);
  const [privateTreeData, setPrivateTreeData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedMenu, setSelectedMenu] = useState('');
  const [selectedFoldersType, setSelectedFoldersType] = useState(null);
  const [folderPath, setFolderPath] = useState('');

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
          folderPath: selectedFoldersType == foldersTypes.private ? 'P' : 'G',
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
    getTreeDataForNavBar();
  }, [treeData]);

  useEffect(() => {
    if (isFocused) {
      if (user !== null && dataBaseNumber != null) {
        getTreeData();
      }
    }
  }, [dataBaseNumber, isFocused]);

  useEffect(() => {
    setSelectedFoldersType(get(folderTypeItems, '[0]', null));
  }, [folderTypeItems]);

  useEffect(() => {
    handleLocalData();
  }, [selectedFoldersType]);

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
          navigation.navigate(AppRoutes.Login);
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
          navigation.navigate(AppRoutes.Login);
          showFaliureToast(mapAPICallError(err));
        } else {
          showFaliureToast(mapAPICallError(err));
        }
        Applogger('Error at fetchTreeAPIData', err);
      });
  };

  const getTreeDataForNavBar = () => {
    var finalTreeData = [];

    if (treeData != null) {
      if (treeData.hasOwnProperty('f') && treeData.f.hasOwnProperty('f')) {
        finalTreeData = treeData.f.f;
      } else if (treeData.hasOwnProperty('f')) {
        finalTreeData = treeData.f;
      }
    }

    if (Array.isArray(finalTreeData)) {
      finalTreeData = [...finalTreeData].sort(function (a, b) {
        if (a.ph == '/1/') {
          return dataSorting(a.n, b.n);
        } else {
          return a.n
            .toString()
            .localeCompare(b.n.toString(), 'en', {numeric: true});
        }
      });
    } else {
      finalTreeData = [finalTreeData];
    }
    setFolderTypeItems(finalTreeData);
  };

  const handleLocalData = () => {
    let privateData = [];
    let globalData = [];
    if (folderTypeItems) {
      folderTypeItems.forEach(treeItem => {
        if (treeItem.gbl == true) {
          globalData = get(treeItem, 'f', []);
        } else if (treeItem.gbl == false) {
          privateData = get(treeItem, 'f', []);
        }
      });
    }

    globalData = [...globalData].sort((a, b) => {
      const nameA = get(a, 'n', '').toString().toLowerCase();
      const nameB = get(b, 'n', '').toString().toLowerCase();
      return nameA > nameB ? 1 : -1;
    });

    privateData = [...privateData].sort((a, b) => {
      const nameA = get(a, 'n', '').toString().toLowerCase();
      const nameB = get(b, 'n', '').toString().toLowerCase();
      return nameA > nameB ? 1 : -1;
    });

    setPrivateTreeData(privateData);
    setGlobalTreeData(globalData);
  };

  const dataSorting = (a, b) => {
    // Assuming you want case-insensitive comparison
    if (a === 'Private') return 1;
    if (b === 'Private') return 1;
    a = a.toString().toLowerCase();
    b = b.toString().toLowerCase();

    return a < b ? -1 : a > b ? 1 : 0;
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
    const {n, gbl, dc, date, description} = item;
    if (gbl) {
      return (
        <FolderCell key={index} title={n} onPress={null} nestedItems={dc} />
      );
    } else {
      return (
        <FileCell
          key={index}
          title={n}
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

  const renderFolderTypeItems = ({item, index}) => {
    const {n} = item;
    return (
      <FolderTypeButton
        key={index}
        title={n}
        isSelected={get(selectedFoldersType, 'n', '') == n}
        onPress={() => setSelectedFoldersType(item)}
      />
    );
  };

  const handleNoRecordView = () => {
    if (get(selectedFoldersType, 'gbl', false) && !globalTreeData.length > 0) {
      return (
        <SFNoRecord title={`No Record Found`} textStyle={styles.noRecord} />
      );
    } else if (
      !get(selectedFoldersType, 'gbl', true) &&
      !privateTreeData.length > 0
    ) {
      return (
        <SFNoRecord title={`No Record Found`} textStyle={styles.noRecord} />
      );
    } else {
      return null;
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
        <FlatList
          ref={folderTypesRef}
          data={folderTypeItems}
          horizontal={true}
          renderItem={renderFolderTypeItems}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={styles.foldersContainer}>
        {handleNoRecordView()}
        <FlatList
          data={
            get(selectedFoldersType, 'gbl', false)
              ? globalTreeData
              : privateTreeData
          }
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  folderNavCon: {
    padding: 10,
    marginTop: 0,
    backgroundColor: AppColors.white,
  },
  noRecord: {
    fontSize: AppFontSize.size14,
  },
});
