import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { UserCircle, Headset, Home } from 'lucide-react-native';
import Button from '../components/Button';
import ProfileSidebar from '../components/ProfileSidebar';

interface NewSaleScreenProps {
  onNavigateHome?: () => void;
  onNavigateToAssistant?: () => void;
  onLogout?: () => void;
}

export default function NewSaleScreen({ onNavigateHome, onNavigateToAssistant, onLogout }: NewSaleScreenProps) {
  const [pincode, setPincode] = useState('');
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

  const handleCustomerServicePress = () => {
    console.log('Customer service pressed');
    if (onNavigateToAssistant) {
      onNavigateToAssistant();
    }
  };

  const handleCheckAvailability = () => {
    console.log('Check Availability for pincode:', pincode);
  };

  const handleOrderNow = () => {
    console.log('Order Now pressed');
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

        <Text style={styles.headerTitle}>New Sale</Text>

        <TouchableOpacity
          style={styles.usersButton}
          onPress={handleCustomerServicePress}
        >
          <Headset size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1618871737423-0c122edb760e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwzfHxGcmVzaCUyMHBpbmVhcHBsZXMlMjBncm91cGVkJTIwdG9nZXRoZXIlMjBpbiUyMGElMjBmYXJtJTIwb3IlMjBtYXJrZXQlMjBzZXR0aW5nfGVufDB8MHx8eWVsbG93fDE3NjQ3NzM0ODR8MA&ixlib=rb-4.1.0&q=85' }}
            style={styles.productImage}
            resizeMode="cover"
          />
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <View style={styles.priceRow}>
            <Text style={styles.productName}>Nenas Dewasa</Text>
            <Text style={styles.productPrice}>RM 200</Text>
          </View>

          <View style={styles.discountRow}>
            <Text style={styles.discountLabel}>Discount</Text>
            <Text style={styles.discountValue}>40%</Text>
          </View>

          <Text style={styles.description}>
            Nenas Dewasa dijual secara borong
          </Text>

          {/* Pincode Input */}
          <View style={styles.pincodeContainer}>
            <TextInput
              style={styles.pincodeInput}
              placeholder="Pincode"
              placeholderTextColor="#999"
              value={pincode}
              onChangeText={setPincode}
              keyboardType="numeric"
            />
            <TouchableOpacity
              style={styles.checkButton}
              onPress={handleCheckAvailability}
              activeOpacity={0.8}
            >
              <Text style={styles.checkButtonText}>Check Availability</Text>
            </TouchableOpacity>
          </View>

          {/* Order Button */}
          <TouchableOpacity
            style={styles.orderButton}
            onPress={handleOrderNow}
            activeOpacity={0.8}
          >
            <Text style={styles.orderButtonText}>Order Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.bottomNavButton}
          onPress={onNavigateHome}
        >
          <Home size={32} color="#fff" />
        </TouchableOpacity>
      </View>
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
  usersButton: {
    padding: 5,
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: 280,
    backgroundColor: '#065b66',
    padding: 20,
  },
  productImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  productInfo: {
    padding: 20,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  productName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  productPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  discountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  discountLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  discountValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  description: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 24,
    lineHeight: 20,
  },
  pincodeContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  pincodeInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: '#000',
  },
  checkButton: {
    backgroundColor: '#a94064',
    borderRadius: 4,
    paddingHorizontal: 20,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  orderButton: {
    backgroundColor: '#a94064',
    borderRadius: 4,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  orderButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
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