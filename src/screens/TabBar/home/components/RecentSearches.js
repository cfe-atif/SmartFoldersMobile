import React, {useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {get} from 'lodash';
import {recentSearches} from '../TempConstants';
import AppColors from './../../../../helpers/AppColors';
import AppFontSize from './../../../../helpers/AppFontSize';
import AppFontFamily from './../../../../helpers/AppFontFamily';
import Header from '../../../../components/headers/Header';
import RecentSearchCell from './../../../../components/cells/RecentSearchCell';

export default function RecentSearches({navigation}) {
  const [selectedSearch, setSelectedSearch] = useState('');

  const renderRecentSearchItem = ({item, index}) => {
    const {Name} = item;
    return (
      <RecentSearchCell
        key={index}
        title={Name}
        selected={Name === selectedSearch}
        onPress={() => setSelectedSearch(Name)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title="Recent Searches"
        backButton={true}
        onBackPress={() => navigation.goBack()}
      />
      <View style={styles.intContainer}>
        <View style={styles.flatListCont}>
          <Text
            style={styles.headerTitle}
            adjustsFontSizeToFit={true}
            numberOfLines={1}>
            Last 50 Search
          </Text>
          <FlatList
            data={
              Array.isArray(
                get(recentSearches, 'Searches.Saved.Last50.Search', []),
              )
                ? get(recentSearches, 'Searches.Saved.Last50.Search', [])
                : [get(recentSearches, 'Searches.Saved.Last50.Search', [])]
            }
            renderItem={renderRecentSearchItem}
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
            data={
              Array.isArray(
                get(recentSearches, 'Searches.Saved.Public.Search', []),
              )
                ? get(recentSearches, 'Searches.Saved.Public.Search', [])
                : [get(recentSearches, 'Searches.Saved.Public.Search', [])]
            }
            renderItem={renderRecentSearchItem}
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
            data={
              Array.isArray(
                get(recentSearches, 'Searches.Saved.Private.Search', []),
              )
                ? get(recentSearches, 'Searches.Saved.Private.Search', [])
                : [get(recentSearches, 'Searches.Saved.Private.Search', [])]
            }
            renderItem={renderRecentSearchItem}
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
    color: AppColors.customBlue,
    fontFamily: AppFontFamily.bold,
  },
});
