import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft } from 'lucide-react-native';
import TextInput from '../components/TextInput';
import Checkbox from '../components/Checkbox';
import Button from '../components/Button';
import PineappleIcon from '../assets/kk.svg';

interface LogInScreenProps {
  onBack: () => void;
  onLoginSuccess?: () => void;
}

export default function LogInScreen({ onBack, onLoginSuccess }: LogInScreenProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberPassword, setRememberPassword] = useState(false);

  const handleLogIn = () => {
    console.log('Log In:', { username, password, rememberPassword });
    // Navigate to home screen after successful login
    if (onLoginSuccess) {
      onLoginSuccess();
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
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />

          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.inputSpacing}
          />

          <Checkbox
            label="Remember Password"
            checked={rememberPassword}
            onToggle={() => setRememberPassword(!rememberPassword)}
          />

          <View style={styles.buttonContainer}>
            <Button title="LOG IN" onPress={handleLogIn} variant="filled" />
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
});