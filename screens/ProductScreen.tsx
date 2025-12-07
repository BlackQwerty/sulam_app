
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft, Headset } from 'lucide-react-native';
import ProductCard from '../components/ProductCard';
import BottomNavBar from '../components/BottomNavBar';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

interface ProductScreenProps {
  onNavigateHome?: () => void;
  onNavigateToProduct?: () => void;
  onNavigateToLocation?: () => void;
  onNavigateToAssistant?: () => void;
  onNavigateToAbout?: () => void;
  onNavigateToPineBot?: () => void;
  onLogout?: () => void;
}

interface Product {
  id: string;
  name: string;
  stock: string;
  price: string;
  imageUrl: string;
  badge?: string;
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
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
      const productsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Product));
      setProducts(productsData);
    });

    return () => unsubscribe();
  }, []);

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