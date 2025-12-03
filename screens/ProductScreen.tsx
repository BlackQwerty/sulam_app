import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { UserCircle, Headset, Home } from 'lucide-react-native';
import ProductCard from '../components/ProductCard';

interface ProductScreenProps {
  onNavigateHome?: () => void;
  onNavigateToAssistant?: () => void;
}

export default function ProductScreen({ onNavigateHome, onNavigateToAssistant }: ProductScreenProps) {
  const handleProfilePress = () => {
    console.log('Profile pressed');
  };

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
      name: 'Nanas Dewasa',
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
          style={styles.profileButton}
          onPress={handleProfilePress}
        >
          <View style={styles.profileIconContainer}>
            <UserCircle size={32} color="#fff" />
          </View>
          <Text style={styles.profileText}>Farmer</Text>
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