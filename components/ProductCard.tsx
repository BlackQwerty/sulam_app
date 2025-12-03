import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

interface ProductCardProps {
  name: string;
  stock: string;
  price: string;
  imageUrl: string;
  badge?: string;
  onPress?: () => void;
  onDetailsPress?: () => void;
}

export default function ProductCard({ 
  name, 
  stock, 
  price, 
  imageUrl, 
  badge,
  onPress,
  onDetailsPress 
}: ProductCardProps) {
  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: imageUrl }} 
          style={styles.image}
          resizeMode="cover"
        />
        {badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.stock}>{stock}</Text>
        <Text style={styles.price}>{price}</Text>
        
        <TouchableOpacity 
          style={styles.detailsButton}
          onPress={onDetailsPress}
          activeOpacity={0.7}
        >
          <Text style={styles.detailsText}>Details</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#065b66',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    width: '48%',
  },
  imageContainer: {
    width: '100%',
    height: 120,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  content: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 6,
  },
  stock: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 10,
  },
  detailsButton: {
    alignSelf: 'flex-start',
  },
  detailsText: {
    fontSize: 13,
    color: '#fff',
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
});