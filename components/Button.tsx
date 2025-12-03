import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'filled' | 'outlined';
}

export default function Button({ title, onPress, variant = 'filled' }: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, variant === 'filled' ? styles.filledButton : styles.outlinedButton]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.buttonText, variant === 'outlined' && styles.outlinedButtonText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    minWidth: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filledButton: {
    backgroundColor: '#006884',
  },
  outlinedButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#fff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  outlinedButtonText: {
    color: '#fff',
  },
});