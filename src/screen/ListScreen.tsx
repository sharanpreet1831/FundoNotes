

import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';


const ListScreen = ({ route, reminderDate: propReminderDate, reminderTime: propReminderTime }) => {
    const[ title , setTitle ] = useState('');
    const[ subtitle , setSubtitle] = useState('');
    const [reminderDate, setReminderDate] = useState(null);
  const [reminderTime, setReminderTime] = useState(null);
  useEffect(() => {
    console.log("ListScreen Received - Route Params:", route.params);
    console.log("ListScreen Received - Props Date:", propReminderDate, "Time:", propReminderTime);
    
    if (route.params) {
      setReminderDate(route.params.reminderDate || null);
      setReminderTime(route.params.reminderTime || null);
    }
  }, [route.params]);


    const saveData = async() => {
        try {
             await firestore().collection('users').add({
                Title : title,
                Subtitle : subtitle,
                ReminderDate:propReminderDate,
                 ReminderTime:propReminderTime,
                 isArchive : false ,
                 isDeleted : false ,
                createdAt : firestore.FieldValue.serverTimestamp()
             });
             console.log('data saved');
        } catch (error) {
            console.log("error in passing data " , error)
        }
        
    }
  return (
    <View>
        <TextInput style= {styles.TitleBox} placeholder='Title' onChangeText={(text) => setTitle(text)}></TextInput>
        <TextInput style= {styles.NotesBox} placeholder='Notes' onChangeText={(text) => setSubtitle(text)}></TextInput>
        {propReminderDate && <Text>Reminder Date: {propReminderDate}</Text>}
      {propReminderTime && <Text>Reminder Time: {propReminderTime}</Text>}
      <Button title="Done" onPress={saveData} />
        {/* <Button title='Done' onPress={() => saveData() } /> */}

    </View>
  )
}

export default ListScreen

const styles = StyleSheet.create({
    TitleBox:{
        
        height : 70,
        paddingHorizontal :10,
        margin : 2,
        fontSize : 25
    },
    NotesBox:{
        height : 40,
        paddingHorizontal :10,
        margin : 2
    }
 
})




// import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
// import React, { useState } from 'react'

// const ListScreen = () => {
//     const[ title , setTitle ] = useState('');
//     const[ subtitle , setSubtitle] = useState('');
//     const saveData = async() => {
//         const url = 'http://localhost:3000/users';
//         let result = await fetch (url,{
//             method :"POST",
//             headers: {
//                 "content-Type" :"application/json"
//             },
//             body:JSON.stringify({Title:title ,Subtitle : subtitle})
//         })
//         setTimeout(() => {
//             setTitle(''),
//             setSubtitle('')
//         }, 1000);      
//     }
//   return (
//     <View>
//         <TextInput style= {styles.TitleBox} placeholder='Title' onChangeText={(text) => setTitle(text)}></TextInput>
//         <TextInput style= {styles.NotesBox} placeholder='Notes' onChangeText={(text) => setSubtitle(text)}></TextInput>
//         <Button title='Done' onPress={() => saveData() } />

//     </View>
//   )
// }

// export default ListScreen

// const styles = StyleSheet.create({
//     TitleBox:{
        
//         height : 70,
//         paddingHorizontal :10,
//         margin : 2,
//         fontSize : 25
//     },
//     NotesBox:{
//         height : 40,
//         paddingHorizontal :10,
//         margin : 2
//     }
 
// })