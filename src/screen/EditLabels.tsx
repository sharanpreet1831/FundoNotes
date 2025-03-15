




import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import OcticonsIcon from 'react-native-vector-icons/Octicons';

const EditLabels = ({setModalVisible}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [data, setData] = useState([]);
  const [labelname, setLabelname] = useState('');

  const fetchData = async () => {
    try {
      let url = 'http://localhost:3000/Label';
      let response = await fetch(url);
      let result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching labels:', error);
    }
  };

  const saveData = async () => {
    if (!labelname.trim()) {
      console.log('Label name cannot be empty');
      return;
    }

    const isDuplicate = data.some(
      item => item.labelname.toLowerCase() === labelname.toLowerCase(),
    );

    if (isDuplicate) {
      Alert.alert('Label already exists');
      return;
    }

    try {
      let url = 'http://localhost:3000/Label';
      let result = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({labelname}),
      });
      if (result.ok) {
        fetchData();
      }
    } catch (error) {
      console.log('Error posting data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setModalVisible(false)}>
          <AntDesignIcon name="close" size={25} style={{marginLeft: 10}} />
        </TouchableOpacity>
        <Text style={styles.title}>Edit Labels</Text>
      </View>

      {isCreating ? (
        <View style={styles.createBox}>
          <TouchableOpacity onPress={() => setIsCreating(false)}>
            <AntDesignIcon name="close" size={25} />
          </TouchableOpacity>
          <View style={styles.inputField}>
            <TextInput
              placeholder="Create New Label"
              style={{fontSize: 22}}
              value={labelname}
              onChangeText={setLabelname}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              saveData();
              setIsCreating(false);
              setLabelname('');
            }}>
            <MaterialIcon name="done" size={25} />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.newLabelBox}
          onPress={() => setIsCreating(true)}>
          <AntDesignIcon name="plus" size={25} color={'blue'} />
          <Text style={styles.newLabelText}>Create new Label</Text>
        </TouchableOpacity>
      )}

      {data.length > 0 && (
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View style={styles.labelBox}>
              <MaterialIcon name="label-outline" size={25} />
              <Text style={styles.labelText}>{item.labelname}</Text>
              <OcticonsIcon name="pencil" size={25} />
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default EditLabels;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', 
    padding: 10, 
  },
  header: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
  },
  createBox: {
    height: 60,
    borderWidth: 0.8,
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
  },
  inputField: {
    flex: 1,
    paddingHorizontal: 10,
  },
  newLabelBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  newLabelText: {
    flex: 1,
    fontSize: 18,
    marginLeft: 10,
  },
  labelBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  labelText: {
    flex: 1,
    fontSize: 18,
    marginLeft: 10,
  },
});