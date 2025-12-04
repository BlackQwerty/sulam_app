import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft, Headset } from 'lucide-react-native';
import BottomNavBar from '../components/BottomNavBar';

interface FarmLocationScreenProps {
  onNavigateHome?: () => void;
  onNavigateToProduct?: () => void;
  onNavigateToLocation?: () => void;
  onNavigateToAssistant?: () => void;
  onNavigateToAbout?: () => void;
  onNavigateToPineBot?: () => void;
  onLogout?: () => void;
}

interface LocationCardProps {
  name: string;
  description: string;
  imageUrl: string;
  onContactPress?: () => void;
}

interface ProfileCardProps {
  name: string;
  location: string;
  imageUrl: string;
  onPress?: () => void;
}

function LocationCard({ name, description, imageUrl, onContactPress }: LocationCardProps) {
  return (
    <View style={styles.locationCard}>
      <View style={styles.locationCardContent}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.locationImage}
          resizeMode="cover"
        />
        <View style={styles.locationInfo}>
          <Text style={styles.locationName}>{name}</Text>
          <Text style={styles.locationDescription}>{description}</Text>
          <TouchableOpacity
            style={styles.contactButton}
            onPress={onContactPress}
            activeOpacity={0.8}
          >
            <Text style={styles.contactButtonText}>Contact</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function ProfileCard({ name, location, imageUrl, onPress }: ProfileCardProps) {
  return (
    <TouchableOpacity
      style={styles.profileCard}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Image
        source={{ uri: imageUrl }}
        style={styles.profileImage}
        resizeMode="cover"
      />
      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>{name}</Text>
        <Text style={styles.profileLocation}>{location}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function FarmLocationScreen({
  onNavigateHome,
  onNavigateToProduct,
  onNavigateToLocation,
  onNavigateToAssistant,
  onNavigateToAbout,
  onNavigateToPineBot,
  onLogout
}: FarmLocationScreenProps) {

  const handleCustomerServicePress = () => {
    console.log('Customer service pressed');
    if (onNavigateToAssistant) {
      onNavigateToAssistant();
    }
  };

  const handleContactPress = (location: string) => {
    console.log(`Contact pressed for ${location}`);
  };

  const handleProfileCardPress = (name: string) => {
    console.log(`Profile card pressed for ${name}`);
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

        <Text style={styles.headerTitle}>Farm Location</Text>

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
        {/* Location Cards */}
        <LocationCard
          name="ALOR GAJAH"
          description="Wanted Pertanian"
          imageUrl="https://images.unsplash.com/photo-1549024449-d6968d2a435f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw3fHxBZ3JpY3VsdHVyYWwlMjBmYXJtJTIwd2l0aCUyMHJvd3MlMjBvZiUyMGNyb3BzJTIwaW4lMjBmaWVsZCUyQyUyMGZhcm1pbmclMjBsYW5kc2NhcGV8ZW58MHwwfHxncmVlbnwxNzY0Nzc5OTUzfDA&ixlib=rb-4.1.0&q=85"
          onContactPress={() => handleContactPress('Alor Gajah')}
        />

        <LocationCard
          name="SEKINCHAN"
          description="Training/Pelatih"
          imageUrl="https://images.unsplash.com/photo-1708266657645-17b3eeb5e157?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxNHx8RmFybWVyJTIwd29ya2luZyUyMGluJTIwcGluZWFwcGxlJTIwZmllbGQlMjB3aXRoJTIwcGxhbnRzfGVufDB8MHx8Z3JlZW58MTc2NDc3OTk1M3ww&ixlib=rb-4.1.0&q=85"
          onContactPress={() => handleContactPress('Sekinchan')}
        />

        {/* Profile Cards */}
        <View style={styles.profileCardsContainer}>
          <ProfileCard
            name="Farizan"
            location="Air Keruh"
            imageUrl="https://images.unsplash.com/photo-1758922584983-82ffd5720c6a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxMnx8UHJvZmVzc2lvbmFsJTIwd29tYW4lMjBwb3J0cmFpdCUyMGhlYWRzaG90fGVufDB8MXx8fDE3NjQ3Nzk5NTN8MA&ixlib=rb-4.1.0&q=85"
            onPress={() => handleProfileCardPress('Farizan')}
          />

          <ProfileCard
            name="Cik Mat"
            location="Sungai Besi"
            imageUrl="https://images.unsplash.com/photo-1652520342059-7ac46093345e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxMHx8UHJvZmVzc2lvbmFsJTIwbWFuJTIwcG9ydHJhaXQlMjBpbiUyMG91dGRvb3JzJTIwZmFybSUyMHNldHRpbmd8ZW58MHwxfHwxfDE3NjQ3Nzk5NTQ%3D&ixlib=rb-4.1.0&q=85"
            onPress={() => handleProfileCardPress('Cik Mat')}
          />
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavBar
        currentScreen="location"
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
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
  },
  usersButton: {
    padding: 5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  locationCard: {
    backgroundColor: '#7a8c8d',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
  },
  locationCardContent: {
    flexDirection: 'row',
    padding: 12,
  },
  locationImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  locationInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  locationName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  locationDescription: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 8,
  },
  contactButton: {
    backgroundColor: '#a94064',
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  profileCardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  profileCard: {
    width: '48%',
    backgroundColor: '#065b66',
    borderRadius: 12,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: 160,
  },
  profileInfo: {
    padding: 12,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  profileLocation: {
    fontSize: 13,
    color: '#fff',
    opacity: 0.9,
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