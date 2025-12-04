import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Home, MapPin, Info, Bot } from 'lucide-react-native';
import PineappleIcon from '../assets/kk.svg';

interface BottomNavBarProps {
  currentScreen: 'home' | 'product' | 'location' | 'assistant' | 'about';
  onNavigateHome: () => void;
  onNavigateToProduct: () => void;
  onNavigateToLocation: () => void;
  onNavigateToAssistant: () => void;
  onNavigateToAbout: () => void;
}

export default function BottomNavBar({
  currentScreen,
  onNavigateHome,
  onNavigateToProduct,
  onNavigateToLocation,
  onNavigateToAssistant,
  onNavigateToAbout,
}: BottomNavBarProps) {
  const activeColor = '#F6B824';
  const inactiveColor = '#fff';

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity onPress={onNavigateToProduct} style={styles.navItem}>
        {/* PineappleIcon is multi-colored, so we don't tint it, but maybe we can add a border or something if active? 
            For now, just render it. */}
        <PineappleIcon width={32} height={32} />
      </TouchableOpacity>

      <TouchableOpacity onPress={onNavigateToLocation} style={styles.navItem}>
        <MapPin size={28} color={currentScreen === 'location' ? activeColor : inactiveColor} />
      </TouchableOpacity>

      <TouchableOpacity onPress={onNavigateHome} style={styles.navItem}>
        <Home size={28} color={currentScreen === 'home' ? activeColor : inactiveColor} />
      </TouchableOpacity>

      {/* Pine-Bot navigation disabled until AI chat page is created */}
      <TouchableOpacity onPress={() => { }} style={styles.navItem}>
        <Bot size={28} color={inactiveColor} />
      </TouchableOpacity>

      <TouchableOpacity onPress={onNavigateToAbout} style={styles.navItem}>
        <Info size={28} color={currentScreen === 'about' ? activeColor : inactiveColor} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#065b66',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    width: '100%',
  },
  navItem: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
