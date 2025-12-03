import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

interface MenuButtonProps {
  title: string;
  icon: React.ReactNode;
  onPress?: () => void;
}

export default function MenuButton({ title, icon, onPress }: MenuButtonProps) {
  return (
    <TouchableOpacity 
      style={styles.button} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.iconContainer}>
        {icon}
      </View>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1a6b7a',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
    flex: 1,
    margin: 6,
  },
  iconContainer: {
    marginBottom: 12,
  },
  title: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});