import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntiDesignIcon from 'react-native-vector-icons/AntDesign'
import firestore from '@react-native-firebase/firestore';

const RemindersScreen = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const result = await firestore().collection('users').get();
      const filteredList = result.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter(item => item.ReminderDate || item.ReminderTime);

      setData(filteredList);
    } catch (error) {
      console.log("Error fetching data from Firestore:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.mainContainer}>
      {data.length ? (
        <FlatList
          data={data}
          numColumns={2} // Display in 2 columns
          keyExtractor={(item) => item.id}
          columnWrapperStyle={styles.row} // Align items in rows properly
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.gridItem}>
              <View style={styles.card}>
                <Text style={styles.title}>{item.Title}</Text>
                {item.Subtitle && <Text style={styles.subtitle}>{item.Subtitle}</Text>}
                {item.image && <Image style={styles.image} source={{ uri: `file://${item.image}` }} />}
                {item.ReminderDate && <Text style={styles.reminderText}>{item.ReminderDate}</Text>}
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <>
          <AntiDesignIcon name='bells' size={100} color={'gray'} />
          <Text style={styles.textStyle}>Notes with upcoming reminders</Text>
          <Text style={styles.textStyle}>appear here</Text>
        </>
      )}
    </View>
  );
};

export default RemindersScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 10,
    backgroundColor: '#F8F9FA',
    marginTop : 80 
  },
  row: {
    justifyContent: 'space-between', // Align items properly in rows
  },
  textStyle: {
    fontSize: 20,
    color: 'gray',
    fontWeight: '500',
    textAlign: 'center',
  },
  gridItem: {
    width: '48%', // Ensures two columns with spacing
    marginBottom: 15, // Space between rows
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Adds shadow on Android
  },
  title: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  subtitle: {
    fontWeight: '400',
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  reminderText: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '600',
    color: '#0066CC',
    backgroundColor: '#E6F2FF',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginTop: 8,
  },
});