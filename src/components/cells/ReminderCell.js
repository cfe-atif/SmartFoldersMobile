import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import AppColors from './../../helpers/AppColors';
import AppFontSize from './../../helpers/AppFontSize';
import moment from 'moment';

export default function ReminderCell({
  Details = '',
  AlertDate = '',
  State = '',
  DueDate = '',
  Subject = '',
  onPress = () => {},
}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <ReminderTextView title={'Subject:'} description={Subject} />
      <ReminderTextView title={'State'} description={State} />
      <ReminderTextView
        title={'Due Date:'}
        description={moment(DueDate).format('DD-MMM-YYYY')}
      />
      {AlertDate && (
        <ReminderTextView
          title={'Alert Date:'}
          description={moment(AlertDate).format('DD-MMM-YYYY')}
        />
      )}
      <ReminderTextView title={'Details'} description={Details} />
    </TouchableOpacity>
  );
}

const ReminderTextView = ({title = '', description = ''}) => {
  return (
    <View style={styles.textViewCon}>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <Text style={styles.description} numberOfLines={1}>
        {description}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 2,
    borderColor: AppColors.lightGray,
    backgroundColor: AppColors.white,
  },
  textViewCon: {
    padding: 5,
    flexDirection: 'row',
  },
  title: {
    flex: 1,
    color: AppColors.black,
    fontSize: AppFontSize.size14,
  },
  description: {
    flex: 3,
    marginLeft: 10,
    color: AppColors.gray,
    fontSize: AppFontSize.size12,
  },
});
