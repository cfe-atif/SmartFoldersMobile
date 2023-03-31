import React, {useState, useRef} from 'react';
import {StyleSheet, FlatList, View, TouchableOpacity} from 'react-native';
import {
  filterOptions,
  reminderFilterOptions,
  reminderSortOptions,
} from './Constants';
import {get} from 'lodash';
import Applogger from '../../../helpers/AppLogger';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../../components/headers/Header';
import ReminderCell from '../../../components/cells/ReminderCell';
import ReminderDropDown from '../../../components/dropdowns/ReminderDropDown';
import ReminderFilterButton from '../../../components/buttons/ReminderFilterButton';
import AppIcons from './../../../helpers/AppIcons';
import AppColors from './../../../helpers/AppColors';
import AppRoutes from './../../../helpers/AppRoutes';

export default function Reminders({navigation}) {
  const filtersRef = useRef();

  const reminders = [
    {
      Details: 'Test for reminder without doc',
      AlertDate: '',
      State: 'DISMISS',
      ID: 2,
      DueDate: '2023-01-27 07:17:31.0',
      Subject: 'Reminder 2 DISMISS',
    },
    {
      Details: 'Test for reminder without doc',
      AlertDate: '2023-01-27 07:17:31.0',
      State: 'OPEN',
      ID: 4,
      DueDate: '2023-01-27 07:17:31.0',
      Subject: 'Reminder 2 OPEN',
    },
    {
      Details: 'OPEN Test for reminder without doc',
      AlertDate: '2023-01-27 07:17:31.0',
      State: 'OPEN',
      ID: 6,
      DueDate: '2023-01-27 07:17:31.0',
      Subject: 'Reminder 2 OPEN',
    },
  ];

  const [selectedFilter, setSelectedFilter] = useState(
    get(filterOptions, '[0].query', ''),
  );
  const handleAddReminder = () => {
    navigation.navigate(AppRoutes.AddOrUpdateReminder);
  };

  const handleReminderFiler = query => {
    setSelectedFilter(query);
  };

  const handleReminderCellPress = reminder => {};

  const renderReminderItem = ({item, index}) => {
    const {Details, AlertDate, State, DueDate, Subject} = item;
    return (
      <ReminderCell
        key={index}
        Details={Details}
        AlertDate={AlertDate}
        State={State}
        DueDate={DueDate}
        Subject={Subject}
        onPress={item => handleReminderCellPress(item)}
      />
    );
  };

  const renderReminderFilterItems = ({item, index}) => {
    const {title, query} = item;
    return (
      <ReminderFilterButton
        onPress={() => {
          handleReminderFiler(query);
          filtersRef?.current.scrollToIndex({
            animated: true,
            index: index,
          });
        }}
        title={title}
        selected={selectedFilter === query}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Reminders" />
      <View>
        <FlatList
          ref={filtersRef}
          horizontal={true}
          data={filterOptions}
          renderItem={renderReminderFilterItems}
        />
      </View>
      <View style={styles.filtersView}>
        <ReminderDropDown
          title="Filter By:"
          options={reminderFilterOptions}
          setSelected={filter => Applogger('Filter By: ', filter)}
        />
        <ReminderDropDown
          title="Sort By:"
          options={reminderSortOptions}
          setSelected={sort => Applogger('Sort By: ', sort)}
        />
      </View>
      <View style={styles.listContainer}>
        <FlatList data={reminders} renderItem={renderReminderItem} />
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => handleAddReminder()}>
        <Icon
          name={AppIcons.addReminder}
          color={AppColors.customBlue}
          size={60}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
  },
  addButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    zIndex: 999,
  },
  filtersView: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});
