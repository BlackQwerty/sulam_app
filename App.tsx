import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Header from './components/Header';
import Button from './components/Button';
import SignUpScreen from './screens/SignUpScreen';
import LogInScreen from './screens/LogInScreen';
import HomeScreen from './screens/HomeScreen';
import PineappleIcon from './assets/pineapple.svg';

type Screen = 'welcome' | 'signup' | 'login' | 'home';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');

  const handleSignIn = () => {
    setCurrentScreen('signup');
  };

  const handleLogIn = () => {
    setCurrentScreen('login');
  };

  const handleBack = () => {
    setCurrentScreen('welcome');
  };

  if (currentScreen === 'home') {
    return <HomeScreen />;
  }

  if (currentScreen === 'signup') {
    return (
      <SignUpScreen 
        onBack={handleBack} 
        onNavigateToLogin={() => setCurrentScreen('login')} 
      />
    );
  }

  if (currentScreen === 'login') {
    return <LogInScreen onBack={handleBack} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      <Header />
      
      <View style={styles.content}>
        <View style={styles.pineappleContainer}>
          <PineappleIcon width={180} height={240} />
        </View>
        
        <Text style={styles.welcomeText}>WELCOME</Text>
        
        <Text style={styles.descriptionText}>
          Hello, we from LPNM would like to thank you for using this mobile apps to do pineapple business with LPNM. We hope that this platform will make the business flow easier and smooth. Good luck!
        </Text>
      </View>
      
      <View style={styles.footer}>
        <View style={styles.buttonContainer}>
          <Button title="SIGN IN" onPress={handleSignIn} variant="filled" />
          <Button title="LOG IN" onPress={handleLogIn} variant="outlined" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#04383f',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  pineappleContainer: {
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    letterSpacing: 2,
  },
  descriptionText: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 22,
    opacity: 0.95,
  },
  footer: {
    backgroundColor: '#065b66',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 20,
  },
});