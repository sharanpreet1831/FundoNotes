


import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TouchableWithoutFeedback,
  Button,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';
import notifee from '@notifee/react-native';



const ReminderComponent = ({ visible, onClose, onSaveReminder }) => {


  async function scheduleNotification() {

    await notifee.requestPermission();



    // await notifee.displayNotification({
    //     title: 'Notification Title',
    //     body: 'Main body content of the notification',
    //     ios: {
    //         sound: 'default',
    //         foregroundPresentationOptions: {
    //           badge: true,
    //           sound: true,
    //           alert: true,
    //         }
    //     },


    //   });

    const notificationDateTime = new Date(selectedDate);
    notificationDateTime.setHours(selectedTime.getHours(), selectedTime.getMinutes(), 0, 0);

    if (notificationDateTime <= new Date()) {
      Alert.alert("⚠️ Selected time is in the past. Please choose a future time.");
      return;
    }

    await notifee.createTriggerNotification(
      {
        title: 'Reminder!',
        body: `It's time for your reminder!`,
        ios: {
          sound: 'default',
          foregroundPresentationOptions: {
            badge: true,
            sound: true,
            alert: true,
          },
        },
      },
      {
        type: TriggerType.TIMESTAMP,
        timestamp: notificationDateTime.getTime(),
      }
    );

  
    Alert.alert("✅ Notification scheduled for " + selectedTime);
  }


  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null)
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null)

  // useEffect(() => {
  //   const checkTime = setInterval(() => {
  //     if (selectedTime) {
  //       const now = new Date();
  //       const currentHours = now.getHours();
  //       const currentMinutes = now.getMinutes();

  //       // Extract hours and minutes from selected time
  //       const selectedHours = selectedTime.getHours();
  //       const selectedMinutes = selectedTime.getMinutes();

  //       if (currentHours === selectedHours && currentMinutes === selectedMinutes) {
  //         scheduleNotification();
  //         clearInterval(checkTime); // Stop checking after notification is sent
  //       }
  //     }
  //   }, 60000);
  //   return () => clearInterval(checkTime);
  // }, [selectedTime]);

  const saveReminder = () => {
    if (!selectedDate || !selectedTime) {
      Alert.alert("❌ Please select both date and time.");
      return; // Prevent closing modal
    }
    scheduleNotification(selectedDate, selectedTime);
    onSaveReminder(selectedDate, selectedTime);
    onClose();
  };
  const closeModal = () => {
    console.log(`Modal is closed. Selected Time: ${selectedTime}, Selected Date: ${selectedDate}`);
    setSelectedDate(null);
    setSelectedTime(null);
    onClose();
  };



  const showDatePicker = () => {
    setDatePickerVisibility(true);

  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    const selectedDateinside = date.toISOString().split('T')[0]; // Gets "YYYY-MM-DD"
    setSelectedDate(selectedDateinside)
    console.log("Selected Date: ", selectedDateinside);
    hideDatePicker();
  };



  const showTimePicker = () => {
    setTimePickerVisibility(true); // Corrected here
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false); // Corrected here
  };

  const handleTimeConfirm = (time) => {
    const selectedtimeIN = time.toLocaleTimeString();
    console.log("A time has been picked: ", selectedtimeIN);
    setSelectedTime(selectedtimeIN)
    hideTimePicker();
  };


  return (
    <>
      <Modal transparent={true} animationType="slide" visible={visible} onRequestClose={onClose}>

        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.modalBackground}>

            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Remind me Later</Text>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.modalText}>Saved in Google Reminder</Text>
                  <Button title='Done' onPress={saveReminder} />
                  <Button title='notifee' onPress={scheduleNotification} />
                </View>

                <View style={styles.separator} />

                <ScrollView>

                  <TouchableOpacity style={styles.option}>
                    <MaterialIcon name='alarm' size={30} />
                    <Text style={styles.optionText}>Tomorrow Morning</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.option}>
                    <MaterialIcon name='alarm' size={30} />
                    <Text style={styles.optionText}>Tomorrow Evening</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.option}>
                    <MaterialIcon name='alarm' size={30} />
                    <Text style={styles.optionText}>Next Morning</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.option}>
                    <MaterialIcon name='home' size={30} />
                    <Text style={styles.optionText}>Home</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.option}>
                    <MaterialIcon name='shopping-bag' size={30} />
                    <Text style={styles.optionText}>Work</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.option} onPress={showTimePicker}>
                    <MaterialIcon name='alarm' size={30} />
                    <Text style={styles.optionText}>Pick Time</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.option} onPress={showDatePicker}>
                    <MaterialIcon name='calendar-month' size={30} />
                    <Text style={styles.optionText}>Pick Date</Text>
                  </TouchableOpacity>

                </ScrollView>
                <DateTimePickerModal
                  isVisible={isTimePickerVisible}
                  mode="time"
                  onConfirm={handleTimeConfirm}
                  onCancel={hideTimePicker}
                />
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleDateConfirm}
                  onCancel={hideDatePicker}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>

      </Modal>

    </>

  );
};

export default ReminderComponent;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end', // Keep modal at bottom
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent overlay
  },
  modalContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: 'white',
    // height: '70%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  separator: {
    width: '100%',
    borderWidth: 0.4,
    marginTop: 10,

  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  optionText: {
    marginLeft: 15,
    fontSize: 18,
  },
  selectedDateText: {
    fontSize: 16,
    color: 'blue',
    marginTop: 10,
    marginLeft: 45, // Align with icons
  },
});