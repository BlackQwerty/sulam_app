import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, db } from './firebase/firebaseConfig';
import Header from './components/Header';
import Button from './components/Button';
import SignUpScreen from './screens/SignUpScreen';
import LogInScreen from './screens/LogInScreen';
import EditProfileScreen from './screens/EditProfileScreen';
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
import AdminDashboardScreen from './screens/AdminDashboardScreen';
import AdminProductManagerScreen from './screens/AdminProductManagerScreen';
import AdminSaleManagerScreen from './screens/AdminSaleManagerScreen';

type Screen = 'welcome' | 'signup' | 'login' | 'home' | 'product' | 'newsale' | 'location' | 'assistant' | 'about' | 'pinebot' | 'ordertracking' | 'dashboard' | 'weather' | 'payment' | 'price' | 'editprofile' | 'admin' | 'manage-products' | 'manage-sales';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [username, setUsername] = useState<string>('User');
  const [photoURL, setPhotoURL] = useState<string>('');
  const [role, setRole] = useState<string>('farmer');

  const [selectedSale, setSelectedSale] = useState<any>(null);

  // Track authentication state and user profile
  useEffect(() => {
    let unsubscribeSnapshot: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUsername(user.displayName || 'User');
        setPhotoURL(user.photoURL || '');

        // 1. Setup Real-time Listener for Firestore
        // This ensures if the role changes (or is created by LoginScreen), we update immediately.
        try {
          console.log('🔍 [App] Setting up real-time listener for UID:', user.uid);
          const userDocRef = doc(db, 'users', user.uid);

          unsubscribeSnapshot = onSnapshot(userDocRef, async (docSnapshot) => {
            if (docSnapshot.exists()) {
              const userData = docSnapshot.data();
              console.log('🔥 [App] Real-time update received:', userData.role);

              // Update Role
              const fetchedRole = userData.role || 'farmer';
              setRole(fetchedRole);

              // Update Username (Fixes "User" display issue)
              if (userData.username) {
                setUsername(userData.username);
                console.log('👤 [App] Username updated from Firestore:', userData.username);
              }

              await AsyncStorage.setItem('userRole', fetchedRole);
            } else {
              console.log('⚠️ [App] Document missing (waiting for creation...)');
              // Don't overwrite with 'user' yet, keep loading or cache if possible
              // But if we truly have nothing, default to user
              setRole('farmer');
            }
          }, (error) => {
            // Ignore permission errors as they might happen during initial signup/auth race conditions
            if (error.code === 'permission-denied') {
              console.log('⚠️ [App] Waiting for permissions (normal during signup)...');
            } else {
              console.error('❌ [App] Snapshot error:', error.message);
            }
          });

        } catch (error) {
          console.error('❌ [App] Error setting up listener:', error);
        }

        // 2. Check Cache as fallback (immediate display while loading)
        try {
          const cachedRole = await AsyncStorage.getItem('userRole');
          if (cachedRole) {
            // Only set if we haven't received real data yet (optional optimization)
            // For simplicity, we can just set it. Firestore update will overwrite it anyway.
            console.log('📦 [App] Loaded cached role:', cachedRole);
            // Note: We don't forcefully setRole here if we want to rely on the listener,
            // but setting it provides instant UI feedback.
            // Let's set it, and the listener will correct it milliseconds later if different.
            if (role === 'user') setRole(cachedRole);
          }
        } catch (e) { /* ignore cache errors */ }

      } else {
        // User Logged Out
        setUsername('User');
        setPhotoURL('');
        setRole('farmer');
        await AsyncStorage.removeItem('userRole');

        // Cleanup snapshot listener if it exists
        if (unsubscribeSnapshot) {
          unsubscribeSnapshot();
          unsubscribeSnapshot = undefined;
        }
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeSnapshot) unsubscribeSnapshot();
    };
  }, []);

  const handleSignIn = () => {
    setCurrentScreen('signup');
  };

  const handleLogIn = () => {
    setCurrentScreen('login');
  };

  const handleBack = () => {
    setCurrentScreen('welcome');
  };

  const handleProfileUpdated = (newUsername: string, newPhotoURL: string) => {
    setUsername(newUsername);
    setPhotoURL(newPhotoURL);
  };

  if (currentScreen === 'home') {
    console.log('🎯 [App] Passing to HomeScreen - role:', role, 'username:', username);
    return (
      <HomeScreen
        onNavigateToProduct={() => setCurrentScreen('product')}
        onNavigateToNewSale={(sale) => {
          setSelectedSale(sale);
          setCurrentScreen('newsale');
        }}
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
        onNavigateToEditProfile={() => setCurrentScreen('editprofile')}
        onNavigateToAdmin={() => setCurrentScreen('admin')}
        username={username}
        photoURL={photoURL}
        role={role}
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
        saleDetails={selectedSale}
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

  if (currentScreen === 'editprofile') {
    return (
      <EditProfileScreen
        onBack={() => setCurrentScreen('home')}
        currentUsername={username}
        currentPhotoURL={photoURL}
        onProfileUpdated={handleProfileUpdated}
      />
    );
  }

  if (currentScreen === 'admin') {
    return (
      <AdminDashboardScreen
        onBack={() => setCurrentScreen('home')}
        onNavigateToManageProducts={() => setCurrentScreen('manage-products')}
        onNavigateToManageSales={() => setCurrentScreen('manage-sales')}
      />
    );
  }

  if (currentScreen === 'manage-products') {
    return (
      <AdminProductManagerScreen
        onBack={() => setCurrentScreen('admin')}
      />
    );
  }

  if (currentScreen === 'manage-sales') {
    return (
      <AdminSaleManagerScreen
        onBack={() => setCurrentScreen('admin')}
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