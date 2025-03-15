import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TextInput} from 'react-native-gesture-handler';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Voice from '@react-native-voice/voice';
import firestore from '@react-native-firebase/firestore';

const AudioScreen = () => {
  const [micon, setMicon] = useState(true);
  const [resulttext, setResulttext] = useState('');

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = StopListing;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = error => {
      console.log('error in speech:', error);
    };

    return () => {
      Voice.destroy().then(() => Voice.removeAllListeners());
    };
  }, []);

  const onSpeechStart = event => {
    console.log('Recording Start:', event);
  };

  const startListening = async () => {
    try {
      await Voice.start('en-US');
    } catch (error) {
      console.log('error during listening:', error);
    }
  };

  const StopListing = async () => {
    try {
      await Voice.stop();
    } catch (error) {
      console.log('error during stop listener:', error);
    }
  };

  const onSpeechResults = event => {
    let text = event.value[0];
    setResulttext(text);
  };

  
  const SaveVoiceData =  async () => {
    try {
      await firestore().collection('users').add({
        Title : "Voice Text",
        Subtitle : resulttext ,
        createdAt : firestore.FieldValue.serverTimestamp()
      });
    } catch (error) {
      console.log("voice data is not save : " , error)
    }
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.textfieldCover}>
        <TextInput
          placeholder="Text Here"
          value={resulttext}
          style={styles.Inputtextstyle}>
          
        </TextInput>
        {
          resulttext.length > 0   && (<TouchableOpacity
          onPress={() => setResulttext('')}
          style={styles.iconContainer}>
          <MaterialComIcon name="close-circle" size={23} color={'red'} />
        </TouchableOpacity>)
        }
      </View>
      <View style={styles.outerbox}>
        <View style={styles.logoBox}>
          <TouchableOpacity
            onPress={() => {
              setMicon(!micon);
              if (!micon) {
                StopListing();
              } else {
                startListening();
              }
            }}>
            {micon ? (
              <FeatherIcon name="mic" size={55} />
            ) : (
              <MaterialComIcon name="dots-horizontal" size={55} />
            )}
          </TouchableOpacity>
          <Button title='save data'  onPress={() => SaveVoiceData()}/>
        </View>
      </View>
    </View>
  );
};

export default AudioScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  textfieldCover:{
    
    flexDirection : 'row',
    
  },
  Inputtextstyle: {
    paddingHorizontal: 10,
    fontSize: 26,
    
    justifyContent: 'center',
    
    width:'94%'
  },
  outerbox: {
    flex: 1,
  },
  logoBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  iconContainer: {
    justifyContent: 'center',
    
  },
});


// const SaveData = async () =>{
  //   const url = "http://localhost:3000/users"
  //   let result = await fetch(url ,{
  //     method: 'POST',
  //     headers:{
  //       'content-Type' : "application/json"
  //     },
  //     body:JSON.stringify({Title : "Voice Text" , Subtitle :resulttext })
  //   }) 
   
  // }