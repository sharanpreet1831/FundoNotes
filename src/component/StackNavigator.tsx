import { StyleSheet, TouchableOpacity, View, Modal, Text, Button } from 'react-native';
import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialComuIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Home1 from '../screen/Home1';
import ListScreen from '../screen/ListScreen';
import DrawingScreen from '../screen/DrawingScreen';
import AudioScreen from '../screen/AudioScreen';
import PhotoScreen from '../screen/PhotoScreen';
import ReminderComponent from './ReminderComponent';

const HeaderRightButtons = ({ onSaveReminder }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity>
        <MaterialIcon name="push-pin" size={27} />
      </TouchableOpacity>
      <TouchableOpacity style={{ paddingLeft: 22 }} onPress={() => setModalVisible(true)}>
        <MaterialComuIcon name="bell-plus-outline" size={23} />
      </TouchableOpacity>
      <TouchableOpacity style={{ paddingLeft: 22, paddingRight: 5 }}>
        <MaterialComuIcon name="download-box-outline" size={25} />
      </TouchableOpacity>

      <ReminderComponent visible={modalVisible} onClose={() => setModalVisible(false)} onSaveReminder={(date, time) => {
        console.log("Reminder Saved stack screeen  ", date, time);
        onSaveReminder(date, time)

      }} />
    </View>
  );
};

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const [reminderDate, setReminderDate] = useState(null);
  const [reminderTime, setReminderTime] = useState(null);

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: '',
        headerTintColor: 'black',
        headerLeft: () => null,
        headerRight: () => (
          <HeaderRightButtons onSaveReminder={(date, time) => {
            console.log("Updating Reminder State - Date:", date, "Time:", time);
            setReminderDate(date);
            setReminderTime(time);
          }} />
        ),
      }}
    >
      <Stack.Screen name="Home" component={Home1} options={{ headerShown: false }} />

      {/* Corrected ListScreen */}
      <Stack.Screen name="List">
        {(props) => {
          console.log("Passing to ListScreen - Date:", reminderDate, "Time:", reminderTime);
          return <ListScreen {...props} reminderDate={reminderDate} reminderTime={reminderTime} />;
        }}
      </Stack.Screen>
      <Stack.Screen name="Draw" component={DrawingScreen} />
      <Stack.Screen name="Audio" component={AudioScreen} />
      <Stack.Screen name="Photo" component={PhotoScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
});