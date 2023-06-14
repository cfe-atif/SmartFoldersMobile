import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {get} from 'lodash';
import {unwrapResult} from '@reduxjs/toolkit';
import {useDispatch, useSelector} from 'react-redux';
import {
  isUnAuthenticatedUser,
  mapAPICallError,
  responseHasError,
} from '../../../../../utils/HelperFunctions';
import {
  getRecentAndSavedSearches,
  deleteSavedSearch,
} from '../../../../../redux/reducers/RecentSearchesReducer';
import {
  showFaliureToast,
  showSuccessToast,
} from '../../../../../helpers/AppToasts';
import Applogger from '../../../../../helpers/AppLogger';
import AppColors from '../../../../../helpers/AppColors';
import AppRoutes from '../../../../../helpers/AppRoutes';
import AppFontSize from '../../../../../helpers/AppFontSize';
import AppFontFamily from '../../../../../helpers/AppFontFamily';
import Header from '../../../../../components/headers/Header';
import SFLoader from '../../../../../components/loaders/SFLoader';
import RecentSearchCell from '../../../../../components/cells/RecentSearchCell';
import ReminderFilterButton from '../../../../../components/buttons/ReminderFilterButton';

export default function RecentSearches({navigation}) {
  const dispatch = useDispatch();

  const {user, dataBaseNumber} = useSelector(
    state => state.AuthenticationReducer,
  );
  const {recentAndSavedSearches, loading} = useSelector(
    state => state.RecentSearchesReducer,
  );

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSearch, setSelectedSearch] = useState(null);
  const [last50Searches, setLast50Searches] = useState([]);
  const [publicSearches, setPublicSearches] = useState([]);
  const [privateSearches, setPrivateSearches] = useState([]);

  const categories = {
    public: 'public',
    private: 'private',
    last50: 'last50',
  };

  useEffect(() => {
    callRecentAndSavedSearchesAPI();
  }, []);

  useEffect(() => {
    handleDataLocally();
  }, [recentAndSavedSearches]);

  const callRecentAndSavedSearchesAPI = () => {
    var DB = dataBaseNumber;
    var USER = user.No;
    dispatch(getRecentAndSavedSearches({DB, USER}))
      .then(unwrapResult)
      .then(res => {
        if (isUnAuthenticatedUser(res)) {
          navigation.navigate(AppRoutes.Login);
          showFaliureToast(mapAPICallError(res));
        } else {
          if (responseHasError(res)) {
            showFaliureToast(res.Error);
          }
        }
        Applogger('Response at getRecentAndSavedSearches', res);
      })
      .catch(err => {
        Applogger('Error at getRecentAndSavedSearches', err);
      });
  };

  const handleDataLocally = () => {
    if (
      recentAndSavedSearches != null &&
      !recentAndSavedSearches.hasOwnProperty('Error')
    ) {
      // Handle last 50 searches
      if (recentAndSavedSearches.Searches.Saved.Last50 == '') {
        setLast50Searches([]);
      } else if (
        Array.isArray(recentAndSavedSearches.Searches.Saved.Last50.Search)
      ) {
        setLast50Searches(recentAndSavedSearches.Searches.Saved.Last50.Search);
      } else {
        var newArray = [recentAndSavedSearches.Searches.Saved.Last50.Search];
        setLast50Searches(newArray);
      }

      // Handle private searches
      if (recentAndSavedSearches.Searches.Saved.Private == '') {
        setPrivateSearches([]);
      } else if (
        Array.isArray(recentAndSavedSearches.Searches.Saved.Private.Search)
      ) {
        setPrivateSearches(
          recentAndSavedSearches.Searches.Saved.Private.Search,
        );
      } else {
        var newArray = [recentAndSavedSearches.Searches.Saved.Private.Search];
        setPrivateSearches(newArray);
      }

      // Handle public searches
      if (recentAndSavedSearches.Searches.Saved.Public == '') {
        setPublicSearches([]);
      } else if (
        Array.isArray(recentAndSavedSearches.Searches.Saved.Public.Search)
      ) {
        setPublicSearches(recentAndSavedSearches.Searches.Saved.Public.Search);
      } else {
        var newArray = [recentAndSavedSearches.Searches.Saved.Public.Search];
        setPublicSearches(newArray);
      }
    }
  };

  const getSearchType = () => {
    if (selectedCategory === categories.private) {
      return 1;
    } else if (selectedCategory === categories.public) {
      return 2;
    } else {
      return null;
    }
  };

  const handleDeletePress = () => {
    if (selectedSearch == null) {
      showFaliureToast('Warning!', 'Please select an item to delete');
    } else if (selectedSearch && selectedCategory === categories.last50) {
      showFaliureToast(
        'Warning!',
        'You can only delete private or public searches',
      );
    } else {
      var SNAME = get(selectedSearch, 'Name', '');
      var DB = dataBaseNumber;
      var USER = user.No;
      var TYPE = getSearchType();
      dispatch(deleteSavedSearch({DB, USER, SNAME, TYPE}))
        .then(unwrapResult)
        .then(res => {
          if (isUnAuthenticatedUser(res)) {
            navigation.navigate(AppRoutes.Login);
            showFaliureToast(mapAPICallError(res));
          } else if (responseHasError(res)) {
            showFaliureToast(res.Error);
          } else {
            showSuccessToast(
              'Success',
              'Search reference deleted successfully',
            );
            callRecentAndSavedSearchesAPI();
          }
          Applogger('Response at deleteSavedSearch', res);
        })
        .catch(err => {
          Applogger('Error at deleteSavedSearch', err);
        });
    }
  };

  const handleSearchPress = () => {
    Applogger('Clicked Search');
  };

  const renderRecentSearchItem = ({item, index, category}) => {
    const {Name} = item;
    return (
      <RecentSearchCell
        key={index}
        title={Name}
        selected={Name === get(selectedSearch, 'Name', '')}
        onPress={() => {
          setSelectedSearch(item);
          setSelectedCategory(category);
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      {loading && <SFLoader />}
      <Header
        title="Recent Searches"
        backButton={true}
        onBackPress={() => navigation.goBack()}
      />
      <View style={styles.buttonsContainer}>
        <ReminderFilterButton
          selected={true}
          title={'Search'}
          onPress={() => handleSearchPress()}
        />
        <ReminderFilterButton
          selected={true}
          title={'Delete'}
          onPress={() => handleDeletePress()}
        />
      </View>
      <View style={styles.intContainer}>
        <View style={styles.flatListCont}>
          <Text
            style={styles.headerTitle}
            adjustsFontSizeToFit={true}
            numberOfLines={1}>
            Last 50 Search
          </Text>
          <FlatList
            data={last50Searches}
            renderItem={(item, index) =>
              renderRecentSearchItem(item, index, categories.last50)
            }
          />
        </View>
        <View style={styles.flatListCont}>
          <Text
            style={styles.headerTitle}
            adjustsFontSizeToFit={true}
            numberOfLines={1}>
            Public
          </Text>
          <FlatList
            data={publicSearches}
            renderItem={(item, index) =>
              renderRecentSearchItem(item, index, categories.public)
            }
          />
        </View>
        <View style={styles.flatListCont}>
          <Text
            style={styles.headerTitle}
            adjustsFontSizeToFit={true}
            numberOfLines={1}>
            Private
          </Text>
          <FlatList
            data={privateSearches}
            renderItem={(item, index) =>
              renderRecentSearchItem(item, index, categories.private)
            }
          />
        </View>
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
    flexDirection: 'row',
  },
  flatListCont: {
    flex: 1,
    borderWidth: 1,
    borderColor: AppColors.gray,
    fontFamily: AppFontFamily.regular,
  },
  headerTitle: {
    textAlign: 'center',
    padding: 5,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: AppColors.gray,
    fontSize: AppFontSize.size16,
    color: AppColors.black,
    fontFamily: AppFontFamily.bold,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
});
