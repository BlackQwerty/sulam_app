import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Mountain } from 'lucide-react-native';

export default function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <Mountain size={24} color="#FF8C42" />
        </View>
      </View>
      <Text style={styles.headerText}>Lembaga Perindustrian Nanas Malaysia</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#065b66',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 8,
  },
  logoCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
});