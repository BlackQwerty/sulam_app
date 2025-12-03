import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { UserCircle, Headset, Home, Facebook, Instagram, Video } from 'lucide-react-native';
import ProfileSidebar from '../components/ProfileSidebar';

interface AboutUsScreenProps {
  onNavigateHome?: () => void;
  onNavigateToAssistant?: () => void;
  onLogout?: () => void;
}

export default function AboutUsScreen({ onNavigateHome, onNavigateToAssistant, onLogout }: AboutUsScreenProps) {
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
    if (onNavigateToAssistant) {
      onNavigateToAssistant();
    }
  };

  const handleSocialPress = (platform: string) => {
    console.log(`Open ${platform}`);
    // Implement actual linking if needed
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

        <Text style={styles.headerTitle}>About Us</Text>

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
        {/* Logo and Title */}
        <View style={styles.logoSection}>
          <Image
            source={{ uri: 'https://seeklogo.com/images/L/lembaga-perindustrian-nanas-malaysia-lpnm-logo-9831778103-seeklogo.com.png' }}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.orgName}>
            Lembaga Perindustrian{'\n'}Nanas Malaysia
          </Text>
        </View>

        <View style={styles.divider} />

        {/* Description */}
        <Text style={styles.description}>
          Lembaga Perindustrian Nanas Malaysia (LPNM) adalah badan berkanun yang memajukan industri nanas di Malaysia dengan menyelaraskan penanaman, pemprosesan, pemasaran, dan pengeksportan nanas. Ia juga menyediakan bantuan kewangan, membiayai penyelidikan, mengumpul statistik, dan memberikan khidmat nasihat serta bimbingan kepada para pekebun dan usahawan.
        </Text>

        <View style={styles.divider} />

        {/* Address */}
        <Text style={styles.address}>
          Wisma Nanas, No.5, Jalan Padi Mahsuri, Bandar Baru Uda, 81200 Johor Bahru, Johor Darul Ta'zim, Malaysia
        </Text>

        <View style={styles.divider} />

        {/* Social Media */}
        <View style={styles.socialSection}>
          <TouchableOpacity style={styles.socialRow} onPress={() => handleSocialPress('Facebook')}>
            <View style={[styles.socialIcon, { backgroundColor: '#1877F2' }]}>
              <Facebook size={24} color="#fff" />
            </View>
            <Text style={styles.socialText}>lembagaperindustriannanasmalaysia</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialRow} onPress={() => handleSocialPress('Instagram')}>
            <View style={[styles.socialIcon, { backgroundColor: '#E4405F' }]}>
              <Instagram size={24} color="#fff" />
            </View>
            <Text style={styles.socialText}>nanas_lpnm</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialRow} onPress={() => handleSocialPress('TikTok')}>
            <View style={[styles.socialIcon, { backgroundColor: '#000000' }]}>
              <Video size={24} color="#fff" />
            </View>
            <Text style={styles.socialText}>@lpnm_nanas</Text>
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
    padding: 20,
  },
  logoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 15,
  },
  logo: {
    width: 80,
    height: 80,
  },
  orgName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    flex: 1,
    lineHeight: 28,
  },
  divider: {
    height: 1,
    backgroundColor: '#fff',
    opacity: 0.3,
    marginVertical: 20,
  },
  description: {
    fontSize: 15,
    color: '#fff',
    lineHeight: 24,
    textAlign: 'justify',
  },
  address: {
    fontSize: 15,
    color: '#fff',
    lineHeight: 24,
    fontWeight: '500',
  },
  socialSection: {
    gap: 20,
    marginBottom: 40,
  },
  socialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  socialIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialText: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '600',
    flex: 1,
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
