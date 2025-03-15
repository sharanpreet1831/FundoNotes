/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {SketchCanvas} from '@sourcetoad/react-native-sketch-canvas';
import RNFS from 'react-native-fs'; // Make sure to install react-native-fs for file handling
import AntiDesignIcon from 'react-native-vector-icons/AntDesign';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import MaterialComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';

const DrawingScreen = () => {
  const canvasRef = useRef<SketchCanvas>(null);
  const [title, setTitle] = useState('');
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  const handleAdd = async (): Promise<void> => {
    if (!canvasRef.current) {
      return;
    }

    try {
      // Capture the drawing as a base64 string with the correct callback
      const base64: string = await new Promise((resolve, reject) => {
        canvasRef.current?.getBase64(
          'png', // format of the image (png, jpeg, etc.)
          false, // include drawing in the result (not transparent)
          false, // don't include background color
          false, // don't include stroke color
          false, // don't include stroke width
          (err?: any, result?: string) => {
            // callback function to handle the result
            if (err) {
              reject(err); // reject the promise if an error occurs
            } else if (result) {
              resolve(result); // resolve the promise with the base64 string
            } else {
              reject(new Error('No result received')); // handle the case where no result is received
            }
          },
        );
      });



      // Get current timestamp for unique filename
      const timestamp = Date.now();
      const fileName = `draw_${timestamp}.png`;
      const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

      // Save the base64 image to the local file system
      await RNFS.writeFile(filePath, base64, 'base64');
      console.log('Image saved to:', filePath);

      // Create the note object

      // Send the data via POST request (base64 image + title)
      const data = {
        Title: title,
        image: filePath, // Send the base64 image directly to the server
        createdAt: firestore.Timestamp.now() ,
      };

      // Send POST request with fetch
      // fetch('http://localhost:3000/users', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(data),
      // })
      //   .then(response => response.json())
      //   .then(data => {
      //     console.log('Data saved successfully:', data);
      //   })
      //   .catch(error => {
      //     console.error('Error saving data:', error);
      //   });

      firestore().collection('users').add({
        data

      })
    } catch (error) {
      console.error('Error saving the image:', error);
    }
  };

  return (
    <SafeAreaView style ={{ flex: 1}}>
      <TextInput
        placeholder="Title"
        style={styles.InputStyle}
        value={title}
        onChangeText={setTitle}
      />
      <View style={styles.CanvaWrapper}>
        <SketchCanvas
          style={{flex: 1}}
          ref={canvasRef}
          strokeColor={'red'}
          strokeWidth={5}
          onStrokeEnd={() => console.log('Stroke ended')}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',

          marginTop: 10,

        }}>
        <TouchableOpacity
          style={styles.buttonWrapper}
          onPress={() => canvasRef.current?.clear()}>
          <Text style={{color: '#fff'}}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginLeft : '20%'}} onPress={() => canvasRef.current?.undo()} >
          <MaterialComIcon name="undo-variant" size={30} />
        </TouchableOpacity>
        <TouchableOpacity style = {{marginLeft : 20}}>
          <MaterialComIcon name="redo-variant" size={30} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonWrapper2} onPress={handleAdd}>
          <Text style={{color: '#fff'}}>Save Data</Text>
        </TouchableOpacity>

      </View>
      <View style={styles.footerBox}>
        <View style = {{ flexDirection :'row', alignItems : 'center'  , width : '100%' , paddingHorizontal : 15}}>
        <TouchableOpacity style = {{}}>
          <AntiDesignIcon name="plussquareo" size={27} />
        </TouchableOpacity>
        <TouchableOpacity style = {{marginLeft : 25}} >
          <IoniconsIcon name="color-palette-outline" size={27} />
        </TouchableOpacity>
        <Text style={{ flex: 1, textAlign: 'center' }} > Edited {new Date(time).toLocaleTimeString()}</Text>
        <TouchableOpacity style = {{justifyContent:'flex-end'}}>
          <MaterialComIcon name="dots-vertical" size={27} />
        </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DrawingScreen;

const styles = StyleSheet.create({
  InputStyle: {
    height: 50,
    paddingHorizontal: 20,
    fontSize: 20,
    fontWeight: '600',
  },
  CanvaWrapper: {
    width: '90%',
    height: '70%',
    borderWidth: 1,
    justifyContent: 'center',
    marginLeft: 20,
    borderRadius: 10,
    borderColor: 'skyblue',
  },
  buttonWrapper: {
    width: 60,
    height: 50,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft :'5%',
  },
  buttonWrapper2: {
    paddingHorizontal: 10,
    height: 50,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: '15%',
  },
  footerBox: {

    flex : 1 ,
    justifyContent : 'flex-end',

  },
});
