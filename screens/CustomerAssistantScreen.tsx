import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft, Headset, Phone, Mail } from 'lucide-react-native';
import BottomNavBar from '../components/BottomNavBar';

interface CustomerAssistantScreenProps {
  onNavigateHome?: () => void;
  onNavigateToProduct?: () => void;
  onNavigateToLocation?: () => void;
  onNavigateToAssistant?: () => void;
  onNavigateToAbout?: () => void;
  onNavigateToPineBot?: () => void;
  onLogout?: () => void;
}

export default function CustomerAssistantScreen({
  onNavigateHome,
  onNavigateToProduct,
  onNavigateToLocation,
  onNavigateToAssistant,
  onNavigateToAbout,
  onNavigateToPineBot,
  onLogout
}: CustomerAssistantScreenProps) {

  const handleDirectCall = async () => {
    const phoneNumber = '+07-236 1211';
    const url = `tel:${phoneNumber.replace(/\s/g, '')}`;

    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Phone calls are not supported on this device');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to make phone call');
      console.error('Error making phone call:', error);
    }
  };

  const handleEmail = async () => {
    const email = 'umum@mplb.gov.my';
    const url = `mailto:${email}`;

    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Email is not supported on this device');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to open email');
      console.error('Error opening email:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onNavigateHome}
        >
          <ChevronLeft size={32} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Customer{'\n'}Assistant</Text>

        <View style={styles.headsetIconContainer}>
          <Headset size={32} color="#fff" />
        </View>
      </View>

      <View style={styles.content}>
        {/* Direct Call Button */}
        <TouchableOpacity
          style={styles.contactButton}
          onPress={handleDirectCall}
          activeOpacity={0.8}
        >
          <View style={styles.contactIconContainer}>
            <Phone size={24} color="#fff" />
          </View>
          <Text style={styles.contactButtonText}>Direct call: +07-236 1211</Text>
        </TouchableOpacity>

        {/* Email Button */}
        <TouchableOpacity
          style={styles.contactButton}
          onPress={handleEmail}
          activeOpacity={0.8}
        >
          <View style={styles.contactIconContainer}>
            <Mail size={24} color="#fff" />
          </View>
          <Text style={styles.contactButtonText}>Email: umum@mplb.gov.my</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <BottomNavBar
        currentScreen="assistant"
        onNavigateHome={onNavigateHome || (() => { })}
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
  backButton: {
    padding: 5,
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
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    lineHeight: 24,
  },
  headsetIconContainer: {
    padding: 5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0a6b78',
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  contactIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
});
