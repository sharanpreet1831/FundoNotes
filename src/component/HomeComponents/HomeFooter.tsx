import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const HomeFooter = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.FooterMainContainer}>
      <View style={styles.ImageWrapper}>
        <TouchableOpacity style={styles.footerImageTouch} onPress={() => navigation.navigate('List')}>
          <MaterialIcon name="check-box" size={24} color={'#777'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerImageTouch} onPress={() => navigation.navigate('Draw')}>
          <Icon name="paint-brush" size={24} color={'#777'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerImageTouch} onPress={() => navigation.navigate('Audio')}>
          <Icon name="microphone" size={24} color={'#777'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerImageTouch} onPress={() => navigation.navigate('Photo')}>
          <Icon name="photo" size={24} color={'#777'} />
        </TouchableOpacity>
      </View>

      {/* Floating Button */}
      <View style={styles.PlusButtonWrapper}>
        <TouchableOpacity onPress={() => navigation.navigate('List')} style={styles.PlusButton}>
          <Image source={require('../../Assests/Images/newlogo.png')} style={styles.ImageStyle} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  FooterMainContainer: {
    width: '100%',
    height: 80,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  ImageWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  footerImageTouch: {
    marginHorizontal: 15,
  },
  PlusButtonWrapper: {
    position: 'absolute',
    right: 30,
    top: -30,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#f4f4f4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  PlusButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
  },
  ImageStyle: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});

export default HomeFooter;

// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import React from 'react'
// import Icon from 'react-native-vector-icons/FontAwesome';
// import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

// const HomeFooter = ({navigation}) => {
//     return (
//       <View style={styles.FooterMainContainer}>
        
//         <View style={styles.ImageWrapper}>
//           <TouchableOpacity style={styles.footerImageTouch}  onPress={() => navigation.navigate('List')} >
//             <View>
//               <MaterialIcon name="check-box" size={22} color={'grey'} />
//             </View>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.footerImageTouch} onPress={() => navigation.navigate('Draw')}>
//             <View style={styles.iconWrapper}>
//               <Icon name="paint-brush" size={22} color={'grey'} />
//             </View>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.footerImageTouch} onPress={() => navigation.navigate("Audio")}>
//             <View style={styles.iconWrapper}>
//               <Icon name="microphone" size={22} color={'grey'} />
//             </View>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.footerImageTouch} onPress={ () => navigation.navigate('Photo')}>
//             <View style={styles.iconWrapper}>
//               <Icon name="photo" size={22} color={'grey'} />
//             </View>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   };

// export default HomeFooter

// const styles = StyleSheet.create({
//     FooterMainContainer: {
//         width: '100%',
//         height: 70,
//         borderWidth: 1,
    
//         shadowColor: '#f4f4f4',
//         marginTop : -17,
//         backgroundColor:'white'
//       },
//       FooterImage: {
//         width: 20,
//         height: 20,
//         marginLeft: 20,
//       },
//       ImageWrapper: {
//         marginTop: 10,
//         marginLeft: 10,
//         flexDirection: 'row',
//       },
//       footerImageTouch: {},
//       SearchLogo: {
//         alignItems: 'flex-end',
//         width: 100,
       
//       },
//       iconWrapper: {
//         marginLeft: 20,
//       },
// })