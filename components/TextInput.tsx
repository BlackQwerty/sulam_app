import React from 'react';
import { TextInput as RNTextInput, StyleSheet, TextInputProps } from 'react-native';

interface CustomTextInputProps extends TextInputProps {
  placeholder: string;
}

export default function TextInput({ placeholder, ...props }: CustomTextInputProps) {
  return (
    <RNTextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#999"
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#E8F0F2',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    fontSize: 15,
    color: '#333',
    width: '100%',
  },
});