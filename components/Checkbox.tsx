import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onToggle: () => void;
}

export default function Checkbox({ label, checked, onToggle }: CheckboxProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onToggle} activeOpacity={0.7}>
      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
        {checked && <View style={styles.checkmark} />}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: 'transparent',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#fff',
    borderColor: '#fff',
  },
  checkmark: {
    width: 12,
    height: 12,
    backgroundColor: '#006884',
    borderRadius: 2,
  },
  label: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});