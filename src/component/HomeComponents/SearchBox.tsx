import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';

const SearchBox = ({navigation, toggle, setToggle}) => {
  return (
    <View style={styles.MainContainerSearchBox}>
      <View
        style={{
          margin: 20,
          height: '75%',
          borderRadius: 10,
          flexDirection: 'row',
          backgroundColor: '#fff',
        }}>
        
       


        <View style={styles.SearchBoxInput}>
          <TextInput placeholder="Search Here" 
  
           />
        </View>
       
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={{justifyContent: 'center', marginLeft: 10}}>
          <View
            >
            <MaterialIcon name="menu" size={25} />
          </View>
        </TouchableOpacity> 

        <View style={{justifyContent: 'center', marginLeft: 15}}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <MaterialIcon name="account-circle" size={32} />
          </TouchableOpacity>
        </View>


        <View style={{justifyContent: 'center', marginLeft: 13}}>
          <TouchableOpacity onPress={() => setToggle(!toggle)}>
            {toggle ? (
              <MaterialIcon name="grid-view" size={25} />
            ) : (
              <FontAwesome5Icon name="grip-lines" size={25} />
            )}
          </TouchableOpacity>
        </View>
        
      </View>
    </View>
  );
};

export default SearchBox;

const styles = StyleSheet.create({
  MainContainerSearchBox: {
    height: 60,
    justifyContent: 'center',
    backgroundColor: '#f4f4f4',
    
  },
  SearchBoxInput: {
    width: '60%',
    height: '100%',

    paddingHorizontal: 10,
    marginLeft: 10,
    justifyContent : 'center',
   
  },
});

{
  /* <View style={{justifyContent: 'center', marginLeft: 10 , borderWidth : 2 }}>
<TouchableOpacity onPress={() => console.log("menuclicked")}>
  <MaterialIcon name='menu' size={20} />
</TouchableOpacity>
</View> */
}
