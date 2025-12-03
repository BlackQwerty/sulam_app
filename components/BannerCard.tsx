import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

interface BannerCardProps {
  title: string;
  imageUrl: string;
  onPress?: () => void;
}

export default function BannerCard({ title, imageUrl, onPress }: BannerCardProps) {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.9}
    >
      <ImageBackground
        source={{ uri: imageUrl }}
        style={styles.imageBackground}
        imageStyle={styles.image}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 120,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  image: {
    borderRadius: 12,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
});