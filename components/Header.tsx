import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/lpnm_logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.headerText}>Lembaga Perindustrian Nanas Malaysia</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    //backgroundColor: '#065b66',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 8,
  },
  logo: {
    width: 60,
    height: 60,
  },
  headerText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
});