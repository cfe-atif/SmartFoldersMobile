import React, {useState, useEffect, useRef, Fragment} from 'react';
import {StyleSheet, FlatList, View, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {unwrapResult} from '@reduxjs/toolkit';
import {get} from 'lodash';
import {useIsFocused} from '@react-navigation/native';
import {Calendar} from 'react-native-big-calendar';
import {showFaliureToast} from '../../../helpers/AppToasts';
import {
  filterOptions,
  reminderFilterOptions,
  reminderSortOptions,
  reminderActions,
  reminderPeriods,
  reminderStates,
  filterTypes,
  sortTypes,
} from './Constants';
import {
  mapAPICallError,
  isUnAuthenticatedUser,
  responseHasError,
} from '../../../utils/HelperFunctions';
import {
  getRemindersList,
  getUpcomingRemindersList,
} from '../../../redux/reducers/RemindersReducer';
import Icon from 'react-native-vector-icons/Ionicons';
import Applogger from '../../../helpers/AppLogger';
import AppIcons from './../../../helpers/AppIcons';
import AppColors from './../../../helpers/AppColors';
import AppRoutes from './../../../helpers/AppRoutes';
import Header from '../../../components/headers/Header';
import FolderTypeButton from '../../../components/buttons/FolderTypeButton';
import ReminderCell from '../../../components/cells/ReminderCell';
import ReminderDropDown from '../../../components/dropdowns/ReminderDropDown';
import ReminderFilterButton from '../../../components/buttons/ReminderFilterButton';
import SFLoader from './../../../components/loaders/SFLoader';
import AppConstants from './../../../helpers/AppConstants';

export default function Reminders({navigation}) {
  const dispatch = useDispatch();

  const isFocused = useIsFocused();
  const filtersRef = useRef();

  const {user} = useSelector(state => state.AuthenticationReducer);
  const {remindersList, loading} = useSelector(state => state.RemindersReducer);

  const [remindersViewType, setRemindersViewType] = useState(
    AppConstants.reminderType.chart,
  );
  const [reminderEventsList, setReminderEventsList] = useState([]);
  const [filterOption, setFilterOption] = useState(reminderPeriods.all);
  const [sortType, setSortType] = useState(sortTypes.byDate);
  const [filterType, setFilterType] = useState(filterTypes.active);
  const [finalRemindersList, setFinalRemindersList] = useState([]);

  useEffect(() => {
    if (isFocused) {
      handleGetRemindersList(reminderPeriods.all);
      handleGetUpcomingRemindersList();
    }
  }, [isFocused]);

  useEffect(() => {
    getFinalRemindersList();
    handleChartReminders();
  }, [remindersList, filterType, sortType]);

  const getFinalRemindersList = () => {
    let finalList = [...remindersList];
    if (Array.isArray(remindersList)) {
      if (filterType == filterTypes.completed) {
        finalList = finalList.filter(reminder => {
          return (
            reminder.State == reminderStates.completed ||
            reminder.State == reminderStates.dismiss
          );
        });
      } else {
        finalList = finalList.filter(reminder => {
          return (
            reminder.State == reminderStates.open ||
            reminder.State == reminderStates.snooze
          );
        });
      }

      if (sortType == sortTypes.aToZ) {
        finalList = finalList.sort((reminderA, reminderB) => {
          return get(reminderA, 'Subject', '').toString().toLowerCase() >
            get(reminderB, 'Subject', '').toString().toLowerCase()
            ? 1
            : -1;
        });
      } else if (sortType == sortTypes.zToA) {
        finalList = finalList.sort((reminderA, reminderB) => {
          return get(reminderA, 'Subject', '').toString().toLowerCase() <
            get(reminderB, 'Subject', '').toString().toLowerCase()
            ? 1
            : -1;
        });
      } else {
        finalList = finalList.sort((reminderA, reminderB) => {
          return (
            new Date(get(reminderB, 'AlertDate', '')) -
            new Date(get(reminderA, 'AlertDate', ''))
          );
        });
      }
    }
    setFinalRemindersList(finalList);
  };

  const handleChartReminders = () => {
    let list = [];

    remindersList.forEach(reminder => {
      list.push({
        title: get(reminder, 'Subject', ''),
        start: new Date(get(reminder, 'DueDate', null)),
        end: new Date(get(reminder, 'DueDate', null)),
        id: get(reminder, 'ID', ''),
      });
    });

    setReminderEventsList(list);
  };

  const handleSelectEvent = reminder => {
    let finalReminder = '';
    remindersList.forEach(reminderItem => {
      if (get(reminderItem, 'ID', '') == get(reminder, 'id', '')) {
        finalReminder = reminderItem;
      }
    });
    navigation.navigate(AppRoutes.ReminderDetails, {
      selectedReminder: finalReminder,
    });
  };

  const handleSuccessToastAndLogs = (message, res) => {
    Applogger('Response at ' + message, res);
    if (isUnAuthenticatedUser(res)) {
      navigation.navigate(AppRoutes.Login);
      showFaliureToast('Error', mapAPICallError(res));
    }
  };

  const handleFaliureToastAndLogs = (message, err) => {
    Applogger('Error at ' + message, err);
    if (isUnAuthenticatedUser(err)) {
      navigation.navigate(AppRoutes.Login);
      showFaliureToast(mapAPICallError(err));
    }
  };

  const handleGetRemindersList = reminderPeriod => {
    const getRemindersBody = {
      ACTION_TYPE: reminderActions.list,
      USER: user.No,
    };
    dispatch(getRemindersList({getRemindersBody, reminderPeriod}))
      .then(unwrapResult)
      .then(res => {
        handleSuccessToastAndLogs('getRemindersList', res);
        if (isUnAuthenticatedUser(res)) {
          navigate(AppRoutes.Login);
          showFaliureToast(mapAPICallError(res));
        } else {
          if (!responseHasError(res)) {
          }
        }
      })
      .catch(err => {
        handleFaliureToastAndLogs('getRemindersList', err);
      });
  };

  const handleGetUpcomingRemindersList = () => {
    const upcomingRemindersBody = {
      ACTION_TYPE: reminderActions.upcoming,
      USER: user.No,
    };
    dispatch(getUpcomingRemindersList({upcomingRemindersBody}))
      .then(unwrapResult)
      .then(res => {
        handleSuccessToastAndLogs('getUpcomingRemindersList', res);

        if (isUnAuthenticatedUser(res)) {
          navigate(AppRoutes.Login);
          showFaliureToast(mapAPICallError(res));
        } else {
          if (!responseHasError(res)) {
            if (res.hasOwnProperty('Reminders')) {
              if (res.Reminders.Reminder) {
              }
            }
          }
        }
      })
      .catch(err => {
        handleFaliureToastAndLogs('getUpcomingRemindersList', err);
      });
  };

  const handleAddReminder = () => {
    navigation.navigate(AppRoutes.AddOrUpdateReminder);
  };

  const handleReminderCellPress = reminder => {
    navigation.navigate(AppRoutes.ReminderDetails, {
      selectedReminder: reminder,
    });
  };

  const renderReminderItem = ({item, index}) => {
    return (
      <ReminderCell
        key={index}
        reminder={item}
        onPress={() => handleReminderCellPress(item)}
      />
    );
  };

  const renderReminderFilterItems = ({item, index}) => {
    const {title, query} = item;
    return (
      <ReminderFilterButton
        onPress={() => {
          setFilterOption(query);
          handleGetRemindersList(query);
          filtersRef?.current.scrollToIndex({
            animated: true,
            index: index,
          });
        }}
        title={title}
        selected={filterOption === query}
      />
    );
  };

  return (
    <View style={styles.container}>
      {loading && <SFLoader />}
      <Header title="Reminders" />
      <View style={styles.buttonsContainer}>
        <FolderTypeButton
          title="Chart"
          isSelected={remindersViewType === AppConstants.reminderType.chart}
          onPress={() => setRemindersViewType(AppConstants.reminderType.chart)}
        />
        <FolderTypeButton
          title="List"
          isSelected={remindersViewType === AppConstants.reminderType.list}
          onPress={() => setRemindersViewType(AppConstants.reminderType.list)}
        />
      </View>
      {remindersViewType === AppConstants.reminderType.chart ? (
        <Calendar
          locale="en"
          events={reminderEventsList}
          height={600}
          onPressEvent={handleSelectEvent}
          mode="month"
        />
      ) : (
        <Fragment>
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
              setSelected={filter => {
                Applogger('Filter By: ', filter);
                setFilterType(filter);
              }}
              defaultKey={''}
              defaultValue={filterType}
            />
            <ReminderDropDown
              title="Sort By:"
              options={reminderSortOptions}
              setSelected={sort => {
                Applogger('Sort By: ', sort);
                setSortType(sort);
              }}
              defaultKey={''}
              defaultValue={sortType}
            />
          </View>
          <View style={styles.listContainer}>
            <FlatList
              data={finalRemindersList}
              renderItem={renderReminderItem}
            />
          </View>
        </Fragment>
      )}
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
  buttonsContainer: {
    padding: 10,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
