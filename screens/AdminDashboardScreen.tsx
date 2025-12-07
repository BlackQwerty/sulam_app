import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft, ShoppingBag, Tag, Upload, Trash2 } from 'lucide-react-native';

interface AdminDashboardScreenProps {
  onBack?: () => void;
  onNavigateToManageProducts?: () => void;
  onNavigateToManageSales?: () => void;
}

export default function AdminDashboardScreen({
  onBack,
  onNavigateToManageProducts,
  onNavigateToManageSales,
}: AdminDashboardScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <ChevronLeft size={32} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Admin Dashboard</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Management</Text>

        <TouchableOpacity style={styles.card} onPress={onNavigateToManageProducts}>
          <View style={[styles.iconContainer, { backgroundColor: '#E0F2F1' }]}>
            <ShoppingBag size={32} color="#00695C" />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Manage Products</Text>
            <Text style={styles.cardDescription}>Add, delete, and update products</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={onNavigateToManageSales}>
          <View style={[styles.iconContainer, { backgroundColor: '#E3F2FD' }]}>
            <Tag size={32} color="#1565C0" />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Manage Sales & Announcements</Text>
            <Text style={styles.cardDescription}>Create new sales baners and announcements</Text>
          </View>
        </TouchableOpacity>

      </ScrollView>
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
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
  },
});
