import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft, Headset } from 'lucide-react-native';
import ProductCard from '../components/ProductCard';
import BottomNavBar from '../components/BottomNavBar';

interface ProductScreenProps {
  onNavigateHome?: () => void;
  onNavigateToProduct?: () => void;
  onNavigateToLocation?: () => void;
  onNavigateToAssistant?: () => void;
  onNavigateToAbout?: () => void;
  onNavigateToPineBot?: () => void;
  onLogout?: () => void;
}

export default function ProductScreen({
  onNavigateHome,
  onNavigateToProduct,
  onNavigateToLocation,
  onNavigateToAssistant,
  onNavigateToAbout,
  onNavigateToPineBot,
  onLogout
}: ProductScreenProps) {

  const handleCustomerServicePress = () => {
    console.log('Customer service pressed');
    if (onNavigateToAssistant) {
      onNavigateToAssistant();
    }
  };

  const handleProductPress = (productName: string) => {
    console.log(`${productName} pressed`);
  };

  const handleDetailsPress = (productName: string) => {
    console.log(`${productName} details pressed`);
  };

  const products = [
    {
      id: '1',
      name: 'Nenas Dewasa',
      stock: 'Stock : 87 pack',
      price: 'RM 200',
      imageUrl: 'https://images.unsplash.com/photo-1618871737423-0c122edb760e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwzfHxGcmVzaCUyMHBpbmVhcHBsZXMlMjBncm91cGVkJTIwdG9nZXRoZXIlMjBpbiUyMGElMjBmYXJtJTIwb3IlMjBtYXJrZXQlMjBzZXR0aW5nfGVufDB8MHx8eWVsbG93fDE3NjQ3NzM0ODR8MA&ixlib=rb-4.1.0&q=85',
    },
    {
      id: '2',
      name: 'Anak Pokok',
      stock: 'Stock : 15 pack',
      price: 'RM 27',
      imageUrl: 'https://images.unsplash.com/photo-1706059924399-1e26828a627f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxZb3VuZyUyMHBpbmVhcHBsZSUyMHBsYW50cyUyMGdyb3dpbmclMjBpbiUyMHJvd3MlMjBpbiUyMGFncmljdWx0dXJhbCUyMGZpZWxkfGVufDB8MHx8Z3JlZW58MTc2NDc3MzQ4NHww&ixlib=rb-4.1.0&q=85',
    },
    {
      id: '3',
      name: 'Pes Nanas',
      stock: 'Stock : 15 pack',
      price: 'RM 27',
      imageUrl: 'https://images.unsplash.com/photo-1618871736709-0843f4cfc85b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxQaW5lYXBwbGUlMjBkZXNzZXJ0JTIwb3IlMjBmb29kJTIwcHJvZHVjdCUyMGluJTIwY29udGFpbmVyfGVufDB8Mnx8eWVsbG93fDE3NjQ3NzM0ODR8MA&ixlib=rb-4.1.0&q=85',
    },
    {
      id: '4',
      name: 'Baja Nanas',
      stock: 'Stock : 15',
      price: 'RM 85',
      imageUrl: 'https://images.pexels.com/photos/30801526/pexels-photo-30801526.jpeg',
      badge: 'Official Store',
    },
  ];

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

        <Text style={styles.headerTitle}>Product</Text>

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
        {/* Products Grid */}
        <View style={styles.productsGrid}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              stock={product.stock}
              price={product.price}
              imageUrl={product.imageUrl}
              badge={product.badge}
              onPress={() => handleProductPress(product.name)}
              onDetailsPress={() => handleDetailsPress(product.name)}
            />
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavBar
        currentScreen="product"
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
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
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