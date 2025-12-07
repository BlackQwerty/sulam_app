import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft, Plus, Trash2, Upload } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc, onSnapshot } from 'firebase/firestore';

interface Announcement {
  id: string;
  title: string;
  imageUrl: string;
  description?: string;
}

interface AdminSaleManagerScreenProps {
  onBack: () => void;
}

export default function AdminSaleManagerScreen({ onBack }: AdminSaleManagerScreenProps) {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', description: '', imageUrl: '' });

  // Fetch announcements
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'announcements'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Announcement));
      setAnnouncements(data);
    });
    return () => unsubscribe();
  }, []);

  const handleAddAnnouncement = async () => {
    if (!newAnnouncement.title) {
      Alert.alert('Error', 'Please enter a title');
      return;
    }

    try {
      await addDoc(collection(db, 'announcements'), newAnnouncement);
      setIsAdding(false);
      setNewAnnouncement({ title: '', description: '', imageUrl: '' });
      Alert.alert('Success', 'Announcement added successfully');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to add announcement');
    }
  };

  const handleDeleteAnnouncement = async (id: string) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this announcement?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'announcements', id));
            } catch (error) {
              console.error(error);
              Alert.alert('Error', 'Failed to delete announcement');
            }
          }
        }
      ]
    );
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9], // Banners are usually wide
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled) {
      const source = result.assets[0].uri; // Use URI or Base64 as needed
      setNewAnnouncement({ ...newAnnouncement, imageUrl: source });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ChevronLeft size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Manage Sales/Announcements</Text>
        <TouchableOpacity onPress={() => setIsAdding(!isAdding)} style={styles.addButton}>
          <Plus size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {isAdding && (
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Add New Announcement</Text>
            <TextInput
              style={styles.input}
              placeholder="Title (e.g. NEW SALE)"
              value={newAnnouncement.title}
              onChangeText={(text) => setNewAnnouncement({ ...newAnnouncement, title: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Description (Optional)"
              value={newAnnouncement.description}
              onChangeText={(text) => setNewAnnouncement({ ...newAnnouncement, description: text })}
            />

            <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
              <Upload size={20} color="#333" />
              <Text style={styles.imageButtonText}>{newAnnouncement.imageUrl ? 'Image Selected' : 'Upload Banner Image'}</Text>
            </TouchableOpacity>
            {newAnnouncement.imageUrl ? (
              <Image source={{ uri: newAnnouncement.imageUrl }} style={styles.previewImage} />
            ) : null}

            <TouchableOpacity style={styles.submitButton} onPress={handleAddAnnouncement}>
              <Text style={styles.submitButtonText}>Add Announcement</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.listContainer}>
          {announcements.map((item) => (
            <View key={item.id} style={styles.card}>
              <Image
                source={{ uri: item.imageUrl || 'https://via.placeholder.com/300x150' }}
                style={styles.bannerImage}
                resizeMode="cover"
              />
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                {item.description ? <Text style={styles.cardDescription}>{item.description}</Text> : null}
              </View>
              <TouchableOpacity onPress={() => handleDeleteAnnouncement(item.id)} style={styles.deleteButton}>
                <Trash2 size={24} color="#D32F2F" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#04383f',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    padding: 5,
  },
  addButton: {
    padding: 5,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#FAFAFA',
  },
  imageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    marginBottom: 10,
  },
  imageButtonText: {
    marginLeft: 8,
    fontWeight: '600',
  },
  previewImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#04383f',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  listContainer: {
    gap: 15,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: 120,
  },
  cardInfo: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardDescription: {
    color: '#666',
    marginTop: 4,
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    padding: 8,
  },
});
