import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';

import SearchBox from '../component/HomeComponents/SearchBox';
import HomeBody from '../component/HomeComponents/HomeBody';
import HomeFooter from '../component/HomeComponents/HomeFooter';
import Edit from '../component/HomeComponents/Edit';

const Home1 = ({navigation}) => {
  const [toggle, setToggle] = useState(false);
  const [reload, setReload] = useState(0);
  const [searchvisible , setSearchvisible] = useState(true)
  const [noteId , setNoteId] = useState()

  useFocusEffect( 
    useCallback(() => {
      
      setReload(prev => prev + 1);
    }, [])
  );

  return (
    <View style={styles.mainContainer} key={reload}>
      {
        searchvisible ? <SearchBox navigation={navigation} toggle={toggle} setToggle={setToggle}   /> : <Edit setSearchvisible ={setSearchvisible} noteId={noteId} />
      }
      
      <HomeBody toggle={toggle} navigation={navigation} setSearchvisible = {setSearchvisible} searchvisible = {searchvisible}  noteId ={noteId} setNoteId = {setNoteId}/>
      <HomeFooter navigation={navigation} />
    </View>
  );
};

export default Home1;
const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 70,
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
});