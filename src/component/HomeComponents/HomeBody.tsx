/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import AntiDesignIcon from 'react-native-vector-icons/AntDesign';
import firestore from '@react-native-firebase/firestore';

interface Note {
  id: string;
  Title: string;
  Subtitle?: string;
  image?: string;
  ReminderDate?: string;
  ReminderTime?: string;
  isArchive?: boolean;
}

interface HomeBodyProps {
  navigation: any;
  toggle: boolean;
  setSearchvisible: (visible: boolean) => void;
  searchvisible: boolean;
  noteId: string | null;
  setNoteId: (id: string) => void;
}

const HomeBody: React.FC<HomeBodyProps> = ({ navigation, toggle, setSearchvisible, searchvisible, noteId, setNoteId }) => {
  const [data, setData] = useState<Note[]>([]);

  const fetchNotes = async () => {
    try {
      const snapshot = await firestore().collection('users').get();
      const notesList: Note[] = snapshot.docs
        .map(doc => ({
          id: doc.id,
          ...(doc.data() as Note),
        }))
        .filter(item => !item.isArchive);
      setData(notesList);
    } catch (error) {
      console.log("Error fetching data from Firebase:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#f4f4f4' }}>
      <View style={{ width: '100%', height: '100%' }}>
        {data.length ? (
          <FlatList
            key={toggle ? 'grid' : 'list'}
            numColumns={toggle ? 2 : 1}
            columnWrapperStyle={toggle ? styles.columnWrapper : undefined}
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.NotesBox, toggle && styles.gridItem]}
                onLongPress={() => {
                  setSearchvisible(prev => !prev);
                  setNoteId(item.id);
                }}
              >
                <Text style={styles.TitleStyle}>{item.Title}</Text>
                {item.Subtitle && <Text style={styles.subTitleStyle}>{item.Subtitle}</Text>}
                {item.image && <Image style={styles.image} source={{ uri: `file://${item.image}` }} />}
                {item.ReminderDate && (
                  <View style={styles.reminderContainer}>
                    <Text style={styles.reminderText}>{item.ReminderDate}</Text>
                  </View>
                )}
                {item.ReminderTime && (
                  <View style={styles.reminderContainer}>
                    <Text style={styles.reminderText}>{item.ReminderTime}</Text>
                  </View>
                )}
              </TouchableOpacity>
            )}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <AntiDesignIcon name="bulb1" size={130} color={'gold'} />
            <Text style={styles.emptyText}>Notes you add appear here</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default HomeBody;

const styles = StyleSheet.create({
  PlusButtonWrapper: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginRight: 20,
  },
  PlusButton: {
    borderRadius: 27,
    shadowColor: 'grey',
    shadowOpacity: 0.9,
    shadowOffset: { width: 0, height: 5 },
    zIndex: 1,
  },
  NotesBox: {
    borderWidth: 0.3,
    margin: 5,
    borderRadius: 5,
    backgroundColor: '#fff',
    overflow: 'hidden',
    padding: 10,
  },
  gridItem: {
    width: '48%',
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  TitleStyle: {
    fontWeight: '700',
    margin: 5,
    paddingHorizontal: 5,
    fontSize: 18,
  },
  subTitleStyle: {
    fontWeight: '300',
    margin: 5,
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  ImageStyle: {
    height: 60,
    width: 60,
    borderRadius: 25,
  },
  image: {
    width: 100,
    height: 100,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 25,
    marginTop: 20,
  },
  reminderContainer: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 7,
    width: 90,
    height: 20,
    backgroundColor: '#ececec',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reminderText: {
    fontSize: 11,
    textAlign: 'center',
    fontWeight: '500',
  },
});