import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import RemindersScreen from '../screen/RemindersScreen';
import CreateNewLabelScreen from '../screen/CreateNewLabelScreen';
import ArchiveScreen from '../screen/ArchiveScreen';
import TrashScreen from '../screen/TrashScreen';
import SettingsScreen from '../screen/SettingsScreen';
import SendAppFeedback from '../screen/SendAppFeedback';
import HelpScreen from '../screen/HelpScreen';
import CustomDrawer from './CustomDrawer';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import StackNavigator from './StackNavigator';
import EditLabels from '../screen/EditLabels'; // ✅ Corrected Import

const Drawer = createDrawerNavigator();

const DrawerNavigationFile = () => {
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch('http://localhost:3000/Label');
        let result = await response.json();
        setLabels(result);
      } catch (error) {
        console.error('Error fetching labels:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{ headerShown: false }}
    >
      {/* Standard Drawer Options */}
      <Drawer.Screen
        name="Home"
        component={StackNavigator}
        options={{ drawerIcon: () => <AntDesignIcon name="bulb1" size={20} /> }}
      />

      <Drawer.Screen
        name="Reminders"
        component={RemindersScreen}
        options={{ drawerIcon: () => <AntDesignIcon name="bells" size={20} /> }}
      />

      {/* Dynamically Add Labels Before "Create New Label" */}
      {labels.map((label, index) => (
        <Drawer.Screen
          key={index}
          name={label.labelname}
          component={EditLabels} 
          initialParams={{ labelId: label.id }}
          options={{
            drawerIcon: () => <MaterialIcon name="label-outline" size={20} />,
          }}
        />
      ))}

      {/* Create New Label Option */}
      {/* <Drawer.Screen
        name="Create new Label"
        component={CreateNewLabelScreen}
        options={{ drawerIcon: () => <AntDesignIcon name="plus" size={20} /> }}
      /> */}

      {/* Other Drawer Options */}
      <Drawer.Screen
        name="Archive"
        component={ArchiveScreen}
        options={{ drawerIcon: () => <MaterialIcon name="archive" size={20} /> }}
      />
      <Drawer.Screen
        name="Trash"
        component={TrashScreen}
        options={{ drawerIcon: () => <AntDesignIcon name="delete" size={20} /> }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ drawerIcon: () => <AntDesignIcon name="setting" size={20} /> }}
      />
      <Drawer.Screen
        name="Send app feedback"
        component={SendAppFeedback}
        options={{ drawerIcon: () => <MaterialIcon name="feedback" size={20} /> }}
      />
      <Drawer.Screen
        name="Help"
        component={HelpScreen}
        options={{ drawerIcon: () => <MaterialIcon name="help-outline" size={20} /> }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigationFile;


// import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
// import React, { useEffect, useState } from 'react';

// import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {createDrawerNavigator} from '@react-navigation/drawer';

// import RemindersScreen from '../screen/RemindersScreen';
// import CreateNewLabelScreen from '../screen/CreateNewLabelScreen';
// import ArchiveScreen from '../screen/ArchiveScreen';
// import TrashScreen from '../screen/TrashScreen';
// import SettingsScreen from '../screen/SettingsScreen';
// import SendAppFeedback from '../screen/SendAppFeedback';
// import HelpScreen from '../screen/HelpScreen';
// import CustomDrawer from './CustomDrawer';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import AntDesignIcon from 'react-native-vector-icons/AntDesign';
// import Home1 from '../screen/Home1';
// import StackNavigator from './StackNavigator';
// import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
// import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
// import FeatherIcon from 'react-native-vector-icons/Feather';
// import {Touchable} from 'react-native';
// import { Modal } from 'react-native';
// import EditLabels from '../screen/EditLabels';
// import OcticonsIcon from 'react-native-vector-icons/Octicons';

// const Drawer = createDrawerNavigator();
// const DrawerNavigationFile = () => {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [data, setData] = useState([]);

//   const fetchData = async () => {
//     try {
//       let url = 'http://localhost:3000/Label';
//       let response = await fetch(url);
//       let result = await response.json();
//       setData(result);
//     } catch (error) {
//       console.error('Error fetching labels:', error);
//     }
//   }
//   useEffect(() =>{
//     fetchData();
//   },[])
//   return (
//     <Drawer.Navigator
//       drawerContent={props => <CustomDrawer {...props} />}
//       screenOptions={{headerShown: false}}>
//       <Drawer.Screen
//         name="Home"
//         component={StackNavigator}
//         options={{drawerIcon: () => <AntDesignIcon name="bulb1" size={20} />}}
//       />

//       <Drawer.Screen
//         name="Reminders"
//         component={RemindersScreen}
//         options={{
//           drawerIcon: () => <AntDesignIcon name="bells" size={20} />,
//           headerShown: true,
//           headerRight: () => (
//             <View style={{flexDirection: 'row'}}>
//               <TouchableOpacity style={{paddingLeft: 20}}>
//                 <MaterialCommunityIcon name="magnify" size={25} />
//               </TouchableOpacity>
//               <TouchableOpacity style={{paddingLeft: 20, paddingRight: 10}}>
//                 <FeatherIcon name="grid" size={25} />
//               </TouchableOpacity>
//             </View>
//           ),
//         }}
//       />
    
//     {data.length > 0 && (
//         <FlatList
//           data={data}
//           keyExtractor={(item, index) => index.toString()}
//           renderItem={({item}) => (
//             <View style={styles.labelBox}>
//               <MaterialIcon name="label-outline" size={25} />
//               <Text style={styles.labelText}>{item.labelname}</Text>
//               <OcticonsIcon name="pencil" size={25} />
//             </View>
//           )}
//         />
//       )} 

//       <Drawer.Screen
//         name="Create new Label"
//         component={CreateNewLabelScreen}
//         options={{drawerIcon: () => <AntDesignIcon name="plus" size={20} />}}
//       />
//       <Drawer.Screen
//         name="Archive"
//         component={ArchiveScreen}
//         options={{
//           drawerIcon: () => (
//             <MaterialCommunityIcon name="download-box-outline" size={20} />
//           ),
//           headerShown: true,

//           headerRight: () => (
//             <View style={{flexDirection: 'row'}}>
//               <TouchableOpacity style={{paddingLeft: 20}}>
//                 {' '}
//                 <MaterialCommunityIcon name="magnify" size={25} />
//               </TouchableOpacity>
//               <TouchableOpacity style={{paddingLeft: 20, paddingRight: 10}}>
//                 <FeatherIcon name="grid" size={25} />
//               </TouchableOpacity>
//             </View>
//           ),
//         }}
//       />
//       <Drawer.Screen
//         name="Trash"
//         component={TrashScreen}
//         options={{drawerIcon: () => <Icon name="trash-o" size={20} />}}
//       />
//       <Drawer.Screen
//         name="Settings"
//         component={SettingsScreen}
//         options={{drawerIcon: () => <AntDesignIcon name="setting" size={20} />}}
//       />
//       <Drawer.Screen
//         name="Send app feedback"
//         component={SendAppFeedback}
//         options={{drawerIcon: () => <MaterialIcon name="feedback" size={20} />}}
//       />
//       <Drawer.Screen
//         name="Help"
//         component={HelpScreen}
//         options={{
//           drawerIcon: () => (
//             <MaterialCommunityIcon name="help-circle-outline" size={20} />
//           ),
//         }}
//       />

      
//     </Drawer.Navigator>
//   );
// };

// export default DrawerNavigationFile;

// const styles = StyleSheet.create({
//   labelBox: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingVertical: 10,
//     marginLeft: 10,
//     marginRight: 10,
//   },
//   labelText: {
//     flex: 1,
//     fontSize: 18,
//     marginLeft: 10,
//   },
// })



  
