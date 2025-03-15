import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';

const ArchiveScreen = () => {
  const [data, setData] = useState([]);

  const fetchdata = async () => {
    try {
      let result = await firestore().collection('users').get();
      let notelist = result.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter(item => item.isArchive === true);
      setData(notelist);
    } catch (error) {
      console.error("Error fetching archived notes:", error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <View style={styles.mainContainer}>
      {data.length > 0 ? (
        <FlatList
          data={data}
          numColumns={2}
          keyExtractor={(item) => item.id}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.gridItem}>
              <View style={styles.card}>
                <Text style={styles.title}>{item.Title}</Text>
                {item.Subtitle && <Text style={styles.subtitle}>{item.Subtitle}</Text>}
                {item.image && <Image style={styles.image} source={{ uri: item.image }} />}
                {item.ReminderDate && <Text style={styles.reminderText}>{item.ReminderDate}</Text>}
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcon name="download-box-outline" size={100} color={'gray'} />
          <Text style={styles.textStyle}>Your archived notes appear here</Text>
        </View>
      )}
    </View>
  );
};

export default ArchiveScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 10,
    backgroundColor: '#F8F9FA',
    marginTop: 80,
  },
  row: {
    justifyContent: 'space-between',
  },
  textStyle: {
    fontSize: 20,
    color: 'gray',
    fontWeight: '500',
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridItem: {
    width: '48%',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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