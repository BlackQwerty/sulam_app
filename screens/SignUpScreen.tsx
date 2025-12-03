import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft } from 'lucide-react-native';
import TextInput from '../components/TextInput';
import Checkbox from '../components/Checkbox';
import Button from '../components/Button';
import PineappleIcon from '../assets/pineapple.svg';

interface SignUpScreenProps {
  onBack: () => void;
  onNavigateToLogin: () => void;
}

export default function SignUpScreen({ onBack, onNavigateToLogin }: SignUpScreenProps) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberPassword, setRememberPassword] = useState(false);

  const handleSignUp = () => {
    console.log('Sign Up:', { username, email, password, confirmPassword, rememberPassword });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ChevronLeft size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sign Up</Text>
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
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.inputSpacing}
          />
          
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.inputSpacing}
          />
          
          <TextInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            style={styles.inputSpacing}
          />

          <Checkbox
            label="Remember Password"
            checked={rememberPassword}
            onToggle={() => setRememberPassword(!rememberPassword)}
          />

          <View style={styles.buttonContainer}>
            <Button title="SIGN UP" onPress={handleSignUp} variant="filled" />
          </View>

          <TouchableOpacity onPress={onNavigateToLogin} style={styles.loginLink}>
            <Text style={styles.loginLinkText}>
              Already Have a Account? <Text style={styles.loginLinkBold}>Log In</Text>
            </Text>
          </TouchableOpacity>
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
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
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
    marginBottom: 20,
  },
  loginLink: {
    alignItems: 'center',
    marginTop: 10,
  },
  loginLinkText: {
    color: '#fff',
    fontSize: 14,
  },
  loginLinkBold: {
    fontWeight: '700',
  },
});