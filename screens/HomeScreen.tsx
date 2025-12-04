import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { UserCircle, Bell, MapPin, Info, Bot, Home, Headset } from 'lucide-react-native';
import BannerCard from '../components/BannerCard';
import MenuButton from '../components/MenuButton';
import ProfileSidebar from '../components/ProfileSidebar';
import PineappleIcon from '../assets/kk.svg';
import BottomNavBar from '../components/BottomNavBar';

interface HomeScreenProps {
  onNavigateToProduct?: () => void;
  onNavigateToNewSale?: () => void;
  onNavigateToLocation?: () => void;
  onNavigateToAssistant?: () => void;
  onNavigateToAbout?: () => void;
  onLogout?: () => void;
}

export default function HomeScreen({
  onNavigateToProduct,
  onNavigateToNewSale,
  onNavigateToLocation,
  onNavigateToAssistant,
  onNavigateToAbout,
  onLogout
}: HomeScreenProps) {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const handleProfilePress = () => {
    setIsSidebarVisible(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarVisible(false);
  };

  const handleLogout = () => {
    setIsSidebarVisible(false);
    if (onLogout) {
      onLogout();
    }
  };

  const handleNotificationPress = () => {
    console.log('Notification pressed');
  };

  const handleCustomerServicePress = () => {
    console.log('Customer service pressed');
    if (onNavigateToAssistant) {
      onNavigateToAssistant();
    }
  };

  const handleBannerPress = (banner: string) => {
    console.log(`${banner} banner pressed`);
    if (banner === 'New Sale' && onNavigateToNewSale) {
      onNavigateToNewSale();
    }
  };

  const handleMenuPress = (menu: string) => {
    console.log(`${menu} menu pressed`);
    if (menu === 'Product' && onNavigateToProduct) {
      onNavigateToProduct();
    } else if (menu === 'Location' && onNavigateToLocation) {
      onNavigateToLocation();
    } else if (menu === 'About Us' && onNavigateToAbout) {
      onNavigateToAbout();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <ProfileSidebar
        isVisible={isSidebarVisible}
        onClose={handleCloseSidebar}
        onLogout={handleLogout}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={handleProfilePress}
        >
          <View style={styles.profileIconContainer}>
            <UserCircle size={32} color="#fff" />
          </View>
          <Text style={styles.profileText}>Farmer</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Home</Text>

        <TouchableOpacity
          style={styles.notificationButton}
          onPress={handleCustomerServicePress}
        >
          <Headset size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Banners */}
        <View style={styles.bannersContainer}>
          <BannerCard
            title="NEW SALE"
            imageUrl="https://images.unsplash.com/photo-1618871737423-0c122edb760e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxGcmVzaCUyMHBpbmVhcHBsZXMlMjBmb3IlMjBzYWxlJTJDJTIwbXVsdGlwbGUlMjBwaW5lYXBwbGVzJTIwZ3JvdXBlZCUyMHRvZ2V0aGVyfGVufDB8MHx8eWVsbG93fDE3NjQ3Njg5ODZ8MA&ixlib=rb-4.1.0&q=85"
            onPress={() => handleBannerPress('New Sale')}
          />

          <BannerCard
            title="TODAY PRICE"
            imageUrl="https://images.pexels.com/photos/96417/pexels-photo-96417.jpeg"
            onPress={() => handleBannerPress('Today Price')}
          />
        </View>

        {/* Menu Grid */}
        <View style={styles.menuContainer}>
          <View style={styles.menuRow}>
            <MenuButton
              title="PRODUCT"
              icon={<PineappleIcon width={48} height={48} />}
              onPress={() => handleMenuPress('Product')}
            />
            <MenuButton
              title="LOCATION"
              icon={<MapPin size={48} color="#fff" />}
              onPress={() => handleMenuPress('Location')}
            />
          </View>

          <View style={styles.menuRow}>
            <MenuButton
              title="ABOUT US"
              icon={<Info size={48} color="#fff" />}
              onPress={() => handleMenuPress('About Us')}
            />
            <MenuButton
              title="PINE-BOT"
              icon={<Bot size={48} color="#fff" />}
              onPress={() => handleMenuPress('Pine-Bot')}
            />
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavBar
        currentScreen="home"
        onNavigateHome={() => { }}
        onNavigateToProduct={onNavigateToProduct || (() => { })}
        onNavigateToLocation={onNavigateToLocation || (() => { })}
        onNavigateToAssistant={onNavigateToAssistant || (() => { })}
        onNavigateToAbout={onNavigateToAbout || (() => { })}
      />
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
    paddingVertical: 15,
    backgroundColor: '#065b66',
  },
  profileButton: {
    alignItems: 'center',
  },
  profileIconContainer: {
    marginBottom: 4,
  },
  profileText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
  },
  notificationButton: {
    padding: 5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  bannersContainer: {
    marginBottom: 20,
  },
  menuContainer: {
    marginBottom: 20,
  },
  menuRow: {
    flexDirection: 'row',
    marginHorizontal: -6,
    marginBottom: 0,
  },
  bottomNav: {
    backgroundColor: '#065b66',
    paddingVertical: 15,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  bottomNavButton: {
    padding: 5,
  },
});