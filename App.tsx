import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import Navigation1 from './src/component/Navigation1'
import CustomDrawer from './src/component/CustomDrawer'
import { NavigationContainer } from '@react-navigation/native'
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer'
import ReminderComponent from './src/component/ReminderComponent'
import EditLabels from './src/screen/EditLabels'






const Drawer = createDrawerNavigator() ;
const App =() =>{
  
  return (
   <>
   <Navigation1 />
   
   {/* <ReminderComponent /> */}
   {/* <EditLabels /> */}
   
   </>
  )
}
export default App