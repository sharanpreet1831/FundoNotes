// import {
//   Image,
//   StyleSheet,
//   View,
//   Modal,
// } from 'react-native';
// import React, {useState} from 'react';
// import {
//   DrawerContentScrollView,
//   DrawerItem,
// } from '@react-navigation/drawer';
// import AntDesignIcon from 'react-native-vector-icons/AntDesign';
// import EditLabels from '../screen/EditLabels';

// const CustomDrawer = props => {
//   const [modalVisible, setModalVisible] = useState(false);
//   const { state, descriptors, navigation } = props;

//   return (
//     <View style={{flex: 1}}>
//       <Image
//         source={require('../Assests/Images/GoogleKeepLogo.jpg')}
//         style={styles.imgStyle}
//       />

//       <DrawerContentScrollView {...props} style={styles.listStyle}>
//         {state.routes.map((route, index) => {
//           if (index === 2) {
//             // Insert "Create New Label" at the 3rd position
//             return (
//               <View key="custom-label">
//                 <DrawerItem
//                   label="Create New Label"
//                   icon={() => <AntDesignIcon name="plus" size={20} />}
//                   onPress={() => setModalVisible(true)}
//                 />
//                 <DrawerItem
//                   key={route.key}
//                   label={descriptors[route.key].options.title || route.name}
//                   icon={descriptors[route.key].options.drawerIcon}
//                   onPress={() => navigation.navigate(route.name)}
//                 />
//               </View>
//             );
//           } else {
//             return (
//               <DrawerItem
//                 key={route.key}
//                 label={descriptors[route.key].options.title || route.name}
//                 icon={descriptors[route.key].options.drawerIcon}
//                 onPress={() => navigation.navigate(route.name)}
//               />
//             );
//           }
//         })}
//       </DrawerContentScrollView>

//       {/* Modal for Creating New Label */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <EditLabels setModalVisible={setModalVisible} />
//       </Modal>
//     </View>
//   );
// };

// export default CustomDrawer;

// const styles = StyleSheet.create({
//   imgStyle: {
//     height: 50,
//     width: 200,
//     marginTop: 60,
//   },
//   listStyle: {
//     marginTop: -60,
//   },
// });

import {
  Image,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import EditLabels from '../screen/EditLabels';

const CustomDrawer = props => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{flex: 1}}>
      <Image
        source={require('../Assests/Images/GoogleKeepLogo.jpg')}
        style={styles.imgStyle}
      />
      <DrawerContentScrollView {...props} style={styles.listStyle}>
        <DrawerItemList {...props} />

        {/* Custom DrawerItem for Creating New Label */}
        <DrawerItem
          label="Create New Label"
          icon={() => <AntDesignIcon name="plus" size={20} />}
          onPress={() => setModalVisible(true)}
        />
      </DrawerContentScrollView>

      {/* Modal for Creating New Label */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        
            <EditLabels setModalVisible={setModalVisible} />
          
      </Modal>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  imgStyle: {
    height: 50,
    width: 200,
    marginTop: 60,
  },
  listStyle: {
    marginTop: -60,
  },
  modalContainer: {
   width : '100%',
    
    
   
  },
  modalContent: {
    width : '100%',
    
   
    
   
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
  },
});
