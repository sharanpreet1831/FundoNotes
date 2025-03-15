import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import MaterialComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

interface EditProps {
  setSearchvisible: (visible: boolean) => void;
  noteId: string | null;
}

const Edit: React.FC<EditProps> = ({ setSearchvisible, noteId }) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const navigation = useNavigation();

  const archiveNote = async () => {
    if (!noteId) {
      console.error('Error: No document ID provided');
      return;
    }

    try {
      await firestore().collection('users').doc(noteId).update({ isArchive: true });
      console.log(`Document ${noteId} archived successfully!`);
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <TouchableOpacity onPress={() => setSearchvisible(true)}>
        <IoniconsIcon name="chevron-back" size={32} />
      </TouchableOpacity>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity>
          <MaterialComIcon name="pin-outline" size={25} style={{ marginRight: 10 }} color={'#007AFF'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <MaterialComIcon name="bell-plus" size={20} style={{ marginRight: 10 }} color={'#007AFF'} />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialComIcon name="label-outline" size={25} style={{ marginRight: 10 }} color={'#007AFF'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={archiveNote}>
          <IoniconsIcon name="download-outline" size={25} style={{ marginRight: 10 }} color={'#007AFF'} />
        </TouchableOpacity>
        <TouchableOpacity>
          <EntypoIcon name="dots-three-vertical" size={22} style={{ marginRight: 10 }} color={'#007AFF'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Edit;

const styles = StyleSheet.create({});