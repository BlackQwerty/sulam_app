import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { UserCircle, Bell, MapPin, Info, Bot, Home, Headset, Truck, LayoutDashboard, CloudSun, CreditCard, ShieldCheck } from 'lucide-react-native';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import BannerCard from '../components/BannerCard';
import MenuButton from '../components/MenuButton';
import ProfileSidebar from '../components/ProfileSidebar';
import PineappleIcon from '../assets/kk.svg';
import BottomNavBar from '../components/BottomNavBar';

interface HomeScreenProps {
  onNavigateToProduct?: () => void;
  onNavigateToNewSale?: (sale?: any) => void;
  onNavigateToLocation?: () => void;
  onNavigateToAssistant?: () => void;
  onNavigateToAbout?: () => void;
  onLogout?: () => void;
  onNavigateToPineBot?: () => void;
  onNavigateToOrderTracking?: () => void;
  onNavigateToDashboard?: () => void;
  onNavigateToWeather?: () => void;
  onNavigateToPayment?: () => void;
  onNavigateToPrice?: () => void;
  onNavigateToEditProfile?: () => void;
  onNavigateToAdmin?: () => void;
  username?: string;
  photoURL?: string;
  role?: string;
}

export default function HomeScreen({
  onNavigateToProduct,
  onNavigateToNewSale,
  onNavigateToLocation,
  onNavigateToAssistant,
  onNavigateToAbout,
  onLogout,
  onNavigateToPineBot,
  onNavigateToOrderTracking,
  onNavigateToDashboard,
  onNavigateToWeather,
  onNavigateToPayment,
  onNavigateToPrice,
  onNavigateToEditProfile,
  onNavigateToAdmin,
  username = 'User',
  photoURL = '',
  role = 'user'
}: HomeScreenProps) {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [banners, setBanners] = useState<{ id: string, title: string, imageUrl: string, description?: string }[]>([]);

  // Fetch announcements
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'announcements'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
      setBanners(data);
    });
    return () => unsubscribe();
  }, []);

  // Debug: Log role value whenever it changes
  useEffect(() => {
    // console.log('🏠 [HomeScreen] Role prop received:', role);
  }, [role]);

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

  const handleBannerPress = (banner: any) => {
    console.log(`Banner pressed:`, banner);

    // Check if it's the "New Sale" default or a dynamic banner
    if (typeof banner === 'string' && banner === 'New Sale') {
      if (onNavigateToNewSale) onNavigateToNewSale({ title: 'New Sale' });
    } else if (typeof banner === 'string' && banner === 'Today Price') {
      if (onNavigateToPrice) onNavigateToPrice();
    } else {
      // Is a dynamic object
      if (onNavigateToNewSale) onNavigateToNewSale(banner);
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
        onEditProfile={onNavigateToEditProfile}
        onHelp={onNavigateToAssistant}
        username={username}
        photoURL={photoURL}
        role={role}
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
          <Text style={styles.profileText}>
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </Text>
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

          {/* Dynamic Banners from Admin */}
          {banners.length > 0 ? (
            banners.map((item) => (
              <BannerCard
                key={item.id}
                title={item.title}
                imageUrl={item.imageUrl}
                onPress={() => handleBannerPress(item)}
              />
            ))
          ) : (
            // Fallback default banner if no announcements exist
            <BannerCard
              title="NEW SALE"
              imageUrl="https://images.unsplash.com/photo-1618871737423-0c122edb760e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxGcmVzaCUyMHBpbmVhcHBsZXMlMjBmb3IlMjBzYWxlJTJDJTIwbXVsdGlwbGUlMjBwaW5lYXBwbGVzJTIwZ3JvdXBlZCUyMHRvZ2V0aGVyfGVufDB8MHx8eWVsbG93fDE3NjQ3Njg5ODZ8MA&ixlib=rb-4.1.0&q=85"
              onPress={() => handleBannerPress('New Sale')}
            />
          )}

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
              onPress={() => onNavigateToPineBot?.()}
            />
          </View>

          {/* New Features Grid */}
          <View style={styles.menuRow}>
            <MenuButton
              title="ORDERS"
              icon={<Truck size={48} color="#fff" />}
              onPress={() => onNavigateToOrderTracking?.()}
            />
            <MenuButton
              title="DASHBOARD"
              icon={<LayoutDashboard size={48} color="#fff" />}
              onPress={() => onNavigateToDashboard?.()}
            />
          </View>

          <View style={styles.menuRow}>
            <MenuButton
              title="WEATHER"
              icon={<CloudSun size={48} color="#fff" />}
              onPress={() => onNavigateToWeather?.()}
            />
            <MenuButton
              title="PAYMENT"
              icon={<CreditCard size={48} color="#fff" />}
              onPress={() => onNavigateToPayment?.()}
            />
          </View>

          {role === 'admin' && (
            <View style={styles.menuRow}>
              <MenuButton
                title="ADMIN"
                icon={<ShieldCheck size={48} color="#fff" />}
                onPress={() => onNavigateToAdmin?.()}
              />
            </View>
          )}

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
        onNavigateToPineBot={onNavigateToPineBot || (() => { })}
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