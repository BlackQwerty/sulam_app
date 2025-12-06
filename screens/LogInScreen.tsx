import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft } from 'lucide-react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, db } from '../firebase/firebaseConfig';
import TextInput from '../components/TextInput';
import Checkbox from '../components/Checkbox';
import Button from '../components/Button';
import PineappleIcon from '../assets/kk.svg';

interface LogInScreenProps {
  onBack: () => void;
  onLoginSuccess?: () => void;
}

export default function LogInScreen({ onBack, onLoginSuccess }: LogInScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberPassword, setRememberPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogIn = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
      console.log('User logged in successfully:', userCredential.user.email);

      // Try to fetch and cache user role
      try {
        const userDocRef = doc(db, 'users', userCredential.user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          const userRole = userData.role || 'user';

          // Cache role in AsyncStorage
          await AsyncStorage.setItem('userRole', userRole);
          console.log('User role cached:', userRole);
        } else {
          console.log('No user document found, caching default role');
          await AsyncStorage.setItem('userRole', 'user');
        }
      } catch (roleError) {
        console.error('Error fetching role (will use default):', roleError);

        // TEMPORARY FIX: Hardcode admin role for maroq@gmail.com
        if (email.trim().toLowerCase() === 'maroq@gmail.com') {
          await AsyncStorage.setItem('userRole', 'admin');
          console.log('🔧 TEMPORARY FIX: Admin role set for maroq@gmail.com');
        } else {
          await AsyncStorage.setItem('userRole', 'user');
        }
      }

      Alert.alert('Success', 'Logged in successfully!', [
        {
          text: 'OK',
          onPress: () => {
            if (onLoginSuccess) {
              onLoginSuccess();
            }
          }
        }
      ]);
    } catch (error: any) {
      console.error('Login error:', error);
      let errorMessage = 'Failed to log in. Please try again.';

      if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address format.';
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password.';
      } else if (error.code === 'auth/invalid-credential') {
        errorMessage = 'Invalid email or password.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later.';
      }

      Alert.alert('Login Failed', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ChevronLeft size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Log In</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.logoContainer}>
          <PineappleIcon width={120} height={160} />
        </View>

        <View style={styles.formContainer}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            isPassword
            autoCapitalize="none"
            style={styles.inputSpacing}
          />

          <Checkbox
            label="Remember Password"
            checked={rememberPassword}
            onToggle={() => setRememberPassword(!rememberPassword)}
          />

          <View style={styles.buttonContainer}>
            <Button
              title={loading ? "LOGGING IN..." : "LOG IN"}
              onPress={handleLogIn}
              variant="filled"
              disabled={loading}
            />
            {loading && (
              <ActivityIndicator
                size="small"
                color="#fff"
                style={styles.loadingIndicator}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#04383f',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
    backgroundColor: '#065b66',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  placeholder: {
    width: 38,
  },
  content: {
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 40,
    flexGrow: 1,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  formContainer: {
    width: '100%',
  },
  inputSpacing: {
    marginTop: 16,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  loadingIndicator: {
    position: 'absolute',
    right: 20,
  },
});