import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {menuTypes, foldersTypes} from './Constants';
import {unwrapResult} from '@reduxjs/toolkit';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {showFaliureToast} from '../../../helpers/AppToasts';
import {get} from 'lodash';
import {
  treeAPIData,
  treeAPIRRData,
  treeFoldersRequest,
} from '../../../redux/reducers/DocumentsReducer';
import {
  mapAPICallError,
  responseHasError,
  isUnAuthenticatedUser,
} from '../../../utils/HelperFunctions';
import Applogger from '../../../helpers/AppLogger';
import AppImages from './../../../helpers/AppImages';
import AppRoutes from './../../../helpers/AppRoutes';
import AppColors from './../../../helpers/AppColors';
import AppFontSize from '../../../helpers/AppFontSize';
import Header from '../../../components/headers/Header';
import SearchBar from '../../../components/search/SearchBar';
import SFLoader from './../../../components/loaders/SFLoader';
import MenuButton from '../../../components/buttons/MenuButton';
import SFNoRecord from '../../../components/texts/SFNoRecord';
import FolderCell from './../../../components/cells/FolderCell';
import FolderTypeButton from './../../../components/buttons/FolderTypeButton';
import FolderNavigationButton from './../../../components/buttons/FolderNavigationButton';

export default function Home({navigation}) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const {user, dataBaseNumber} = useSelector(
    state => state.AuthenticationReducer,
  );
  const {treeData, folders, loading} = useSelector(
    state => state.DocumentsReducer,
  );

  const menulistRef = useRef(null);
  const folderNavlistRef = useRef(null);
  const folderTypesRef = useRef(null);

  const [localFoldersList, setLocalFoldersList] = useState([]);
  const [folderTypeItems, setFolderTypeItems] = useState([]);
  const [globalTreeData, setGlobalTreeData] = useState([]);
  const [privateTreeData, setPrivateTreeData] = useState([]);
  const [folderNav, setFolderNav] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedMenu, setSelectedMenu] = useState('');
  const [folderPath, setFolderPath] = useState('');
  const [selectedFoldersType, setSelectedFoldersType] = useState(null);

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
    if (folderTypeItems.length > 0) {
      setFolderNav([get(folderTypeItems, '[0]', null)]);
    }
  }, [folderTypeItems]);

  useEffect(() => {
    handleLocalData();
  }, [selectedFoldersType]);

  useEffect(() => {
    setFolderPath(get(folderNav, `[${folderNav.length - 1}].ph`));
    if (folderNav.length > 0) {
      const lastItem = get(folderNav, folderNav.length - 1, null);
      const folderPath = get(lastItem, 'gbl', false)
        ? `G${get(lastItem, 'ph', false)}`
        : `P${get(lastItem, 'ph', false)}`;
      callTreeAPIFolderRequest(folderPath);
    }
  }, [folderNav]);

  useEffect(() => {
    if (folders) {
      const localArray = Array.isArray(get(folders, 'WebDocument.f', []))
        ? get(folders, 'WebDocument.f', [])
        : [get(folders, 'WebDocument.f', [])];
      setLocalFoldersList(localArray);
    }
  }, [folders]);

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

  const callTreeAPIFolderRequest = f_path => {
    dispatch(
      treeFoldersRequest({
        dataBaseNumber,
        user,
        f_path: get(selectedFoldersType, 'gbl', false)
          ? `G${f_path}`
          : `P${f_path}`,
      }),
    )
      .then(unwrapResult)
      .then(res => {
        Applogger('Response at treeFoldersRequest NavBar', res);
        if (isUnAuthenticatedUser(res)) {
          navigation.navigate(AppRoutes.Login);
          showFaliureToast(mapAPICallError(res));
        } else {
          if (!responseHasError(res)) {
          }
        }
      })
      .catch(err => {
        if (isUnAuthenticatedUser(err)) {
          navigation.navigate(AppRoutes.Login);
          showFaliureToast(mapAPICallError(err));
        }
        Applogger('Error at treeFoldersRequest NavBar', err);
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
    finalTreeData = finalTreeData.filter(treeData => {
      return treeData.gbl;
    });
    if (!folderTypeItems.length > 0) {
      setFolderTypeItems(finalTreeData);
    }
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

  function handleFolderNavItemsList(document) {
    setFolderNav(prevFolderNav => {
      let filteredArray = prevFolderNav.slice(); // make a copy of the previous array

      if (filteredArray.includes(document)) {
        const currentIndex = filteredArray.findIndex(val => {
          return get(val, 'ph', '') == get(document, 'ph', null);
        });
        if (currentIndex + 1) {
          var filteredArrayLength = filteredArray.length - currentIndex;
          filteredArray.splice(currentIndex + 1, filteredArrayLength + 1);
        }
      } else {
        filteredArray.push(document);
      }
      return filteredArray;
    });
    folderNavlistRef?.current.scrollToIndex({
      animated: true,
      index: folderNav.length - 1,
    });
  }

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
    const {n} = item;
    return (
      <FolderNavigationButton
        title={index == 0 ? `/${n}/` : `${n}/`}
        isSelected={index == folderNav.length - 1}
        onPress={() => {
          handleFolderNavItemsList(item);
          folderNavlistRef?.current.scrollToIndex({
            animated: true,
            index: index,
          });
        }}
      />
    );
  };

  const renderFolderItems = ({item, index}) => {
    const {n, dc, ph} = item;
    return (
      <FolderCell
        key={index}
        title={n}
        onPressFolder={() => {
          handleFolderNavItemsList(item);
          callTreeAPIFolderRequest(ph);
        }}
        onPressFiles={() => {
          navigation.navigate(AppRoutes.DocumentsList, {
            selectedFolder: item,
          });
        }}
        nestedItems={dc}
      />
    );
  };

  const renderFolderTypeItems = ({item, index}) => {
    const {n} = item;
    return (
      <FolderTypeButton
        key={index}
        title={n}
        isSelected={get(selectedFoldersType, 'n', '') == n}
        onPress={() => {
          setFolderNav([item]);
          setSelectedFoldersType(item);
          folderTypesRef?.current.scrollToIndex({
            animated: true,
            index: index,
          });
        }}
      />
    );
  };

  const handleNoRecordView = () => {
    if (folderNav.length > 1 && !localFoldersList.length > 0) {
      return (
        <SFNoRecord title={`No Child Folders`} textStyle={styles.noRecord} />
      );
    } else {
      if (
        get(selectedFoldersType, 'gbl', false) &&
        !globalTreeData.length > 0
      ) {
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
            folderNav.length > 1
              ? localFoldersList
              : get(selectedFoldersType, 'gbl', false)
              ? globalTreeData
              : privateTreeData
          }
          renderItem={renderFolderItems}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={styles.folderNavCon}>
        <FlatList
          ref={folderNavlistRef}
          data={folderNav}
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
