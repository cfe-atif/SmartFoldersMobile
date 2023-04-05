import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {get} from 'lodash';
import moment from 'moment';
import AppColors from './../../helpers/AppColors';
import AppFontSize from './../../helpers/AppFontSize';
import AppFontFamily from '../../helpers/AppFontFamily';

export default function ReminderCell({reminder = {}, onPress = () => {}}) {
  const {
    Details,
    AlertDate,
    State,
    DueDate,
    Subject,
    DocumentNo,
    DocumentExtention,
    Database,
    DocumentTitle,
  } = reminder;
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <ReminderTextView title={'Subject:'} description={Subject} />
      <ReminderTextView
        title={'Due Date:'}
        description={moment(DueDate).format('DD-MMM-YYYY')}
      />
      {DocumentNo && (
        <ReminderDocumentView
          dbName={get(Database, 'Name', '')}
          subject={DocumentTitle}
          // docIcon={require(`../../assets/docImages/${'DocumentExtention'}.png`)}
          docIcon={require(`../../assets/docImages/${'copy'}.png`)}
        />
      )}
    </TouchableOpacity>
  );
}

export const ReminderTextView = ({title = '', description = ''}) => {
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

export const ReminderDocumentView = ({
  docIcon = '',
  dbName = '',
  subject = '',
  addStyle = {},
}) => {
  return (
    <View style={[styles.docViewCont, addStyle]}>
      <Text style={styles.subject} numberOfLines={1}>
        {subject}
      </Text>
      <Image source={docIcon} style={styles.docIcon} resizeMode="contain" />
      <Text style={styles.dbName} numberOfLines={1}>
        {dbName}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    color: AppColors.black,
    fontSize: AppFontSize.size14,
    fontFamily: AppFontFamily.semiBold,
  },
  description: {
    flex: 3,
    marginLeft: 10,
    color: AppColors.gray,
    fontSize: AppFontSize.size12,
    fontFamily: AppFontFamily.semiBold,
  },
  docViewCont: {
    borderWidth: 1.5,
    backgroundColor: AppColors.lightGray,
    borderColor: AppColors.gray,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    marginVertical: 5,
    marginLeft: 5,
    paddingHorizontal: 10,
  },
  docIcon: {
    height: 25,
    width: 25,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  subject: {
    color: AppColors.black,
    fontSize: AppFontSize.size14,
    fontFamily: AppFontFamily.semiBold,
    paddingRight: 10,
    borderRightWidth: 1,
    marginRight: 1,
    borderRightColor: AppColors.black,
  },
  dbName: {
    color: AppColors.black,
    fontSize: AppFontSize.size14,
    fontFamily: AppFontFamily.semiBold,
    paddingLeft: 10,
    borderLeftWidth: 1,
    marginLeft: 2,
    borderLeftColor: AppColors.black,
  },
});
