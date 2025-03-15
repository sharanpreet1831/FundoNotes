import {Button, Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Modal} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {launchImageLibrary} from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import {ScrollView} from 'react-native-gesture-handler';

const PhotoScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const [image, setImage] = useState('');
  const [title , setTitle] = useState('');
  

  useEffect(() => {
    setModalVisible(true);
  }, []);
  const saveImageToStorage = async imageUri => {
    try {
      const fileName = `image_${Date.now()}.jpg`;
      const destPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

      await RNFS.copyFile(imageUri, destPath);
      setImage(destPath);
      console.log('Image saved to:', destPath);
    } catch (error) {
      console.error('Error saving image:', error);
    }
  };
  const openGallery = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker  ');
      } else if (response.errorMessage) {
        console.log('Image Picker error : ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const imageUri = response.assets[0].uri;
        console.log('Selected Image:', imageUri);
        saveImageToStorage(imageUri);
        setModalVisible(false);
      }
    });
  };
const saveData =  async () => {
  const url = 'http://localhost:3000/users';
  let result =  await fetch (url , {
    method : 'POST',
    headers :{
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({Title:title ,image : image})
  });


}
  
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style = {styles.smallBox}>
            <TouchableOpacity>
            <View style = {{width : "100%" , height : 50  , flexDirection : 'row', alignItems : 'center' , marginLeft : 10}} >
              <FeatherIcon name='camera' size={30} />
              <Text style ={{marginLeft : 20 }} > Take Photo </Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={openGallery}>
            <View style = {{width : "100%" , height : 50   ,flexDirection : 'row', alignItems : 'center' , marginLeft : 10  }} >
              <AwesomeIcon name="photo" size={30} />
              <Text style ={{marginLeft : 20 }}> Choose Photo</Text>
            </View>
            </TouchableOpacity>
            <Button title='close' onPress={() =>{ setModalVisible(false); navigation.goBack();} } />
          </View>
          
        </View>
      </Modal>

      <ScrollView>
        <View style={styles.imageSetStyle}>
          <Image source={{uri: image}} style={{width: '100%', height: 500}} />
          <TextInput placeholder="Title" style={styles.inputfield} onChangeText={setTitle} value={title}></TextInput>
          <TextInput
            placeholder="Notes"
            style={[styles.inputfield, {fontSize: 20}]}
            
            ></TextInput>
        </View>
      </ScrollView>
      <View style = {{justifyContent : 'center' , alignItems : 'center'}}>
        <TouchableOpacity style={styles.ButtonWrapper} onPress={ () => saveData() }>
          <Text style = {{color : 'white'}}>Save data</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PhotoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  smallBox: {
    backgroundColor: '#fff',
    width: '100%',
    height: 200,
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  imageSetStyle: {
    width: '100%',
    height: '100%',
  },
  inputfield: {
    marginTop: 20,
    fontSize: 30,
    paddingHorizontal: 5,
  },
  ButtonWrapper: {
    borderWidth: 2,
    paddingHorizontal : 10 , backgroundColor : 'blue'
  },
});
