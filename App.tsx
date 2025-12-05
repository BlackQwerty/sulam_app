import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from './components/Header';
import Button from './components/Button';
import SignUpScreen from './screens/SignUpScreen';
import LogInScreen from './screens/LogInScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import NewSaleScreen from './screens/NewSaleScreen';
import FarmLocationScreen from './screens/FarmLocationScreen';
import CustomerAssistantScreen from './screens/CustomerAssistantScreen';
import PineBotScreen from './screens/PineBotScreen';
import OrderTrackingScreen from './screens/OrderTrackingScreen';
import FarmerDashboardScreen from './screens/FarmerDashboardScreen';
import WeatherAdvisoryScreen from './screens/WeatherAdvisoryScreen';
import PaymentManagementScreen from './screens/PaymentManagementScreen';
import AboutUsScreen from './screens/AboutUsScreen';
import PineapplePriceScreen from './screens/PineapplePriceScreen';
import PineappleIcon from './assets/kk.svg';

type Screen = 'welcome' | 'signup' | 'login' | 'home' | 'product' | 'newsale' | 'location' | 'assistant' | 'about' | 'pinebot' | 'ordertracking' | 'dashboard' | 'weather' | 'payment' | 'price';

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
    return (
      <HomeScreen
        onNavigateToProduct={() => setCurrentScreen('product')}
        onNavigateToNewSale={() => setCurrentScreen('newsale')}
        onNavigateToLocation={() => setCurrentScreen('location')}
        onNavigateToAssistant={() => setCurrentScreen('assistant')}
        onNavigateToAbout={() => setCurrentScreen('about')}
        onLogout={() => setCurrentScreen('welcome')}
        onNavigateToPineBot={() => setCurrentScreen('pinebot')}
        onNavigateToOrderTracking={() => setCurrentScreen('ordertracking')}
        onNavigateToDashboard={() => setCurrentScreen('dashboard')}
        onNavigateToWeather={() => setCurrentScreen('weather')}
        onNavigateToPayment={() => setCurrentScreen('payment')}
        onNavigateToPrice={() => setCurrentScreen('price')}
      />
    );
  }

  if (currentScreen === 'product') {
    return (
      <ProductScreen
        onNavigateHome={() => setCurrentScreen('home')}
        onNavigateToProduct={() => setCurrentScreen('product')}
        onNavigateToLocation={() => setCurrentScreen('location')}
        onNavigateToAssistant={() => setCurrentScreen('assistant')}
        onNavigateToAbout={() => setCurrentScreen('about')}
        onNavigateToPineBot={() => setCurrentScreen('pinebot')}
        onLogout={() => setCurrentScreen('welcome')}
      />
    );
  }

  if (currentScreen === 'newsale') {
    return (
      <NewSaleScreen
        onNavigateHome={() => setCurrentScreen('home')}
        onNavigateToProduct={() => setCurrentScreen('product')}
        onNavigateToLocation={() => setCurrentScreen('location')}
        onNavigateToAssistant={() => setCurrentScreen('assistant')}
        onNavigateToAbout={() => setCurrentScreen('about')}
        onNavigateToPineBot={() => setCurrentScreen('pinebot')}
        onLogout={() => setCurrentScreen('welcome')}
      />
    );
  }

  if (currentScreen === 'location') {
    return (
      <FarmLocationScreen
        onNavigateHome={() => setCurrentScreen('home')}
        onNavigateToProduct={() => setCurrentScreen('product')}
        onNavigateToLocation={() => setCurrentScreen('location')}
        onNavigateToAssistant={() => setCurrentScreen('assistant')}
        onNavigateToAbout={() => setCurrentScreen('about')}
        onNavigateToPineBot={() => setCurrentScreen('pinebot')}
        onLogout={() => setCurrentScreen('welcome')}
      />
    );
  }

  if (currentScreen === 'assistant') {
    return (
      <CustomerAssistantScreen
        onNavigateHome={() => setCurrentScreen('home')}
        onNavigateToProduct={() => setCurrentScreen('product')}
        onNavigateToLocation={() => setCurrentScreen('location')}
        onNavigateToAssistant={() => setCurrentScreen('assistant')}
        onNavigateToAbout={() => setCurrentScreen('about')}
        onNavigateToPineBot={() => setCurrentScreen('pinebot')}
        onLogout={() => setCurrentScreen('welcome')}
      />
    );
  }

  if (currentScreen === 'about') {
    return (
      <AboutUsScreen
        onNavigateHome={() => setCurrentScreen('home')}
        onNavigateToProduct={() => setCurrentScreen('product')}
        onNavigateToLocation={() => setCurrentScreen('location')}
        onNavigateToAssistant={() => setCurrentScreen('assistant')}
        onNavigateToAbout={() => setCurrentScreen('about')}
        onNavigateToPineBot={() => setCurrentScreen('pinebot')}
        onLogout={() => setCurrentScreen('welcome')}
      />
    );
  }

  if (currentScreen === 'pinebot') {
    return (
      <PineBotScreen
        onNavigateHome={() => setCurrentScreen('home')}
        onNavigateToProduct={() => setCurrentScreen('product')}
        onNavigateToLocation={() => setCurrentScreen('location')}
        onNavigateToAssistant={() => setCurrentScreen('assistant')}
        onNavigateToAbout={() => setCurrentScreen('about')}
        onNavigateToPineBot={() => setCurrentScreen('pinebot')}
      />
    );
  }

  if (currentScreen === 'ordertracking') {
    return (
      <OrderTrackingScreen
        onNavigateHome={() => setCurrentScreen('home')}
        onNavigateToProduct={() => setCurrentScreen('product')}
        onNavigateToLocation={() => setCurrentScreen('location')}
        onNavigateToAssistant={() => setCurrentScreen('assistant')}
        onNavigateToAbout={() => setCurrentScreen('about')}
        onNavigateToPineBot={() => setCurrentScreen('pinebot')}
      />
    );
  }

  if (currentScreen === 'dashboard') {
    return (
      <FarmerDashboardScreen
        onNavigateHome={() => setCurrentScreen('home')}
        onNavigateToProduct={() => setCurrentScreen('product')}
        onNavigateToLocation={() => setCurrentScreen('location')}
        onNavigateToAssistant={() => setCurrentScreen('assistant')}
        onNavigateToAbout={() => setCurrentScreen('about')}
        onNavigateToPineBot={() => setCurrentScreen('pinebot')}
      />
    );
  }

  if (currentScreen === 'weather') {
    return (
      <WeatherAdvisoryScreen
        onNavigateHome={() => setCurrentScreen('home')}
        onNavigateToProduct={() => setCurrentScreen('product')}
        onNavigateToLocation={() => setCurrentScreen('location')}
        onNavigateToAssistant={() => setCurrentScreen('assistant')}
        onNavigateToAbout={() => setCurrentScreen('about')}
        onNavigateToPineBot={() => setCurrentScreen('pinebot')}
      />
    );
  }

  if (currentScreen === 'payment') {
    return (
      <PaymentManagementScreen
        onNavigateHome={() => setCurrentScreen('home')}
        onNavigateToProduct={() => setCurrentScreen('product')}
        onNavigateToLocation={() => setCurrentScreen('location')}
        onNavigateToAssistant={() => setCurrentScreen('assistant')}
        onNavigateToAbout={() => setCurrentScreen('about')}
        onNavigateToPineBot={() => setCurrentScreen('pinebot')}
      />
    );
  }

  if (currentScreen === 'price') {
    return (
      <PineapplePriceScreen
        onBack={() => setCurrentScreen('home')}
      />
    );
  }

  if (currentScreen === 'signup') {
    return (
      <SignUpScreen
        onBack={handleBack}
        onNavigateToLogin={() => setCurrentScreen('login')}
        onSignUpSuccess={() => setCurrentScreen('home')}
      />
    );

  }

  if (currentScreen === 'login') {
    return (
      <LogInScreen
        onBack={handleBack}
        onLoginSuccess={() => setCurrentScreen('home')}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <Header />

      <View style={styles.content}>
        <View style={styles.pineappleContainer}>
          <PineappleIcon width={220} height={280} />
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
    marginBottom: 40,
    marginTop: -40,
  },
  welcomeText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  descriptionText: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 22,
    opacity: 0.95,
  },
  footer: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
});