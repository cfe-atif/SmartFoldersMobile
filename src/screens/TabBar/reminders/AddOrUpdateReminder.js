import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Header from './../../../components/headers/Header';
import PrimaryTextField from './../../../components/textFields/PrimaryTextField';
import PrimaryButton from './../../../components/buttons/PrimaryButton';

export default function AddOrUpdateReminder({navigation}) {
  const [headerTitle, setHeaderTitle] = useState('Add Reminder');
  const [addReminderBody, setAddReminderBody] = useState({
    subject: '',
    details: '',
    dueDate: '',
    alertDate: '',
  });

  useEffect(() => {
    setHeaderTitle('Add Reminder');
  }, []);

  const handleAddPress = () => {};

  return (
    <View style={styles.container}>
      <Header
        title={headerTitle}
        backButton={true}
        onBackPress={() => navigation.goBack()}
      />
      <KeyboardAwareScrollView style={styles.fieldsContainer}>
        <PrimaryTextField
          placeholder="Subject"
          value={addReminderBody.subject}
          onChange={text =>
            setAddReminderBody({...addReminderBody, subject: text})
          }
        />
        <PrimaryTextField
          placeholder="Details"
          value={addReminderBody.details}
          onChange={text =>
            setAddReminderBody({...addReminderBody, details: text})
          }
        />
        <PrimaryTextField
          placeholder="Alert Date"
          value={addReminderBody.alertDate}
          onChange={text =>
            setAddReminderBody({...addReminderBody, alertDate: text})
          }
        />
        <PrimaryTextField
          placeholder="Alert Time"
          value={addReminderBody.alertDate}
          onChange={text =>
            setAddReminderBody({...addReminderBody, alertDate: text})
          }
        />
        <PrimaryTextField
          placeholder="Due Date"
          value={addReminderBody.dueDate}
          onChange={text =>
            setAddReminderBody({...addReminderBody, dueDate: text})
          }
        />
        <PrimaryTextField
          placeholder="Due Time"
          value={addReminderBody.dueDate}
          onChange={text =>
            setAddReminderBody({...addReminderBody, dueDate: text})
          }
        />
      </KeyboardAwareScrollView>
      <PrimaryButton title="Save" onPress={() => handleAddPress()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fieldsContainer: {
    flex: 1,
  },
});
